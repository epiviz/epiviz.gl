# epiviz.gl

The `epiviz.gl` project is meant to visualize genomic data using webgl and webworkers, in an effort to give a fluid, high-performance user experience.

**Live demo: https://epiviz.github.io/epiviz.gl/**

## Install

```
$ yarn install git+https://github.com/epiviz/epiviz.gl
```

## Quick Start

### Prepare the repository

```
$ yarn install
$ yarn build
```

### Use the app

```
$ yarn start
```

Then navigate to `localhost:1234`

### Run the tests

```
$ yarn start
(In a seperate window)
$ npx cypress open
```

#### Via command line

```
$ npx cypress run
```

#### Via GUI

```
$ npx cypress open
```

This will open an additional window, where tests can be run on a live version of chrome.

### Record the tests

```
$ npx cypress run --spec "cypress/integration/record-tests.spec.js" --env recording=true
```
