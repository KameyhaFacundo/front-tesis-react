import { StyleSheet } from 'react-native';
import { COLORS, SIZES, FONTS } from '../../constants/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F8FF',
  },
  backgroundGradient: {
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
    backgroundColor: 'rgba(91, 155, 255, 0.22)',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: SIZES.xl,
    paddingTop: SIZES.xxl,
    paddingBottom: SIZES.xl,
    justifyContent: 'center',
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: SIZES.xl,
  },
  logoWrapper: {
    marginBottom: SIZES.md,
  },
  logoInner: {
    width: 86,
    height: 86,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#0D3B8E',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 6,
  },
  appTitle: {
    ...FONTS.h2,
    fontWeight: '800',
    color: '#1146A6',
    marginBottom: 2,
    letterSpacing: 0.3,
  },
  appTagline: {
    ...FONTS.caption,
    color: '#5F6C86',
    textAlign: 'center',
    marginBottom: SIZES.md,
  },
  featureRow: {
    flexDirection: 'row',
    gap: SIZES.sm,
  },
  featureBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FFFFFF',
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#E5EDFB',
  },
  featureText: {
    ...FONTS.small,
    color: '#334164',
    fontWeight: '600',
  },
  loginCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: SIZES.lg,
    borderWidth: 1,
    borderColor: '#E5EDFB',
    shadowColor: '#112147',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  cardHeader: {
    marginBottom: SIZES.md,
  },
  cardTitle: {
    ...FONTS.h4,
    color: '#1B284A',
    fontWeight: '700',
    marginBottom: 2,
  },
  instructionText: {
    ...FONTS.caption,
    color: '#6C7891',
  },
  formSection: {
    gap: SIZES.xs,
  },
  loginButton: {
    marginTop: SIZES.md,
  },
  quickLabel: {
    ...FONTS.small,
    color: '#6C7891',
    marginTop: SIZES.sm,
    marginBottom: SIZES.xs,
  },
  quickAccountsRow: {
    flexDirection: 'row',
    gap: SIZES.xs,
  },
  quickAccountChip: {
    flex: 1,
    backgroundColor: '#EFF4FF',
    borderRadius: 10,
    paddingVertical: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D8E6FF',
  },
  quickAccountText: {
    ...FONTS.small,
    color: COLORS.primary,
    fontWeight: '700',
  },
  forgotButton: {
    marginTop: SIZES.xs,
  },
  footerInfo: {
    marginTop: SIZES.lg,
    alignItems: 'center',
  },
  versionText: {
    ...FONTS.small,
    color: '#7D8AA5',
  },
});

export default styles;
