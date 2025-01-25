import {useEffect} from 'react';
import AdminStackNavigator from '../stack/AdminStackNavigator';
import LoggedInStackNavigator from '../stack/LoggedInStackNavigator';
import LoggedOutStackNavigator from '../stack/LoggedOutStackNavigator';
import LoadingScreen from '@/components/LoadingScreen';
import {useAuthStore} from '@/store/authStore';

function RootNavigator() {
  const {isAuthenticated, isLoading, isAdmin, initializeAuth} = useAuthStore();

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  if (isLoading) {
    return <LoadingScreen />; // 로딩 컴포넌트
  }

  if (!isAuthenticated) {
    return <LoggedOutStackNavigator />;
  }

  if (isAuthenticated && isAdmin) {
    return <AdminStackNavigator />;
  }

  return <LoggedInStackNavigator />;
}

export default RootNavigator;
