import { StyleSheet } from 'react-native';
import { COLORS, SIZES, FONTS } from '../../constants/theme';

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  avatar: {
    borderRadius: SIZES.radiusRound,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  initials: {
    fontWeight: FONTS.bold,
  },
  statusIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderRadius: SIZES.radiusRound,
    borderColor: COLORS.white,
  },
});

export default styles;
