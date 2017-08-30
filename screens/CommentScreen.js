import React from 'react';
import { View, Text } from 'react-native';

class CommentScreen extends React.Component {
  static navigationOptions = () => ({
    title: '评论',
  });


  render() {
    return (
      <View>
        <Text>评论</Text>
      </View>
    );
  }
}

export default CommentScreen;
