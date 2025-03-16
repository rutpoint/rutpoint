import { ExpoConfig, ConfigContext } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'Rutpoint',
  slug: 'rutpoint',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'light',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff'
  },
  assetBundlePatterns: [
    '**/*'
  ],
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.rutpoint.mobile',
    infoPlist: {
      NSLocationWhenInUseUsageDescription: "Rutpoint needs access to your location to find nearby taxi ranks.",
      NSLocationAlwaysUsageDescription: "Rutpoint needs access to your location to find nearby taxi ranks.",
      UIBackgroundModes: ["location", "fetch"]
    }
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#ffffff'
    },
    package: 'com.rutpoint.mobile',
    config: {
      googleMaps: {
        apiKey: process.env.GOOGLE_MAPS_API_KEY
      }
    },
    permissions: [
      'ACCESS_COARSE_LOCATION',
      'ACCESS_FINE_LOCATION',
      'ACCESS_BACKGROUND_LOCATION'
    ]
  },
  web: {
    favicon: './assets/favicon.png'
  },
  plugins: [
    'expo-location',
    'expo-secure-store',
    [
      'expo-image-picker',
      {
        photosPermission: 'Allow Rutpoint to access your photos to update your profile picture.'
      }
    ]
  ],
  extra: {
    // API endpoints
    backendApiUrl: process.env.BACKEND_API_URL || 'http://localhost:3000',
    engineApiUrl: process.env.ENGINE_API_URL || 'http://localhost:8080',
    wsUrl: process.env.WS_URL || 'ws://localhost:3000/ws',
    
    // Map configuration
    mapboxAccessToken: process.env.MAPBOX_ACCESS_TOKEN,
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
    
    // Feature flags
    enableCommunityFeatures: true,
    enableRealTimeTracking: true,
    
    // Cache configuration
    cacheTTL: 300, // 5 minutes
    maxCacheSize: 100,
    
    eas: {
      projectId: 'your-project-id'
    }
  },
  scheme: 'rutpoint',
  owner: 'rutpoint'
}); 