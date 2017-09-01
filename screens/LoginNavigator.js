import { StackNavigator } from 'react-navigation';

import LoginScreen from './Main/LoginScreen';

const LoginNavigator = StackNavigator({
  Login: { screen: LoginScreen },
});

export default LoginNavigator;
