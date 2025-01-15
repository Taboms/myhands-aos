import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import CustomTextSemiBold from '../styles/CustomTextBold';
import CustomTextMedium from '../styles/CustomTextMedium';
import {colors} from '@/constants';

type MyTeamInfoProps = {
  myIndex: number;
  needExp: number;
  nextExp: number;
};

const MyTeamInfo = ({myIndex, needExp, nextExp}: MyTeamInfoProps) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/icons/rankingIcons.png')}
        style={styles.image}
      />
      <View style={styles.textContainer}>
        <CustomTextMedium style={styles.textLarge}>
          이번 주 우리 팀은{' '}
          <CustomTextSemiBold style={styles.redText}>
            {myIndex === 0 ? '1' : myIndex}등
          </CustomTextSemiBold>{' '}
          이에요.
        </CustomTextMedium>
        <CustomTextMedium style={styles.text}>
          {myIndex === 0 ? (
            <>
              <CustomTextSemiBold style={styles.redText}>
                {myIndex + 1}등
              </CustomTextSemiBold>
              보다
              <CustomTextSemiBold style={styles.redText}>
                {' '}
                {nextExp} do
              </CustomTextSemiBold>{' '}
              앞서 있어요! 파이팅!
            </>
          ) : (
            <>
              <CustomTextSemiBold style={styles.redText}>
                {myIndex - 1}등
              </CustomTextSemiBold>
              까지
              <CustomTextSemiBold style={styles.redText}>
                {' '}
                {needExp} do
              </CustomTextSemiBold>{' '}
              남았어요. 파이팅!
            </>
          )}
        </CustomTextMedium>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: colors.WHITE,
    flexDirection: 'row',
    borderRadius: 20,
  },
  textContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginRight: 10,
  },
  image: {
    height: 50,
    width: 50,
    marginRight: 20,
    marginLeft: 5,
  },
  text: {
    color: colors.BLACK,
    fontSize: 14,
  },
  textLarge: {
    color: colors.BLACK,
    fontSize: 16.5,
  },
  redText: {
    color: colors.RED_800,
  },
});

export default MyTeamInfo;
