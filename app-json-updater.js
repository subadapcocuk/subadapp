const fs = require('fs');
const path = require('path');

// Helper to extract the major SDK version number from package.json
function getExpoSDKVersion() {
  try {
    const pkgPath = path.join(process.cwd(), 'package.json');
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
    const expoDependency = pkg.dependencies?.expo || pkg.devDependencies?.expo || '';
    // Extracts leading digits (e.g., "^57.0.0" -> "57")
    const match = expoDependency.match(/\d+/);
    return match ? match[0] : '57';
  } catch (err) {
    return '57'; // Fallback
  }
}

module.exports = {
  readVersion(contents) {
    return JSON.parse(contents).expo.version;
  },
  writeVersion(contents, version) {
    const json = JSON.parse(contents);

    // 1. Update Expo app version (e.g., "0.27.3")
    json.expo.version = version;

    console.log("Updated Expo version to:", version);

    // 2. Generate Android versionCode dynamically: [ExpoSDK][Major:2][Minor:3][Patch:2]
    if (json.expo.android) {
      const sdkVersion = getExpoSDKVersion();
      const [major, minor, patch] = version.split('.').map(Number);

      const paddedMajor = String(major).padStart(2, '0');
      const paddedMinor = String(minor).padStart(3, '0');
      const paddedPatch = String(patch).padStart(2, '0');

      json.expo.android.versionCode = Number(
        `${sdkVersion}${paddedMajor}${paddedMinor}${paddedPatch}`
      );
      console.log("Updated Android versionCode to:", json.expo.android.versionCode);
    }

    // 3. Keep iOS buildNumber in sync with the version string
    if (json.expo.ios) {
      json.expo.ios.buildNumber = version;
      console.log("Updated iOS buildNumber to:", json.expo.ios.buildNumber);
    }

    return JSON.stringify(json, null, 2) + '\n';
  }
};
