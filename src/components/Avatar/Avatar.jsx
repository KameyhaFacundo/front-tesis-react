import React from 'react';
import { View, Text, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, FONTS } from '../../constants/theme';
import styles from './Avatar.styles';

const Avatar = ({
  source,
  name,
  size = 'medium',
  type = 'default',
  showStatus = false,
  status = 'offline',
  style,
}) => {
  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          width: 32,
          height: 32,
          fontSize: SIZES.caption,
          iconSize: 16,
        };
      case 'medium':
        return {
          width: 48,
          height: 48,
          fontSize: SIZES.body,
          iconSize: 24,
        };
      case 'large':
        return {
          width: 64,
          height: 64,
          fontSize: SIZES.h4,
          iconSize: 32,
        };
      case 'xlarge':
        return {
          width: 96,
          height: 96,
          fontSize: SIZES.h2,
          iconSize: 48,
        };
      default:
        return {
          width: 48,
          height: 48,
          fontSize: SIZES.body,
          iconSize: 24,
        };
    }
  };

  const getTypeColor = () => {
    switch (type) {
      case 'user':
        return COLORS.user;
      case 'tutor':
        return COLORS.tutor;
      case 'professional':
        return COLORS.professional;
      default:
        return COLORS.primary;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'online':
        return COLORS.success;
      case 'busy':
        return COLORS.warning;
      default:
        return COLORS.textLight;
    }
  };

  const getInitials = (name) => {
    if (!name) return '?';
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const sizeStyles = getSizeStyles();
  const typeColor = getTypeColor();
  const statusColor = getStatusColor();

  return (
    <View style={[styles.container, style]}>
      <View
        style={[
          styles.avatar,
          {
            width: sizeStyles.width,
            height: sizeStyles.height,
            backgroundColor: source ? COLORS.background : typeColor,
          },
        ]}
      >
        {source ? (
          <Image source={source} style={styles.image} />
        ) : name ? (
          <Text
            style={[
              styles.initials,
              {
                fontSize: sizeStyles.fontSize,
                color: COLORS.white,
              },
            ]}
          >
            {getInitials(name)}
          </Text>
        ) : (
          <Ionicons
            name="person"
            size={sizeStyles.iconSize}
            color={COLORS.white}
          />
        )}
      </View>
      
      {showStatus && (
        <View
          style={[
            styles.statusIndicator,
            {
              backgroundColor: statusColor,
              width: sizeStyles.width * 0.25,
              height: sizeStyles.width * 0.25,
              borderWidth: sizeStyles.width * 0.05,
            },
          ]}
        />
      )}
    </View>
  );
};

export default Avatar;
