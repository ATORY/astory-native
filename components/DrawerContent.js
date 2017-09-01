import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView, View, Text, StyleSheet, ActivityIndicator,
  Platform, Button, TouchableWithoutFeedback } from 'react-native';
import { graphql } from 'react-apollo';

import { authQuery } from '../graphql/querys';

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

const ContentComponent = (props) => {
  const { data: { loading, error, user } } = props;
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
  const login = !!(user && user._id);
  return (
    <ScrollView>
      {
        login ?
          <View>
            <Text>logout</Text>
          </View> :
          <View style={styles.container}>
            <Text>contentComponent</Text>
            <Button
              title='login'
              onPress={() => {
                props.navigation.navigate('Login');
              }}
            />
          </View>
      }
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
          if (login && (route.routeName === 'User')) {
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
};

ContentComponent.propTypes = {
  navigation: PropTypes.object.isRequired,
  data: PropTypes.shape({
    user: PropTypes.object,
  }).isRequired,
};

const ContentComponentWithData = graphql(authQuery)(ContentComponent);

export default ContentComponentWithData;
