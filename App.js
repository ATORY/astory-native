import React from 'react';
import { StackNavigator } from 'react-navigation';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';

import MainScreen from './screens/MainScreen';
import ArticleScreen from './screens/ArticleScreen';

const networkInterface = createNetworkInterface({
  uri: 'https://atory.cc/api/graphql',
});

const client = new ApolloClient({
  networkInterface,
});

const Atory = StackNavigator({
  Home: { screen: MainScreen },
  Article: { screen: ArticleScreen },
});

const App = () => (
  <ApolloProvider client={client}>
    <Atory />
  </ApolloProvider>
);

export default App;
