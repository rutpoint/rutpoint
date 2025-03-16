import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Linking, ScrollView, ViewStyle, TextStyle } from 'react-native';
import { TaxiRank } from '@rutpoint/shared/src/types/taxiRank';
import { ThemedText } from '@/components/theme/ThemedText';
import { openNavigation } from '@/utils/navigation';
import { NavigationAppPicker } from '@/components/map/NavigationAppPicker';

interface TaxiRankDetailsProps {
  rank: TaxiRank.TaxiRank;
  onClose: () => void;
  isDark: boolean;
  userLocation?: { latitude: number; longitude: number };
}

interface Styles {
  backdrop: ViewStyle;
  container: ViewStyle;
  header: ViewStyle;
  title: TextStyle;
  closeButton: ViewStyle;
  closeButtonText: TextStyle;
  scrollContent: ViewStyle;
  scrollContentContainer: ViewStyle;
  content: ViewStyle;
  infoRow: ViewStyle;
  label: TextStyle;
  value: TextStyle;
  link: TextStyle;
  section: ViewStyle;
  sectionTitle: TextStyle;
  tagContainer: ViewStyle;
  tag: ViewStyle;
  tagText: TextStyle;
  navigateButton: ViewStyle;
  navigateButtonText: TextStyle;
  footer: ViewStyle;
}

export function TaxiRankDetails({ rank, onClose, isDark, userLocation }: TaxiRankDetailsProps) {
  const [showNavigationPicker, setShowNavigationPicker] = useState(false);
  const [navigationOptions, setNavigationOptions] = useState<any>(null);
  const [selectedRoute, setSelectedRoute] = useState<TaxiRank.Route | null>(null);

  const handleNavigate = async () => {
    const options = await openNavigation({
      destination: {
        latitude: rank.latitude,
        longitude: rank.longitude
      },
      destinationName: rank.name,
      origin: userLocation,
      isDark,
      ...(selectedRoute && { route: selectedRoute })
    });
    setNavigationOptions(options);
    setShowNavigationPicker(true);
  };

  const handleRouteSelect = async(route: TaxiRank.Route) => {
    setSelectedRoute(route);
    const options = await openNavigation({
      destination: {
        latitude: route.coordinates.latitude,
        longitude: route.coordinates.longitude
      },
      destinationName: rank.name,
      origin: {
        latitude: rank.latitude,
        longitude: rank.longitude
      },
      isDark,
      ...(selectedRoute && { route: selectedRoute })
    });
    setNavigationOptions(options);
    setShowNavigationPicker(true);
  };

  const handleCloseNavigationPicker = () => {
    setShowNavigationPicker(false);
    setNavigationOptions(null);
  };

  const handleBackdropPress = (event: any) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <View style={styles.backdrop}>
      <View style={[
        styles.container,
        { backgroundColor: isDark ? '#1A1A1A' : '#FFFFFF' }
      ]}>
        <View style={styles.header}>
          <ThemedText style={styles.title}>{rank.name}</ThemedText>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <ThemedText style={styles.closeButtonText}>✕</ThemedText>
          </TouchableOpacity>
        </View>

        <ScrollView 
          style={styles.scrollContent}
          contentContainerStyle={styles.scrollContentContainer}
          showsVerticalScrollIndicator={true}
          bounces={true}
        >
          <View style={styles.content}>
            <View style={styles.infoRow}>
              <ThemedText style={styles.label}>Address</ThemedText>
              <ThemedText style={styles.value}>{rank.address}</ThemedText>
            </View>

            <View style={styles.infoRow}>
              <ThemedText style={styles.label}>Operating Hours</ThemedText>
              <ThemedText style={styles.value}>
                {rank.operatingHours.open} - {rank.operatingHours.close}
              </ThemedText>
            </View>

            <View style={styles.infoRow}>
              <ThemedText style={styles.label}>Fare Range</ThemedText>
              <ThemedText style={styles.value}>
                R{rank.fareRange.min} - R{rank.fareRange.max}
              </ThemedText>
            </View>

            <View style={styles.infoRow}>
              <ThemedText style={styles.label}>Rating</ThemedText>
              <ThemedText style={styles.value}>
                {rank.rating}/5 ({rank.numberOfRatings} reviews)
              </ThemedText>
            </View>

            <View style={styles.section}>
              <ThemedText style={styles.sectionTitle}>Facilities</ThemedText>
              <View style={styles.tagContainer}>
                {rank.facilities.map((facility) => (
                  <View key={facility} style={[
                    styles.tag,
                    { backgroundColor: isDark ? '#333' : '#F5F5F5' }
                  ]}>
                    <ThemedText style={styles.tagText}>{facility}</ThemedText>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.section}>
              <ThemedText style={styles.sectionTitle}>Available Routes</ThemedText>
              <View style={styles.tagContainer}>
                {rank.routes && rank.routes.length > 0 ? (
                  rank.routes.map((route) => (
                    <TouchableOpacity
                      key={route.id}
                      style={[
                        styles.tag,
                        { backgroundColor: isDark ? '#333' : '#F5F5F5' }
                      ]}
                      onPress={() => handleRouteSelect(route)}
                    >
                      <ThemedText style={styles.tagText}>{route.name}</ThemedText>
                    </TouchableOpacity>
                  ))
                ) : (
                  <ThemedText>No routes available</ThemedText>
                )}
              </View>
            </View>

            {rank.contactNumber && (
              <View style={styles.infoRow}>
                <ThemedText style={styles.label}>Contact</ThemedText>
                <TouchableOpacity onPress={() => Linking.openURL(`tel:${rank.contactNumber}`)}>
                  <ThemedText style={[styles.value, styles.link]}>
                    {rank.contactNumber}
                  </ThemedText>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity 
            style={[
              styles.navigateButton,
              { backgroundColor: isDark ? '#007AFF' : '#0A84FF' }
            ]} 
            onPress={handleNavigate}
          >
            <ThemedText style={styles.navigateButtonText}>
              {selectedRoute ? `Navigate via ${selectedRoute.name}` : 'Navigate to Taxi Rank'}
            </ThemedText>
          </TouchableOpacity>
        </View>
      </View>
      {showNavigationPicker && navigationOptions && (
        <NavigationAppPicker
          options={navigationOptions.options}
          onSelect={(url) => {
            navigationOptions.onSelect(url);
            handleCloseNavigationPicker();
            setSelectedRoute(null);
          }}
          onClose={() => {
            handleCloseNavigationPicker();
            setSelectedRoute(null);
          }}
          isDark={isDark}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create<Styles>({
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '90%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    flex: 1,
    marginRight: 16,
  },
  closeButton: {
    padding: 8,
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    fontSize: 18,
    color: '#666',
  },
  scrollContent: {
    maxHeight: '100%',
  },
  scrollContentContainer: {
    flexGrow: 1,
  },
  content: {
    padding: 20,
    gap: 20,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
  },
  value: {
    fontSize: 16,
    fontWeight: '600',
  },
  link: {
    color: '#007AFF',
  },
  section: {
    marginTop: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  tagText: {
    fontSize: 15,
    fontWeight: '500',
  },
  navigateButton: {
    padding: 16,
    margin: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  navigateButtonText: {
    color: 'white',
    fontSize: 17,
    fontWeight: '600',
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
}); 