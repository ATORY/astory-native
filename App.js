import React from 'react';
import { AsyncStorage, Dimensions } from 'react-native';
import { DrawerNavigator } from 'react-navigation';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';

import MainNavigator from './screens/MainNavigator';
import SettingsScreen from './screens/SettingsScreen';
// import ArticleScreen from './screens/ArticleScreen';
import LoginNavigator from './screens/LoginNavigator';
// import CommentScreen from './screens/CommentScreen';
import UserScreen from './screens/UserScreen';

import contentComponent from './components/DrawerContent';

const networkInterface = createNetworkInterface({
  // uri: 'https://atory.cc/api/graphql',
  uri: 'http://localhost:4000/graphql',
});

networkInterface.use([{
  async applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {};
    }
    try {
      const value = await AsyncStorage.getItem('@token');
      if (value !== null) {
        req.options.headers.authorization = `Bearer ${value}`;
      }
    } catch (error) {
      console.error(error);
    }
    next();
  },
}]);

const client = new ApolloClient({
  networkInterface,
});

const Atory = DrawerNavigator({
  Home: { screen: MainNavigator },
  Settings: { screen: SettingsScreen },
  // Article: { screen: ArticleScreen },
  Login: { screen: LoginNavigator },
  // Comment: { screen: CommentScreen },
  User: { screen: UserScreen },
}, {
  initialRouteName: 'Home',
  // drawerWidth: 250,
  drawerWidth: (Dimensions.get('window').width * 2) / 3,
  contentComponent,
  contentOptions: {
    activeTintColor: '#e91e63',
  },
});

const App = () => (
  <ApolloProvider client={client}>
    <Atory screenProps={{ tintColor: 'red' }} />
  </ApolloProvider>
);

export default App;
