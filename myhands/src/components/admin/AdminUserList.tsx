import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {StackNavigationProp} from '@react-navigation/stack';
import CustomTextBold from '../styles/CustomTextBold';
import CustomTextMedium from '../styles/CustomTextMedium';
import {adminNavigations, colors} from '@/constants';
import {characterImages} from '@/constants/character';
import {User} from '@/constants/user';
import {AdminStackParamList} from '@/navigations/stack/AdminStackNavigator';

interface AdminUserListProps {
  user: User;
  keyWord: string;
}

const HighlightedText = ({
  text,
  highlight,
}: {
  text: string;
  highlight: string;
}) => {
  if (!highlight.trim()) {
    return <Text>{text}</Text>; // 검색어가 없으면 기본 텍스트
  }

  const regex = new RegExp(`(${highlight})`, 'gi'); // 검색어와 일치하는 부분 찾기
  const parts = text.split(regex);

  return (
    <Text>
      {parts.map((part, index) =>
        regex.test(part) ? (
          <Text key={index} style={styles.highLight}>
            {part}
          </Text>
        ) : (
          <Text key={index}>{part}</Text>
        )
      )}
    </Text>
  );
};

interface AdminUserListNavigationProps {
  navigation: StackNavigationProp<AdminStackParamList>;
}

export default function AdminUserList({
  user,
  keyWord,
  navigation,
}: AdminUserListProps & AdminUserListNavigationProps) {
  return (
    <TouchableOpacity
      style={styles.listContainer}
      onPress={() =>
        navigation.navigate(adminNavigations.ADMIN_USER_DETAIL, {
          userId: user.userId,
        })
      }
    >
      <Image
        source={characterImages[user?.avartaId || 1]}
        style={styles.profile}
      />
      <View style={styles.nameSpace}>
        <CustomTextBold style={{marginBottom: 1}}>
          <HighlightedText text={user.name} highlight={keyWord} /> [
          <HighlightedText
            text={user.employeeNum.toString()}
            highlight={keyWord}
          />
          ]
        </CustomTextBold>
        <CustomTextMedium>
          <HighlightedText text={user.department} highlight={keyWord} /> |{' '}
          {user.level}
        </CustomTextMedium>
      </View>
    </TouchableOpacity>
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
    marginRight: 12,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 100,
  },
  nameSpace: {
    display: 'flex',
    flexDirection: 'column',
  },
  highLight: {
    color: colors.RED_800,
  },
});
