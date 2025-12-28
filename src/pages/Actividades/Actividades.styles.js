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
    paddingTop: SIZES.md,
    paddingBottom: SIZES.md,
  },
  headerTitle: {
    ...FONTS.h3,
    fontWeight: '700',
    color: COLORS.text,
  },
  addButton: {
    width: 50,
    height: 50,
    borderRadius: SIZES.radiusMedium,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  filtersContainer: {
    marginTop: SIZES.xs,
    maxHeight: 50,
  },
  filtersContent: {
    paddingHorizontal: SIZES.lg,
    gap: SIZES.sm,
  },
  filterChip: {
    paddingHorizontal: SIZES.lg,
    paddingVertical: SIZES.sm,
    borderRadius: SIZES.radiusLarge,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  filterChipActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  filterChipText: {
    ...FONTS.caption,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  filterChipTextActive: {
    color: COLORS.white,
  },
  resultsCounter: {
    paddingHorizontal: SIZES.lg,
    paddingVertical: SIZES.md,
  },
  resultsText: {
    ...FONTS.caption,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: SIZES.lg,
  },
  activityCardContainer: {
    marginBottom: SIZES.md,
  },
  extraInfo: {
    backgroundColor: COLORS.white,
    borderBottomLeftRadius: SIZES.radiusLarge,
    borderBottomRightRadius: SIZES.radiusLarge,
    paddingHorizontal: SIZES.lg,
    paddingBottom: SIZES.md,
    gap: SIZES.xs,
    marginTop: -SIZES.sm,
  },
  extraInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SIZES.sm,
  },
  extraInfoText: {
    ...FONTS.small,
    color: COLORS.textSecondary,
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
