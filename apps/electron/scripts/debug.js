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

var exec = require("child_process").exec;
function execute(command, callback, err_callback) {
  exec(command, function (error, stdout, stderr) {
    callback && callback(stdout);
    err_callback && err_callback(error);
    err_callback && err_callback(stderr);
  });
}

let ex_path =
  "/Users/runner/work/electron_build_bug_minimal_repro/electron_build_bug_minimal_repro/node_modules/app-builder-bin/mac/app-builder_amd64";
try {
  console.log("\nMODE BEFORE:", fs.statSync(ex_path).mode);
  fs.chmodSync(ex_path, 0o777);
  execute("chmod +x " + ex_path, null, (error) => {
    console.error(error);
  });
  console.log("MODE AFTER:", fs.statSync(ex_path).mode, "\n");
} catch (e) {
  console.error("\nFAILED TO CHMOD\n");
}
