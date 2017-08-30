import React from 'react';
import PropTypes from 'prop-types';
import { Button, Image, StyleSheet, View, Text } from 'react-native';

const styles = StyleSheet.create({
  icon: {
    width: 26,
    height: 26,
  },
});

class MarkScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Mark',
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('./icons/ic_bookmark.png')}
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
        <Text>Mark</Text>
        <Button
          onPress={() => this.props.navigation.goBack()}
          title='Go back home'
        />
      </View>
    );
  }
}

export default MarkScreen;
