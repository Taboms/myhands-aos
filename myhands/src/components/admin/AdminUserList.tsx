import {Image, StyleSheet, Text, View} from 'react-native';
import CustomTextBold from '../styles/CustomTextBold';
import CustomTextMedium from '../styles/CustomTextMedium';
import {characterImages} from '@/constants/character';
import {User} from '@/constants/user';

interface AdminUserListProps {
  user: User;
}

export default function AdminUserList({user}: AdminUserListProps) {
  return (
    <View style={styles.listContainer}>
      <Image
        source={characterImages[user?.avartaId || 1]}
        style={styles.profile}
      />
      <View style={styles.nameSpace}>
        <CustomTextBold>
          {user.name} [{user.employeeNum}]
        </CustomTextBold>
        <CustomTextMedium>
          {user.department} | {user.level}
        </CustomTextMedium>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 18,
    paddingVertical: 10,
    alignItems: 'center',
  },
  profile: {
    width: 56,
    height: 56,
    marginRight: 7,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 100,
  },
  nameSpace: {
    display: 'flex',
    flexDirection: 'column',
  },
});
