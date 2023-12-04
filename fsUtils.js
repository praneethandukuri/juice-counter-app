const fs = require("fs");

const readFromFile = function (filePath) {
  const fileContents = fs.readFileSync(filePath, "utf-8")
  return JSON.parse(fileContents)
}
const writeToFile = function (filePath, content) {
  fs.writeFileSync(filePath, JSON.stringify(content, null, 2))
}

module.exports = { writeToFile, readFromFile } 