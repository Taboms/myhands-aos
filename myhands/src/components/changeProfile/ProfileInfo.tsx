import React from 'react';
import {View, Text, Image} from 'react-native';
import styles from '@/components/changeProfile/styles';
import {characterImages} from '@/constants/character';

const ProfileInfo = ({
  selectedAvatarId,
  name,
}: {
  selectedAvatarId: number;
  name: string | undefined;
}) => {
  return (
    <View style={styles.profileInfo}>
      <Image
        source={characterImages[selectedAvatarId]}
        style={styles.selectedAvatar}
      />
      <Text style={styles.defaultText}>
        <Text style={styles.nameText}>{name}</Text>님,
      </Text>
      <Text style={styles.defaultText}>사용할 프로필을 선택해주세요</Text>
    </View>
  );
};

export default ProfileInfo;
