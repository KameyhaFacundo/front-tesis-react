import { StyleSheet } from 'react-native';
import { COLORS, FONTS, SIZES } from '../../constants/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F8FF',
  },
  gradient: {
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
    backgroundColor: 'rgba(91, 155, 255, 0.20)',
  },
  scroll: {
    flex: 1,
  },
  content: {
    padding: SIZES.lg,
  },
  heroCard: {
    borderRadius: 22,
    padding: SIZES.lg,
    alignItems: 'center',
    marginBottom: SIZES.lg,
  },
  heroName: {
    ...FONTS.h4,
    color: COLORS.white,
    fontWeight: '700',
    marginTop: SIZES.sm,
  },
  heroRole: {
    ...FONTS.caption,
    color: '#DDEBFF',
  },
  section: {
    marginBottom: SIZES.lg,
  },
  sectionTitle: {
    ...FONTS.h5,
    color: '#1A2752',
    fontWeight: '700',
    marginBottom: SIZES.sm,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E4ECFA',
    padding: SIZES.md,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SIZES.sm,
    borderBottomWidth: 1,
    borderBottomColor: '#EEF3FC',
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  label: {
    ...FONTS.caption,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  value: {
    ...FONTS.caption,
    color: COLORS.text,
    maxWidth: '58%',
    textAlign: 'right',
  },
  actionCard: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E4ECFA',
    paddingVertical: SIZES.md,
    paddingHorizontal: SIZES.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SIZES.sm,
  },
  actionText: {
    ...FONTS.body,
    color: '#1A2752',
    fontWeight: '600',
    flex: 1,
  },
});

export default styles;
