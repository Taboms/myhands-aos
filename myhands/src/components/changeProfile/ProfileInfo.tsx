import React from 'react';
import {View, Image} from 'react-native';
import CustomTextMedium from '../styles/CustomTextMedium';
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
      <CustomTextMedium style={styles.defaultText}>
        <CustomTextMedium style={styles.nameText}>{name}</CustomTextMedium>님,
      </CustomTextMedium>
      <CustomTextMedium style={styles.defaultText}>
        사용할 프로필을 선택해주세요
      </CustomTextMedium>
    </View>
  );
};

export default ProfileInfo;
