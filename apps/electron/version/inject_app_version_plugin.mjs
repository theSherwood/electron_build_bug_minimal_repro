import { get_version } from "./get_version.mjs";

/**
 * Somehow inject app version to vite build context
 * @return {import('vite').Plugin}
 */
export const inject_app_version = () => ({
  name: "inject-version",
  config: () => {
    // TODO: Find better way to inject app version
    process.env.VITE_APP_VERSION = get_version();
  },
});
