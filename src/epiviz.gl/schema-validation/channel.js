export default {
  "schema": "https://json-schema.org/draft/2020-12/schema",
  "id": "/channel",
  "title": "Channel",
  "description": "A channel of a visualization",
  "type": "object",
  "properties": {
    "type": {
      "description": "type of attribute, genomic range only compatible with x, y, width and height",
      "enum": ["quantitative", "categorical", "genomic", "genomicRange"]
    },
    "attribute": {
      "description": "column of data frame to use for mapping channel",
      "type": "string"
    },
    "value": {
      "description": "if fixing a channel, specify with value",
      "type": ["string", "number", "boolean"]
    },
    "domain": {
      "description": "domain of attribute to use for mapping, required if type is quantitative",
      "type": "array"
    },
    "cardinality": {
      "description": "number of attribute values to use for mapping, required if type is categorical",
      "type": "integer"
    },
    "chrAttribute": {
      "description": "if type is genomic or genomicRange, the attribute that contains the chromosome id",
      "type": "string"
    },
    "startAttribute": {
      "description": "if type is genomicRange, the attribute that contains the start of the range",
      "type": "string"
    },
    "endAttribute": {
      "description": "if type is genomicRange, the attribute that contains the end of the range",
      "type": "string"
    },
    "genome": {
      "description": "genome being mapped",
      "enum": ["hg38", "hg19", "mm39"]
    }
  },
  "allOf": [
    {
      "description": "If type is genomic, require genomic attributes and forbid regular attributes",
      "anyOf": [
        {
          "not": {
            "properties": { "type": { "const": "genomic" } },
            "required": ["type"]
          }
        },
        {
          "required": ["chrAttribute", "geneAttribute", "genome"],
          "not": {
            "required": ["attribute", "startAttribute", "endAttribute"]
          },
          "properties": {
            "domain": {
              "items": [
                { "type": "string", "pattern": "chr(\\d{1,2}|[XY]):\\d+" },
                { "type": "string", "pattern": "chr(\\d{1,2}|[XY]):\\d+" }
              ]
            }
          }
        }
      ]
    },
    {
      "description": "If type is genomicRange, require genomicRange attributes and forbid regular attribute",
      "anyOf": [
        {
          "not": {
            "properties": { "type": { "const": "genomicRange" } },
            "required": ["type"]
          }
        },
        {
          "required": [
            "chrAttribute",
            "startAttribute",
            "endAttribute",
            "genome"
          ],
          "not": { "required": ["attribute", "geneAttribute"] },
          "properties": {
            "domain": {
              "items": [
                { "type": "string", "pattern": "chr(\\d{1,2}|[XY]):\\d+" },
                { "type": "string", "pattern": "chr(\\d{1,2}|[XY]):\\d+" }
              ]
            }
          }
        }
      ]
    },
    {
      "description": "If type is quantitative, require domain and forbid cardinality",
      "anyOf": [
        {
          "not": {
            "properties": { "type": { "const": "quantitative" } },
            "required": ["type"]
          }
        },
        {
          "required": ["domain"],
          "properties": {
            "domain": {
              "items": [{ "type": "number" }, { "type": "number" }]
            }
          },
          "not": {
            "required": ["cardinality"]
          }
        }
      ]
    },

    {
      "description": "If type is categorical, require cardinality and forbid domain",
      "anyOf": [
        {
          "not": {
            "properties": { "type": { "const": "categorical" } },
            "required": ["type"]
          }
        },
        {
          "required": ["cardinality"],
          "not": {
            "required": ["domain"]
          }
        }
      ]
    },

    {
      "description": "If value is defined, disallow other attributes",
      "anyOf": [
        {
          "not": {
            "properties": { "value": { "not": { "type": "null" } } },
            "required": ["value"]
          }
        },
        {
          "allOf": [
            {
              "not": { "required": ["attribute"] }
            },
            {
              "not": { "required": ["type"] }
            },
            {
              "not": { "required": ["domain"] }
            },
            {
              "not": { "required": ["cardinality"] }
            }
          ]
        }
      ]
    },

    {
      "description": "If value is not defined, require attribute or genomic attributes",
      "anyOf": [
        {
          "not": {
            "properties": { "value": { "type": "null" } }
          }
        },
        {
          "oneOf": [
            {
              "required": ["attribute"]
            },
            {
              "required": ["chrAttribute", "genome"]
            }
          ]
        }
      ]
    }
  ]
}
