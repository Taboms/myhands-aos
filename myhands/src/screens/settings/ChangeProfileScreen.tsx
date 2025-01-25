import React, {useState, useLayoutEffect} from 'react';
import {View} from 'react-native';
import {changeProfileImage} from '@/api/setting';
import CustomModal from '@/components/_modal/CustomModal';
import HeaderButton from '@/components/changePassword/HeaderButton';
import AvatarGrid from '@/components/changeProfile/AvatarGrid';
import ProfileInfo from '@/components/changeProfile/ProfileInfo';
import styles from '@/components/changeProfile/styles';
import {colors, loggedInNavigations} from '@/constants';
import {useAuthStore} from '@/store/authStore';

const ChangeProfileScreen = ({navigation}: any) => {
  const currentAvatarId = useAuthStore(state => state.user?.avartaId);
  const updateAvatarId = useAuthStore(state => state.setAvartaId);
  const name = useAuthStore(state => state.user?.name);
  const [selectedAvatarId, setSelectedAvatarId] = useState<number>(
    currentAvatarId || 1
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFailModalOpen, setIsFailModalOpen] = useState(false);
  let tempSelectedAvatarId = currentAvatarId || 1;

  const avatars = Array.from({length: 9}, (_, index) => index + 1); // 1부터 9까지의 아바타 ID 배열

  const handleAvatarSelect = (id: number) => {
    tempSelectedAvatarId = id;
    setSelectedAvatarId(id);
  };

  const handleSave = async () => {
    try {
      await changeProfileImage(tempSelectedAvatarId);
      updateAvatarId(tempSelectedAvatarId);
      setIsModalOpen(true);
    } catch (error: any) {
      setIsFailModalOpen(true);
    }
  };

  const handleAfterChange = (index: number) => {
    if (index === 0) {
      navigation.navigate('UserDrawer');
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      // eslint-disable-next-line react/no-unstable-nested-components
      headerRight: () => (
        <HeaderButton
          label="저장"
          onPress={handleSave}
          color={colors.RED_800}
        />
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ProfileInfo selectedAvatarId={selectedAvatarId} name={name} />
      <View style={styles.divider} />
      <AvatarGrid
        avatars={avatars}
        selectedAvatarId={selectedAvatarId}
        onAvatarSelect={handleAvatarSelect}
      />
      <CustomModal
        state="ProfileEditSuccess"
        type="success"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onButtonClick={handleAfterChange}
      />
      <CustomModal
        state="ProfileEditFail"
        type="warning"
        isOpen={isFailModalOpen}
        onClose={() => setIsFailModalOpen(false)}
      />
    </View>
  );
};

export default ChangeProfileScreen;
