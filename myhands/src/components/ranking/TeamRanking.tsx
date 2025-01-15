import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import RankingItem from './RankingItem';
import {Team} from '@/api/ranking';

type TeamRankingProps = {
  teams: Team[];
  myTeamId: number;
  max: number;
};

const TeamRanking = ({teams, myTeamId, max}: TeamRankingProps) => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {teams.map(team => (
        <RankingItem
          key={team.departmentId}
          isMyTeam={team.departmentId === myTeamId}
          team={team}
          max={max}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  content: {
    paddingBottom: 20,
  },
});

export default TeamRanking;
