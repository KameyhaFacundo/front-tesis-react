import { StyleSheet } from 'react-native';
import { COLORS, SIZES, FONTS } from '../../constants/theme';

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radiusLarge,
    marginBottom: SIZES.md,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
  },
  colorBar: {
    width: 4,
  },
  cardContent: {
    flex: 1,
    padding: SIZES.md,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: SIZES.md,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: SIZES.radiusMedium,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SIZES.md,
  },
  headerRight: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.xs,
  },
  title: {
    ...FONTS.bodyBold,
    fontSize: 16,
    color: COLORS.text,
    flex: 1,
  },

  description: {
    ...FONTS.body,
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 20,
    marginBottom: SIZES.md,
  },

  infoRow: {
    flexDirection: 'row',
    gap: SIZES.lg,
    marginBottom: SIZES.sm,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SIZES.xs,
  },
  infoIcon: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoText: {
    ...FONTS.caption,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },

  assignedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: SIZES.sm,
    marginTop: SIZES.xs,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    gap: SIZES.xs,
  },
  assignedIcon: {
    opacity: 0.6,
  },
  assignedText: {
    ...FONTS.small,
    color: COLORS.textLight,
    fontStyle: 'italic',
  },
});

export default styles;
