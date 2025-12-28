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
  professionalInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SIZES.xs,
  },
  specialty: {
    ...FONTS.body,
    color: COLORS.professional,
    fontWeight: '600',
  },
  separator: {
    color: COLORS.textLight,
    marginHorizontal: SIZES.xs / 2,
  },
  matricula: {
    ...FONTS.caption,
    color: COLORS.textSecondary,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: SIZES.md,
    marginBottom: SIZES.xl,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radiusLarge,
    padding: SIZES.md,
    alignItems: 'center',
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  statValue: {
    ...FONTS.h2,
    fontWeight: '800',
    marginTop: SIZES.xs,
    marginBottom: SIZES.xs / 2,
  },
  statLabel: {
    ...FONTS.small,
    color: COLORS.textSecondary,
    textAlign: 'center',
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
  seeAllText: {
    ...FONTS.caption,
    color: COLORS.primary,
    fontWeight: '600',
  },
  patientCard: {
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
  patientHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.md,
  },
  patientInfo: {
    flex: 1,
    marginLeft: SIZES.md,
  },
  patientName: {
    ...FONTS.bodyBold,
    fontSize: 16,
    marginBottom: SIZES.xs / 2,
  },
  patientDetail: {
    ...FONTS.caption,
    color: COLORS.textSecondary,
    marginBottom: SIZES.xs,
  },
  patientMetrics: {
    flexDirection: 'row',
    gap: SIZES.md,
  },
  metric: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SIZES.xs / 2,
  },
  metricText: {
    ...FONTS.small,
    color: COLORS.textSecondary,
  },
  patientActions: {
    flexDirection: 'row',
    gap: SIZES.md,
    paddingTop: SIZES.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SIZES.xs,
    padding: SIZES.sm,
    borderRadius: SIZES.radiusMedium,
  },
  actionBtnText: {
    ...FONTS.caption,
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
    backgroundColor: COLORS.primary,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  quickActionText: {
    ...FONTS.bodyBold,
    color: COLORS.white,
    fontWeight: '700',
  },
});

export default styles;
