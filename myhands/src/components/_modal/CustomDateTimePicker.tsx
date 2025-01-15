import DateTimePickerModal from 'react-native-modal-datetime-picker';

type DateTimePickerMode = 'date' | 'time' | 'datetime';
type DateTimePickerDisplay =
  | 'default'
  | 'compact'
  | 'inline'
  | 'spinner'
  | 'clock'
  | 'calendar';

interface DateTimePickerProps {
  isVisible: boolean;
  mode: DateTimePickerMode;
  onConfirm: (date: Date) => void;
  onCancel: () => void;
  display: DateTimePickerDisplay;
  maximumDate?: Date;
}

const CustomDateTimePicker = ({
  isVisible,
  mode,
  onConfirm,
  onCancel,
  display,
  maximumDate = new Date(), // 기본값 설정
}: DateTimePickerProps) => {
  return (
    <DateTimePickerModal
      isVisible={isVisible}
      mode={mode}
      onConfirm={onConfirm}
      onCancel={onCancel}
      display={display}
      maximumDate={maximumDate}
    />
  );
};

export default CustomDateTimePicker;
