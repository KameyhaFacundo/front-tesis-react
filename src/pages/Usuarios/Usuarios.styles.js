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
    paddingHorizontal: SIZES.lg,
    paddingTop: SIZES.md,
    gap: SIZES.md,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radiusMedium,
    paddingHorizontal: SIZES.md,
    gap: SIZES.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    ...FONTS.body,
    paddingVertical: SIZES.md,
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
    marginTop: SIZES.md,
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
  userCard: {
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
  userCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.md,
  },
  userCardInfo: {
    flex: 1,
    marginLeft: SIZES.md,
  },
  userName: {
    ...FONTS.bodyBold,
    fontSize: 16,
    marginBottom: SIZES.xs,
  },
  roleBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SIZES.xs / 2,
    paddingHorizontal: SIZES.sm,
    paddingVertical: SIZES.xs / 2,
    borderRadius: SIZES.radiusSmall,
    alignSelf: 'flex-start',
  },
  roleText: {
    ...FONTS.small,
    fontWeight: '600',
  },
  userCardDetails: {
    gap: SIZES.xs,
    marginBottom: SIZES.md,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SIZES.sm,
  },
  detailText: {
    ...FONTS.caption,
    color: COLORS.textSecondary,
    flex: 1,
  },
  userCardActions: {
    flexDirection: 'row',
    gap: SIZES.md,
    paddingTop: SIZES.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SIZES.xs,
    paddingVertical: SIZES.sm,
    borderRadius: SIZES.radiusMedium,
  },
  actionButtonText: {
    ...FONTS.caption,
    fontWeight: '700',
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
    maxHeight: '90%',
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
  },
  formSection: {
    marginTop: SIZES.lg,
  },
  sectionTitle: {
    ...FONTS.h4,
    fontWeight: '700',
    marginBottom: SIZES.md,
    color: COLORS.text,
  },
  inputLabel: {
    ...FONTS.caption,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SIZES.sm,
  },
  rolePicker: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SIZES.sm,
  },
  roleOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SIZES.xs,
    paddingHorizontal: SIZES.md,
    paddingVertical: SIZES.sm,
    borderRadius: SIZES.radiusMedium,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
  },
  roleOptionActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  roleOptionText: {
    ...FONTS.caption,
    fontWeight: '600',
    color: COLORS.text,
  },
  roleOptionTextActive: {
    color: COLORS.white,
  },
  modalActions: {
    flexDirection: 'row',
    gap: SIZES.md,
    marginTop: SIZES.xl,
  },
});
export default styles;
