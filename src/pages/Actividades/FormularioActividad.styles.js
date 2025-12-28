import { StyleSheet } from 'react-native';
import { COLORS, SIZES, FONTS } from '../../constants/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFE',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SIZES.lg,
    paddingVertical: SIZES.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    backgroundColor: COLORS.white,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    ...FONTS.h4,
    fontWeight: '700',
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SIZES.xs,
    paddingVertical: SIZES.md,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: COLORS.primary,
  },
  tabText: {
    ...FONTS.caption,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  tabTextActive: {
    color: COLORS.primary,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: SIZES.lg,
  },
  section: {
    marginTop: SIZES.lg,
  },
  sectionTitle: {
    ...FONTS.h4,
    fontWeight: '700',
    marginBottom: SIZES.md,
  },
  inputLabel: {
    ...FONTS.caption,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SIZES.sm,
    marginTop: SIZES.sm,
  },
  userPicker: {
    marginBottom: SIZES.md,
  },
  userOption: {
    paddingHorizontal: SIZES.lg,
    paddingVertical: SIZES.sm,
    borderRadius: SIZES.radiusMedium,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginRight: SIZES.sm,
  },
  userOptionActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  userOptionText: {
    ...FONTS.caption,
    fontWeight: '600',
    color: COLORS.text,
  },
  userOptionTextActive: {
    color: COLORS.white,
  },
  optionsPicker: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SIZES.sm,
    marginBottom: SIZES.md,
  },
  optionChip: {
    paddingHorizontal: SIZES.md,
    paddingVertical: SIZES.sm,
    borderRadius: SIZES.radiusMedium,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  optionChipActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  optionChipText: {
    ...FONTS.caption,
    fontWeight: '600',
    color: COLORS.text,
  },
  optionChipTextActive: {
    color: COLORS.white,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SIZES.sm,
    marginBottom: SIZES.md,
  },
  checkboxLabel: {
    ...FONTS.body,
    color: COLORS.text,
  },
  actions: {
    flexDirection: 'row',
    gap: SIZES.md,
    marginTop: SIZES.xl,
  },
});

export default styles;
