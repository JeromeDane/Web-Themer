# Web Themer

**This is a work in progress.** Stay tuned for updates.

Easily restyle any web page with Web Themer, a user style manager similar to Stylish.

## Links

- [Project Home Page (GitHub)](https://github.com/jeromedane/Web-Themer)
- Chrome Extension Page (coming soon)

## Hack This Project

- Make sure you have [NodeJS](http://nodejs.org) installed.
- Clone this repo locally
- Run `npm intall` in your command line from the root of your local repo to install dependencies
- See "Build Commands Below"

### Build Commands

In your command line interface at the root of your repo run ...

```bash
npm run build
```

... to generate a chrome extension build to `./build/chrome/` that can be loaded as an unpacked extension in Chrome.

```bash
npm run watch
```

... to automatically rebuild `./build/chrome/` when changes are made to `./src/`.

```bash
npm run clean
```

... to clean up (remove) all build files.

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
