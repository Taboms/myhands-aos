import React, {useState} from 'react';
import {Button, Text, View} from 'react-native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import CustomModal from '@/components/_modal/CustomModal';
import {stateMap} from '@/components/_modal/modalConstants';
import {loggedInNavigations} from '@/constants';
import {LoggedInStackParamList} from '@/navigations/stack/LoggedInStackNavigator';

interface RaceHomeScreenProps {
  navigation: BottomTabNavigationProp<LoggedInStackParamList>;
}

type ModalState = keyof typeof stateMap;

function RaceHomeScren({navigation}: RaceHomeScreenProps) {
  const [twoButtonModalOpen, setTwoButtonModalOpen] = useState<boolean>(false);
  const [successModalOpen, setSuccessModalOpen] = useState<boolean>(false);

  return (
    <View>
      <Text>Race Home Scren</Text>
      <Button
        title="Success Modal Test"
        onPress={() => setSuccessModalOpen(true)}
      />
      <Button
        title="Two Button Modal Test"
        onPress={() => setTwoButtonModalOpen(true)}
      />
      <CustomModal
        state="PasswordChangeWarning"
        type="warning"
        isOpen={twoButtonModalOpen}
        onClose={() => setTwoButtonModalOpen(false)}
      />
      <CustomModal
        state="PasswordChanged"
        type="success"
        isOpen={successModalOpen}
        onClose={() => setSuccessModalOpen(false)}
      />
    </View>
  );
}

export default RaceHomeScren;
