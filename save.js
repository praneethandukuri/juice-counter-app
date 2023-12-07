const { writeToFile, readFromFile } = require("./fsUtils");
const { getUserArgs } = require("./userArgs")

const storeTransaction = function (filePath, transaction) {
  const existingTransactions = readFromFile(filePath);
  existingTransactions.push(transaction)
  writeToFile(filePath, existingTransactions);
}

const performSave = function (args, filePath) {
  const { '--beverage': beverage, '--empId': employeeId, '--qty': quantity } = getUserArgs(args);
  const transaction = { beverage, employeeId, quantity, date: new Date().toISOString() }

  storeTransaction(filePath, transaction);
  return (`Transaction Recorded:\nEmployee ID,Beverage,Quantity,Date\n${employeeId},${beverage},${quantity},${transaction.date}`);
}

module.exports = { performSave };