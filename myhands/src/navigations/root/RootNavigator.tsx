import LoggedInStackNavigator from '../stack/LoggedInStackNavigator';
import LoggedOutStackNavigator from '../stack/LoggedOutStackNavigator';
import useAuth from '@/hooks/queries/useAuth';

function RootNavigator() {
  // const {isLogin} = useAuth();
  const isLogin = true; // 테스트용 코드
  return isLogin ? <LoggedInStackNavigator /> : <LoggedOutStackNavigator />;
}

export default RootNavigator;
