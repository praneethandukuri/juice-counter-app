const { readFromFile } = require("./fsUtils")

const generateQueryDisplayFormat = function (employeeTransactions) {
  let totalJuices = 0;
  let result = 'Employee ID, Beverage, Quantity, Date\n';
  employeeTransactions.forEach(transaction => {
    result += `${transaction.employeeId},${transaction.beverage},${transaction.quantity},${transaction.date}\n`
    totalJuices += transaction.quantity;
  });

  return `${result}Total:${totalJuices} juices`;
}

const getTransactionsByEmpId = function (transactions, empId) {
  return transactions.filter(transaction => transaction.employeeId === empId)
}

const getTransactionsByDate = function (transactions, date) {
  return transactions.filter(transaction => (transaction.date.split('T')[0] === date));
}

const getUserArgs = function (args) {
  const userArgs = {}
  for (let index = 0; index < args.length; index += 2) {
    userArgs[args[index]] = args[index + 1]
  }
  return userArgs;
}


const performQuery = function (args, filePath) {
  const transactions = readFromFile(filePath)
  const { "--empId": empId, "--date": date } = getUserArgs(args)

  let employeeTransactions = [...transactions];
  employeeTransactions = empId ? getTransactionsByEmpId(employeeTransactions, +empId) : employeeTransactions
  employeeTransactions = date ? getTransactionsByDate(employeeTransactions, date) : employeeTransactions

  return generateQueryDisplayFormat(employeeTransactions);
}

module.exports = { performQuery }