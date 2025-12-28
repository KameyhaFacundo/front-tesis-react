import { StyleSheet } from 'react-native';
import { SIZES, FONTS } from '../../constants/theme';

const styles = StyleSheet.create({
  badge: {
    borderRadius: SIZES.radiusSmall,
    alignSelf: 'flex-start',
  },
  text: {
    fontWeight: FONTS.semiBold,
  },
});

export default styles;
