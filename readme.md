# Web Themer

**This is a work in progress.** Stay tuned for updates.

Easily restyle any web page with Web Themer, a user style manager similar to Stylish.

## Links

* [Project Home Page (GitHub)](https://github.com/jeromedane/Web-Themer)

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


## License

This work is licensed under GPL v2. Please make sure to credit this original repo if you fork and re-distrute anything based on this. If you make fixes or cool changes, please create a pull request so that they can be incorporated back into official releases.

## Credits

Icon source: https://www.iconfinder.com/icons/28668/theme_icon (GPL License)
