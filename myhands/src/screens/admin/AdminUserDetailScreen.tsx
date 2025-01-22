import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import Modal from 'react-native-modal';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/AntDesign';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome6';
import {
  duplicateCheck,
  duplicateCheckEmplyeenum,
  SignupFormData,
  singUp,
} from '@/api/auth';
import CustomModal from '@/components/_modal/CustomModal';
import CustomTextMedium from '@/components/styles/CustomTextMedium';
import {adminNavigations, colors} from '@/constants';
import {departments} from '@/constants/department';
import {AdminStackParamList} from '@/navigations/stack/AdminStackNavigator';
import {useAdminStore} from '@/store/adminStore';
import {useSignupStore} from '@/store/signupStore';

// Calendar Locale 설정
LocaleConfig.locales.ko = {
  monthNames: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ],
  monthNamesShort: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ],
  dayNames: [
    '일요일',
    '월요일',
    '화요일',
    '수요일',
    '목요일',
    '금요일',
    '토요일',
  ],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
  today: '오늘',
};
LocaleConfig.defaultLocale = 'ko';

interface AdminHomeScreenProps {
  navigation: BottomTabNavigationProp<AdminStackParamList>;
}

const DEPARTMENTS = [
  '음성 1센터',
  '음성 2센터',
  '용인백암센터',
  '남양주센터',
  '파주센터',
  '사업기획팀',
  '그로스팀',
  'CX팀',
] as const;

const JOB_GROUPS = [
  'F 현장 직군',
  'B 관리 직군',
  'G 성장 전략',
  'T 기술 직군',
] as const;

type AdminUserDetailRouteProps = RouteProp<
  AdminStackParamList,
  typeof adminNavigations.ADMIN_USER_DETAIL
>;

interface AdminUserDetailProps {
  route: AdminUserDetailRouteProps;
}

