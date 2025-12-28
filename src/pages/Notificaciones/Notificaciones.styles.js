import { StyleSheet } from 'react-native';
import { COLORS, SIZES, FONTS } from '../../constants/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFE',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8FAFE',
  },
  loadingText: {
    ...FONTS.body,
    color: COLORS.textSecondary,
    marginTop: SIZES.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SIZES.lg,
    paddingVertical: SIZES.md,
  },
  headerTitle: {
    ...FONTS.h3,
    fontWeight: '700',
    color: COLORS.text,
  },
  headerSubtitle: {
    ...FONTS.caption,
    color: COLORS.primary,
    fontWeight: '600',
    marginTop: SIZES.xs / 2,
  },
  markAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SIZES.xs,
    paddingHorizontal: SIZES.md,
    paddingVertical: SIZES.sm,
    borderRadius: SIZES.radiusMedium,
    backgroundColor: COLORS.primaryLight,
  },
  markAllText: {
    ...FONTS.caption,
    color: COLORS.primary,
    fontWeight: '600',
  },
  filtersContainer: {
    flexDirection: 'row',
    gap: SIZES.sm,
    paddingHorizontal: SIZES.lg,
    paddingBottom: SIZES.md,
  },
  filterChip: {
    paddingHorizontal: SIZES.md,
    paddingVertical: SIZES.sm,
    borderRadius: SIZES.radiusMedium,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  filterChipActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  filterChipText: {
    ...FONTS.small,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  filterChipTextActive: {
    color: COLORS.white,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: SIZES.lg,
  },
  notifCard: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radiusLarge,
    padding: SIZES.lg,
    marginBottom: SIZES.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  notifCardUnread: {
    backgroundColor: COLORS.primaryLight,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  notifHeader: {
    flexDirection: 'row',
    gap: SIZES.md,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: SIZES.radiusMedium,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notifContent: {
    flex: 1,
  },
  notifTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SIZES.xs,
    marginBottom: SIZES.xs,
  },
  notifTitle: {
    ...FONTS.bodyBold,
    color: COLORS.text,
  },
  notifTitleUnread: {
    fontWeight: '800',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
  },
  notifMessage: {
    ...FONTS.caption,
    color: COLORS.textSecondary,
    marginBottom: SIZES.sm,
  },
  notifFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SIZES.md,
  },
  notifTime: {
    ...FONTS.small,
    color: COLORS.textLight,
  },
  priorityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SIZES.xs / 2,
    paddingHorizontal: SIZES.sm,
    paddingVertical: SIZES.xs / 2,
    borderRadius: SIZES.radiusSmall,
    backgroundColor: COLORS.white,
  },
  priorityDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  priorityText: {
    ...FONTS.small,
    fontWeight: '600',
  },
  deleteButton: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: SIZES.xxl,
  },
  emptyStateText: {
    ...FONTS.h4,
    color: COLORS.textSecondary,
    marginTop: SIZES.lg,
  },
  emptyStateSubtext: {
    ...FONTS.caption,
    color: COLORS.textLight,
    marginTop: SIZES.xs,
    textAlign: 'center',
  },
});
export default styles;
