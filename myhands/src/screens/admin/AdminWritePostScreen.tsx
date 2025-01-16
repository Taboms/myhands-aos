import React, {useLayoutEffect, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {useNavigation} from '@react-navigation/native';
import {postCreateBoard} from '@/api/auth';
import LoadingScreen from '@/components/LoadingScreen';
import CustomModal from '@/components/_modal/CustomModal';
import {adminNavigations} from '@/constants';
import {AdminStackParamList} from '@/navigations/stack/AdminStackNavigator';
interface AdminHomeScreenProps {
  navigation: BottomTabNavigationProp<AdminStackParamList>;
}

function AdminWritePostScreen({navigation}: AdminHomeScreenProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isFailModalOpen, setIsFailModalOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate =
    useNavigation<BottomTabNavigationProp<AdminStackParamList>>();

  const handleSave = async () => {
    try {
      setLoading(true);
      const res = await postCreateBoard(title, content);
      if (res === 201) {
        navigation.navigate(adminNavigations.ADMIN_POST_LIST);
      } else {
        setIsFailModalOpen(true);
      }
    } catch (error: any) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      // eslint-disable-next-line react/no-unstable-nested-components
      headerRight: () => (
        <TouchableOpacity
          style={[
            styles.saveButton,
            (!title || !content) && styles.disabledButton,
          ]}
          disabled={!title || !content}
          onPress={handleSave}
        >
          <Text style={styles.btnText}>완료</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, title, content, handleSave]);

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.container}
        >
          <ScrollView style={styles.scrollView}>
            <View style={styles.inputContainer}>
              <View style={styles.titleContainer}>
                <TextInput
                  style={styles.titleInput}
                  placeholder="제목을 입력해주세요."
                  placeholderTextColor="#999"
                  value={title}
                  onChangeText={setTitle}
                  maxLength={100}
                />
              </View>
              <View style={styles.divider} />
              <TextInput
                style={styles.contentInput}
                placeholder="내용을 입력해주세요."
                placeholderTextColor="#999"
                value={content}
                onChangeText={setContent}
                multiline={true}
                textAlignVertical="top"
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      )}
      <CustomModal
        state="CreateBoardFail"
        type="warning"
        isOpen={isFailModalOpen}
        onClose={() => setIsFailModalOpen(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  inputContainer: {
    flex: 1,
    padding: 30,
  },
  titleContainer: {
    marginBottom: 10,
    marginTop: 5,
  },
  titleInput: {
    fontSize: 17,
    fontFamily: 'Pretendard-Medium',
    color: '#000',
    padding: 0,
    marginBottom: 5,
  },
  contentInput: {
    flex: 1,
    fontSize: 15,
    fontFamily: 'Pretendard-Regular',
    color: '#000',
    minHeight: 300,
    padding: 0,
    marginTop: 10,
  },
  divider: {
    height: 1,
    backgroundColor: '#EEEEEE',
    marginBottom: 15,
  },
  saveButton: {
    marginRight: 25,
    backgroundColor: '#FF5B35',
    paddingHorizontal: 12,
    borderRadius: 16,
    width: 63,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledButton: {
    backgroundColor: '#FFB4A3',
  },
  btnText: {
    fontSize: 16,
    fontFamily: 'Pretendard-SemiBold',
    color: '#fff',
  },
});

export default AdminWritePostScreen;
