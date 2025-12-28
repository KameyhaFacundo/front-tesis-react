import { StyleSheet } from 'react-native';
import { COLORS, SIZES, FONTS } from '../../constants/theme';

const styles = StyleSheet.create({
  container: {
    marginBottom: SIZES.md,
  },
  label: {
    ...FONTS.bodyBold,
    marginBottom: SIZES.xs,
    color: COLORS.text,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAFBFC',
    borderWidth: 2,
    borderColor: '#E8EAED',
    borderRadius: SIZES.radiusMedium,
    paddingHorizontal: SIZES.md,
    minHeight: SIZES.inputHeight,
  },
  inputContainerFocused: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  inputContainerError: {
    borderColor: COLORS.error,
  },
  inputContainerDisabled: {
    backgroundColor: COLORS.background,
  },
  input: {
    flex: 1,
    ...FONTS.body,
    color: COLORS.text,
    paddingVertical: SIZES.sm,
    outlineStyle: 'none',
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  leftIcon: {
    marginRight: SIZES.sm,
  },
  rightIcon: {
    marginLeft: SIZES.sm,
    padding: SIZES.xs,
  },
  errorText: {
    ...FONTS.caption,
    color: COLORS.error,
    marginTop: SIZES.xs,
  },
});

export default styles;
