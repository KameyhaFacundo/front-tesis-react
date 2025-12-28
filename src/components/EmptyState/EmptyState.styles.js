import { StyleSheet } from 'react-native';
import { COLORS, SIZES, FONTS } from '../../constants/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SIZES.xl,
    paddingVertical: SIZES.xxl * 2,
  },
  iconCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SIZES.xl,
  },
  title: {
    ...FONTS.h3,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: SIZES.sm,
    textAlign: 'center',
  },
  description: {
    ...FONTS.body,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: SIZES.xl,
    lineHeight: 24,
    maxWidth: 300,
  },
  actionButton: {
    marginTop: SIZES.md,
  },
});

export default styles;
