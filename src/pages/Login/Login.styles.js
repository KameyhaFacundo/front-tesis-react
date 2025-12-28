import { StyleSheet } from 'react-native';
import { COLORS, SIZES, FONTS, SHADOWS } from '../../constants/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFE',
  },
  backgroundTop: {
    position: 'absolute',
    top: -100,
    left: -100,
    width: 400,
    height: 400,
    borderRadius: 200,
  },
  backgroundBottom: {
    position: 'absolute',
    bottom: -150,
    right: -100,
    width: 350,
    height: 350,
    borderRadius: 175,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: SIZES.xl,
    paddingTop: SIZES.xxl,
    justifyContent: 'center',
  },

  // Hero Section
  heroSection: {
    alignItems: 'center',
    marginBottom: SIZES.xl * 1.5,
  },
  logoWrapper: {
    position: 'relative',
    marginBottom: SIZES.lg,
  },
  logoOuter: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(74, 144, 226, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.medium,
  },
  logoInner: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.heavy,
  },
  logoPulse: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(74, 144, 226, 0.2)',
    top: 0,
    left: 0,
  },
  appTitle: {
    ...FONTS.h1,
    fontSize: 42,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: SIZES.xs,
    letterSpacing: -1,
  },
  appTagline: {
    ...FONTS.body,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: SIZES.lg,
    paddingHorizontal: SIZES.xl,
  },
  featureRow: {
    flexDirection: 'row',
    gap: SIZES.md,
    marginTop: SIZES.sm,
  },
  featureBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    paddingHorizontal: SIZES.md,
    paddingVertical: SIZES.xs,
    borderRadius: SIZES.radiusLarge,
    gap: SIZES.xs,
    ...SHADOWS.light,
  },
  featureText: {
    ...FONTS.caption,
    color: COLORS.text,
    fontWeight: '600',
  },

  // Login Card
  loginCard: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radiusLarge * 1.5,
    padding: SIZES.xl,
    ...SHADOWS.medium,
    borderWidth: 1,
    borderColor: 'rgba(74, 144, 226, 0.1)',
  },
  cardHeader: {
    marginBottom: SIZES.lg,
  },
  welcomeText: {
    ...FONTS.h3,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: SIZES.xs,
  },
  instructionText: {
    ...FONTS.caption,
    color: COLORS.textSecondary,
  },
  formSection: {
    gap: SIZES.xs,
  },
  loginButton: {
    marginTop: SIZES.md,
    ...SHADOWS.light,
  },
  forgotButton: {
    marginTop: SIZES.xs,
  },

  // Footer
  footerInfo: {
    marginTop: SIZES.xl,
    alignItems: 'center',
    gap: SIZES.md,
  },
  securityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SIZES.xs,
    backgroundColor: 'rgba(102, 187, 106, 0.1)',
    paddingHorizontal: SIZES.md,
    paddingVertical: SIZES.sm,
    borderRadius: SIZES.radiusLarge,
  },
  securityText: {
    ...FONTS.small,
    color: COLORS.textSecondary,
  },
  versionText: {
    ...FONTS.small,
    color: COLORS.textLight,
  },
});

export default styles;
