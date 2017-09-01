import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { View, Text, StyleSheet } from 'react-native';

class LoginScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerStyle: {
      borderBottomColor: '#bbb',
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
    title: '登录',
    headerLeft: <MaterialIcons
      // onPress={() => navigation.navigate('Home')}
      onPress={() => navigation.goBack(null)}
      name='arrow-back'
      size={24}
      style={{
        // color: screenProps.tintColor,
        marginLeft: 15,
      }}
    />,
    // mode: 'modal',
  });


  render() {
    return (
      <View>
        <Text>LoginScreen</Text>
      </View>
    );
  }
}

export default LoginScreen;
