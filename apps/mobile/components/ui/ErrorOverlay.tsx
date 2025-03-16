import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { ThemedText } from '@/components/theme/ThemedText';

interface ErrorOverlayProps {
  error: string;
  onRetry: () => void;
}

export const ErrorOverlay: React.FC<ErrorOverlayProps> = ({ error, onRetry }) => (
  <TouchableOpacity 
    style={styles.container}
    onPress={onRetry}
  >
    <View style={styles.content}>
      <MaterialIcons name="refresh" size={24} color="#fff" />
      <ThemedText style={styles.text}>Retry</ThemedText>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
}); 