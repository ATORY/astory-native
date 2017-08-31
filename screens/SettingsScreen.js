// import React from 'react';
// import PropTypes from 'prop-types';
// import { StackNavigator } from 'react-navigation';
// import { Button, Image, StyleSheet, View, Text, ScrollView } from 'react-native';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// const styles = StyleSheet.create({
//   icon: {
//     width: 26,
//     height: 26,
//   },
// });

// // class SettingScreen extends React.Component {
//   // static navigationOptions = {
//   //   tabBarLabel: '设置',
//   //   tabBarIcon: ({ tintColor }) => (
//   //     <Image
//   //       source={require('./icons/ic_settings.png')}
//   //       style={[styles.icon, { tintColor }]}
//   //     />
//   //   ),
//   // };

//   // static propTypes = {
//   //   navigation: PropTypes.object.isRequired,
//   // }

// //   render() {
// //     return (
// //       <View>
// //         <Text>SettingScreen</Text>
// //         <Button
// //           onPress={() => this.props.navigation.navigate('Comment')}
// //           title='Go back home'
// //         />
// //       </View>
// //     );
// //   }
// // }

// const MyNavScreen = ({ navigation, banner }) => (
//   <ScrollView>
//     <Text>{banner}</Text>
//     <Button
//       onPress={() => navigation.navigate('Profile', { name: 'Jordan' })}
//       title="Open profile screen"
//     />
//     <Button
//       onPress={() => navigation.navigate('NotifSettings')}
//       title="Open notifications screen"
//     />
//     <Button
//       onPress={() => navigation.navigate('SettingsTab')}
//       title="Go to settings tab"
//     />
//     <Button onPress={() => navigation.goBack(null)} title="Go back" />
//   </ScrollView>
// );

// const MyHomeScreen = ({ navigation }) => (
//   <MyNavScreen banner="Home Screen" navigation={navigation} />
// );

// const MyProfileScreen = ({ navigation }) => (
//   <MyNavScreen
//     banner={`${navigation.state.params.name}s Profile`}
//     navigation={navigation}
//   />
// );

// const MyNotificationsSettingsScreen = ({ navigation }) => (
//   <MyNavScreen banner="Notifications Screen" navigation={navigation} />
// );

// const MySettingsScreen = ({ navigation }) => (
//   <MyNavScreen banner="Settings Screen" navigation={navigation} />
// );

// const SettingsScreen = StackNavigator({
//   Home: {
//     screen: MyHomeScreen,
//     path: '/',
//     navigationOptions: {
//       title: 'Welcome',
//     },
//   },
//   Profile: {
//     screen: MyProfileScreen,
//     path: '/people/:name',
//     navigationOptions: ({ navigation }) => ({
//       title: `${navigation.state.params.name}'s Profile!`,
//       tabBarVisible: false,
//     }),
//   },
// });

// SettingsScreen.navigationOptions = {
//   drawerLabel: 'settings',
//   drawerIcon: ({ tintColor }) => (
//     <MaterialIcons
//       name='settings'
//       size={24}
//       style={{ color: tintColor }}
//     />
//   ),
// };

// // SettingsScreen.propTypes = {
// //   navigation: PropTypes.object.isRequired,
// // };

// export default SettingsScreen;


import React from 'react';
import { View, Text } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

class SettingsScreen extends React.Component {
  static navigationOptions = () => ({
    drawerLabel: '设置',
    drawerIcon: ({ tintColor }) => (
      <MaterialIcons
        name='settings'
        size={24}
        style={{ color: tintColor }}
      />
    ),
  });

  render() {
    return (
      <View>
        <Text>SettingsScreen</Text>
      </View>
    );
  }
}

export default SettingsScreen;
