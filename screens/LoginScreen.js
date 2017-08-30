import React from 'react';
import { View, Text } from 'react-native';

class LoginScreen extends React.Component {
  static navigationOptions = () => ({
    title: '登录',
  });


  render() {
    return (
      <View>
        <Text>Login</Text>
      </View>
    );
  }
}

export default LoginScreen;
