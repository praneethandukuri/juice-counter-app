const getUserArgs = function (args) {
  const userArgs = {}
  for (let index = 0; index < args.length; index += 2) {
    userArgs[args[index]] = args[index + 1];
  }
  return userArgs;
}

module.exports = { getUserArgs };