import { Validator } from "jsonschema";

const visualization = {
  schema: "https://json-schema.org/draft/2020-12/schema",
  id: "/visualization",
  title: "Visualization",
  description: "A webgl visualization",
  type: "object",
  required: ["tracks"],
  properties: {
    xAxis: {
      enum: ["bottom", "top"],
    },
    yAxis: {
      enum: ["left", "right"],
    },
    tracks: {
      type: "array",
      items: { $ref: "/track" },
    },
    background: {
      type: ["string", "number"],
    },
    defaultData: {
      type: ["string", "array"],
      items: {
        type: "string",
        pattern: ",",
      },
    },
  },

  allOf: [
    {
      // Require tracks to have data defined if there is no default data
      if: {
        not: { required: ["defaultData"] },
      },
      then: {
        properties: {
          tracks: {
            items: {
              required: ["data"],
            },
          },
        },
      },
      else: {},
    },
  ],
};

const track = {
  schema: "https://json-schema.org/draft/2020-12/schema",
  id: "/track",
  title: "Track",
  description: "A track to visualize",
  type: "object",
  required: ["mark", "x", "y"],
  properties: {
    data: {
      type: ["string", "array"],
      items: {
        type: "string",
        pattern: ",",
      },
    },
    mark: {
      enum: ["point", "line", "area", "rect", "tick"],
    },
    tooltips: {
      type: "number",
      minimum: 0,
      maximum: 1,
    },
    x: {
      type: "object",
      properties: {
        scale: {
          enum: ["linear", "log", "sqrt"],
        },
      },
      allOf: [{ $ref: "/channel" }],
    },
    y: {
      type: "object",
      properties: {
        scale: {
          enum: ["linear", "log", "sqrt"],
        },
      },
      allOf: [{ $ref: "/channel" }],
    },
    color: {
      type: "object",
      properties: {
        colorScheme: {
          type: "string",
        },
      },
      allOf: [{ $ref: "/channel" }],
    },
    size: {
      type: "object",
      properties: {
        maxSize: {
          type: "number",
        },
        minSize: {
          type: "number",
        },
        value: {
          type: "number",
        },
      },
      allOf: [{ $ref: "/channel" }],
    },
    width: {
      type: "object",
      properties: {
        maxWidth: {
          type: "number",
        },
        minWidth: {
          type: "number",
        },
        value: {
          type: "number",
        },
      },
      allOf: [{ $ref: "/channel" }],
    },
    height: {
      type: "object",
      properties: {
        maxHeight: {
          type: "number",
        },
        minHeight: {
          type: "number",
        },
        value: {
          type: "number",
        },
      },
      allOf: [{ $ref: "/channel" }],
    },
    opacity: {
      type: "object",
      properties: {
        minOpacity: {
          type: "number",
          minimum: 0,
          exclusiveMaximum: 1,
        },
        value: {
          type: "number",
        },
      },
      allOf: [{ $ref: "/channel" }],
    },
    shape: {
      type: "object",
      properties: {
        value: {
          enum: ["dot", "circle", "diamond", "triangle"],
        },
      },
      allOf: [{ $ref: "/channel" }],
    },
  },
};

const channel = {
  schema: "https://json-schema.org/draft/2020-12/schema",
  id: "/channel",
  title: "Channel",
  description: "A channel of a visualization",
  type: "object",
  properties: {
    type: {
      enum: ["quantitative", "categorical", "genomic", "genomicRange"],
    },
    attribute: {
      type: "string",
    },
    value: {
      type: ["string", "number", "boolean"],
    },
    domain: {
      type: "array",
    },
    cardinality: {
      type: "integer",
    },
    chrAttribute: {
      type: "string",
    },
    startAttribute: {
      type: "string",
    },
    endAttribute: {
      type: "string",
    },
    genome: {
      enum: ["hg38", "hg19", "mm39"],
    },
  },
  allOf: [
    // Allows all of the requirements below to occur
    {
      anyOf: [
        // If type is genomic, require genomic attributes and forbid regular attributes
        {
          not: {
            properties: { type: { const: "genomic" } },
            required: ["type"],
          },
        },
        {
          required: ["chrAttribute", "geneAttribute", "genome"],
          not: { required: ["attribute", "startAttribute", "endAttribute"] },
          properties: {
            domain: {
              items: [
                { type: "string", pattern: "chr(\\d{1,2}|[XY]):\\d+" },
                { type: "string", pattern: "chr(\\d{1,2}|[XY]):\\d+" },
              ],
            },
          },
        },
      ],
    },
    {
      anyOf: [
        // If type is genomicRange, require genomicRange attributes and forbid regular attribute
        {
          not: {
            properties: { type: { const: "genomicRange" } },
            required: ["type"],
          },
        },
        {
          required: [
            "chrAttribute",
            "startAttribute",
            "endAttribute",
            "genome",
          ],
          not: { required: ["attribute", "geneAttribute"] },
          properties: {
            domain: {
              items: [
                { type: "string", pattern: "chr(\\d{1,2}|[XY]):\\d+" },
                { type: "string", pattern: "chr(\\d{1,2}|[XY]):\\d+" },
              ],
            },
          },
        },
      ],
    },
    {
      anyOf: [
        // If type is quantitative, require domain and forbid cardinality
        {
          not: {
            properties: { type: { const: "quantitative" } },
            required: ["type"],
          },
        },
        {
          required: ["domain"],
          properties: {
            domain: {
              items: [{ type: "number" }, { type: "number" }],
            },
          },
          not: {
            required: ["cardinality"],
          },
        },
      ],
    },

    {
      anyOf: [
        // If type is categorical, require cardinality and forbid domain
        {
          not: {
            properties: { type: { const: "categorical" } },
            required: ["type"],
          },
        },
        {
          required: ["cardinality"],
          not: {
            required: ["domain"],
          },
        },
      ],
    },

    {
      anyOf: [
        // If value is defined, disallow other attributes
        {
          not: {
            properties: { value: { not: { type: "null" } } },
            required: ["value"],
          },
        },
        {
          allOf: [
            {
              not: { required: ["attribute"] },
            },
            {
              not: { required: ["type"] },
            },
            {
              not: { required: ["domain"] },
            },
            {
              not: { required: ["cardinality"] },
            },
          ],
        },
      ],
    },

    {
      anyOf: [
        // If value is not defined, require attribute or genomic attributes
        {
          not: {
            properties: { value: { type: "null" } },
          },
        },
        {
          oneOf: [
            {
              required: ["attribute"],
            },
            {
              required: ["chrAttribute", "genome"],
            },
          ],
        },
      ],
    },
  ],
};

const v = new Validator();
v.addSchema(channel, "/channel");
v.addSchema(track, "/track");

const isJSONValid = (json) => {
  const validation = v.validate(json, visualization);
  if (!validation.valid) {
    console.error(validation.errors);
  }
  return validation.valid;
};

export default isJSONValid;

export { channel, track, visualization };
