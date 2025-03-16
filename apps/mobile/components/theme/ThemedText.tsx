import React, { ReactNode } from 'react';
import { Text, TextStyle } from 'react-native';
import { useTheme } from '@/context/theme/ThemeProvider';

export interface ThemedTextProps {
  children: ReactNode;
  style?: TextStyle;
  type?: 'title' | 'subtitle' | 'body' | 'link';
}

export function ThemedText({ children, style, type = 'body' }: ThemedTextProps) {
  const theme = useTheme();
  const isDark = theme === 'dark';

  const baseStyle: TextStyle = {
    color: isDark ? '#fff' : '#000',
  };

  const typeStyles: Record<string, TextStyle> = {
    title: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    subtitle: {
      fontSize: 18,
      fontWeight: '600',
    },
    body: {
      fontSize: 16,
    },
    link: {
      fontSize: 16,
      color: isDark ? '#0A84FF' : '#007AFF',
      textDecorationLine: 'underline',
    },
  };

  return (
    <Text style={[baseStyle, typeStyles[type], style]}>
      {children}
    </Text>
  );
}
