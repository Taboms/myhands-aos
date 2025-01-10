import AdminStackNavigator from '../stack/AdminStackNavigator';
import LoggedInStackNavigator from '../stack/LoggedInStackNavigator';
import LoggedOutStackNavigator from '../stack/LoggedOutStackNavigator';
import useAuth from '@/hooks/queries/useAuth';

function RootNavigator() {
  // const {isLogin, isAdmin} = useAuth();

  // 테스트용 코드
  const isLogin = true;
  const isAdmin = false;

  if (!isLogin) {
    return <LoggedOutStackNavigator />;
  }

  if (isLogin && isAdmin) {
    return <AdminStackNavigator />;
  }

  return <LoggedInStackNavigator />;
}

export default RootNavigator;
