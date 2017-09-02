import React from 'react';
import PropTypes from 'prop-types';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { View, Text, StyleSheet, Button, AsyncStorage, TextInput } from 'react-native';
import { graphql } from 'react-apollo';

import { authQuery } from '../../graphql/querys';
import { userLoginMutation } from '../../graphql/mutations';

class LoginScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerStyle: {
      borderBottomColor: '#bbb',
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
    title: '登录',
    headerLeft: <MaterialIcons
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

  static propTypes = {
    mutate: PropTypes.func.isRequired,
    navigation: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      err: '',
    };
  }

  loginRequest = () => {
    const { email, password } = this.state;
    const { mutate } = this.props;
    const emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailReg.test(email)) { this.setState({ redEmail: true, err: '请使用合法的邮箱地址' }); return; }
    if (password.length < 6) { this.setState({ redPWD: true, err: '密码长度不得小于6位' }); return; }
    mutate({
      variables: { user: { email, password } },
      refetchQueries: [{ query: authQuery }],
    }).then(({ data: { user } }) => {
      if (user && user.msg) {
        this.setState({ err: user.msg });
        return;
      }
      const { token } = user;
      AsyncStorage.setItem('@token', token).then(() => {
        this.props.navigation.goBack(null);
      }).catch(err => console.error(err));
    }).catch(err => console.log('err', err));
  }

  render() {
    return (
      <View>
        <Text>LoginScreen</Text>
        <TextInput
          placeholder='email'
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={text => this.setState({ email: text })}
          value={this.state.email}
        />
        <TextInput
          placeholder='password'
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={text => this.setState({ password: text })}
          value={this.state.password}
        />
        <Text>{this.state.err}</Text>
        <Button
          title='login'
          onPress={() => this.loginRequest()}
        />
      </View>
    );
  }
}

const LoginScreenWithData = graphql(userLoginMutation)(LoginScreen);

export default LoginScreenWithData;
