import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import CustomTextMedium from '../styles/CustomTextMedium';
import CustomTextSemiBold from '../styles/CustomTextSemiBold';
import {BoardPost} from '@/api/boardApi';
import {colors} from '@/constants';

type BoardItemProps = {
  item: BoardPost;
  isLastItem: boolean;
  onPress: () => void;
  showNewIndicator: boolean;
  showArrow: boolean;
};

const BoardItem = ({
  item,
  isLastItem,
  onPress,
  showNewIndicator,
  showArrow,
}: BoardItemProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.card, isLastItem && styles.lastCard]}
    >
      <View style={styles.cardContent}>
        {showNewIndicator && (
          <View style={styles.iconWrapper}>
            <CustomTextSemiBold style={styles.iconText}>N</CustomTextSemiBold>
          </View>
        )}
        <View style={styles.textContainer}>
          <CustomTextSemiBold
            style={styles.title}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {item.title}
          </CustomTextSemiBold>
          <CustomTextMedium style={styles.time}>
            {item.timeAgo}
          </CustomTextMedium>
        </View>
        {showArrow && (
          <Feather
            name="chevron-right"
            size={20}
            color={colors.GRAY_700}
            style={styles.arrow}
          />
        )}
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
    marginTop: -20,
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
    color: colors.BLACK,
  },
  time: {
    fontSize: 12.5,
    color: '#FF5B35',
    marginTop: 4,
  },
  arrow: {
    marginTop: -20,
    alignSelf: 'center',
  },
});

export default BoardItem;
