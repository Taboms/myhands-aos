import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import Header from '@/components/board/Header';
import {adminNavigations} from '@/constants';
import {AdminStackParamList} from '@/navigations/stack/AdminStackNavigator';

interface AdminHomeScreenProps {
  navigation: BottomTabNavigationProp<AdminStackParamList>;
}

function AdminHomeScreen({navigation}: AdminHomeScreenProps) {
  return (
    <View style={styles.container}>
      <Header />
      <Image
        source={require('@/assets/image/board-ellipse.png')}
        style={styles.curveImage}
        resizeMode="stretch"
      />
      <View style={styles.buttonsWrapper}>
        <View style={styles.buttons}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate(adminNavigations.ADMIN_SIGNUP)}
          >
            <Image
              source={require('@/assets/image/sing-up.png')}
              style={styles.buttonImage}
            />
            <Text style={styles.menuText}> 회원 생성 </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              navigation.navigate(adminNavigations.ADMIN_USER_LIST)
            }
          >
            <Image
              source={require('@/assets/image/user-list.png')}
              style={styles.buttonImage}
              resizeMode="contain"
            />
            <Text style={styles.menuText}> 회원 목록 </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              navigation.navigate(adminNavigations.ADMIN_WRITE_POST)
            }
          >
            <Image
              source={require('@/assets/image/write-board.png')}
              style={styles.buttonImage}
              resizeMode="contain"
            />
            <Text style={styles.menuText}> 게시글 작성 </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              navigation.navigate(adminNavigations.ADMIN_POST_LIST)
            }
          >
            <Image
              source={require('@/assets/image/search-board.png')}
              style={styles.buttonImage}
              resizeMode="contain"
            />
            <Text style={styles.menuText}> 게시글 조회 </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  curveImage: {
    position: 'absolute',
    top: '30%',
    left: 0,
    right: 0,
    height: 150,
    width: '100%',
    zIndex: 1,
  },
  buttonsWrapper: {
    flex: 1,
    width: '100%',
    height: '80%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center', // 전체 View의 수직 정렬
    alignItems: 'center', // 전체 View의 수평 정렬
    position: 'absolute', // 다른 요소 위에 고정
    zIndex: 2,
  },
  buttons: {
    padding: 13,
    borderRadius: 8,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    marginHorizontal: 13,
    width: 130,
    height: 130,
    backgroundColor: '#FFFFFF',
    borderRadius: 12.86,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0,
    shadowRadius: 12.86,
    elevation: 10,
  },
  buttonImage: {
    width: 46,
    height: 40,
    marginBottom: 13,
  },
  menuText: {
    fontSize: 15,
    fontFamily: 'Pretendard-Bold',
    color: '#6F6F6F',
  },
});

export default AdminHomeScreen;
