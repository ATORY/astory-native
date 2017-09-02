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

const UserDrafts = () => (
  <View>
    <Text>UserArticle</Text>
  </View>
);

const UserDraftNavigator = StackNavigator({
  UserArticle: {
    screen: UserDrafts,
    navigationOptions: ({ navigation }) => ({
      drawerLockMode: 'locked-close',
      title: '我的草稿',
      headerLeft: <MaterialIcons
        onPress={() => navigation.navigate('DrawerOpen')}
        name='dehaze'
        size={24}
        style={{
          marginLeft: 15,
        }}
      />,
    }),
  },
});

UserDraftNavigator.navigationOptions = {
  drawerLabel: '草稿',
  drawerIcon: ({ tintColor }) => (
    <MaterialIcons
      name='drafts'
      size={24}
      style={{ color: tintColor }}
    />
  ),
};


export default UserDraftNavigator;
