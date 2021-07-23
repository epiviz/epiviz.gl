export default {
  "schema": "https://json-schema.org/draft/2020-12/schema",
  "id": "/visualization",
  "title": "Visualization",
  "description": "A webgl visualization made of a sequence of tracks",
  "type": "object",
  "required": ["tracks"],
  "properties": {
    "labels": {
      "description": "set of labels to display on visualization, properties of labels can be any valid attribute for an svg text element",
      "examples": [
        {
          "x": 100,
          "y": 200,
          "text": "my favorite data point",
          "rotate": -90
        },
        {
          "x": -1.1,
          "y": 0,
          "text": "Track 1",
          "color": "red",
          "fixedX": true
        }
      ],
      "type": "array",
      "items": {
        "properties": {
          "x": {
            "description": "x coordinate of label with respect to data coordinates, should be on scale with [-1, 1] if x dimension is categorical or genomic",
            "type": "number"
          },
          "y": {
            "description": "y coordinate of label with respect to data coordinates, should be on scale with [-1, 1] if y dimension is categorical or genomic",
            "type": "number"
          },
          "fixedX": {
            "description": "fix the x coordinate of the label, so it does not move when panning/zooming left or right",
            "type": "boolean"
          },
          "fixedY": {
            "description": "fix the y coordinate of the label, so it does not move when panning/zooming up or down",

            "type": "boolean"
          },
          "required": ["x", "y"]
        }
      }
    },
    "xAxis": {
      "description": "location of x-axis",
      "enum": ["bottom", "top", "center", "none", "zero"]
    },
    "yAxis": {
      "description": "location of y-axis",
      "enum": ["left", "right", "center", "none", "zero"]
    },
    "tracks": {
      "description": "A track is a map from the data to a sequence of marks",
      "type": "array",
      "items": { "$ref": "/track" }
    },
    "defaultData": {
      "description": "A string of a csv href containing data or an array of inline data where each row is a string with comma seperated values",
      "examples": [
        "http://example.com/data.csv",
        ["day,price", "1,10", "2,20"]
      ],
      "type": ["string", "array"],
      "items": {
        "type": "string",
        "pattern": ","
      }
    }
  },

  "allOf": [
    {
      "description": "if there is no default data for the visualization require each track to have data property",
      "if": {
        "not": { "required": ["defaultData"] }
      },
      "then": {
        "properties": {
          "tracks": {
            "items": {
              "required": ["data"]
            }
          }
        }
      },
      "else": {}
    }
  ]
}
