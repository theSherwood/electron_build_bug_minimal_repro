const fs = require("fs");

let paths = [
  "../../node_modules/app-builder-bin/mac",
  "/Users/runner/work/electron_build_bug_minimal_repro/electron_build_bug_minimal_repro/node_modules/app-builder-bin/mac",
];

for (let p of paths) {
  try {
    const files = fs.readdirSync(p);
    console.log("\nSTART OF FILENAMES IN DIRECTORY:", p);
    files.forEach((fileName) => {
      console.log(fileName);
    });
    console.log("END OF FILENAMES\n");
  } catch (err) {
    console.error("Error reading directory:", p);
  }
}

try {
  fs.chmodSync(
    "/Users/runner/work/electron_build_bug_minimal_repro/electron_build_bug_minimal_repro/node_modules/app-builder-bin/mac/app-builder_amd64",
    fs.constants.S_IRUSR | fs.constants.S_IWUSR | fs.constants.S_IXUSR
  );
} catch (e) {
  console.error("\nFAILED TO CHMOD\n");
}
