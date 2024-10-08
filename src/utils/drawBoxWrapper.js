// [1, 2]
const term = require("terminal-kit").terminal;

const  PADDING = 4;
function drawBox(texts) {
  if (Array.isArray(texts)) {
    const maxLength = texts.reduce(
      (max, text) => Math.max(max, text.length),
      0
    );
    const borderLine = ".".repeat(maxLength +  PADDING * 2);

    console.log(borderLine);
    texts.forEach((text) => {
      // padEnd ensures consistency of the box, the padEnd takes in 2 args ; target length and the space
      console.log(
        "." +
          " ".repeat(PADDING) +
          text.padEnd(maxLength) +
          " ".repeat(PADDING) +
          "."
      );
    });

    console.log(borderLine);
  }
}

module.exports = drawBox;
