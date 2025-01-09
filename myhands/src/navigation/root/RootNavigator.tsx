import LoggedInStackNavigator from '../stack/LoggedInStackNavigator';
import LoggedOutStackNavigator from '../stack/LoggedOutStackNavigator';
import useAuth from '@/hooks/queries/useAuth';

function RootNavigator() {
  const {isLogin} = useAuth();
  return isLogin ? <LoggedInStackNavigator /> : <LoggedOutStackNavigator />;
}

export default RootNavigator;
