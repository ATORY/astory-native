import React from 'react';
import { StackNavigator } from 'react-navigation';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';

import MainScreen from './screens/MainScreen';
import ArticleScreen from './screens/ArticleScreen';
import LoginScreen from './screens/LoginScreen';
import CommentScreen from './screens/CommentScreen';
import UserScreen from './screens/UserScreen';

const networkInterface = createNetworkInterface({
  uri: 'https://atory.cc/api/graphql',
});

const client = new ApolloClient({
  networkInterface,
});

const Atory = StackNavigator({
  Home: { screen: MainScreen },
  Article: { screen: ArticleScreen },
  Login: { screen: LoginScreen },
  Comment: { screen: CommentScreen },
  User: { screen: UserScreen },
});

const App = () => (
  <ApolloProvider client={client}>
    <Atory screenProps={{ tintColor: 'red' }} />
  </ApolloProvider>
);

export default App;
