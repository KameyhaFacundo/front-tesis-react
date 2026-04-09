import { StyleSheet } from 'react-native';
import { SIZES } from '../../constants/theme';

const styles = StyleSheet.create({
  skeleton: {
    overflow: 'hidden',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E4ECFA',
    padding: SIZES.md,
    marginBottom: SIZES.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  col: {
    flex: 1,
    marginLeft: SIZES.sm,
  },
  gapSm: {
    marginTop: 8,
  },
  gapMd: {
    marginTop: 12,
  },
});

export default styles;
