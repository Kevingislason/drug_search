const fs = require('fs');
const path = require('path');
const convert = require('xml-js');

if (process.argv.length <= 2) {
  console.log('Usage: ' + __filename + ' path/to/directory');
  process.exit(-1);
}

const drugDataPath = path.normalize(path.join(process.cwd(), process.argv[2]));

//This will just contain drug development information
let drugs = [];
//This will contain association between drug and drugNames
let drugsNames = [];
//
let mechanisms = [];
//
let drugMechanisms = [];

let directoryContents = fs.readdirSync(drugDataPath);
for (let i = 0; i < directoryContents.length; i++) {
  let drugDataFileName = directoryContents[i];
  console.log(drugDataFileName);
  let fileContents = fs
    .readFileSync(drugDataPath + '/' + drugDataFileName)
    .toString();

  fileContents = fileContents.slice(
    0,

    fileContents.length - 1
  );
  fileContents = fileContents.trim();
  console.log(fileContents);
  console.log('***', fileContents[0]);
  console.log('***', fileContents[fileContents.length - 1]);

  let json = convert.xml2json(fileContents, { compact: false, spaces: 4 });
  console.log(json);
}
