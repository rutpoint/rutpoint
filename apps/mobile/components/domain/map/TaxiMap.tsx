import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import type { LocationObject } from 'expo-location';
import { TaxiRank } from '@rutpoint/shared/src/types/taxiRank';
import { LoadingOverlay } from '@/components/ui/LoadingOverlay';
import { ErrorOverlay } from '@/components/ui/ErrorOverlay';

export interface TaxiMapProps {
  taxiRanks: TaxiRank.TaxiRank[];
  userLocation: LocationObject;
  selectedRank: TaxiRank.TaxiRank | null;
  onRankSelect: (rank: TaxiRank.TaxiRank) => void;
  onRegionChange: (region: Region) => void;
  isLoading: boolean;
  error: string | null;
  isDark: boolean;
  onRetry: () => void;
}

const darkMapStyle = [
  {
    elementType: 'geometry',
    stylers: [{ color: '#242f3e' }]
  },
  {
    elementType: 'labels.text.fill',
    stylers: [{ color: '#746855' }]
  },
  // ... add more dark styles as needed
];

export const TaxiMap: React.FC<TaxiMapProps> = ({
  taxiRanks,
  userLocation,
  selectedRank,
  onRankSelect,
  onRegionChange,
  isLoading,
  error,
  isDark,
  onRetry,
}) => {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        customMapStyle={isDark ? darkMapStyle : []}
        initialRegion={{
          latitude: userLocation.coords.latitude,
          longitude: userLocation.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onRegionChangeComplete={onRegionChange}
      >
        {/* User location marker */}
        <Marker
          coordinate={{
            latitude: userLocation.coords.latitude,
            longitude: userLocation.coords.longitude,
          }}
          title="You are here"
          pinColor="blue"
        />

        {/* Taxi rank markers */}
        {taxiRanks.map((rank) => (
          <Marker
            key={rank.id}
            coordinate={{
              latitude: rank.latitude,
              longitude: rank.longitude,
            }}
            title={rank.name}
            description={`${rank.routes.length} routes available`}
            pinColor={selectedRank?.id === rank.id ? 'green' : 'red'}
            onPress={() => onRankSelect(rank)}
          />
        ))}
      </MapView>

      {isLoading && <LoadingOverlay />}
      {error && <ErrorOverlay error={error} onRetry={onRetry} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
}); 