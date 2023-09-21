const fs = require("fs");

let paths = [
  "../../node_modules/app-builder-bin/mac",
  "/Users/runner/work/electron_build_bug_minimal_repro",
  "/Users/runner/work/electron_build_bug_minimal_repro/electron_build_bug_minimal_repro",
  "/Users/runner/work/electron_build_bug_minimal_repro/electron_build_bug_minimal_repro/node_modules",
  "/Users/runner/work/electron_build_bug_minimal_repro/electron_build_bug_minimal_repro/node_modules/app-builder-bin",
  "/Users/runner/work/electron_build_bug_minimal_repro/electron_build_bug_minimal_repro/node_modules/app-builder-bin/mac",
];

for (let p of paths) {
  try {
    const files = fs.readdirSync(p);

    // // Filter out any non-file items (e.g., subdirectories)
    // const fileNames = files.filter(file => {
    //   return fs.statSync(path.join(directoryPath, file)).isFile();
    // });

    console.log("\nSTART OF FILENAMES IN DIRECTORY:", p);
    files.forEach((fileName) => {
      console.log(fileName);
    });
    console.log("END OF FILENAMES\n");
  } catch (err) {
    console.error("Error reading directory:", p);
  }
}
