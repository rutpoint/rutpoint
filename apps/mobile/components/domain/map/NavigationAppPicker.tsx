import React from 'react';
import { StyleSheet, View, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/theme/ThemedText';

interface NavigationApp {
  title: string;
  url: string;
  iconName: keyof typeof Ionicons.glyphMap;
}

interface NavigationAppPickerProps {
  options: NavigationApp[];
  onSelect: (url: string) => void;
  onClose: () => void;
  isDark?: boolean;
}

export function NavigationAppPicker({ options, onSelect, onClose, isDark = false }: NavigationAppPickerProps) {
  return (
    <View style={styles.backdrop}>
      <View style={[
        styles.container,
        { backgroundColor: isDark ? '#1A1A1A' : '#FFFFFF' }
      ]}>
        <View style={styles.header}>
          <ThemedText style={styles.title}>Open with...</ThemedText>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <ThemedText style={styles.closeButtonText}>✕</ThemedText>
          </TouchableOpacity>
        </View>

        <View style={styles.optionsContainer}>
          {options.map((app) => (
            <TouchableOpacity
              key={app.title}
              style={[
                styles.option,
                { backgroundColor: isDark ? '#333' : '#F5F5F5' }
              ]}
              onPress={() => onSelect(app.url)}
            >
              <Ionicons
                name={app.iconName}
                size={48}
                color={isDark ? '#FFFFFF' : '#000000'}
                style={styles.appIcon}
              />
              <ThemedText style={styles.appTitle}>{app.title}</ThemedText>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  container: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
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
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
  },
  option: {
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    width: '30%',
  },
  appIcon: {
    marginBottom: 8,
  },
  appTitle: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
}); 