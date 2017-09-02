import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView, View, Text, StyleSheet, ActivityIndicator, Image, AsyncStorage,
  Platform, Button, TouchableWithoutFeedback } from 'react-native';
import { graphql, compose, withApollo } from 'react-apollo';

import { userLogoutMutation } from '../graphql/mutations';
import { authQuery, userQuery } from '../graphql/querys';

const styles = StyleSheet.create({
  container: {
    // paddingTop: Platform.OS === 'ios' ? 20 : 0,
    marginBottom: 10,
    paddingVertical: 4,
    padding: 10,
    paddingTop: 30,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'gray',
  },
  userImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  userIntro: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userInfoBtn: {
    width: 70,
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
    marginLeft: 0,
    fontWeight: 'bold',
  },
});

class ContentComponent extends React.Component {
  componentDidMount() {
    this.props.client.watchQuery({
      query: authQuery,
    }).subscribe({
      next: ({ data: { user } }) => {
        const userId = user && user._id;
        if (userId) {
          const storeData = this.props.client.readQuery({
            query: authQuery,
            variables: { userId },
          });
          const writeData = Object.assign({}, storeData, { user });
          this.props.client.writeQuery({
            query: userQuery,
            variables: { userId },
            data: writeData,
          });
        }
      },
    });
  }

  logout = () => {
    const { logoutMutate } = this.props;
    logoutMutate({
      variables: {},
    }).then(({ data: { user } }) => {
      const userId = user._id;
      const storeData = this.props.client.readQuery({
        query: authQuery,
        variables: { userId },
      });
      const writeData = Object.assign({}, storeData, { user });
      this.props.client.writeQuery({
        query: userQuery,
        variables: { userId },
        data: writeData,
      });
      AsyncStorage.setItem('@token', '').then(() => {
        // this.props.navigation.goBack(null);
      }).catch(err => console.error(err));
    }).catch(err => console.log(err));
  }

  render() {
    const { data: { loading, error, user }, navigation } = this.props;
    if (loading) {
      return (
        <View>
          <ActivityIndicator />
        </View>
      );
    }
    if (error) {
      return (
        <View>
          <Text>{error.message}</Text>
        </View>
      );
    }
    const login = !!(user && user.email);
    let lists = navigation.state.routes.map((route, index) => {
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
      } = this.props;
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
      if (route.routeName.startsWith('User') && !login) {
        return null;
      }
      return (
        <TouchableWithoutFeedback
          key={route.key}
          onPress={() => {
            navigation.navigate('DrawerClose');
            navigation.navigate(route.routeName);
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
    });
    // console.log(lists);
    lists = [lists[0], lists[lists.length - 2]];
    return (
      <ScrollView>
        <View style={styles.container}>
          <Image
            style={styles.userImage}
            source={{ uri: login && user.userAvatar || 'https://facebook.github.io/react/img/logo_og.png' }}
          />
          <View style={styles.userIntro}>
            <Text style={{ fontSize: 16 }}>{user.email || '未登录'}</Text>
            {
              login ?
                <Button
                  title='退出'
                  onPress={() => this.logout()}
                /> :
                <Button
                  title='登录'
                  onPress={() => {
                    navigation.navigate('Login');
                  }}
                />
            }
          </View>
        </View>
        {lists}
      </ScrollView>
    );
  }
}

ContentComponent.propTypes = {
  navigation: PropTypes.object.isRequired,
  data: PropTypes.shape({
    user: PropTypes.object,
  }).isRequired,
  client: PropTypes.object.isRequired,
  logoutMutate: PropTypes.func.isRequired,
};

const ContentComponentWithData = compose(
  withApollo,
  graphql(authQuery),
  graphql(userLogoutMutation, { name: 'logoutMutate' }),
)(ContentComponent);

export default ContentComponentWithData;
