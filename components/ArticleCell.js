import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableWithoutFeedback, StyleSheet, Image } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // marginBottom: 10,
    marginTop: 10,
    padding: 15,
  },
  imgContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  img: {
    width: null,
    height: 120,
  },
});

const ArticleCell = ({ navigate, _id, title, shareImg }) => (
  <TouchableWithoutFeedback onPress={() => navigate('Article', { _id, title, name: 'Lucy' })}>
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <Image
          style={styles.img}
          resizeMode='cover'
          source={{ uri: shareImg }}
        />
      </View>
      <Text>{title}</Text>
    </View>
  </TouchableWithoutFeedback>
);


ArticleCell.propTypes = {
  navigate: PropTypes.func.isRequired,
  _id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  shareImg: PropTypes.string.isRequired,
};

export default ArticleCell;

