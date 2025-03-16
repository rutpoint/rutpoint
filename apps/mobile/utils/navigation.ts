import { Platform, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TaxiRank } from '@rutpoint/shared/src/types/taxiRank';

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface NavigationOptions {
  destination: Coordinates;
  destinationName?: string;
  origin?: Coordinates;
  isDark?: boolean;
  route?: TaxiRank.Route;
}

interface NavigationApp {
  title: string;
  url: string;
  iconName: keyof typeof Ionicons.glyphMap;
}

export async function openNavigation({ destination, destinationName, origin, isDark, route }: NavigationOptions) {
  const label = encodeURIComponent(destinationName || 'Destination');
  
  // If we have a route with waypoints, use them in the navigation
  const waypointsParam = route?.waypoints?.length 
    ? route.waypoints.map(wp => `${wp.latitude},${wp.longitude}`).join('|')
    : '';
  
  // Prepare navigation app URLs with waypoints if available
  const googleMapsUrl = origin
    ? `https://www.google.com/maps/dir/?api=1&origin=${origin.latitude},${origin.longitude}&destination=${destination.latitude},${destination.longitude}${waypointsParam ? `&waypoints=${waypointsParam}` : ''}&travelmode=driving`
    : `https://www.google.com/maps/search/?api=1&query=${destination.latitude},${destination.longitude}`;
  
  const appleMapsUrl = waypointsParam
    ? `maps://maps.apple.com/?saddr=${origin?.latitude},${origin?.longitude}&daddr=${waypointsParam}&dirflg=d`
    : `maps://maps.apple.com/?daddr=${destination.latitude},${destination.longitude}&dirflg=d`;
  
  const wazeUrl = `https://waze.com/ul?ll=${destination.latitude},${destination.longitude}&navigate=yes&z=10`;

  // Check if Google Maps is installed
  const isGoogleMapsInstalled = await Linking.canOpenURL('comgooglemaps://');

  // Create navigation options based on platform and installed apps
  const navigationApps: NavigationApp[] = Platform.select({
    ios: [
      {
        title: 'Apple Maps',
        url: appleMapsUrl,
        iconName: 'map-outline'
      },
      {
        title: 'Google Maps',
        url: isGoogleMapsInstalled 
          ? `comgooglemaps://?saddr=${origin?.latitude},${origin?.longitude}&daddr=${destination.latitude},${destination.longitude}${waypointsParam ? `&waypoints=${waypointsParam}` : ''}&directionsmode=driving` 
          : googleMapsUrl,
        iconName: 'navigate-circle-outline'
      },
      {
        title: 'Waze',
        url: wazeUrl,
        iconName: 'car-outline'
      }
    ],
    android: [
      {
        title: 'Google Maps',
        url: googleMapsUrl,
        iconName: 'navigate-circle-outline'
      },
      {
        title: 'Waze',
        url: wazeUrl,
        iconName: 'car-outline'
      }
    ],
    default: [
      {
        title: 'Google Maps',
        url: googleMapsUrl,
        iconName: 'navigate-circle-outline'
      },
      {
        title: 'Waze',
        url: wazeUrl,
        iconName: 'car-outline'
      }
    ]
  }) || [];

  return {
    options: navigationApps,
    onSelect: (url: string) => Linking.openURL(url),
    isDark
  };
} 