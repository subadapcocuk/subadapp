module.exports = {
  bumpFiles: [
    {
      filename: "package.json",
    },
    {
      filename: "app.json",
      updater: require.resolve("./app-json-updater.js"),
    },
  ],
};