import React, {useLayoutEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {useNavigation} from '@react-navigation/native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome6';
import {duplicateCheck, SignupFormData, singUp} from '@/api/auth';
import CustomDateTimePicker from '@/components/_modal/CustomDateTimePicker';
import CustomModal from '@/components/_modal/CustomModal';
import CustomTextBold from '@/components/styles/CustomTextBold';
import CustomTextMedium from '@/components/styles/CustomTextMedium';
import {colors} from '@/constants';
import {departments} from '@/constants/department';
import {adminNavigations} from '@/constants/navigations';
import {AdminStackParamList} from '@/navigations/stack/AdminStackNavigator';

interface AdminHomeScreenProps {
  navigation: BottomTabNavigationProp<AdminStackParamList>;
}

const AdminSignupScreen = ({navigation}: AdminHomeScreenProps) => {
  const navigate =
    useNavigation<BottomTabNavigationProp<AdminStackParamList>>();
  useLayoutEffect(() => {
    navigation.setOptions({
      // eslint-disable-next-line react/no-unstable-nested-components
      headerRight: () => (
        <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
          <Text style={{color: '#FFFFFF', fontSize: 14, fontWeight: '600'}}>
            완료
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('1111');
  const [joinedAt, setJoinedAt] = useState('');
  const [departmentId, setDepartmentId] = useState(0);
  const [jobGroup, setJobGroup] = useState(1);
  const [group, setGroup] = useState<string>('');

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<string>('');
  const [showJobGroupOptions, setShowJobGroupOptions] = useState(false);
  const [showDepartmentOptions, setShowDepartmentOptions] = useState(false);
  const [duplicateError, setDuplicateError] = useState(false);

  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [failModalOpen, setFailModalOpen] = useState(false);
  const [duplicateModalOpen, setDuplicateModalOpen] = useState(false);
  const [disableUserId, setDisableUserId] = useState(false);

  const department = [
    '음성 1센터',
    '음성 2센터',
    '용인백암센터',
    '남양주센터',
    '파주센터',
    '사업기획팀',
    '그로스팀',
    'CX팀',
  ];

  const groups = ['F 현장 직군', 'B 관리 직군', 'G 성장 전략', 'T 기술 직군'];

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleJoinedAt = (date: Date) => {
    const formattedDate = date.toISOString().split('T')[0];
    setJoinedAt(formattedDate);
  };

  const handleDepartmentSelect = (departmentName: string) => {
    setDepartmentId(departments[departmentName as keyof typeof departments]);
    setSelectedDepartment(departmentName);
    setShowDepartmentOptions(false);
  };

  const handleSave = async () => {
    try {
      const formData: SignupFormData = {
        id: userId,
        name: userName,
        password: password,
        joinedAt: joinedAt,
        departmentId: departmentId,
        jobGroup: jobGroup,
        group: group,
      };

      console.log('Saving data:', formData);
      await singUp(formData);
      setSuccessModalOpen(true);
    } catch (error) {
      console.log(error);
      setFailModalOpen(true);
    }
  };

  const handleGroupSelect = (selectedGroup: string) => {
    setGroup(selectedGroup);
    setShowJobGroupOptions(false);
  };

  const handleDuplicate = async () => {
    try {
      await duplicateCheck(userId); // 비동기 처리 기다리기
      setDuplicateModalOpen(true);
      setDuplicateError(false);
    } catch {
      setDuplicateError(true);
    }
  };

  const today = new Date();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <CustomModal
        state="SignUpSuccess"
        type="success"
        isOpen={successModalOpen}
        onClose={() => navigate.navigate(adminNavigations.ADMIN_HOME)}
        onButtonClick={() => navigate.navigate(adminNavigations.ADMIN_HOME)}
      />
      <CustomModal
        state="SignUpFail"
        type="warning"
        isOpen={failModalOpen}
        onClose={() => setFailModalOpen(false)}
        onButtonClick={() => setFailModalOpen(false)}
      />
      <CustomModal
        state="DuplicateCheck"
        type="success"
        isOpen={duplicateModalOpen}
        onClose={() => setDuplicateModalOpen(false)}
        onButtonClick={() => setDisableUserId(true)}
      />
      <CustomTextBold style={styles.label}>아이디</CustomTextBold>
      <View
        style={[
          styles.userNameWrapper,
          {marginBottom: duplicateError ? 0 : 20},
        ]}
      >
        <TextInput
          value={userId}
          onChangeText={setUserId}
          style={[styles.userName, disableUserId && styles.disabled]}
          autoCapitalize="none"
          placeholder="아이디를 입력하세요"
        />
        <TouchableOpacity
          onPress={handleDuplicate}
          style={styles.duplicateButton}
        >
          <Text style={styles.duplicateButtonText}>중복확인</Text>
        </TouchableOpacity>
      </View>
      {duplicateError && (
        <View style={styles.errorWrapper}>
          <Image
            source={require('@/assets/image/warning.png')}
            style={styles.warningImage}
          />
          <CustomTextMedium style={styles.error}>
            이미 사용중인 아이디 입니다.
          </CustomTextMedium>
        </View>
      )}
      <Text style={styles.label}>기본 패스워드</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        placeholder="패스워드를 입력하세요"
      />
      <View style={styles.wrapper}>
        <View style={styles.departmentWrapper}>
          <Text style={styles.label}>소속</Text>
          <TouchableOpacity
            style={styles.groupWrapper}
            onPress={() => setShowDepartmentOptions(!showDepartmentOptions)}
          >
            <Text>{selectedDepartment || '소속을 선택하세요'}</Text>
            <FontAwesomeIcon
              name={showDepartmentOptions ? 'caret-up' : 'caret-down'}
              size={24}
              color="#6E6E6E"
            />
          </TouchableOpacity>
          {showDepartmentOptions && (
            <ScrollView style={styles.departmentOptions}>
              {department.map((select, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.jobGroupOption}
                  onPress={() => handleDepartmentSelect(select)}
                >
                  <Text>{select}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
        </View>
        <View style={styles.jobGroupWrapper}>
          <Text style={styles.label}>직무그룹</Text>
          <TextInput
            value={String(jobGroup)}
            onChangeText={text => setJobGroup(Number(text))}
            style={styles.input}
            placeholder="직무그룹"
          />
        </View>
      </View>
      <Text style={styles.label}>이름</Text>
      <TextInput
        value={userName}
        onChangeText={setUserName}
        style={styles.input}
        placeholder="이름을 입력하세요"
      />
      <Text style={styles.label}>입사일</Text>
      <TouchableOpacity onPress={showDatePicker} style={styles.input}>
        <Text style={styles.dateText}>
          {String(joinedAt) || '입사일을 선택하세요'}
        </Text>
      </TouchableOpacity>
      {isDatePickerVisible && (
        <CustomDateTimePicker
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleJoinedAt}
          onCancel={hideDatePicker}
          display="calendar"
          maximumDate={today}
        />
      )}
      <Text style={styles.label}>직군</Text>
      <TouchableOpacity
        style={styles.groupWrapper}
        onPress={() => setShowJobGroupOptions(!showJobGroupOptions)}
      >
        <Text>{group || '직군을 선택하세요'}</Text>
        <FontAwesomeIcon
          name={showJobGroupOptions ? 'caret-up' : 'caret-down'}
          size={24}
          color="#6E6E6E"
        />
      </TouchableOpacity>
      {showJobGroupOptions && (
        <View style={styles.jobGroupOptions}>
          {groups.map((select, index) => (
            <TouchableOpacity
              key={index}
              style={styles.jobGroupOption}
              onPress={() => handleGroupSelect(select)}
            >
              <Text>{select}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: '#ffffff',
  },
  input: {
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#EAEAEA',
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 52,
    justifyContent: 'center',
  },
  disabled: {
    backgroundColor: '#E0E0E0',
  },
  error: {
    color: '#FF5B35',
  },
  errorWrapper: {
    paddingLeft: 3,
    width: '100%',
    height: 25,
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 20,
    marginTop: 5,
  },
  warningImage: {
    width: 16,
    height: 16,
    marginRight: 3,
  },
  dateText: {
    color: '#000',
  },
  label: {
    fontSize: 15,
    marginBottom: 13,
    color: '#5e5e5e',
  },
  wrapper: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  departmentWrapper: {
    flex: 3,
    marginRight: 10,
  },
  jobGroupWrapper: {
    flex: 2,
  },
  userName: {
    flex: 1,
    height: '100%',
  },
  userNameWrapper: {
    flexDirection: 'row',
    width: '100%',
    height: 52,
    paddingHorizontal: 15,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#EAEAEA',

    alignItems: 'center',
  },
  groupWrapper: {
    flexDirection: 'row',
    width: '100%',
    height: 52,
    paddingHorizontal: 15,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#EAEAEA',
    marginBottom: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  duplicateButton: {
    width: 76,
    height: 32,
    backgroundColor: colors.RED_800,
    alignItems: 'center',
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 4,
  },
  duplicateButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  jobGroupOptions: {
    borderWidth: 1,
    borderColor: '#EAEAEA',
    borderRadius: 10,
    marginTop: -15,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  departmentOptions: {
    position: 'absolute',
    top: 100,
    flex: 3,
    borderWidth: 1,
    borderColor: '#EAEAEA',
    borderRadius: 10,
    backgroundColor: '#fff',
    zIndex: 10,
    maxHeight: 200,
    width: '100%',
  },
  jobGroupOption: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
  },
  saveButton: {
    marginRight: 16,
    backgroundColor: '#FF5B35',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    width: 63,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AdminSignupScreen;
