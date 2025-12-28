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

  // Custom Header
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
  },

  // Header
  header: {
    marginBottom: SIZES.xl,
    paddingTop: SIZES.sm,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flex: 1,
  },
  headerRight: {
    marginLeft: SIZES.md,
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

  // ScrollView
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: SIZES.lg,
    paddingBottom: SIZES.xl,
  },

  // Stats Cards
  statsContainer: {
    flexDirection: 'row',
    gap: SIZES.md,
    marginBottom: SIZES.xl,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radiusLarge,
    padding: SIZES.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: 'rgba(74, 144, 226, 0.08)',
  },
  statIconContainer: {
    width: 56,
    height: 56,
    borderRadius: SIZES.radiusLarge,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SIZES.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  statContent: {
    flex: 1,
  },
  statValue: {
    ...FONTS.h2,
    fontWeight: '800',
    marginBottom: SIZES.xs,
    letterSpacing: -0.5,
  },
  statLabel: {
    ...FONTS.caption,
    color: COLORS.textSecondary,
    marginBottom: SIZES.xs,
    fontWeight: '600',
  },
  statTrend: {
    ...FONTS.small,
    fontWeight: '700',
    letterSpacing: 0.2,
  },

  // Sections
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
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SIZES.xs,
    paddingVertical: SIZES.xs,
    paddingHorizontal: SIZES.sm,
    backgroundColor: COLORS.primaryLight,
    borderRadius: SIZES.radiusLarge,
  },
  seeAllText: {
    ...FONTS.caption,
    color: COLORS.primary,
    fontWeight: '600',
  },

  // Quick Actions
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SIZES.md,
  },
  actionCard: {
    width: '47%',
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radiusLarge,
    padding: SIZES.lg,
    paddingVertical: SIZES.xl,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
    borderWidth: 1,
    borderColor: 'rgba(74, 144, 226, 0.08)',
  },
  actionIconWrapper: {
    width: 72,
    height: 72,
    borderRadius: SIZES.radiusLarge,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SIZES.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  actionTitle: {
    ...FONTS.body,
    fontWeight: '700',
    textAlign: 'center',
    color: COLORS.text,
    letterSpacing: 0.2,
  },

  // Activities
  activitiesList: {
    gap: SIZES.sm,
  },

  // Center Content (for placeholder screens)
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SIZES.xl,
  },
  title: {
    ...FONTS.h3,
    marginTop: SIZES.lg,
    marginBottom: SIZES.sm,
  },
  description: {
    ...FONTS.body,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
});

export default styles;
