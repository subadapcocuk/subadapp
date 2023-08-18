module.exports = {
  bumpFiles: [
    {
      filename: "package.json",
    },
    {
      filename: "app.json",
      updater: require.resolve("@mccraveiro/standard-version-expo"),
    },
    {
      filename: "app.json",
      updater: require.resolve("@mccraveiro/standard-version-expo/android"),
    },
    {
      filename: "app.json",
      updater: require.resolve("@mccraveiro/standard-version-expo/ios"),
    },
  ],
};