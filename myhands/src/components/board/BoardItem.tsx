import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {BoardPost} from '@/api/boardApi';
import {colors} from '@/constants';

const BoardItem = ({
  item,
  isLastItem,
}: {
  item: BoardPost;
  isLastItem: boolean;
}) => {
  const showNewIndicator = item.timeAgo.endsWith('전');

  return (
    <TouchableOpacity style={[styles.card, isLastItem && styles.lastCard]}>
      <View style={styles.cardContent}>
        {showNewIndicator && (
          <View style={styles.iconWrapper}>
            <Text style={styles.iconText}>N</Text>
          </View>
        )}
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.time}>{item.timeAgo}</Text>
        </View>
        <Text style={styles.arrow}>{'>'}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.GRAY_200,
  },
  lastCard: {
    borderBottomWidth: 0,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconWrapper: {
    marginTop: -15,
    width: 16,
    height: 16,
    borderRadius: 18,
    backgroundColor: colors.RED_800,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  iconText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: colors.WHITE,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.BLACK,
  },
  time: {
    fontSize: 12,
    color: '#FF5B35',
    marginTop: 4,
  },
  arrow: {
    fontSize: 16,
    color: '#6E6E6E',
    marginTop: -20,
    alignSelf: 'center',
  },
});

export default BoardItem;
