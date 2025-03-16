import React from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onClear: () => void;
  placeholder?: string;
  isDark?: boolean;
}

export function SearchBar({ 
  value, 
  onChangeText, 
  onClear, 
  placeholder = 'Search destination...', 
  isDark = false 
}: SearchBarProps) {
  return (
    <View style={[
      styles.container,
      { backgroundColor: isDark ? '#333' : '#fff' }
    ]}>
      <Ionicons 
        name="search" 
        size={20} 
        color={isDark ? '#fff' : '#000'} 
        style={styles.searchIcon} 
      />
      <TextInput
        style={[
          styles.input,
          { color: isDark ? '#fff' : '#000' }
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={isDark ? '#999' : '#666'}
      />
      {value.length > 0 && (
        <TouchableOpacity onPress={onClear} style={styles.clearButton}>
          <Ionicons 
            name="close-circle" 
            size={20} 
            color={isDark ? '#fff' : '#000'} 
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    height: 50,
    borderRadius: 25,
    marginHorizontal: 20,
    marginTop: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  clearButton: {
    padding: 5,
  },
}); 