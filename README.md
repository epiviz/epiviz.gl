# epiviz.gl

The `epiviz.gl` project is meant to visualize genomic data using webgl and webworkers, in an effort to give a fluid, high-performance user experience. Visualizations are defined via a declarative schema.

**Live demo: https://epiviz.github.io/epiviz.gl/**

# Install

```
$ yarn install git+https://github.com/epiviz/epiviz.gl
```

## Usage

See [app/index.js](https://github.com/epiviz/epiviz.gl/blob/main/src/app/index.js) for a more comprehensive example.

```javascript
import WebGLVis from "epiviz.gl";

const container = document.createElement("div");

const visualization = new WebGLVis(container);
visualization.addToDom();
visualization.setSchema({
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

# Schemas

Documentation for schemas can be found in [docs/schema_doc.md](https://github.com/epiviz/epiviz.gl/blob/main/src/docs/schema_doc.md). Documentation for the schemas can be generated with [json-schema-for-humans](https://pypi.org/project/json-schema-for-humans/):

```
$ cd src/epiviz.gl/schema-validation
$ generate-schema-doc visualization.json --config template_name=md
```

## Examples

# Development

## Prepare the repository

```
$ yarn install
$ yarn build
```

## Use the app

```
$ yarn start
```

Then navigate to `localhost:1234`

## Run the tests

```
$ yarn start
(In a seperate window)
$ npx cypress open
```

Via command line:

```
$ npx cypress run
```

Via GUI:

```
$ npx cypress open
```

This will open an additional window, where tests can be run on a live version of chrome.

### Record the tests

A method of doing of integration tests is to record the state of the application when it is working properly. Then, after making changes, compare the current state of the app and assert the state is equivalent. If it is not equivalent, either something is broken OR it is an anticipated change in which case it is justified to rerecord the tests and commit the change.

Check if current state matches recordings:

```
$ npx cypress run --spec "cypress/integration/expected-images.spec.js" --env recording=true
```

Rerecord the tests:

```
$ npx cypress run --spec "cypress/integration/record-tests.spec.js" --env recording=true
```
