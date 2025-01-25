import {StyleSheet, Dimensions} from 'react-native';
import {colors} from '@/constants';

const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  profileInfo: {
    height: screenHeight * 0.3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedAvatar: {
    width: 106,
    height: 106,
    margin: 8,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 53,
    borderWidth: 2.5,
    borderColor: colors.GRAY_700,
  },
  nameText: {
    color: colors.RED_800,
    fontSize: 18,
  },
  defaultText: {
    fontSize: 18,
    color: colors.BLACK,
    textAlign: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: colors.GRAY_500,
    marginVertical: 20,
  },
  avatarGrid: {
    alignItems: 'center',
  },
  avatarWrapper: {
    marginTop: 12,
    width: 100,
    height: 100,
    margin: 12,
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    borderWidth: 2.5,
    borderColor: colors.GRAY_700,
  },
  avatarImage: {
    width: 95,
    height: 95,
    borderRadius: 50,
  },
  selectedAvatarWrapper: {
    borderColor: colors.BLACK,
  },
  checkmarkWrapper: {
    opacity: 0.5,
    position: 'absolute',
    backgroundColor: colors.BLACK,
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2.5,
  },
  checkmark: {
    color: colors.BLACK,
    fontSize: 15,
    fontWeight: 'bold',
  },
  avatarContainer: {
    position: 'relative',
    width: 100,
    height: 100,
  },
});

export default styles;
