import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, ActivityIndicator, View, StyleSheet } from 'react-native';
import { graphql } from 'react-apollo';

import ArticleCell from '../components/ArticleCell';
import { articlesQuery } from '../graphql/querys';

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

class MainScreen extends React.Component {
  static navigationOptions = {
    title: 'ATORY',
  };
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    data: PropTypes.shape({
      loading: PropTypes.bool,
      error: PropTypes.object,
      article: PropTypes.any,
    }).isRequired,
  }
  render() {
    const { data: { loading, error, articles } } = this.props;
    const { navigate } = this.props.navigation;
    if (loading) {
      return <ActivityIndicator />;
    }
    if (error) {
      return (
        <View>
          {error.message}
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <FlatList
          data={articles}
          keyExtractor={item => item._id}
          renderItem={({ item }) =>
            <ArticleCell key={item._id} navigate={navigate} {...item} />
          }
        />
      </View>
    );
  }
}

const MainScreenWithData = graphql(articlesQuery)(MainScreen);

export default MainScreenWithData;
