import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {SvgXml} from 'react-native-svg';
import ProgressBar from '../mypage/ProgressBar';
import CustomTextMedium from '../styles/CustomTextMedium';
import CustomTextRegular from '../styles/CustomTextRegular';
import CustomTextSemiBold from '../styles/CustomTextSemiBold';
import {Team} from '@/api/ranking';
import {departmentIcons} from '@/assets/icons/departmentIcons';
import {colors} from '@/constants';
import {DEPARTMENT_NAMES, MEDAL} from '@/constants/ranking';

type RankingItemProps = {
  isMyTeam: boolean;
  team: Team;
  max: number;
};

const renderIcon = (departmentId: number, focused: boolean) => {
  let icon;

  switch (departmentId) {
    case 1:
      icon = focused ? departmentIcons.d1_focus : departmentIcons.d1;
      break;
    case 2:
      icon = focused ? departmentIcons.d2_focus : departmentIcons.d2;
      break;
    case 3:
      icon = focused ? departmentIcons.d3_focus : departmentIcons.d3;
      break;
    case 4:
      icon = focused ? departmentIcons.d4_focus : departmentIcons.d4;
      break;
    case 5:
      icon = focused ? departmentIcons.d5_focus : departmentIcons.d5;
      break;
    case 6:
      icon = focused ? departmentIcons.d6_focus : departmentIcons.d6;
      break;
    case 7:
      icon = focused ? departmentIcons.d7_focus : departmentIcons.d7;
      break;
    case 8:
      icon = focused ? departmentIcons.d8_focus : departmentIcons.d8;
      break;
    default:
      icon = focused ? departmentIcons.d1_focus : departmentIcons.d1;
      break;
  }

  return <SvgXml xml={icon} width={24} height={24} />;
};

const RankingItem = ({isMyTeam, team, max}: RankingItemProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.rank}>
        {team.rank === 1 || team.rank === 2 || team.rank === 3 ? (
          <Image source={MEDAL[team.rank]} style={styles.medalImage} />
        ) : (
          <CustomTextRegular style={styles.rankText}>
            {team.rank}
          </CustomTextRegular>
        )}
      </View>
      <View style={[styles.icon, isMyTeam && styles.myTeamIcon]}>
        {renderIcon(team.departmentId, isMyTeam)}
      </View>
      <View style={styles.progressBarContainer}>
        <View style={styles.departmentRow}>
          <CustomTextSemiBold style={styles.text}>
            {DEPARTMENT_NAMES[team.departmentId]}
            {isMyTeam && ' - 나의 팀'}
          </CustomTextSemiBold>
          <CustomTextMedium style={styles.expAvgText}>
            {team.expAvg} do
          </CustomTextMedium>
        </View>
        <View style={styles.progressContainer}>
          <ProgressBar
            fontSize={0}
            height={12}
            percentage={(team.expAvg / max) * 100}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '95%',
    margin: 10,
    paddingRight: 5,
  },
  rank: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  icon: {
    flex: 1.25,
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFEEEE',
    marginRight: 13,
  },
  myTeamIcon: {
    backgroundColor: '#FF5B35',
  },
  progressBarContainer: {
    flex: 8,
    justifyContent: 'center',
  },
  departmentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  medalImage: {
    width: 25,
    height: undefined,
    aspectRatio: 1,
    resizeMode: 'contain',
  },
  rankText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  expAvgText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF5B35',
  },
  progressContainer: {
    top: -7,
  },
  text: {
    color: colors.BLACK,
  },
});

export default RankingItem;
