import React from 'react';
import PropTypes from 'prop-types';
import { Button, Image, StyleSheet, View, Text } from 'react-native';

const styles = StyleSheet.create({
  icon: {
    width: 26,
    height: 26,
  },
});

class DraftScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: '草稿',
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('./icons/ic_drafts.png')}
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
        <Text>DraftScreen</Text>
        <Button
          onPress={() => this.props.navigation.goBack()}
          title='Go back home'
        />
      </View>
    );
  }
}

export default DraftScreen;