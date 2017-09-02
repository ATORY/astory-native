import React from 'react';
import PropTypes from 'prop-types';
import { View, ActivityIndicator, FlatList, StyleSheet, Text } from 'react-native';
import { StackNavigator } from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { graphql } from 'react-apollo';

import ArticleCell from '../../components/ArticleCell';
import { userArticlesQuery } from '../../graphql/querys';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
const UserArticle = ({ data: { loading, error, user }, navigate }) => {
  
  if (loading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return (
      <View style={styles.container}>
        <Text>{error.message}</Text>
      </View>
    );
  }
  if (user.articles.length === 0) {
    return (
      <View style={styles.container}>
        <Text>还没有文章</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={user.articles}
        keyExtractor={item => item._id}
        renderItem={({ item }) =>
          <ArticleCell key={item._id} navigate={navigate} {...item} />
        }
      />
    </View>
  );
};

const UserArticleWithData = graphql(userArticlesQuery, {
  options: () => {
    const variables = { isSelf: true };
    return { variables };
  },
})(UserArticle);

const UserArticleNavigator = StackNavigator({
  UserArticle: {
    screen: UserArticleWithData,
    navigationOptions: ({ navigation }) => {
      console.log(navigation);
      return {
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
      };
    },
  },
  // User: { screen: UserScreen },
}, {
  initialRouteName: 'UserArticle',
});

UserArticleNavigator.navigationOptions = ({ navigation }) => {
  console.log('navigation', navigation);
  return {
    drawerLabel: '文章',
    drawerIcon: ({ tintColor }) => (
      <MaterialIcons
        name='style'
        size={24}
        style={{ color: tintColor }}
      />
    ),
  };
};


export default UserArticleNavigator;
