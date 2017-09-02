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

const UserMarks = () => (
  <View>
    <Text>UserMarks</Text>
  </View>
);

const UserMarkNavigator = StackNavigator({
  UserArticle: {
    screen: UserMarks,
    navigationOptions: ({ navigation }) => ({
      drawerLockMode: 'locked-close',
      title: '我的收藏',
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

UserMarkNavigator.navigationOptions = {
  drawerLabel: '我的标记',
  drawerIcon: ({ tintColor }) => (
    <MaterialIcons
      name='bookmark'
      size={24}
      style={{ color: tintColor }}
    />
  ),
};


export default UserMarkNavigator;
