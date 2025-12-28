import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, FONTS, SHADOWS } from '../../constants/theme';
import styles from './Button.styles';

const Button = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  icon,
  iconPosition = 'left',
  loading = false,
  disabled = false,
  fullWidth = false,
  style,
  textStyle,
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: COLORS.primary,
          borderColor: COLORS.primary,
          shadowColor: COLORS.primary,
        };
      case 'secondary':
        return {
          backgroundColor: COLORS.secondary,
          borderColor: COLORS.secondary,
          shadowColor: COLORS.secondary,
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          borderColor: COLORS.primary,
          shadowColor: 'transparent',
        };
      case 'text':
        return {
          backgroundColor: 'transparent',
          borderColor: 'transparent',
          shadowColor: 'transparent',
        };
      default:
        return {
          backgroundColor: COLORS.primary,
          borderColor: COLORS.primary,
          shadowColor: COLORS.primary,
        };
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          height: 36,
          paddingHorizontal: SIZES.md,
          fontSize: SIZES.caption,
        };
      case 'medium':
        return {
          height: SIZES.buttonHeight,
          paddingHorizontal: SIZES.lg,
          fontSize: SIZES.body,
        };
      case 'large':
        return {
          height: 56,
          paddingHorizontal: SIZES.xl,
          fontSize: SIZES.h5,
        };
      default:
        return {
          height: SIZES.buttonHeight,
          paddingHorizontal: SIZES.lg,
          fontSize: SIZES.body,
        };
    }
  };

  const getTextColor = () => {
    if (disabled) return COLORS.textDisabled;
    if (variant === 'outline' || variant === 'text') return COLORS.primary;
    return COLORS.white;
  };

  const variantStyles = getVariantStyles();
  const sizeStyles = getSizeStyles();

  return (
    <TouchableOpacity
      style={[
        styles.button,
        variantStyles,
        {
          height: sizeStyles.height,
          paddingHorizontal: sizeStyles.paddingHorizontal,
        },
        fullWidth && styles.fullWidth,
        disabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} />
      ) : (
        <View style={styles.content}>
          {icon && iconPosition === 'left' && (
            <Ionicons
              name={icon}
              size={sizeStyles.fontSize + 2}
              color={getTextColor()}
              style={styles.iconLeft}
            />
          )}
          <Text
            style={[
              styles.text,
              {
                fontSize: sizeStyles.fontSize,
                color: getTextColor(),
              },
              textStyle,
            ]}
          >
            {title}
          </Text>
          {icon && iconPosition === 'right' && (
            <Ionicons
              name={icon}
              size={sizeStyles.fontSize + 2}
              color={getTextColor()}
              style={styles.iconRight}
            />
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

export default Button;
