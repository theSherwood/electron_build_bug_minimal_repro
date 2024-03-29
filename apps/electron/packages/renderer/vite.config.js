/* eslint-env node */

import { chrome } from "../../.electron-vendors.cache.json";
import { renderer } from "unplugin-auto-expose";
import { join } from "node:path";
import { inject_app_version } from "../../version/inject_app_version_plugin.mjs";

const PACKAGE_ROOT = __dirname;
const PROJECT_ROOT = join(PACKAGE_ROOT, "../..");

/**
 * @type {import('vite').UserConfig}
 * @see https://vitejs.dev/config/
 */
const config = {
  mode: process.env.MODE,
  root: PACKAGE_ROOT,
  envDir: PROJECT_ROOT,
  resolve: {
    alias: {
      "/@/": join(PACKAGE_ROOT, "src") + "/",
    },
  },
  base: "",
  server: {
    fs: {
      strict: true,
    },
  },
  build: {
    sourcemap: true,
    minify: false,
    target: `chrome${chrome}`,
    // target: "chrome",
    outDir: "dist",
    assetsDir: ".",
    rollupOptions: {
      input: [join(PACKAGE_ROOT, "index.html"), "sw.js"],
      output: {
        entryFileNames: "[name].js",
      },
    },
    emptyOutDir: true,
    reportCompressedSize: false,
  },
  // test: {
  //   environment: 'happy-dom',
  // },
  plugins: [
    renderer.vite({
      preloadEntry: join(PACKAGE_ROOT, "../preload/src/index.ts"),
    }),
    inject_app_version(),
  ],
};

export default config;
