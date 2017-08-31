import React from 'react';
import { StackNavigator } from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import MainScreen from './Main/MainScreen';
import ArticleScreen from './Main/ArticleScreen';
import CommentScreen from './Main/CommentScreen';

const Main = StackNavigator({
  Home: { screen: MainScreen },
  Article: {
    screen: ArticleScreen,
    navigationOptions: {
      drawerLockMode: 'locked-close',
    },
  },
  // Login: { screen: LoginScreen },
  Comment: {
    screen: CommentScreen,
    navigationOptions: {
      drawerLockMode: 'locked-close',
    },
  },
  // User: { screen: UserScreen },
});

Main.navigationOptions = {
  drawerLabel: 'Main',
  drawerIcon: ({ tintColor }) => (
    <MaterialIcons
      name='home'
      size={24}
      style={{ color: tintColor }}
    />
  ),
};

export default Main;
