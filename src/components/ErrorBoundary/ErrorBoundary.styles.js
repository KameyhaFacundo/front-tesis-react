import { StyleSheet } from 'react-native';
import { COLORS, FONTS, SIZES } from '../../constants/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SIZES.xl,
    backgroundColor: '#F8FAFE',
  },
  title: {
    ...FONTS.h4,
    color: COLORS.text,
    fontWeight: '700',
    marginTop: SIZES.lg,
    marginBottom: SIZES.sm,
    textAlign: 'center',
  },
  subtitle: {
    ...FONTS.body,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: SIZES.xl,
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingHorizontal: SIZES.xl,
    paddingVertical: SIZES.sm + 2,
  },
  buttonText: {
    ...FONTS.bodyBold,
    color: COLORS.white,
  },
});

export default styles;
