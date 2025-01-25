import {create} from 'zustand';
type ModalType = 'success' | 'fail' | 'department' | 'jobGroup' | 'calendar';

interface SignupStore {
  // Form Values
  userId: string;
  userName: string;
  password: string;
  joinedAt: string;
  departmentId: number;
  jobGroup: number;
  group: string;
  selectedDepartment: string;

  // UI States
  isDuplicateChecked: boolean;
  duplicateError: boolean;
  markedDates: any;

  // Modal States
  successModalOpen: boolean;
  failModalOpen: boolean;
  isDepartmentModalVisible: boolean;
  isJobGroupModalVisible: boolean;
  isDatePickerVisible: boolean;

  // Actions
  setUserId: (userId: string) => void;
  setUserName: (userName: string) => void;
  setPassword: (password: string) => void;
  setJoinedAt: (date: string) => void;
  setDepartmentId: (id: number) => void;
  setJobGroup: (group: number) => void;
  setGroup: (group: string) => void;
  setSelectedDepartment: (dept: string) => void;

  setDuplicateCheck: (checked: boolean, error: boolean) => void;
  setMarkedDates: (dates: any) => void;
  setModals: (type: ModalType, isOpen: boolean) => void;

  resetForm: () => void;
}

const initialState = {
  userId: '',
  userName: '',
  password: '1111',
  joinedAt: '',
  departmentId: 1,
  jobGroup: 1,
  group: '',
  selectedDepartment: '',
  isDuplicateChecked: false,
  duplicateError: false,
  markedDates: {},
  successModalOpen: false,
  failModalOpen: false,
  isDepartmentModalVisible: false,
  isJobGroupModalVisible: false,
  isDatePickerVisible: false,
};

export const useSignupStore = create<SignupStore>(set => ({
  ...initialState,

  setUserId: userId => set({userId}),
  setUserName: userName => set({userName}),
  setPassword: password => set({password}),
  setJoinedAt: joinedAt => set({joinedAt}),
  setDepartmentId: departmentId => set({departmentId}),
  setJobGroup: jobGroup => set({jobGroup}),
  setGroup: (group: string) => {
    const groupCode = group.substring(1, -1);
    set({group: groupCode});
  },
  setSelectedDepartment: selectedDepartment => set({selectedDepartment}),

  setDuplicateCheck: (checked, error) =>
    set({
      isDuplicateChecked: checked,
      duplicateError: error,
    }),

  setMarkedDates: markedDates => set({markedDates}),

  setModals: (type: ModalType, isOpen: boolean) => {
    switch (type) {
      case 'success':
        set({successModalOpen: isOpen});
        break;
      case 'fail':
        set({failModalOpen: isOpen});
        break;
      case 'department':
        set({isDepartmentModalVisible: isOpen});
        break;
      case 'jobGroup':
        set({isJobGroupModalVisible: isOpen});
        break;
      case 'calendar':
        set({isDatePickerVisible: isOpen});
        break;
    }
  },

  resetForm: () => set(initialState),
}));
