module.exports = {
  readVersion(contents) {
    return JSON.parse(contents).expo.version;
  },
  writeVersion(contents, version) {
    const json = JSON.parse(contents);

    // Update Expo semantic version
    json.expo.version = version;

    // Increment iOS buildNumber (string representation of an integer)
    if (json.expo.ios) {
      const currentIosBuild = parseInt(json.expo.ios.buildNumber || '0', 10);
      json.expo.ios.buildNumber = (currentIosBuild + 1).toString();
    }

    // Increment Android versionCode (integer)
    if (json.expo.android) {
      const currentAndroidCode = json.expo.android.versionCode || 0;
      json.expo.android.versionCode = currentAndroidCode + 1;
    }

    return JSON.stringify(json, null, 2) + '\n';
  }
};