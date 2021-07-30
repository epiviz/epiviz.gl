export default {
  "schema": "https://json-schema.org/draft/2020-12/schema",
  "id": "/track",
  "title": "Track",
  "description": "A track to visualize",
  "type": "object",
  "required": ["mark", "x", "y"],
  "properties": {
    "data": {
      "description": "A string of a csv href containing data or an object of inline data where each key is an array of a data column",
      "type": ["string", "object"],
      "additionalProperties": { "type": "array" },
      "minProperties": 1
    },
    "mark": {
      "description": "type of mark to visualize",
      "enum": ["point", "line", "area", "rect", "tick", "arc"]
    },
    "tooltips": {
      "description": "a number between 0 and 1 where 0 is no tooltips, 1 is always show, and, for example, 0.1 would be show tooltips when zoomed in to 10% of the domain",
      "type": "number",
      "minimum": 0,
      "maximum": 1
    },
    "x": {
      "description": "define the x coordinates of the marks",
      "type": "object",
      "allOf": [{ "$ref": "/channel" }],
      "examples": [
        {
          "type": "genomic",
          "chrAttribute": "chr",
          "geneAttribute": "gene",
          "domain": ["chr2:100", "chr2:300"]
        }
      ]
    },
    "y": {
      "description": "define the y coordinates of the marks",
      "type": "object",
      "allOf": [{ "$ref": "/channel" }],
      "examples": [
        {
          "type": "quantitative",
          "attribute": "time",
          "domain": [0, 10]
        },
        {
          "attribute": "sample",
          "type": "categorical",
          "cardinality": 10
        }
      ]
    },
    "color": {
      "description": "define the color of the marks, for fixed values can be any css3 color descriptor or a number that translates to a color in hex",
      "type": "object",
      "properties": {
        "colorScheme": {
          "description": "d3 continuous color scheme to use, see d3-scale-chromatic for options",
          "examples": [
            "interpolateBlues",
            "interpolateReds",
            "interpolateRainbow"
          ],
          "type": "string"
        }
      },
      "examples": [
        {
          "value": "red"
        },
        {
          "value": 16581375
        },
        {
          "attribute": "sample",
          "type": "categorical",
          "cardinality": 10,
          "colorScheme": "interpolateBuGn"
        }
      ],
      "allOf": [{ "$ref": "/channel" }]
    },
    "size": {
      "description": "size of the mark, used only when mark type is point, use width or height for other mark types. The units of this channel correspond to 1/200th of the canvas e.g. a size of 100 is half the canvas.",
      "type": "object",
      "properties": {
        "maxSize": {
          "type": "number"
        },
        "minSize": {
          "type": "number"
        },
        "value": {
          "type": "number"
        }
      },
      "examples": [
        {
          "attribute": "population",
          "type": "quantitative",
          "domain": [0, 1000],
          "maxSize": 10,
          "minSize": 1
        }
      ],
      "allOf": [{ "$ref": "/channel" }]
    },
    "width": {
      "description": "width of the mark, used for rect, arc, and tick marks only. The units of this channel correspond to 1/200th of the width of the canvas. This channel may be a genomic range type for arc tracks. If both height and width are specified for a tick mark, only width is used.",
      "type": "object",
      "properties": {
        "maxWidth": {
          "type": "number"
        },
        "minWidth": {
          "type": "number"
        },
        "value": {
          "type": "number"
        }
      },
      "allOf": [{ "$ref": "/channel" }]
    },
    "height": {
      "description": "height of the mark, used for rect, arc, and tick marks only. The units of this channel correspond to 1/200th of the height of the canvas. This channel may be a genomic range type for arc tracks.",
      "type": "object",
      "properties": {
        "maxHeight": {
          "type": "number"
        },
        "minHeight": {
          "type": "number"
        },
        "value": {
          "type": "number"
        }
      },
      "allOf": [{ "$ref": "/channel" }]
    },
    "opacity": {
      "description": "opacity of the mark, compatible with all mark types",
      "type": "object",
      "properties": {
        "minOpacity": {
          "type": "number",
          "minimum": 0,
          "exclusiveMaximum": 1
        },
        "value": {
          "type": "number"
        }
      },
      "allOf": [{ "$ref": "/channel" }]
    },
    "shape": {
      "description": "shape of the mark, used only for point marks",
      "type": "object",
      "properties": {
        "value": {
          "enum": ["dot", "circle", "diamond", "triangle"]
        }
      },
      "allOf": [{ "$ref": "/channel" }]
    }
  }
}
