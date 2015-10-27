# Web Themer

This project is a work in progress.

Stay tuned for updates

## Build Scripts

From the root of your repo:

```bash
npm run build
```

Generate all  available builds (i.e. chrome and tests) in `./builds/`.

```bash
npm run build-chrome
```

Generate a chrome extension build to `./build/chrome/` that can be loaded as an unpacked extension in Chrome.

```bash
npm run watch-chrome
```

Automatically rebuild `./build/chrome/` when changes are made to `./src/`.


```bash
npm run clean
```

Clean up (remove) all build files.

## Tests

From the root of your repo:

```bash
npm test
```

A browser window will be opened with the results of the tests.
