/**
 * TODO: Rewrite this config to ESM
 * But currently electron-builder doesn't support ESM configs
 * @see https://github.com/develar/read-config-file/issues/10
 */

/**
 * @type {() => import('electron-builder').Configuration}
 * @see https://www.electron.build/configuration/configuration
 */
module.exports = async function () {
  const { get_version } = await import("./version/get_version.mjs");
  const version = get_version();
  const productName = "Codex";

  // TODO : minify
  return {
    appId: "com.electron.codex_test",
    productName,
    directories: {
      output: "dist",
      buildResources: "build_resources",
    },
    files: ["packages/**/dist/**"],
    extraMetadata: {
      version,
    },

    // Specify linux target just for disabling snap compilation
    linux: {
      target: "deb",
    },

    mac: {
      category: "public.app-category.productivity",
      target: ["zip", "dmg"],
    },
    dmg: {
      title: `${productName} ${version}`,
    },
  };
};
