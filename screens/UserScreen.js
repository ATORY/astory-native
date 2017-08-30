
import React from 'react';
import { Button, StyleSheet, Image } from 'react-native';
import { TabNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';

import ArticleScreen from './User/Article';
import DraftScreen from './User/Draft';
import MarkScreen from './User/Mark';
import LikeScreen from './User/Like';
import SettingScreen from './User/Setting';

const styles = StyleSheet.create({
  icon: {
    width: 26,
    height: 26,
  },
});

const UserNests = TabNavigator({
  Article: {
    screen: ArticleScreen,
  },
  Draft: {
    screen: DraftScreen,
  },
  Mark: {
    screen: MarkScreen,
  },
  Like: {
    screen: LikeScreen,
  },
  Setting: {
    screen: SettingScreen,
    path: '/settings',
    navigationOptions: {
      tabBarLabel: 'Settings',
      tabBarIcon: ({ tintColor, focused }) => (
        <Ionicons
          name={focused ? 'ios-settings' : 'ios-settings-outline'}
          size={26}
          style={{ color: tintColor }}
        />
      ),
    },
  },
}, {
  tabBarOptions: {
    // activeTintColor: '#e91e63',
  },
});

class UserScreen extends React.Component {
  static navigationOptions = () => ({
    title: '我的',
  });

  render() {
    return (
      <UserNests />
    );
  }
}

export default UserScreen;
