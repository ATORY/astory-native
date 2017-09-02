import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableWithoutFeedback,
  StyleSheet, Image } from 'react-native';
import moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialIcons';
// const myIcon = (<Icon name="rocket" size={30} color="#900" />)

moment.locale('zh-cn');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // marginBottom: 10,
    marginBottom: 10,
    padding: 15,
  },
  imgContainer: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 10,
  },
  img: {
    width: null,
    height: 100,
  },

  user: {
    flex: 1,
    marginTop: 20,
    // flexWrap: 'nowrap',
    alignItems: 'stretch',
    // justifyContent: 'space-between',
    flexDirection: 'row',
  },
});

const ArticleCell = ({ navigate, _id, title, shareImg, publishDate, author }) => (
  <TouchableWithoutFeedback onPress={() => navigate('Article', { _id, title, name: 'Lucy' })}>
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <Image
          style={styles.img}
          resizeMode='cover'
          source={{ uri: shareImg }}
        />
      </View>
      <View>
        <Text style={{ fontSize: 18 }}>{title}</Text>
      </View>
      <View style={styles.user}>
        <View style={{ flex: 5, height: 50, flexDirection: 'row', alignItems: 'center' }}>
          <Image
            style={{ width: 40, height: 40, borderRadius: 20 }}
            resizeMode='contain'
            source={{ uri: author.userAvatar }}
          />
          <View style={{ flex: 1, paddingLeft: 10 }}>
            <Text>{author.username}</Text>
            <Text>{moment(publishDate).fromNow()}</Text>
          </View>
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center' }} >
          <TouchableWithoutFeedback onPress={() => {}}>
            <Icon name='bookmark-border' size={30} style={{ padding: 10 }} color='#a9a9a9' />
          </TouchableWithoutFeedback>
        </View>
      </View>
    </View>
  </TouchableWithoutFeedback>
);


ArticleCell.propTypes = {
  navigate: PropTypes.func.isRequired,
  _id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  shareImg: PropTypes.string.isRequired,
  publishDate: PropTypes.string.isRequired,
  author: PropTypes.object.isRequired,
};

export default ArticleCell;

