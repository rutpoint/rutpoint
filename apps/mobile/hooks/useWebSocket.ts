import { useEffect, useCallback } from 'react';
import { wsService } from '../api/websocket';
import { Location, TrafficConditions, WeatherConditions, Route } from '../types';

interface UseWebSocketOptions {
  onTaxiLocation?: (location: Location, taxiId: string) => void;
  onTrafficUpdate?: (conditions: TrafficConditions, area: { center: Location; radius: number }) => void;
  onWeatherAlert?: (conditions: WeatherConditions, severity: string) => void;
  onRouteUpdate?: (routeId: string, changes: Partial<Route>) => void;
}

export function useWebSocket(options: UseWebSocketOptions = {}): void {
  const {
    onTaxiLocation,
    onTrafficUpdate,
    onWeatherAlert,
    onRouteUpdate
  } = options;

  useEffect(() => {
    const subscriptions: (() => void)[] = [];

    if (onTaxiLocation) {
      subscriptions.push(
        wsService.subscribeToTaxiLocations(onTaxiLocation)
      );
    }

    if (onTrafficUpdate) {
      subscriptions.push(
        wsService.subscribeToTrafficUpdates(onTrafficUpdate)
      );
    }

    if (onWeatherAlert) {
      subscriptions.push(
        wsService.subscribeToWeatherAlerts(onWeatherAlert)
      );
    }

    if (onRouteUpdate) {
      subscriptions.push(
        wsService.subscribeToRouteUpdates(onRouteUpdate)
      );
    }

    // Cleanup subscriptions on unmount
    return () => {
      subscriptions.forEach(unsubscribe => unsubscribe());
    };
  }, [onTaxiLocation, onTrafficUpdate, onWeatherAlert, onRouteUpdate]);
}

// Example usage:
/*
function MyComponent() {
  useWebSocket({
    onTaxiLocation: (location, taxiId) => {
      console.log(`Taxi ${taxiId} moved to:`, location);
    },
    onTrafficUpdate: (conditions, area) => {
      console.log('Traffic update in area:', area, conditions);
    },
    onWeatherAlert: (conditions, severity) => {
      console.log('Weather alert:', severity, conditions);
    },
    onRouteUpdate: (routeId, changes) => {
      console.log(`Route ${routeId} updated:`, changes);
    }
  });

  return <View>...</View>;
}
*/ 