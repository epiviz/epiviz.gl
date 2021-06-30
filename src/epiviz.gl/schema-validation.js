import { Validator } from "jsonschema";

const visualization = {
  schema: "https://json-schema.org/draft/2020-12/schema",
  id: "/visualization",
  title: "Visualization",
  description: "A webgl visualization",
  type: "object",
  required: ["tracks"],
  properties: {
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
      enum: ["point", "line", "area", "rect", "bar"],
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
        axis: {
          enum: ["bottom", "top"],
        },
      },
      allOf: [{ $ref: "/channel" }],
      not: { required: ["value"] },
    },
    y: {
      type: "object",
      properties: {
        scale: {
          enum: ["linear", "log", "sqrt"],
        },
        axis: {
          enum: ["left", "right"],
        },
      },
      allOf: [{ $ref: "/channel" }],
      not: { required: ["value"] },
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
      enum: ["quantitative", "categorical", "genomic"],
    },
    attribute: {
      type: "string",
    },
    value: {
      type: ["string", "number", "boolean"],
    },
    domain: {
      type: "array",
      items: [{ type: "number" }, { type: "number" }],
    },
    cardinality: {
      type: "integer",
    },
  },
  anyOf: [
    {
      if: {
        properties: {
          value: {
            type: "null",
          },
        },
      },
      then: {
        // value is not defined, therefore an attribute is required
        required: ["attribute"],
        oneOf: [
          {
            properties: {
              type: { const: "quantitative" },
            },
            required: ["domain"],
            not: { required: ["cardinality", "value"] },
          },
          {
            properties: {
              type: { const: "categorical" },
            },
            required: ["cardinality"],
            not: { required: ["domain", "value"] },
          },
        ],
      },
      else: {
        // value is defined, cannot coexist with other base attributes
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
    },
  ],
};

const v = new Validator();
v.addSchema(channel, "/channel");
v.addSchema(track, "/track");

const isJSONValid = (json) => v.validate(json, visualization).valid;

export default isJSONValid;

export { channel, track, visualization };
