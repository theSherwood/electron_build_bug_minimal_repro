const fs = require('fs');
const path = require('path');

const directoryPath = '../../node_modules/app-builder-bin/mac';

try {
  const files = fs.readdirSync(directoryPath);

  // // Filter out any non-file items (e.g., subdirectories)
  // const fileNames = files.filter(file => {
  //   return fs.statSync(path.join(directoryPath, file)).isFile();
  // });

  console.log('\nSTART OF FILENAMES IN DIRECTORY');
  files.forEach(fileName => {
    console.log(fileName);
  });
  console.log('END OF FILENAMES IN DIRECTORY\n');
} catch (err) {
  console.error('Error reading directory:', err);
}