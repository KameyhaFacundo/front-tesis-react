import { StyleSheet, Dimensions } from 'react-native';
import { COLORS, SIZES, FONTS } from '../../constants/theme';

const { width } = Dimensions.get('window');
export const DRAWER_WIDTH = 280;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  overlayTouchable: {
    flex: 1,
  },
  drawer: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: DRAWER_WIDTH,
    backgroundColor: COLORS.white,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: SIZES.xl,
  },

  // Brand Section
  drawerBrand: {
    alignItems: 'center',
    paddingVertical: SIZES.lg,
    paddingHorizontal: SIZES.lg,
    marginBottom: SIZES.md,
  },
  brandLogoContainer: {
    width: 56,
    height: 56,
    borderRadius: SIZES.radiusMedium,
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SIZES.sm,
  },
  brandName: {
    ...FONTS.h4,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: SIZES.xs / 2,
  },
  brandTagline: {
    ...FONTS.small,
    color: COLORS.textLight,
  },

  userProfileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFE',
    marginHorizontal: SIZES.md,
    marginBottom: SIZES.lg,
    padding: SIZES.md,
    borderRadius: SIZES.radiusMedium,
    borderWidth: 1,
    borderColor: 'rgba(74, 144, 226, 0.1)',
  },
  userProfileInfo: {
    marginLeft: SIZES.md,
    flex: 1,
  },
  userProfileName: {
    ...FONTS.bodyBold,
    color: COLORS.text,
    marginBottom: SIZES.xs,
  },
  roleBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    paddingHorizontal: SIZES.sm,
    paddingVertical: SIZES.xs / 2,
    borderRadius: SIZES.radiusSmall,
    alignSelf: 'flex-start',
    gap: SIZES.xs / 2,
  },
  roleText: {
    ...FONTS.small,
    color: COLORS.info,
    fontWeight: '600',
  },

  navLabel: {
    ...FONTS.small,
    fontWeight: '700',
    color: COLORS.textLight,
    paddingHorizontal: SIZES.lg,
    paddingTop: SIZES.md,
    paddingBottom: SIZES.sm,
    letterSpacing: 0.5,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SIZES.md,
    paddingHorizontal: SIZES.lg,
    marginHorizontal: SIZES.md,
    marginVertical: SIZES.xs / 2,
    borderRadius: SIZES.radiusMedium,
    gap: SIZES.md,
  },
  menuItemActive: {
    backgroundColor: COLORS.primaryLight,
  },
  menuItemText: {
    ...FONTS.body,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  menuItemTextActive: {
    color: COLORS.primary,
  },

  logoutItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SIZES.md,
    paddingHorizontal: SIZES.lg,
    marginHorizontal: SIZES.md,
    marginVertical: SIZES.xs / 2,
    borderRadius: SIZES.radiusMedium,
    gap: SIZES.md,
  },
  logoutText: {
    ...FONTS.body,
    color: COLORS.error,
    fontWeight: '600',
  },

  drawerFooter: {
    padding: SIZES.lg,
    borderTopWidth: 1,
    borderTopColor: COLORS.divider,
    alignItems: 'center',
  },
  footerVersion: {
    ...FONTS.small,
    color: COLORS.textLight,
  },
});

export default styles;
