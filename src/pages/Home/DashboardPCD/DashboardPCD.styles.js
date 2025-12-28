import { StyleSheet } from 'react-native';
import { COLORS, SIZES, FONTS } from '../../../constants/theme';

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
  customHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SIZES.lg,
    paddingTop: SIZES.lg,
    paddingBottom: SIZES.md,
    backgroundColor: 'transparent',
  },
  menuButton: {
    width: 40,
    height: 40,
    borderRadius: SIZES.radiusMedium,
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    ...FONTS.h4,
    fontWeight: '700',
    color: COLORS.text,
  },
  notificationButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: COLORS.error,
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: '700',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: SIZES.lg,
    paddingBottom: SIZES.xl,
  },
  welcomeSection: {
    marginBottom: SIZES.xl,
  },
  welcomeContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    ...FONTS.caption,
    color: COLORS.textSecondary,
    marginBottom: SIZES.xs / 2,
  },
  username: {
    ...FONTS.h2,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: SIZES.xs,
  },
  dateText: {
    ...FONTS.small,
    color: COLORS.textLight,
    textTransform: 'capitalize',
  },
  summaryCard: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radiusLarge,
    padding: SIZES.lg,
    marginBottom: SIZES.xl,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: 'rgba(74, 144, 226, 0.08)',
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SIZES.sm,
    marginBottom: SIZES.lg,
  },
  summaryTitle: {
    ...FONTS.h4,
    fontWeight: '700',
    color: COLORS.text,
  },
  summaryStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: SIZES.md,
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryValue: {
    ...FONTS.h1,
    fontWeight: '800',
    marginBottom: SIZES.xs,
  },
  summaryLabel: {
    ...FONTS.caption,
    color: COLORS.textSecondary,
  },
  summaryDivider: {
    width: 1,
    backgroundColor: COLORS.border,
  },
  nextActivity: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SIZES.xs,
    backgroundColor: COLORS.primaryLight,
    padding: SIZES.md,
    borderRadius: SIZES.radiusMedium,
  },
  nextActivityText: {
    ...FONTS.caption,
    color: COLORS.info,
    fontWeight: '600',
  },
  section: {
    marginBottom: SIZES.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.md,
  },
  sectionHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SIZES.sm,
  },
  sectionTitle: {
    ...FONTS.h4,
    fontWeight: '700',
  },
  activitiesList: {
    gap: SIZES.sm,
  },
  quickActions: {
    flexDirection: 'row',
    gap: SIZES.md,
  },
  quickActionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SIZES.sm,
    padding: SIZES.lg,
    borderRadius: SIZES.radiusLarge,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  quickActionText: {
    ...FONTS.bodyBold,
    fontWeight: '700',
  },
});

export default styles;
