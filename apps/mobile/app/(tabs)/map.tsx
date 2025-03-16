// External
import { StyleSheet, View } from 'react-native';
import { useState, useEffect, useCallback, useRef } from 'react';
import * as Location from 'expo-location';
import type { Region } from 'react-native-maps';

// API
import { TaxiRanksApi } from '@/api/transportation/taxi';
import { useTheme } from '@/context/theme/ThemeProvider';

// UTILS
import type { TaxiRank } from '@rutpoint/shared/src/types/taxiRank';


// UI
import { SearchBar } from '@/components/ui/SearchBar';
import { TaxiMap } from '@/components/domain/map/TaxiMap';
import { TaxiRankDetails } from '@/components/domain/map/TaxiRankDetails';

const MAX_RETRIES = 3;
const RETRY_DELAY = 2000; // 2 seconds
const DEBOUNCE_DELAY = 500; // 500ms delay for map updates

export default function MapPage() {
  const theme = useTheme();
  const isDark = theme === 'dark';
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(true);
  const [isLoadingRanks, setIsLoadingRanks] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [visibleRanks, setVisibleRanks] = useState<TaxiRank.TaxiRank[]>([]);
  const [selectedRank, setSelectedRank] = useState<TaxiRank.TaxiRank | null>(null);
  const [mapRegion, setMapRegion] = useState<Region | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const debounceTimeout = useRef<NodeJS.Timeout>();
  const searchDebounceTimeout = useRef<NodeJS.Timeout>();
  const lastRegion = useRef<Region | null>(null);

  // Function to calculate if region change is significant
  const isSignificantRegionChange = (oldRegion: Region | null, newRegion: Region): boolean => {
    if (!oldRegion) return true;
    
    const zoomChanged = 
      Math.abs(oldRegion.latitudeDelta - newRegion.latitudeDelta) / oldRegion.latitudeDelta > 0.2 ||
      Math.abs(oldRegion.longitudeDelta - newRegion.longitudeDelta) / oldRegion.longitudeDelta > 0.2;
    
    const centerMoved =
      Math.abs(oldRegion.latitude - newRegion.latitude) > oldRegion.latitudeDelta * 0.5 ||
      Math.abs(oldRegion.longitude - newRegion.longitude) > oldRegion.longitudeDelta * 0.5;
    
    return zoomChanged || centerMoved;
  };

  // Load taxi ranks for current region
  const loadTaxiRanksForRegion = useCallback(async (region: Region) => {
    try {
      setError(null);
      setIsLoadingRanks(true);

      const bounds: TaxiRank.MapBounds = {
        northeast: {
          latitude: region.latitude + region.latitudeDelta / 2,
          longitude: region.longitude + region.longitudeDelta / 2,
        },
        southwest: {
          latitude: region.latitude - region.latitudeDelta / 2,
          longitude: region.longitude - region.longitudeDelta / 2,
        }
      };

      const ranks = await TaxiRanksApi.getWithinBounds(bounds);
      setVisibleRanks(prevRanks => {
        const allRanks = [...prevRanks, ...ranks];
        const uniqueRanks = Array.from(new Map(allRanks.map(rank => [rank.id, rank])).values());
        return uniqueRanks;
      });
    } catch (error) {
      console.error('Error fetching ranks for region:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch taxi ranks';
      setError(errorMessage);
    } finally {
      setIsLoadingRanks(false);
    }
  }, []);

  // Handle map region changes with debouncing
  const handleRegionChange = useCallback((region: Region) => {
    setMapRegion(region);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    if (isSignificantRegionChange(lastRegion.current, region)) {
      debounceTimeout.current = setTimeout(() => {
        loadTaxiRanksForRegion(region);
        lastRegion.current = region;
      }, DEBOUNCE_DELAY);
    }
  }, [loadTaxiRanksForRegion]);

  // Search for ranks near a destination
  const fetchNearbyRanks = useCallback(async (destination: string, userLocation: Location.LocationObject) => {
    try {
      setError(null);
      setIsLoadingRanks(true);
      const ranks = await TaxiRanksApi.getNearby({
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
        radius: 5000000
      });
      
      const ranksWithDestination = ranks.filter(rank =>
        rank.routes.some(route =>
          route.name.toLowerCase().includes(destination.toLowerCase())
        )
      );
      
      setVisibleRanks(ranksWithDestination);
    } catch (error) {
      console.error('Error fetching ranks for destination:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch nearby taxi ranks';
      setError(errorMessage);
    } finally {
      setIsLoadingRanks(false);
    }
  }, []);

  // Handle search input with debouncing
  const handleSearch = useCallback((text: string) => {
    setSearchQuery(text);

    if (searchDebounceTimeout.current) {
      clearTimeout(searchDebounceTimeout.current);
    }

    if (!text || text.trim() === '') {
      // If search is empty, load ranks for current map region
      if (mapRegion) {
        loadTaxiRanksForRegion(mapRegion);
      }
      return;
    }

    if (location) {
      searchDebounceTimeout.current = setTimeout(() => {
        fetchNearbyRanks(text, location);
      }, DEBOUNCE_DELAY);
    }
  }, [location, fetchNearbyRanks, loadTaxiRanksForRegion, mapRegion]);

  // Handle search clear
  const handleSearchClear = useCallback(() => {
    setSearchQuery('');
    if (mapRegion) {
      loadTaxiRanksForRegion(mapRegion);
    }
  }, [loadTaxiRanksForRegion, mapRegion]);

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setError('Location permission is required to find nearby taxi ranks');
          return;
        }

        const userLocation = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });
        setLocation(userLocation);

        // Load initial ranks around user location
        const initialRegion: Region = {
          latitude: userLocation.coords.latitude,
          longitude: userLocation.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        };
        await loadTaxiRanksForRegion(initialRegion);
        lastRegion.current = initialRegion;
      } catch (error) {
        console.error('Error getting location:', error);
        setError('Unable to get your location. Please check your device settings.');
      } finally {
        setIsLoadingLocation(false);
      }
    })();
  }, [loadTaxiRanksForRegion]);

  useEffect(() => {
    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
      if (searchDebounceTimeout.current) {
        clearTimeout(searchDebounceTimeout.current);
      }
    };
  }, []);

  if (!location) {
    return (
      <View style={[styles.container, { backgroundColor: isDark ? '#000' : '#fff' }]} />
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#000' : '#fff' }]}>
      <SearchBar
        value={searchQuery}
        onChangeText={handleSearch}
        onClear={handleSearchClear}
        isDark={isDark}
      />
      <TaxiMap
        taxiRanks={visibleRanks}
        userLocation={location}
        selectedRank={selectedRank}
        onRankSelect={setSelectedRank}
        onRegionChange={handleRegionChange}
        isLoading={isLoadingLocation || isLoadingRanks}
        error={error}
        isDark={isDark}
        onRetry={() => lastRegion.current && loadTaxiRanksForRegion(lastRegion.current)}
      />
      {selectedRank && (
        <TaxiRankDetails
          rank={selectedRank}
          onClose={() => {
            setSelectedRank(null);
          }}
          isDark={isDark}
          userLocation={location ? {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
          } : undefined}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
}); 