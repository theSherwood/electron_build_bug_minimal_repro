This is an invaluable resource: [https://github.com/cawa-93/vite-electron-builder](https://github.com/cawa-93/vite-electron-builder)

## Installation

If you have run the install script in the repo root, you needn't do anything else here.

## Dev

In the root of the repo, run:

```
npm run dev:electron
```

This project depends on the `client` and `entity_store` packages. Running this dev script from the root of the repo will run both of those packages as well. You will be able to make changes to `client` and `entity_store` code and see the tests rerun. Changes to `client` code will cause this project to rebuild. However, changes to `entity_store` code will NOT cause this project to rebuild (yet). You'll have to kill the process and run the script again.

### Database

**This isn't working at the moment because the db path has changed**

The development database is persistent. This is very convenient for development as it makes it easy to develop workflows by building up state in the app and making changes in the code concurrently. So it's up to you to wipe the database when you want to clear the data. To do so, run:

```
npm run clean
```

## Build

```
npm run build
npm run compile
```

## Not Ready for Production

Though it will build and compile, this electron app is not ready for production.

- No code signing
- No CI
- DB path is platform specific and not in the correct place
- No auto-updating setup
- No minification of source code
- Building for targets other that Mac has not been attempted
