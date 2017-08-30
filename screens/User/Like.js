import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, Button, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  icon: {
    width: 26,
    height: 26,
  },
});

class LikeScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: '收藏',
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('./icons/ic_favorite.png')}
        style={[styles.icon, { tintColor }]}
      />
    ),
  };

  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  render() {
    return (
      <View>
        <Text>Like</Text>
        <Button
          onPress={() => this.props.navigation.goBack()}
          title='Go back home'
        />
      </View>
    );
  }
}

export default LikeScreen;
