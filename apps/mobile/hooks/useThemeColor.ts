import { useColorScheme } from 'react-native';
import { Constants } from '@rutpoint/shared';

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Constants.Colors.light & keyof typeof Constants.Colors.dark
) {
  const theme = useColorScheme() ?? 'light';
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Constants.Colors[theme][colorName];
  }
}
