import React from 'react';
import { Text as RNText, StyleSheet } from 'react-native';
import { TextProps } from '../types';

export const Text: React.FC<TextProps> = ({
  children,
  variant = 'body',
  color,
  style,
  testID
}) => {
  return (
    <RNText
      style={[
        styles.base,
        styles[variant],
        color && { color },
        style
      ]}
      testID={testID}
    >
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  base: {
    fontFamily: 'System',
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    color: '#212529',
  },
  subheading: {
    fontSize: 18,
    fontWeight: '600',
    color: '#495057',
  },
  body: {
    fontSize: 16,
    fontWeight: '400',
    color: '#6C757D',
  },
  caption: {
    fontSize: 14,
    fontWeight: '400',
    color: '#ADB5BD',
  },
});