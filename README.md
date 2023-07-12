# epiviz.gl

The `epiviz.gl` project is meant to visualize genomic data using webgl and webworkers, in an effort to give a fluid, high-performance user experience. Visualizations are defined via a declarative specification.

**Live demo: https://epiviz.github.io/epiviz.gl/**

# Install

Package is published to npm registry @ https://www.npmjs.com/package/epiviz.gl

```
$ yarn add epiviz.gl
```

or through `npm`

```
$ npm install --save epiviz.gl
```

## Usage

See [app/index.js](https://github.com/epiviz/epiviz.gl/blob/main/app/scripts/index.js) for a more comprehensive example.

```javascript
import WebGLVis from "epiviz.gl";

const container = document.createElement("div");

const visualization = new WebGLVis(container);
visualization.addToDom();
visualization.setSpecification({
  defaultData: ["day,price", "1,10", "2,22", "3,35"],
  tracks: [
    {
      mark: "line",
      x: {
        attribute: "day",
        type: "quantitative",
        domain: [1, 10],
      },
      y: {
        attribute: "price",
        type: "quantitative",
        domain: [0, 40],
      },
      color: {
        value: "red",
      },
    },
  ],
});
```

## Features

### Zooming and Panning:

All visualizations automatically include zooming and panning:

![zooming and panning](./docs/images/zooming.gif)

### Selection:

All visualizations also include an ability to box or lasso select:

![selection](./docs/images/selection.gif)

### Unidirectional Selection:

`epiviz.gl` supports unidirectional selection in the plot which allows the selection to occur only horizontally or vertically depending upon the major axis of the movement. This feature is disabled by default. It can be enabled or disabled using the `setUniDirectionSelectEnabled` function as shown below:

```javascript
plot.setUniDirectionSelectEnabled(true); // enables unidirectional selection
plot.setUniDirectionSelectEnabled(false); // disables unidirectional selection
```

By setting the argument to true, the unidirectional selection will be enabled. Setting it to false will disable this feature.

# Specifications

Documentation for specifications can be found in [docs/specification_doc.md](https://github.com/epiviz/epiviz.gl/blob/main/docs/specification_doc.md). Documentation for the specifications can be generated with [json-schema-for-humans](https://pypi.org/project/json-schema-for-humans/):

```shell
cd src/epiviz.gl/specification-validation
generate-schema-doc visualization.json --config template_name=md
```

## Examples

### Scatterplot

**Specification:**

```json
{
  "xAxis": "center",
  "yAxis": "center",
  "defaultData": "path/to/tsne.csv",
  "tracks": [
    {
      "mark": "point",
      "x": {
        "attribute": "x",
        "type": "quantitative",
        "domain": [-10, 10]
      },
      "y": {
        "attribute": "y",
        "type": "quantitative",
        "domain": [-10, 10]
      },
      "color": {
        "attribute": "sample",
        "type": "categorical",
        "cardinality": 32,
        "colorScheme": "interpolateRainbow"
      },
      "opacity": { "value": 0.05 }
    }
  ]
}
```

![selection](./docs/images/scatterplot.gif)

### Box Track

**Specification:**

```json
{
  "margins": {
    "left": "10%"
  },
  "labels": [
    {
      "y": 0.05,
      "x": -1.3,
      "text": "Box 1",
      "fixedX": true
    }
  ],
  "xAxis": "zero",
  "yAxis": "none",
  "defaultData": "path/to/box-track.csv",
  "tracks": [
    {
      "tooltips": 1,
      "mark": "rect",
      "layout": "linear",
      "x": {
        "type": "genomicRange",
        "chrAttribute": "chr",
        "startAttribute": "start",
        "endAttribute": "end",
        "domain": ["chr2:3049800", "chr2:9001000"],
        "genome": "hg38"
      },
      "y": {
        "value": 0
      },
      "height": {
        "value": 10
      },
      "color": {
        "type": "quantitative",
        "attribute": "score",
        "domain": [0, 8],
        "colorScheme": "interpolateBlues"
      }
    }
  ]
}
```

![selection](./docs/images/box-track.gif)

### Line Track

**Specification:**

```json
{
  "defaultData": "path/to/box-track.csv",
  "tracks": [
    {
      "tooltips": 1,
      "mark": "line",
      "layout": "linear",
      "x": {
        "type": "genomic",
        "chrAttribute": "chr",
        "geneAttribute": "start",
        "domain": ["chr2:3049800", "chr2:9001000"],
        "genome": "hg38"
      },
      "y": {
        "type": "quantitative",
        "attribute": "score",
        "domain": [0, 10],
        "colorScheme": "interpolateBlues"
      },
      "color": {
        "type": "quantitative",
        "attribute": "score",
        "domain": [0, 8],
        "colorScheme": "interpolateBlues"
      }
    }
  ]
}
```

![selection](./docs/images/line-track.gif)

### Arc Track

**Specification:**

```json
{
  "xAxis": "zero",
  "yAxis": "none",
  "defaultData": "path/to/arcs.csv",
  "tracks": [
    {
      "mark": "rect",
      "x": {
        "type": "genomicRange",
        "chrAttribute": "region1Chrom",
        "startAttribute": "region1Start",
        "endAttribute": "regionEnd",
        "domain": ["chr2:46000", "chr2:243149000"],
        "genome": "hg19"
      },
      "y": {
        "value": 0
      },
      "height": {
        "value": 10
      },
      "color": {
        "type": "quantitative",
        "attribute": "value",
        "domain": [0, 60],
        "colorScheme": "interpolateBlues"
      },
      "opacity": {
        "value": 0.25
      }
    },
    {
      "mark": "rect",
      "x": {
        "type": "genomicRange",
        "chrAttribute": "region2Chrom",
        "startAttribute": "region2Start",
        "endAttribute": "region2End",
        "domain": ["chr2:38000", "chr2:243149000"],
        "genome": "hg19"
      },
      "y": {
        "value": 0
      },
      "height": {
        "value": 10
      },
      "color": {
        "type": "quantitative",
        "attribute": "value",
        "domain": [0, 60],
        "colorScheme": "interpolateReds"
      },
      "opacity": {
        "value": 0.25
      }
    },
    {
      "mark": "arc",
      "x": {
        "type": "genomicRange",
        "chrAttribute": "region1Chrom",
        "startAttribute": "region1Start",
        "endAttribute": "regionEnd",
        "domain": ["chr2:38000", "chr2:243149000"],
        "genome": "hg19"
      },
      "width": {
        "type": "genomicRange",
        "chrAttribute": "region2Chrom",
        "startAttribute": "region2Start",
        "endAttribute": "region2End",
        "domain": ["chr2:38000", "chr2:243149000"],
        "genome": "hg19"
      },
      "y": {
        "value": 0.1
      },
      "height": {
        "value": 0
      },
      "color": {
        "type": "quantitative",
        "attribute": "value",
        "domain": [0, 60],
        "colorScheme": "interpolateBuGn"
      }
    }
  ]
}
```

![selection](./docs/images/arc-track.gif)

# Development

## Prepare the repository

```shell
yarn install
yarn build
```

## Use the app

```shell
yarn start
```

Then navigate to `localhost:1234`

## Build the package

```shell
yarn build-package
```

Be sure to commit the `dist` folder if changes made should be distributed.

## Deploy to Github Pages

```shell
yarn deploy
```

## Run the tests

```shell
yarn start
```

Via command line:

```shell
npx cypress run
```

Via GUI:

```shell
npx cypress open
```

This will open an additional window, where tests can be run on a live version of chrome.

### Record the tests

A method of doing of integration tests is to record the state of the application when it is working properly. Then, after making changes, compare the current state of the app and assert the state is equivalent. If it is not equivalent, either something is broken OR it is an anticipated change in which case it is justified to rerecord the tests and commit the change.

Check if current state matches recordings:

```shell
npx cypress run --spec "cypress/integration/expected-images.spec.js"
```

Rerecord the tests:

```shell
npx cypress run --spec "cypress/integration/record-tests.spec.js" --env recording=true
```

## Development Notes

### Rasterization

Essentially, the project works by building all of the vertices for a visualization upfront. When visualizing data at a large scale, this can cause some vertices and their primitives (triangles, points, lines) to be VERY small which may cause them to not rasterize (be displayed) consistently. This is most apparent when flickering occurs by zooming/panning on genomic tracks or on a large matrix. This problem has been partially solved via the `SemanticZoomer`, which will render rects in a box track as lines and then as actual rectangles (in the form of two triangles) when zoomed in sufficiently. Altogether, this paragraph is mostly written to recommend developers to consult the [OpenGL ES 3 Specification](https://www.khronos.org/registry/OpenGL/specs/es/3.0/es_spec_3.0.pdf) when encountering these issues, particularly Chapter 3 (Rasterization) to gain some insight on how some vertices will be rendered.

### Adding an Example

1. Either add a .csv file to `app/examples/data` or specify inline data.
2. Create an example in `app/examples/` which should follow this template:

```javascript
import yourData from "url:./data/your-data-if-you-put-it-here.csv";

export default JSON.stringify(
  {
    defaultData: yourData, // or inline data
    tracks: [
      ...
    ],
  },
  null,
  2
);
```

3. In `app/index.html` add an option to the `<select>` element:

```html
<option value="your-example">Your Example</option>
```

4. In `app/scripts/toolbar` import your example and add an entry to the exampleMap:

```javascript
import yourExample from "../examples/your-example";

const exampleMap = new Map([
  ...["your-example", yourExample], // first element is the value attribute from the <option> element
]);
```

5. If you feel that your example is instructive of some functionality of the library and would be worth becoming an integration test, go to `cypress/support/index.js` and add the value attribute from the `<option>` element to [`allPresetNames`](https://github.com/epiviz/epiviz.gl/blob/main/cypress/support/index.js#:~:text=const-,allPresetNames,-%3D%20%5B).

If your example is particularly long to render due to many vertices or a large amount of data, consider adding it to the [`longPresets`](https://github.com/epiviz/epiviz.gl/blob/main/cypress/support/index.js#:~:text=const-,longPresets,-%3D%20%5B%22tsne%22%2C%20%22tsne-10th) array.

6. If you completed step 5, rerecord the tests, but be sure to **only commit only the test-image from your example (provided it is correct)**.
