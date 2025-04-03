module.exports = {
  name: 'Colvaapp',
  slug: 'colvaapp',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'light',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff'
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true
  },
  android: {
    package: 'com.colvaapp',
    versionCode: 1,
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#ffffff'
    },
    permissions: [
      'WRITE_EXTERNAL_STORAGE',
      'READ_EXTERNAL_STORAGE'
    ]
  },
  plugins: []
};
