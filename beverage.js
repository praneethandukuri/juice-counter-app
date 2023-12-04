const { performSave } = require("./save");
const { performQuery } = require("./query");

const main = function (args) {
  const TRANSACTIONS_FILE_PATH = "./transactionData.json"
  const operation = args[0];
  let result = '';
  if (operation === '--save') {
    result = performSave(args.slice(1), TRANSACTIONS_FILE_PATH);
  } else {
    result = performQuery(args.slice(1), TRANSACTIONS_FILE_PATH);
  }
  console.log(result);
}
main(process.argv.slice(2));
