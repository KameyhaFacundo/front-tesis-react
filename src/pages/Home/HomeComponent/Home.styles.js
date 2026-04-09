import { StyleSheet } from 'react-native';
import { COLORS, SIZES, FONTS } from '../../../constants/theme';

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

  customHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SIZES.lg,
    paddingTop: SIZES.sm,
    paddingBottom: SIZES.md,
  },
  menuButton: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: '#E6EEFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: SIZES.md,
  },
  headerTitle: {
    ...FONTS.bodyBold,
    color: '#16213D',
    fontSize: 17,
  },
  headerSubtitle: {
    ...FONTS.small,
    color: '#5F6C86',
    textTransform: 'capitalize',
  },
  notificationButton: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: '#FFF7E7',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: 2,
    right: 2,
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    paddingHorizontal: 4,
    backgroundColor: COLORS.warning,
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

  heroCard: {
    borderRadius: 24,
    padding: SIZES.lg,
    marginBottom: SIZES.lg,
    shadowColor: '#0D3B8E',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 6,
  },
  heroRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.md,
  },
  heroLeft: {
    flex: 1,
    marginRight: SIZES.md,
  },
  heroGreeting: {
    ...FONTS.small,
    color: '#D7E7FF',
    marginBottom: 2,
  },
  heroName: {
    ...FONTS.h3,
    color: COLORS.white,
    marginBottom: SIZES.xs,
  },
  heroDate: {
    ...FONTS.caption,
    color: '#DDEBFF',
    textTransform: 'capitalize',
  },
  heroPrimaryAction: {
    backgroundColor: '#E2EEFF',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  heroPrimaryActionText: {
    ...FONTS.caption,
    color: '#0D3B8E',
    fontWeight: '700',
  },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SIZES.md,
    marginTop: SIZES.xs,
  },
  sectionTitle: {
    ...FONTS.h5,
    color: '#1A2752',
    fontWeight: '700',
  },
  sectionAction: {
    ...FONTS.caption,
    color: '#1D62D2',
    fontWeight: '700',
  },

  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: SIZES.lg,
  },
  statCard: {
    width: '48%',
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: SIZES.md,
    marginBottom: SIZES.md,
    borderWidth: 1,
    borderColor: '#EDF2FB',
    shadowColor: '#112147',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 2,
  },
  statIcon: {
    width: 38,
    height: 38,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SIZES.sm,
  },
  statValue: {
    ...FONTS.h3,
    fontSize: 22,
    color: '#1A2752',
    marginBottom: 2,
  },
  statLabel: {
    ...FONTS.caption,
    color: '#606E8B',
    marginBottom: 2,
  },
  statHelper: {
    ...FONTS.small,
    fontWeight: '600',
  },

  activitiesList: {
    gap: SIZES.sm,
    marginBottom: SIZES.lg,
  },

  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: SIZES.xs,
  },
  quickActionCard: {
    width: '48%',
    backgroundColor: COLORS.white,
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 12,
    marginBottom: SIZES.md,
    borderWidth: 1,
    borderColor: '#EDF2FB',
    shadowColor: '#112147',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  quickActionIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  quickActionLabel: {
    ...FONTS.caption,
    color: '#23345E',
    fontWeight: '700',
  },

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
    color: '#1A2752',
  },
  description: {
    ...FONTS.body,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
});

export default styles;
