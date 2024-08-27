// add something to file

const fs = require("fs");

function readFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (!err) {
        resolve(data);
      }
      reject("Error: ", err);
    });
  });
}

// add something to file
function addTextToFile(filePath, textToAppend) {
  return Promise((resolve, reject) => {
    fs.appendFile(filePath, textToAppend, (err) => {
      if (!err) {
        resolve("File appended successfully!");
      }
      reject(`Error appending file: ${err}`);
    });
  });
}

module.exports = {
  readFile,
  addTextToFile,
};
