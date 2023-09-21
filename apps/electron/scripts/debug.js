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

let ex =
  "/Users/runner/work/electron_build_bug_minimal_repro/electron_build_bug_minimal_repro/node_modules/app-builder-bin/mac/app-builder_amd64";
try {
  console.log("\nMODE BEFORE:", fs.statSync(ex).mode);
  fs.chmodSync(ex, 0o777);
  console.log("MODE AFTER:", fs.statSync(ex).mode, "\n");
} catch (e) {
  console.error("\nFAILED TO CHMOD\n");
}
