import React from 'react';
import { View as RNView } from 'react-native';
import { BaseComponentProps } from '../types';

export const View: React.FC<BaseComponentProps> = ({
  children,
  style,
  testID
}) => {
  return (
    <RNView style={style} testID={testID}>
      {children}
    </RNView>
  );
};