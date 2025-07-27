import { ReactNode } from 'react';
import { ViewStyle, TextStyle } from 'react-native';

export interface BaseComponentProps {
  children?: ReactNode;
  style?: ViewStyle | TextStyle;
  testID?: string;
}

export interface ButtonProps extends BaseComponentProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  disabled?: boolean;
}

export interface CardProps extends BaseComponentProps {
  elevation?: number;
  padding?: number;
}

export interface TextProps extends BaseComponentProps {
  variant?: 'heading' | 'subheading' | 'body' | 'caption';
  color?: string;
}