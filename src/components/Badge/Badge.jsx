import React from 'react';
import { View, Text } from 'react-native';
import { COLORS, SIZES, FONTS } from '../../constants/theme';
import styles from './Badge.styles';

const Badge = ({
  text,
  type = 'default',
  size = 'medium', 
  style,
}) => {
  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return {
          backgroundColor: COLORS.secondaryLight,
          color: COLORS.secondaryDark,
        };
      case 'warning':
        return {
          backgroundColor: COLORS.accentLight,
          color: '#E65100',
        };
      case 'error':
        return {
          backgroundColor: '#FFEBEE',
          color: COLORS.error,
        };
      case 'info':
        return {
          backgroundColor: COLORS.primaryLight,
          color: COLORS.primaryDark,
        };
      case 'completed':
        return {
          backgroundColor: COLORS.secondaryLight,
          color: COLORS.completed,
        };
      case 'pending':
        return {
          backgroundColor: COLORS.accentLight,
          color: '#F57C00',
        };
      case 'inProgress':
        return {
          backgroundColor: COLORS.primaryLight,
          color: COLORS.inProgress,
        };
      default:
        return {
          backgroundColor: COLORS.background,
          color: COLORS.textSecondary,
        };
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          paddingHorizontal: SIZES.xs,
          paddingVertical: 2,
          fontSize: SIZES.small,
        };
      case 'medium':
        return {
          paddingHorizontal: SIZES.sm,
          paddingVertical: SIZES.xs,
          fontSize: SIZES.caption,
        };
      case 'large':
        return {
          paddingHorizontal: SIZES.md,
          paddingVertical: SIZES.xs,
          fontSize: SIZES.body,
        };
      default:
        return {
          paddingHorizontal: SIZES.sm,
          paddingVertical: SIZES.xs,
          fontSize: SIZES.caption,
        };
    }
  };

  const typeStyles = getTypeStyles();
  const sizeStyles = getSizeStyles();

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: typeStyles.backgroundColor,
          paddingHorizontal: sizeStyles.paddingHorizontal,
          paddingVertical: sizeStyles.paddingVertical,
        },
        style,
      ]}
    >
      <Text
        style={[
          styles.text,
          {
            color: typeStyles.color,
            fontSize: sizeStyles.fontSize,
          },
        ]}
      >
        {text}
      </Text>
    </View>
  );
};

export default Badge;
