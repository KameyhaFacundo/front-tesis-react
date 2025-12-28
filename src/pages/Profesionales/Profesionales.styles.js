import { StyleSheet } from 'react-native';
import { COLORS, SIZES, FONTS } from '../../constants/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFE',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    margin: SIZES.lg,
    paddingHorizontal: SIZES.md,
    paddingVertical: SIZES.sm,
    borderRadius: SIZES.radiusMedium,
    gap: SIZES.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    ...FONTS.body,
    color: COLORS.text,
  },
  filtersContainer: {
    maxHeight: 50,
    marginBottom: SIZES.md,
  },
  filtersContent: {
    paddingHorizontal: SIZES.lg,
    gap: SIZES.sm,
  },
  filterChip: {
    paddingHorizontal: SIZES.lg,
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
    ...FONTS.caption,
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
    paddingBottom: 80,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SIZES.xl * 2,
  },
  emptyText: {
    ...FONTS.body,
    color: COLORS.textSecondary,
    marginTop: SIZES.md,
  },
  card: {
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
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.md,
  },
  cardInfo: {
    flex: 1,
    marginLeft: SIZES.md,
  },
  cardName: {
    ...FONTS.bodyBold,
    fontSize: 16,
    marginBottom: SIZES.xs / 2,
  },
  especialidadBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SIZES.xs / 2,
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: SIZES.sm,
    paddingVertical: SIZES.xs / 2,
    borderRadius: SIZES.radiusSmall,
    alignSelf: 'flex-start',
    marginBottom: SIZES.xs / 2,
  },
  especialidadText: {
    ...FONTS.small,
    color: COLORS.professional,
    fontWeight: '600',
  },
  cardMatricula: {
    ...FONTS.small,
    color: COLORS.textSecondary,
  },
  cardActions: {
    flexDirection: 'row',
    gap: SIZES.xs,
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: SIZES.radiusSmall,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardDetails: {
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
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: SIZES.sm,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
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
  fab: {
    position: 'absolute',
    right: SIZES.lg,
    bottom: SIZES.lg,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: SIZES.radiusLarge,
    borderTopRightRadius: SIZES.radiusLarge,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SIZES.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  modalTitle: {
    ...FONTS.h4,
    fontWeight: '700',
  },
  modalForm: {
    padding: SIZES.lg,
  },
  formRow: {
    flexDirection: 'row',
    gap: SIZES.md,
  },
  formField: {
    flex: 1,
  },
  label: {
    ...FONTS.caption,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SIZES.xs,
    marginTop: SIZES.md,
  },
  input: {
    ...FONTS.body,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: SIZES.radiusMedium,
    padding: SIZES.md,
    backgroundColor: COLORS.white,
  },
  estadoSelector: {
    flexDirection: 'row',
    gap: SIZES.md,
    marginTop: SIZES.xs,
  },
  estadoOption: {
    flex: 1,
    paddingVertical: SIZES.md,
    borderRadius: SIZES.radiusMedium,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
  },
  estadoOptionActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  estadoOptionText: {
    ...FONTS.body,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  estadoOptionTextActive: {
    color: COLORS.white,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: SIZES.md,
    marginTop: SIZES.xl,
    marginBottom: SIZES.lg,
  },
  modalButton: {
    flex: 1,
  },
});
export default styles;
