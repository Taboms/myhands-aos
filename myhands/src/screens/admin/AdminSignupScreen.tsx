import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/FontAwesome6';

interface SignupFormData {
  id: string;
  password: string;
  organization: string;
  jobGroup: string;
  name: string;
  joinDate: string;
}

function AdminSignupScreen() {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedJobGroup, setSelectedJobGroup] = useState<string>('');
  const [showJobGroupOptions, setShowJobGroupOptions] = useState(false);

  const [formData, setFormData] = useState<SignupFormData>({
    id: '',
    password: '',
    organization: '',
    jobGroup: '',
    name: '',
    joinDate: '',
  });

  const jobGroups = [
    'F 현장 직군',
    'B 관리 직군',
    'G 성장 전략',
    'T 기술 직군',
  ];

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    const formattedDate = date.toISOString().split('T')[0];
    setFormData(prev => ({...prev, joinDate: formattedDate}));
    hideDatePicker();
  };

  const handleChange = (field: keyof SignupFormData, value: string) => {
    setFormData(prev => ({...prev, [field]: value}));
  };

  const handleJobGroupSelect = (jobGroup: string) => {
    setFormData(prev => ({...prev, jobGroup}));
    setSelectedJobGroup(jobGroup);
    setShowJobGroupOptions(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>아이디</Text>
      <View style={styles.userNameWrapper}>
        <TextInput
          value={formData.id}
          onChangeText={text => handleChange('id', text)}
          style={styles.userName}
          autoCapitalize="none"
          placeholder="아이디를 입력하세요"
        />
        <TouchableOpacity style={styles.duplicateButton}>
          <Text style={styles.duplicateButtonText}>중복확인</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>기본 패스워드</Text>
      <TextInput
        value={formData.password}
        onChangeText={text => handleChange('password', text)}
        style={styles.input}
        secureTextEntry={true}
        placeholder="패스워드를 입력하세요"
      />

      <View style={styles.wrapper}>
        <View style={styles.organizationWrapper}>
          <Text style={styles.label}>소속</Text>
          <TextInput
            value={formData.organization}
            onChangeText={text => handleChange('organization', text)}
            style={styles.input}
            placeholder="소속을 입력하세요"
          />
        </View>
        <View style={styles.jobGroupWrapper}>
          <Text style={styles.label}>직무그룹</Text>
          <TextInput
            value={formData.jobGroup}
            onChangeText={text => handleChange('jobGroup', text)}
            style={styles.input}
            placeholder="직무그룹"
          />
        </View>
      </View>

      <Text style={styles.label}>이름</Text>
      <TextInput
        value={formData.name}
        onChangeText={text => handleChange('name', text)}
        style={styles.input}
        placeholder="이름을 입력하세요"
      />

      <Text style={styles.label}>입사일</Text>
      <TouchableOpacity onPress={showDatePicker} style={styles.input}>
        <Text style={styles.dateText}>
          {formData.joinDate || '입사일을 선택하세요'}
        </Text>
      </TouchableOpacity>

      {Platform.OS === 'ios' ? (
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      ) : (
        isDatePickerVisible && (
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
            display="default"
          />
        )
      )}

      <Text style={styles.label}>직군</Text>
      <TouchableOpacity
        style={styles.groupWrapper}
        onPress={() => setShowJobGroupOptions(!showJobGroupOptions)}
      >
        <Text>{selectedJobGroup || '직군을 선택하세요'}</Text>
        <Icon
          name={showJobGroupOptions ? 'caret-up' : 'caret-down'}
          size={24}
          color="#6E6E6E"
        />
      </TouchableOpacity>

      {showJobGroupOptions && (
        <View style={styles.jobGroupOptions}>
          {jobGroups.map((group, index) => (
            <TouchableOpacity
              key={index}
              style={styles.jobGroupOption}
              onPress={() => handleJobGroupSelect(group)}
            >
              <Text>{group}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

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
  organizationWrapper: {
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
    marginBottom: 20,
    alignItems: 'center',
  },
  groupWrapper: {
    flexDirection: 'row',
    width: '100%',
    height: 52,
    paddingHorizontal: 25,
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
    backgroundColor: '#FF5B35',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
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
  jobGroupOption: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
  },
});

export default AdminSignupScreen;
