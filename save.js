const { writeToFile, readFromFile } = require("./fsUtils");

const storeTransactions = function (filePath, transaction) {
  const existingTransactions = readFromFile(filePath);
  existingTransactions.push(transaction)
  writeToFile(filePath, existingTransactions);
}

const performSave = function (args, filePath) {
  const transaction = {
    beverage: args[args.indexOf('--beverage') + 1],
    employeeId: +args[args.indexOf('--empId') + 1],
    quantity: +args[args.indexOf('--qty') + 1],
    date: new Date().toISOString()
  }
  storeTransactions(filePath, transaction);
  return (`Transaction Recorded:\nEmployee ID,Beverage,Quantity,Date\n${transaction.employeeId},${transaction.beverage},${transaction.quantity},${transaction.date}`);

}

module.exports = { performSave };