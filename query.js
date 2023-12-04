const { readFromFile } = require("./fsUtils");

const getEmployeeTransactions = function (transactions, date, employeeId) {
  let result = 'Employee ID, Beverage, Quantity, Date\n';
  let totalJuices = 0;
  const transactionsInDay = transactions.filter(transaction => transaction.date.split('T')[0] === date);
  transactionsInDay.forEach(transaction => {
    result += `${transaction.employeeId},${transaction.beverage},${transaction.quantity},${transaction.date}\n`
    totalJuices += transaction.quantity
  });
  const employeeTransactions = transactions.filter(transaction => transaction.employeeId === employeeId);
  employeeTransactions.forEach(transaction => {
    result += `${transaction.employeeId},${transaction.beverage},${transaction.quantity},${transaction.date}\n`
    totalJuices += transaction.quantity
  })
  return `${result}\nTotal:${totalJuices} Juices`;
}

const performQuery = function (args, filePath) {
  // let totalJuices = 0;
  // let result = 'Employee ID, Beverage, Quantity, Date\n';
  const transactions = readFromFile(filePath);
  const date = args[args.indexOf('--date') + 1];
  // const dailyTransaction = transactions.filter(transaction => transaction.date.includes(date));
  const employeeId = +args[1];
  const dailyTransaction = getEmployeeTransactions(transactions, date, employeeId);
  // const employeeTransactions = transactions.filter(transaction => transaction.employeeId === employeeId);
  // employeeTransactions.forEach(transaction => {
  //   result += `${transaction.employeeId},${transaction.beverage},${transaction.quantity},${transaction.date}\n`
  //   totalJuices += transaction.quantity
  // })

  // return `${result}\nTotal:${totalJuices} Juices`;
  return dailyTransaction;
}


module.exports = { performQuery }
