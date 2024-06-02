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
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff",
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
    owner: "emraksoy",
    updates: {
      url: "https://u.expo.dev/7b494b04-fc32-472c-8e21-d3a5c3042b79",
    },
  };
};
