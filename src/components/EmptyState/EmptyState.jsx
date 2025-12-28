import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Button from '../Button/Button';
import { COLORS, SIZES, FONTS } from '../../constants/theme';
import styles from './EmptyState.styles';

const EmptyState = ({
  icon = 'folder-open-outline',
  title = 'No hay datos',
  description = 'Aún no hay información para mostrar',
  actionText,
  onAction,
  iconColor = COLORS.primary,
}) => {
  return (
    <View style={styles.container}>
      <View style={[styles.iconCircle, { backgroundColor: `${iconColor}15` }]}>
        <Ionicons name={icon} size={64} color={iconColor} />
      </View>

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>

      {actionText && onAction && (
        <Button
          title={actionText}
          onPress={onAction}
          variant="primary"
          icon="add"
          style={styles.actionButton}
        />
      )}
    </View>
  );
};

export default EmptyState;
