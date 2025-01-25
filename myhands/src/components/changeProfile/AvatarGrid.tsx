import React from 'react';
import {FlatList, TouchableOpacity, Image, View} from 'react-native';
import IconFeather from 'react-native-vector-icons/Feather';
import styles from '@/components/changeProfile/styles';
import {colors} from '@/constants';
import {characterImages} from '@/constants/character';

const AvatarGrid = ({
  avatars,
  selectedAvatarId,
  onAvatarSelect,
}: {
  avatars: number[];
  selectedAvatarId: number;
  onAvatarSelect: (id: number) => void;
}) => {
  const renderAvatar = ({item}: {item: number}) => (
    <TouchableOpacity
      style={[
        styles.avatarWrapper,
        selectedAvatarId === item && styles.selectedAvatarWrapper,
      ]}
      onPress={() => onAvatarSelect(item)}
    >
      <Image source={characterImages[item]} style={styles.avatarImage} />
      {selectedAvatarId === item && (
        <View style={styles.checkmarkWrapper}>
          <IconFeather name="check" size={60} color={colors.WHITE} />
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={avatars}
      renderItem={renderAvatar}
      keyExtractor={item => item.toString()}
      numColumns={3} // 3열로 표시
      contentContainerStyle={styles.avatarGrid}
    />
  );
};

export default AvatarGrid;
