import React from 'react';
import {Pressable} from 'react-native-gesture-handler';
import {SvgXml} from 'react-native-svg';
import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {DrawerActions} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {LoggedInStackParamList} from '../stack/LoggedInStackNavigator';
import {icons} from '@/assets/icons/bottomTabsIcons';
import {colors} from '@/constants';
import {loggedInNavigations} from '@/constants/navigations';
import BoardHomeScreen from '@/screens/board/BoardHomeScreen';
import MypageHomeScreen from '@/screens/mypage/MypageHomeScreen';
import QuestHomeScreen from '@/screens/quest/QuestHomeScreen';
import RaceHomeScren from '@/screens/race/RaceHomeScren';

interface BottomTabsNavigatorProps {
  navigation: BottomTabNavigationProp<LoggedInStackParamList>;
}

export type BottomTabsParamList = {
  [loggedInNavigations.BOARD_HOME]: undefined;
  [loggedInNavigations.QUEST_HOME]: undefined;
  [loggedInNavigations.RACE_HOME]: undefined;
  [loggedInNavigations.MYPAGE_HOME]: undefined;
};

const renderTabIcon = (name: string, focused: boolean) => {
  let icon;

  switch (name) {
    case 'my':
      icon = focused ? icons.my_focus : icons.my;
      break;
    case 'quest':
      icon = focused ? icons.quest_focus : icons.quest;
      break;
    case 'race':
      icon = focused ? icons.race_focus : icons.race;
      break;
    case 'board':
      icon = focused ? icons.board_focus : icons.board;
      break;
    default:
      icon = focused ? icons.my_focus : icons.my;
      break;
  }

  return <SvgXml xml={icon} />;
};

const Tab = createBottomTabNavigator<BottomTabsParamList>();

const createDrawerButton =
  ({navigation}: BottomTabsNavigatorProps) =>
  () =>
    (
      <Pressable
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        style={{marginLeft: 25}}
      >
        <Ionicons name="menu" size={24} color="black" />
      </Pressable>
    );

const createAlertButton =
  ({navigation}: BottomTabsNavigatorProps) =>
  () =>
    (
      <Pressable
        style={{marginRight: 25}}
        onPress={() => navigation.navigate(loggedInNavigations.NOTIFICATIONS)}
      >
        <Ionicons name="notifications-outline" size={24} color="black" />
      </Pressable>
    );

function BottomTabsNavigator({navigation}: BottomTabsNavigatorProps) {
  return (
    <Tab.Navigator
      initialRouteName={loggedInNavigations.MYPAGE_HOME}
      screenOptions={{
        tabBarActiveTintColor: colors.RED_800,
        tabBarInactiveTintColor: colors.GRAY_500,
        headerLeft: () => createDrawerButton({navigation})(),
        headerRight: () => createAlertButton({navigation})(),
        headerTitleAlign: 'center',
        tabBarStyle: {
          height: 80,
          justifyContent: 'center',
          alignItems: 'center',
        },
        tabBarItemStyle: {
          padding: 12, // 아이템 내부 패딩
          height: '100%', // 높이를 100%로
          justifyContent: 'center', // 수직 중앙 정렬
          maxWidth: 85,
          alignContent: 'center',
        },
        tabBarLabelStyle: {
          marginTop: 2, // 라벨과 아이콘 사이 간격
          fontSize: 12, // 라벨 폰트 크기
        },
      }}
    >
      <Tab.Screen
        name={loggedInNavigations.MYPAGE_HOME}
        component={MypageHomeScreen}
        options={{
          title: '마이페이지',
          tabBarLabel: 'MY',
          tabBarIcon: ({focused}) => renderTabIcon('my', focused),
        }}
      />
      <Tab.Screen
        name={loggedInNavigations.QUEST_HOME}
        component={QuestHomeScreen}
        options={{
          title: '퀘스트',
          tabBarIcon: ({focused}) => renderTabIcon('quest', focused),
        }}
      />
      <Tab.Screen
        name={loggedInNavigations.RACE_HOME}
        component={RaceHomeScren}
        options={{
          title: '팀 레이스',
          tabBarLabel: '레이스',
          tabBarIcon: ({focused}) => renderTabIcon('race', focused),
        }}
      />
      <Tab.Screen
        name={loggedInNavigations.BOARD_HOME}
        component={BoardHomeScreen}
        options={{
          title: '게시판',
          tabBarIcon: ({focused}) => renderTabIcon('board', focused),
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTabsNavigator;
