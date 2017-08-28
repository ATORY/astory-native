import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableWithoutFeedback, StyleSheet, Image } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 15,
    marginLeft: 15,
    marginRight: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  img: {
    flex: 1,
    height: 100,
  },
  bigblue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
  red: {
    color: 'red',
  },
});

const ArticleCell = ({ navigate, title, shareImg }) => (
  <TouchableWithoutFeedback onPress={() => navigate('Article', { name: 'Lucy' })}>
    <View style={styles.container}>
      <Image
        style={styles.img}
        source={{ uri: shareImg }}
      />
      <Text>{title}</Text>
    </View>
  </TouchableWithoutFeedback>
);


ArticleCell.propTypes = {
  navigate: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  shareImg: PropTypes.string.isRequired,
};

export default ArticleCell;

