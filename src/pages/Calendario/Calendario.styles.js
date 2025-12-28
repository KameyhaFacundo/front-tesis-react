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
  monthButton: {
    width: 40,
    height: 40,
    borderRadius: SIZES.radiusMedium,
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  monthInfo: {
    alignItems: 'center',
  },
  monthText: {
    ...FONTS.h3,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: SIZES.xs,
  },
  todayButton: {
    paddingHorizontal: SIZES.md,
    paddingVertical: SIZES.xs / 2,
    borderRadius: SIZES.radiusSmall,
    backgroundColor: COLORS.primary,
  },
  todayButtonText: {
    ...FONTS.small,
    color: COLORS.white,
    fontWeight: '600',
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: SIZES.lg,
    paddingHorizontal: SIZES.lg,
    paddingBottom: SIZES.md,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SIZES.xs,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendText: {
    ...FONTS.small,
    color: COLORS.textSecondary,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: SIZES.lg,
  },
  weekDaysContainer: {
    flexDirection: 'row',
    marginBottom: SIZES.sm,
  },
  weekDayCell: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: SIZES.sm,
  },
  weekDayText: {
    ...FONTS.caption,
    fontWeight: '700',
    color: COLORS.textSecondary,
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radiusLarge,
    padding: SIZES.xs,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  dayCell: {
    width: `${100 / 7}%`,
    aspectRatio: 1,
    padding: SIZES.xs,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SIZES.radiusSmall,
    position: 'relative',
  },
  dayCellToday: {
    backgroundColor: COLORS.primaryLight,
  },
  dayCellEmpty: {
    opacity: 0,
  },
  dayNumber: {
    ...FONTS.body,
    fontWeight: '600',
    color: COLORS.text,
  },
  dayNumberToday: {
    color: COLORS.primary,
    fontWeight: '800',
  },
  activityCount: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: COLORS.info,
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  activityCountText: {
    ...FONTS.small,
    fontSize: 10,
    color: COLORS.white,
    fontWeight: '700',
  },
  statusIndicator: {
    position: 'absolute',
    bottom: 4,
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  monthSummary: {
    marginTop: SIZES.xl,
  },
  summaryTitle: {
    ...FONTS.h4,
    fontWeight: '700',
    marginBottom: SIZES.md,
  },
  summaryCards: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SIZES.md,
  },
  summaryCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radiusLarge,
    padding: SIZES.lg,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  summaryValue: {
    ...FONTS.h2,
    fontWeight: '800',
    marginVertical: SIZES.xs,
  },
  summaryLabel: {
    ...FONTS.caption,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: SIZES.radiusLarge * 1.5,
    borderTopRightRadius: SIZES.radiusLarge * 1.5,
    maxHeight: '70%',
    paddingTop: SIZES.lg,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SIZES.lg,
    paddingBottom: SIZES.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  modalTitle: {
    ...FONTS.h3,
    fontWeight: '700',
  },
  modalScroll: {
    paddingHorizontal: SIZES.lg,
    paddingTop: SIZES.md,
  },
  modalActivity: {
    marginBottom: SIZES.md,
  },
});
export default styles;
