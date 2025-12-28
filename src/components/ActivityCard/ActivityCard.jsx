import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Badge from '../Badge/Badge';
import { COLORS, ACTIVITY_TYPES } from '../../constants/theme';
import styles from './ActivityCard.styles';

const ActivityCard = ({
  title,
  description,
  type, 
  status, 
  startTime,
  endTime,
  date,
  assignedBy,
  onPress,
  style,
}) => {
  const getActivityIcon = () => {
    switch (type) {
      case ACTIVITY_TYPES.MEDICINE:
        return 'medical';
      case ACTIVITY_TYPES.THERAPY:
        return 'people';
      case ACTIVITY_TYPES.EXERCISE:
        return 'fitness';
      default:
        return 'calendar';
    }
  };

  const getActivityColor = () => {
    switch (type) {
      case ACTIVITY_TYPES.MEDICINE:
        return COLORS.medicine;
      case ACTIVITY_TYPES.THERAPY:
        return COLORS.therapy;
      case ACTIVITY_TYPES.EXERCISE:
        return COLORS.exercise;
      default:
        return COLORS.other;
    }
  };

  const getStatusBadgeType = () => {
    switch (status) {
      case 'completed':
        return 'completed';
      case 'pending':
        return 'pending';
      case 'inProgress':
        return 'inProgress';
      default:
        return 'default';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'completed':
        return 'Completada';
      case 'pending':
        return 'Pendiente';
      case 'inProgress':
        return 'En Progreso';
      default:
        return 'Sin Estado';
    }
  };

  const activityColor = getActivityColor();
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.97,
      useNativeDriver: true,
      tension: 100,
      friction: 7,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      tension: 100,
      friction: 7,
    }).start();
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={1}
    >
      <Animated.View
        style={[
          styles.card,
          style,
          {
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
      <View style={[styles.colorBar, { backgroundColor: activityColor }]} />

      <View style={styles.cardContent}>
        <View style={styles.header}>
          <View style={[styles.iconCircle, { backgroundColor: `${activityColor}15` }]}>
            <Ionicons
              name={getActivityIcon()}
              size={24}
              color={activityColor}
            />
          </View>

          <View style={styles.headerRight}>
            <View style={styles.titleRow}>
              <Text style={styles.title} numberOfLines={1}>
                {title}
              </Text>
            </View>
            <Badge text={getStatusText()} type={getStatusBadgeType()} size="small" />
          </View>
        </View>

        {/* Description */}
        {description && (
          <Text style={styles.description} numberOfLines={2}>
            {description}
          </Text>
        )}

        {/* Info Row */}
        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <View style={styles.infoIcon}>
              <Ionicons name="time" size={14} color={activityColor} />
            </View>
            <Text style={styles.infoText}>
              {startTime}{endTime && ` - ${endTime}`}
            </Text>
          </View>

          {date && (
            <View style={styles.infoItem}>
              <View style={styles.infoIcon}>
                <Ionicons name="calendar" size={14} color={activityColor} />
              </View>
              <Text style={styles.infoText}>{date}</Text>
            </View>
          )}
        </View>

        {/* Assigned By */}
        {assignedBy && (
          <View style={styles.assignedRow}>
            <View style={styles.assignedIcon}>
              <Ionicons name="person-circle-outline" size={16} color={COLORS.textLight} />
            </View>
            <Text style={styles.assignedText}>{assignedBy}</Text>
          </View>
        )}
      </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default ActivityCard;
