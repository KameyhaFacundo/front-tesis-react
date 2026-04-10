import { StyleSheet, Platform } from 'react-native';
import { COLORS, SIZES, FONTS } from '../../constants/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFE',
  },
  map: {
    flex: 1,
  },

  // ── Loading / Error ───────────────────────────────────────────────────────
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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SIZES.xl,
    backgroundColor: '#F8FAFE',
  },
  errorText: {
    ...FONTS.body,
    color: COLORS.error,
    marginTop: SIZES.lg,
    marginBottom: SIZES.xl,
    textAlign: 'center',
  },
  retryButton: {
    minWidth: 200,
  },
  noLocationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noLocationText: {
    ...FONTS.body,
    color: COLORS.textLight,
    marginTop: SIZES.md,
  },

  // ── Marcador propio ───────────────────────────────────────────────────────
  myMarkerWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  pulseRing: {
    position: 'absolute',
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: `${COLORS.primary}25`,
  },
  markerCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: COLORS.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },

  // ── Marcadores de usuarios ────────────────────────────────────────────────
  userMarkerWrapper: {
    alignItems: 'center',
  },
  userMarkerCircle: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: COLORS.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  userMarkerInitials: {
    color: COLORS.white,
    fontWeight: '700',
  },
  markerPointer: {
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    marginTop: -1,
  },

  // ── Tracking chip (top) ───────────────────────────────────────────────────
  trackingChip: {
    position: 'absolute',
    top: 16,
    alignSelf: 'center',
    backgroundColor: COLORS.success,
    borderRadius: 999,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 8,
    shadowColor: COLORS.success,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
    elevation: 6,
  },
  trackingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.white,
  },
  trackingChipText: {
    color: COLORS.white,
    fontWeight: '600',
    fontSize: 13,
  },

  // ── FABs ──────────────────────────────────────────────────────────────────
  fabColumn: {
    position: 'absolute',
    right: 16,
    alignItems: 'center',
    gap: 10,
  },
  fabSmall: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
  fabLarge: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },

  // ── Bottom Sheet ──────────────────────────────────────────────────────────
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 12,
    overflow: 'hidden',
  },
  sheetHandle: {
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 6,
  },
  handleBar: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#DDE3EE',
  },
  sheetContent: {
    paddingHorizontal: 20,
    paddingTop: 4,
  },

  // Usuario seleccionado
  sheetUserRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  sheetAvatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: COLORS.user,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sheetAvatarText: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: 20,
  },
  sheetUserInfo: {
    flex: 1,
  },
  sheetUserName: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.text,
  },
  sheetDistanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  sheetDistanceText: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  sheetCloseBtn: {
    padding: 4,
  },
  sheetCoordsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 16,
  },
  sheetCoordCard: {
    flex: 1,
    backgroundColor: '#F3F6FB',
    borderRadius: 12,
    padding: 12,
  },
  sheetCoordLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: COLORS.textSecondary,
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  sheetCoordValue: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.text,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  sheetCenterBtn: {
    marginTop: 12,
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 13,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  sheetCenterBtnText: {
    color: COLORS.white,
    fontWeight: '600',
    fontSize: 15,
  },

  // Panel colapsado
  sheetCollapsedRow: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  sheetCollapsedIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sheetCollapsedTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
  },
  sheetCollapsedCoords: {
    fontSize: 11,
    color: COLORS.textSecondary,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    marginTop: 1,
  },
  sheetCollapsedCount: {
    marginLeft: 'auto',
    fontSize: 12,
    color: COLORS.textSecondary,
  },
});

export default styles;
