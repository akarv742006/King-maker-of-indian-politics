import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.kingmakerofindianpolitics.game',
  appName: 'King Maker of Indian Politics',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#173B67",
      showSpinner: true,
      spinnerColor: "#F59E0B"
    }
  }
};

export default config;
