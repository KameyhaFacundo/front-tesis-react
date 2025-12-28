import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { COLORS, SIZES, SHADOWS } from '../../constants/theme';
import styles from './Card.styles';

const Card = ({
  children,
  style,
  onPress,
  variant = 'default', // default, elevated, outlined
  padding = SIZES.md,
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'elevated':
        return {
          ...SHADOWS.medium,
          backgroundColor: COLORS.card,
        };
      case 'outlined':
        return {
          borderWidth: 1,
          borderColor: COLORS.border,
          backgroundColor: COLORS.card,
        };
      default:
        return {
          ...SHADOWS.light,
          backgroundColor: COLORS.card,
        };
    }
  };

  const cardStyles = [
    styles.card,
    getVariantStyles(),
    { padding },
    style,
  ];

  if (onPress) {
    return (
      <TouchableOpacity
        style={cardStyles}
        onPress={onPress}
        activeOpacity={0.8}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return <View style={cardStyles}>{children}</View>;
};

export default Card;
