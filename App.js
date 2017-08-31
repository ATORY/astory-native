import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView, View, Text, StyleSheet,
  Platform, Button, TouchableWithoutFeedback, Dimensions } from 'react-native';
import { DrawerNavigator } from 'react-navigation';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';

import MainNavigator from './screens/MainNavigator';
import SettingsScreen from './screens/SettingsScreen';
// import ArticleScreen from './screens/ArticleScreen';
import LoginScreen from './screens/LoginScreen';
// import CommentScreen from './screens/CommentScreen';
// import UserScreen from './screens/UserScreen';

const networkInterface = createNetworkInterface({
  uri: 'https://atory.cc/api/graphql',
});

const client = new ApolloClient({
  networkInterface,
});

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === 'ios' ? 20 : 0,
    paddingVertical: 4,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginHorizontal: 16,
    width: 24,
    alignItems: 'center',
  },
  inactiveIcon: {
    /*
     * Icons have 0.54 opacity according to guidelines
     * 100/87 * 54 ~= 62
     */
    opacity: 0.62,
  },
  label: {
    margin: 16,
    fontWeight: 'bold',
  },
});

const contentComponent = props => (
  <ScrollView>
    <View style={styles.container}>
      <Text>contentComponent</Text>
      <Button
        title='login'
        onPress={() => {
          props.navigation.navigate('Login');
        }}
      />
    </View>
    {
      props.navigation.state.routes.map((route, index) => {
        // console.log('route', route);
        const {
          activeItemKey,
          activeTintColor,
          activeBackgroundColor,
          inactiveTintColor,
          inactiveBackgroundColor,
          getLabel,
          renderIcon,
          labelStyle,
        } = props;
        const focused = activeItemKey === route.key;
        const color = focused ? activeTintColor : inactiveTintColor;
        const backgroundColor = focused
          ? activeBackgroundColor
          : inactiveBackgroundColor;
        const scene = { route, index, focused, tintColor: color };
        const icon = renderIcon(scene);
        const label = getLabel(scene);
        if (route.routeName === 'Login') {
          return null;
        }
        return (
          <TouchableWithoutFeedback
            key={route.key}
            onPress={() => {
              props.navigation.navigate('DrawerClose');
              props.navigation.navigate(route.routeName);
            }}
            delayPressIn={0}
          >
            <View style={[styles.item, { backgroundColor }]}>
              {
                icon ?
                  <View
                    style={[styles.icon, focused ? null : styles.inactiveIcon]}
                  >{icon}</View> :
                  null
              }
              {
                typeof label === 'string' ?
                  <Text style={[styles.label, { color }, labelStyle]}>
                    {label}
                  </Text> :
                  label
              }
            </View>
          </TouchableWithoutFeedback>
        );
      })
    }
  </ScrollView>
);

contentComponent.propTypes = {
  navigation: PropTypes.object.isRequired,
};

const Atory = DrawerNavigator({
  Home: { screen: MainNavigator },
  Settings: { screen: SettingsScreen },
  // Article: { screen: ArticleScreen },
  Login: { screen: LoginScreen },
  // Comment: { screen: CommentScreen },
  // User: { screen: UserScreen },
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
