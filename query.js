const { readFromFile } = require("./fsUtils")
const { getUserArgs } = require("./userArgs")

const generateQueryDisplayFormat = function (employeeTransactions) {
  let totalJuices = 0;
  let result = 'Employee ID, Beverage, Quantity, Date\n';
  employeeTransactions.forEach(transaction => {
    result += `${transaction.employeeId},${transaction.beverage},${transaction.quantity},${transaction.date}\n`
    totalJuices += transaction.quantity;
  });

  return `${result}Total:${totalJuices} juices`;
}

const getTransactionsByDate = function (transactions, date) {
  return transactions.filter(transaction => (transaction.date.split('T')[0] === date));
}

const getTransactionsByBeverage = function (transactions, beverage) {
  return transactions.filter(transaction => transaction.beverage === beverage);
}

const getTransactionsByEmpId = function (transactions, empId) {
  return (transactions.filter(transaction => transaction.employeeId === empId))
}

const performQuery = function (args, filePath) {
  const transactions = readFromFile(filePath)
  const { "--empId": empId, "--date": date, '--beverage': beverage } = getUserArgs(args)

  let employeeTransactions = [...transactions];
  employeeTransactions = date ? getTransactionsByDate(employeeTransactions, date) : employeeTransactions;
  employeeTransactions = empId ? getTransactionsByEmpId(employeeTransactions, +empId) : employeeTransactions;
  employeeTransactions = beverage ? getTransactionsByBeverage(employeeTransactions, beverage) : employeeTransactions;

  return generateQueryDisplayFormat(employeeTransactions);
}

module.exports = { performQuery }