import { StyleSheet } from 'react-native';
import { COLORS, SIZES, FONTS, SHADOWS } from '../../constants/theme';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 60,
    left: SIZES.md,
    right: SIZES.md,
    zIndex: 9999,
  },
  toast: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SIZES.md,
    paddingHorizontal: SIZES.lg,
    borderRadius: SIZES.radiusLarge,
    ...SHADOWS.medium,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: SIZES.radiusMedium,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SIZES.md,
  },
  message: {
    ...FONTS.body,
    flex: 1,
    fontWeight: '600',
    color: COLORS.text,
  },
});

export default styles;
