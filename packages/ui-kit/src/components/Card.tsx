import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CardProps } from '../types';

export const Card: React.FC<CardProps> = ({
  children,
  elevation = 2,
  padding = 16,
  style,
  testID
}) => {
  return (
    <View
      style={[
        styles.card,
        {
          elevation,
          shadowOpacity: elevation * 0.1,
          shadowRadius: elevation * 2,
          padding
        },
        style
      ]}
      testID={testID}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    marginVertical: 8,
    marginHorizontal: 4,
  },
});