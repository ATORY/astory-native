import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, Button, StyleSheet } from 'react-native';
import { StackNavigator } from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const styles = StyleSheet.create({
  icon: {
    width: 26,
    height: 26,
  },
});

const UserArticle = () => (
  <View>
    <Text>UserArticle</Text>
  </View>
);

const UserArticleNavigator = StackNavigator({
  UserArticle: {
    screen: UserArticle,
    navigationOptions: ({ navigation }) => ({
      drawerLockMode: 'locked-close',
      // headerStyle: {
      //   borderBottomColor: '#bbb',
      //   borderBottomWidth: StyleSheet.hairlineWidth,
      // },
      title: '我的文章',
      headerLeft: <MaterialIcons
        onPress={() => navigation.navigate('DrawerOpen')}
        name='dehaze'
        size={24}
        style={{
          // color: screenProps.tintColor,
          marginLeft: 15,
        }}
      />,
    }),
  },
  // User: { screen: UserScreen },
});

UserArticleNavigator.navigationOptions = {
  drawerLabel: '我的文章',
  drawerIcon: ({ tintColor }) => (
    <MaterialIcons
      name='style'
      size={24}
      style={{ color: tintColor }}
    />
  ),
};


export default UserArticleNavigator;
