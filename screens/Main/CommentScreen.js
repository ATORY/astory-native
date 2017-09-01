import React from 'react';
import { View, Text, Button } from 'react-native';

class CommentScreen extends React.Component {
  static navigationOptions = () => ({
    title: '评论',
    drawerLockMode: 'locked-closed',
  });


  render() {
    const { navigation } = this.props;
    return (
      <View>
        <Text>评论</Text>
        <Button
          title='login'
          onPress={() => navigation.navigate('Login')}
        />
      </View>
    );
  }
}

export default CommentScreen;
