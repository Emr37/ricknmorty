module.exports = () => {
  return {
    name: "ricknmorty",
    slug: "ricknmorty",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "automatic",
    assetBundlePatterns: ["**/*"],

    ios: {
      supportsTablet: true,
      userInterfaceStyle: "automatic",
      bundleIdentifier: "com.emraksoy.ricknmorty",
      buildNumber: "0",
      runtimeVersion: "1.0.0",
    },
    android: {
      userInterfaceStyle: "automatic",
      package: "com.emraksoy.ricknmorty",
      versionCode: 2,
      runtimeVersion: "1.0.0",
      googleServicesFile: "./google-services.json",
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ff0000",
      },
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    extra: {
      eas: {
        projectId: "7b494b04-fc32-472c-8e21-d3a5c3042b79",
      },
    },
    owner: "motorhaberapp",
    updates: {
      url: "https://u.expo.dev/7b494b04-fc32-472c-8e21-d3a5c3042b79",
    },
  };
};
