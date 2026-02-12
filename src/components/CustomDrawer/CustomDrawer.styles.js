import { StyleSheet, Platform, StatusBar } from 'react-native';
import { COLORS, SIZES, FONTS } from '../../constants/theme';

export const DRAWER_WIDTH = 300;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(10, 20, 38, 0.42)',
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
    shadowColor: '#0B1630',
    shadowOffset: { width: 4, height: 0 },
    shadowOpacity: 0.18,
    shadowRadius: 14,
    elevation: 10,
  },
  drawerTopBg: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 220,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 0) + SIZES.sm : 50,
    paddingBottom: SIZES.lg,
  },
  drawerBrand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SIZES.sm,
    paddingHorizontal: SIZES.lg,
    marginBottom: SIZES.lg,
  },
  brandLogoContainer: {
    width: 42,
    height: 42,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  brandName: {
    ...FONTS.bodyBold,
    color: '#1146A6',
    fontWeight: '800',
  },
  brandTagline: {
    ...FONTS.small,
    color: '#667089',
  },
  userProfileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: SIZES.md,
    marginBottom: SIZES.lg,
    padding: SIZES.md,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5EDFB',
    shadowColor: '#112147',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 2,
  },
  userProfileInfo: {
    marginLeft: SIZES.md,
    flex: 1,
  },
  userProfileName: {
    ...FONTS.bodyBold,
    color: '#1B284A',
    marginBottom: 4,
  },
  roleBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EAF1FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    alignSelf: 'flex-start',
    gap: 4,
  },
  roleText: {
    ...FONTS.small,
    color: '#1D4ED8',
    fontWeight: '700',
  },
  navLabel: {
    ...FONTS.small,
    fontWeight: '700',
    color: '#8592AD',
    paddingHorizontal: SIZES.lg,
    paddingTop: SIZES.sm,
    paddingBottom: SIZES.xs,
    letterSpacing: 0.5,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: SIZES.lg,
    marginHorizontal: SIZES.md,
    marginVertical: 2,
    borderRadius: 12,
    gap: SIZES.sm,
  },
  menuItemActive: {
    backgroundColor: '#EAF1FF',
  },
  menuIconWrap: {
    width: 30,
    height: 30,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3F6FC',
  },
  menuIconWrapActive: {
    backgroundColor: '#DDE8FF',
  },
  menuItemText: {
    ...FONTS.body,
    color: '#4B5877',
    fontWeight: '600',
    flex: 1,
  },
  menuItemTextActive: {
    color: '#1D4ED8',
    fontWeight: '700',
  },
  activeDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#1D4ED8',
  },
  logoutItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: SIZES.lg,
    marginHorizontal: SIZES.md,
    marginTop: 4,
    borderRadius: 12,
    gap: SIZES.sm,
    backgroundColor: '#FFF1F3',
  },
  logoutIconWrap: {
    width: 30,
    height: 30,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFE2E8',
  },
  logoutText: {
    ...FONTS.body,
    color: COLORS.error,
    fontWeight: '700',
  },
  drawerFooter: {
    padding: SIZES.md,
    borderTopWidth: 1,
    borderTopColor: '#E8EEF8',
    alignItems: 'center',
  },
  footerVersion: {
    ...FONTS.small,
    color: '#8A96AF',
  },
});

export default styles;
