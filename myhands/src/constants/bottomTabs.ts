import {icons} from '@/assets/icons/bottomTabsIcons';
import BoardDetailScreen from '@/screens/board/BoardDetailScreen';
import MypageHomeScreen from '@/screens/mypage/MypageHomeScreen';
import QuestHomeScreen from '@/screens/quest/QuestHomeScreen';
import RaceHomeScren from '@/screens/race/RaceHomeScreen';

export const bottomTabs = [
  {
    name: 'Mypage',
    comp: MypageHomeScreen,
    inactiveIcon: icons.my,
    activeIcon: icons.my_focus,
  },
  {
    name: 'Quest',
    comp: QuestHomeScreen,
    inactiveIcon: icons.quest,
    activeIcon: icons.quest_focus,
  },
  {
    name: 'Race',
    comp: RaceHomeScren,
    inactiveIcon: icons.race,
    activeIcon: icons.race_focus,
  },
  {
    name: 'Board',
    comp: BoardDetailScreen,
    inactiveIcon: icons.board,
    activeIcon: icons.board_focus,
  },
];
