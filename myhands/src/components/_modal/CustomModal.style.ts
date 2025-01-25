import {StyleSheet, Platform, Dimensions} from 'react-native';

export const ICON_COLORS = {
  warning: '#FF5B35',
  success: '#34C759',
  logout: '#FF5B35',
};

export const styles = StyleSheet.create({
  modalBackdrop: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  backdropTouchable: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  container: {
    width: '81%',
    maxWidth: 390,
    backgroundColor: 'rgb(255, 255, 255)',
    borderRadius: 20,
    padding: 30,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      android: {
        elevation: 4,
      },
    }),
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    ...Platform.select({
      android: {
        elevation: 4,
      },
    }),
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    color: '#000',
    fontFamily: 'Pretendard-Bold',
  },
  subtitle: {
    fontSize: 13,
    color: '#9C9C9C',
    marginTop: 5,
    fontWeight: '400',
    textAlign: 'center',
    fontFamily: 'Pretendard-Medium',
  },
  buttonContainer: {
    marginTop: 24,
    flexDirection: 'row',
    width: '100%',
  },
  buttonContainerSingle: {
    justifyContent: 'center',
  },
  buttonContainerMultiple: {
    justifyContent: 'space-evenly',
  },
  button: {
    width: 110,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#eaeaea',
  },
  buttonText: {
    // fontSize: 15,
    // color: '#1a1a1a',
    // fontFamily: 'Pretendard-Light',
  },
});
