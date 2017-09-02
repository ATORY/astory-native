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
import UserArticleNav from './screens/User/ArticleNav';
import UserDraftNav from './screens/User/DraftNav';
import UserLikeNav from './screens/User/LikeNav';
import UserMarkNav from './screens/User/MarkNav';

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
  UserArticleNav: { screen: UserArticleNav },
  UserDraftNav: { screen: UserDraftNav },
  UserLikeNav: { screen: UserLikeNav },
  UserMarkNav: { screen: UserMarkNav },

  Settings: { screen: SettingsScreen },
  // Article: { screen: ArticleScreen },
  Login: { screen: LoginNavigator },
  // Comment: { screen: CommentScreen },
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
