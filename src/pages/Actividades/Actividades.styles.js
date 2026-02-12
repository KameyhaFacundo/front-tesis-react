import { StyleSheet } from 'react-native';
import { COLORS, SIZES, FONTS } from '../../constants/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F8FF',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  glowTop: {
    position: 'absolute',
    top: -120,
    right: -80,
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: 'rgba(91, 155, 255, 0.20)',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F4F8FF',
  },
  loadingText: {
    ...FONTS.body,
    color: COLORS.textSecondary,
    marginTop: SIZES.md,
  },
  heroCard: {
    borderRadius: 22,
    padding: SIZES.lg,
    marginHorizontal: SIZES.lg,
    marginTop: SIZES.md,
    marginBottom: SIZES.md,
    shadowColor: '#0D3B8E',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 6,
  },
  heroHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heroTitle: {
    ...FONTS.h4,
    color: COLORS.white,
    fontWeight: '700',
  },
  heroSubtitle: {
    ...FONTS.caption,
    color: '#DDEBFF',
  },
  heroAddButton: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#E2EEFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SIZES.md,
  },
  heroStatItem: {
    alignItems: 'center',
  },
  heroStatValue: {
    ...FONTS.h4,
    color: COLORS.white,
    fontWeight: '800',
  },
  heroStatLabel: {
    ...FONTS.small,
    color: '#DDEBFF',
  },
  filtersBlock: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    marginHorizontal: SIZES.lg,
    paddingVertical: SIZES.sm,
    borderWidth: 1,
    borderColor: '#E4ECFA',
    shadowColor: '#112147',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  filterTitle: {
    ...FONTS.small,
    fontWeight: '700',
    color: '#6A7895',
    paddingHorizontal: SIZES.lg,
    paddingTop: SIZES.xs,
  },
  filtersContainer: {
    maxHeight: 50,
  },
  filtersContent: {
    paddingHorizontal: SIZES.md,
    gap: SIZES.sm,
  },
  filterChip: {
    paddingHorizontal: SIZES.md,
    paddingVertical: SIZES.sm,
    borderRadius: 999,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: '#DDE6F6',
  },
  filterChipActive: {
    backgroundColor: '#1D4ED8',
    borderColor: '#1D4ED8',
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
    color: '#6C7891',
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
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E4ECFA',
    backgroundColor: COLORS.white,
    shadowColor: '#112147',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 2,
  },
  extraInfo: {
    backgroundColor: '#F8FBFF',
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
    color: '#62708D',
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
