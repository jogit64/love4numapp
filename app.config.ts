//app.config.ts

import "dotenv/config";

export default {
  expo: {
    name: "love4num",
    slug: "love4num",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    plugins: [
      [
        "expo-font",
        {
          fonts: [
            "./assets/fonts/luckiestguyregular.ttf",
            "./assets/fonts/hennypennyregular.ttf",
            "./assets/fonts/roboto-700.ttf",
          ],
        },
      ],
    ],
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      permissions: [],
      package: "com.souda.love4num",
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    privacy: "unlisted",
    extra: {
      eas: {
        projectId: "6fff270c-9a2f-45ef-b081-ba3adea274a1",
      },
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.FIREBASE_APP_ID,
    },
  },
};
