import { StyleSheet } from 'react-native';
import { COLORS, SIZES, FONTS } from '../../constants/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFE',
  },
  filterContainer: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    backgroundColor: COLORS.white,
  },
  filterContent: {
    padding: SIZES.md,
    gap: SIZES.sm,
  },
  filterButton: {
    paddingHorizontal: SIZES.lg,
    paddingVertical: SIZES.sm,
    borderRadius: SIZES.radiusMedium,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  filterButtonActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  filterText: {
    ...FONTS.body,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  filterTextActive: {
    color: COLORS.white,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: SIZES.lg,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: SIZES.xl * 3,
  },
  emptyText: {
    ...FONTS.h3,
    fontWeight: '700',
    color: COLORS.text,
    marginTop: SIZES.lg,
    marginBottom: SIZES.xs,
  },
  emptySubtext: {
    ...FONTS.body,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  alertCard: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radiusLarge,
    padding: SIZES.lg,
    marginBottom: SIZES.md,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  alertHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.md,
  },
  alertIcon: {
    width: 48,
    height: 48,
    borderRadius: SIZES.radiusMedium,
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertHeaderInfo: {
    flex: 1,
    marginLeft: SIZES.md,
  },
  alertUsername: {
    ...FONTS.bodyBold,
    fontSize: 16,
    marginBottom: SIZES.xs / 2,
  },
  alertTime: {
    ...FONTS.small,
    color: COLORS.textSecondary,
  },
  estadoBadge: {
    paddingHorizontal: SIZES.sm,
    paddingVertical: SIZES.xs / 2,
    borderRadius: SIZES.radiusSmall,
  },
  estadoText: {
    ...FONTS.small,
    fontWeight: '600',
  },
  alertMessage: {
    ...FONTS.body,
    color: COLORS.text,
    marginBottom: SIZES.md,
  },
  alertDetails: {
    gap: SIZES.xs,
    marginBottom: SIZES.md,
  },
  alertDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SIZES.xs,
  },
  alertDetailText: {
    ...FONTS.caption,
    color: COLORS.textSecondary,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: SIZES.sm,
    marginTop: SIZES.sm,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SIZES.xs,
    padding: SIZES.sm,
    borderRadius: SIZES.radiusMedium,
  },
  actionButtonText: {
    ...FONTS.caption,
    fontWeight: '700',
  },
  resolutionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SIZES.xs,
    marginTop: SIZES.sm,
    paddingTop: SIZES.sm,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  resolutionText: {
    ...FONTS.small,
    color: COLORS.textSecondary,
    fontStyle: 'italic',
  },
});
export default styles;