const AdminUserDetailScreen = ({route}: AdminUserDetailProps) => {
  const navigate =
    useNavigation<BottomTabNavigationProp<AdminStackParamList>>();

  const {userId} = route.params;
  const {fetchUserInfo, userInfo, setEmployeeNum, setDuplicateCheck} =
    useAdminStore();
  const [loading, setLoading] = useState<boolean>(true);

  const {
    // userIdd,
    userName,
    password,
    joinedAt,
    departmentId,
    jobGroup,
    group,
    selectedDepartment,
    isDuplicateChecked,
    duplicateError,
    markedDates,
    successModalOpen,
    failModalOpen,
    isDepartmentModalVisible,
    isJobGroupModalVisible,
    isDatePickerVisible,
    setUserId,
    setUserName,
    setPassword,
    setJoinedAt,
    setDepartmentId,
    setJobGroup,
    setGroup,
    setSelectedDepartment,
    setMarkedDates,
    setModals,
  } = useSignupStore();

  const handleDepartmentSelect = (departmentName: string) => {
    setDepartmentId(departments[departmentName as keyof typeof departments]);
    setSelectedDepartment(departmentName);
    setModals('department', false);
  };

  const handleGroupSelect = (selectedGroup: string) => {
    setGroup(selectedGroup);
    setModals('jobGroup', false);
  };

  const handleJoinedAt = (date: any) => {
    const selectedDate = new Date(date.timestamp);
    const formattedDate = selectedDate.toISOString().split('T')[0];

    setJoinedAt(formattedDate);
    setMarkedDates({
      [date.dateString]: {
        selected: true,
        selectedColor: colors.RED_800,
      },
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchUserInfo(userId);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [fetchUserInfo, userId]);

  const handleDuplicate = async () => {
    if (userInfo?.employeeNum && userInfo.employeeNum > 0) {
      try {
        const data = await duplicateCheckEmplyeenum(userInfo.employeeNum);
        console.log(data);
        setDuplicateCheck(true, false);
      } catch {
        setDuplicateCheck(false, true);
      }
    }
  };

  // const handleSave = useCallback(async () => {
  //   try {
  //     const formData: SignupFormData = {
  //       id: userId,
  //       name: userName,
  //       password,
  //       joinedAt,
  //       departmentId,
  //       jobGroup,
  //       group,
  //     };

  //     await singUp(formData);
  //     setModals('success', true);
  //   } catch (error) {
  //     console.error('Save Error:', error);
  //     setModals('fail', true);
  //   }
  // }, [userId, userName, password, joinedAt, departmentId, jobGroup, group]);

  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerRight: () => (
  //       <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
  //         <Text style={styles.saveButtonText}>완료</Text>
  //       </TouchableOpacity>
  //     ),
  //   });
  // }, [navigation, handleSave]);

  // useEffect(() => {
  //   console.log(userIdd);
  // }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Success/Fail Modals */}
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
        onClose={() => setModals('fail', false)}
        onButtonClick={() => setModals('fail', false)}
      />

      {/* ID Input Section */}
      <Text style={styles.label}>아이디</Text>
      <View
        style={[
          styles.userNameWrapper,
          {marginBottom: duplicateError || isDuplicateChecked ? 0 : 20},
        ]}
      >
        <Text style={styles.disabledText}>{userInfo?.id}</Text>
      </View>

      {/* ID Validation Messages */}
      {duplicateError && (
        <View style={styles.errorContainer}>
          <Icon
            name="exclamationcircleo"
            size={15}
            color={colors.RED_800}
            style={styles.errorIcon}
          />
          <CustomTextMedium style={styles.errorMessage}>
            이미 사용중인 사번입니다.
          </CustomTextMedium>
        </View>
      )}
      {isDuplicateChecked && !duplicateError && (
        <View style={styles.errorContainer}>
          <Icon
            name="checkcircleo"
            size={15}
            color="#4CAF50"
            style={styles.errorIcon}
          />
          <CustomTextMedium style={[styles.errorMessage, {color: '#4CAF50'}]}>
            사용 가능한 사번입니다.
          </CustomTextMedium>
        </View>
      )}

      {/* Password Input */}
      <Text style={styles.label}>패스워드</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        placeholder="패스워드를 입력하세요"
      />

      {/* Department and Job Group Section */}
      <View style={styles.wrapper}>
        <View style={styles.departmentWrapper}>
          <Text style={styles.label}>소속</Text>
          <TouchableOpacity
            style={styles.groupWrapper}
            onPress={() => setModals('department', true)}
          >
            <Text>{selectedDepartment || '소속을 선택하세요'}</Text>
            <FontAwesomeIcon name="caret-down" size={24} color="#6E6E6E" />
          </TouchableOpacity>
          <Modal
            isVisible={isDepartmentModalVisible}
            onBackdropPress={() => setModals('department', false)}
            style={styles.modal}
            backdropTransitionOutTiming={0}
            useNativeDriver={true}
            propagateSwipe={true}
          >
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>소속 선택</Text>
                <TouchableOpacity
                  onPress={() => setModals('department', false)}
                  style={styles.closeModalButton}
                >
                  <Icon name="close" size={24} color="#666" />
                </TouchableOpacity>
              </View>
              <ScrollView bounces={false}>
                {DEPARTMENTS.map((dept, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.modalOption}
                    onPress={() => handleDepartmentSelect(dept)}
                  >
                    <Text
                      style={[
                        styles.modalOptionText,
                        selectedDepartment === dept && styles.selectedOption,
                      ]}
                    >
                      {dept}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </Modal>
        </View>
        <View style={styles.jobGroupWrapper}>
          <Text style={styles.label}>직무그룹</Text>
          <TextInput
            value={String(jobGroup)}
            onChangeText={text => setJobGroup(Number(text))}
            style={styles.input}
            placeholder="직무그룹"
            keyboardType="number-pad"
          />
        </View>
      </View>

      {/* 사번 */}
      <Text style={styles.label}>사번</Text>
      <View
        style={[
          styles.employeeNumWrapper,
          {marginBottom: duplicateError || isDuplicateChecked ? 0 : 20},
        ]}
      >
        <TextInput
          value={(userInfo?.employeeNum ?? '').toString()}
          onChangeText={text => {
            const numValue = parseInt(text) || 0; // 문자열을 숫자로 변환
            setEmployeeNum(numValue);
          }}
          style={styles.userName}
          autoCapitalize="none"
          placeholder="사번을 입력하세요"
          keyboardType="number-pad"
          maxLength={10}
        />
        <TouchableOpacity
          onPress={handleDuplicate}
          style={styles.duplicateButton}
        >
          <Text style={styles.duplicateButtonText}>중복확인</Text>
        </TouchableOpacity>
      </View>

      {/* Name Input */}
      <Text style={styles.label}>이름</Text>
      <TextInput
        value={userInfo?.name}
        onChangeText={setUserName}
        style={styles.input}
        placeholder="이름을 입력하세요"
      />

      {/* Join Date Section */}
      <Text style={styles.label}>입사일</Text>
      <TouchableOpacity
        onPress={() => setModals('calendar', true)}
        style={styles.input}
      >
        <Text style={styles.dateText}>{joinedAt || '입사일을 선택하세요'}</Text>
      </TouchableOpacity>
      {isDatePickerVisible && (
        <View style={styles.calendarContainer}>
          <Calendar
            onDayPress={handleJoinedAt}
            markedDates={markedDates}
            maxDate={new Date().toISOString().split('T')[0]}
            monthFormat={'yyyy년 MM월'}
            theme={{
              selectedDayBackgroundColor: colors.RED_800,
              todayTextColor: colors.RED_800,
              arrowColor: colors.RED_800,
              textDayFontFamily: 'Pretendard-Medium',
              textMonthFontFamily: 'Pretendard-SemiBold',
              textDayHeaderFontFamily: 'Pretendard-Medium',
            }}
          />
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModals('calendar', false)}
          >
            <Text style={styles.closeButtonText}>닫기</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  disabledText: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 14,
  },
  container: {
    flexGrow: 1,
    padding: 27,
    backgroundColor: '#ffffff',
  },
  employeeNumWrapper: {
    flexDirection: 'row',
    width: '100%',
    height: 52,
    paddingHorizontal: 15,
    borderWidth: 1.5,
    borderRadius: 10,
    borderColor: '#EAEAEA',
    alignItems: 'center',
  },
  input: {
    marginBottom: 20,
    borderWidth: 1.5,
    borderColor: '#EAEAEA',
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 52,
    justifyContent: 'center',
    fontFamily: 'Pretendard-Medium',
    fontSize: 14,
  },
  label: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 15,
    marginBottom: 13,
    color: '#7A7A7A',
  },
  dateText: {
    color: '#000',
  },
  userNameWrapper: {
    flexDirection: 'row',
    width: '100%',
    height: 52,
    paddingHorizontal: 15,
    borderWidth: 1.5,
    borderRadius: 10,
    borderColor: '#EAEAEA',
    alignItems: 'center',
    backgroundColor: '#e5e5e5',
  },
  userName: {
    flex: 1,
    height: '100%',
    fontFamily: 'Pretendard-Medium',
    fontSize: 14,
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
    fontFamily: 'Pretendard-SemiBold',
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 24,
  },
  errorIcon: {
    top: 1,
    marginLeft: 3,
    marginRight: 8,
  },
  errorMessage: {
    color: colors.RED_800,
    fontSize: 14,
    textAlign: 'left',
  },
  wrapper: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    zIndex: 2,
  },
  departmentWrapper: {
    flex: 3,
    marginRight: 10,
    zIndex: 2,
  },
  jobGroupWrapper: {
    flex: 2,
  },
  groupWrapper: {
    flexDirection: 'row',
    width: '100%',
    height: 52,
    paddingHorizontal: 15,
    borderWidth: 1.5,
    borderRadius: 10,
    borderColor: '#EAEAEA',
    marginBottom: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  calendarContainer: {
    marginTop: -15,
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#EAEAEA',
    padding: 10,
  },
  closeButton: {
    alignItems: 'center',
    padding: 10,
    marginTop: 10,
    backgroundColor: colors.RED_800,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontFamily: 'Pretendard-Medium',
    fontSize: 14,
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
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 20,
    maxHeight: '70%',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
    position: 'relative',
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: 'Pretendard-SemiBold',
    color: '#000',
  },
  closeModalButton: {
    position: 'absolute',
    right: 20,
  },
  modalOption: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
  },
  modalOptionText: {
    fontSize: 16,
    fontFamily: 'Pretendard-Medium',
    color: '#333',
  },
  selectedOption: {
    color: colors.RED_800,
    fontFamily: 'Pretendard-SemiBold',
  },
});

export default AdminUserDetailScreen;
