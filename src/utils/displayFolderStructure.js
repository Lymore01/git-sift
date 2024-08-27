function displayStructure(contents, indent = 0) {
    contents.forEach((item) => {
      console.log(
        " ".repeat(indent) + (item.type === "dir" ? "📁" : "📄") + " " + item.name
      );
      if (item.type === "dir" && item.contents) {
        displayStructure(item.contents, indent + 2); // Recursively display subdirectories
      } else if (item.type === "file") {
        console.log(" ".repeat(indent + 2) + "File Contents");
        console.log(
          " ".repeat(indent + 8) + typeof item.fileContent === "string"
            ? item.fileContent.substring(0, 200)
            : item.fileContent + "...."
        ); //display the first 200 chars
      }
    });
}

module.exports = displayStructure;

// sift -libs "link"