import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, ActivityIndicator, View, Text, StyleSheet,
  Button, TouchableNativeFeedback, Platform } from 'react-native';
import { graphql } from 'react-apollo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import ArticleCell from '../../components/ArticleCell';
import { articlesQuery } from '../../graphql/querys';

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
  static navigationOptions = ({ navigation, screenProps }) => {
    const logined = false;
    const headerRight = Platform.OS === 'ios' ?
      (
        <View style={{ marginRight: 15 }}>
          <Button
            // color={screenProps.tintColor}
            title='登录'
            onPress={() => {
              // navigation.navigate('Login');
              navigation.navigate('User');
            }}
          />
        </View>
      ) : (
        <View style={{ marginRight: 15 }}>
          <TouchableNativeFeedback
            onPress={() => {
              // navigation.navigate('Login');
              navigation.navigate('User');
            }}
          >
            <Text style={{ fontSize: 16 }}>登录</Text>
          </TouchableNativeFeedback>
        </View>
      );
    return {
      // headerTintColor: 'black',
      headerStyle: {
        borderBottomColor: '#bbb',
        borderBottomWidth: StyleSheet.hairlineWidth,
      },
      title: 'ATORY',
      // headerRight,
      // header: () => (
      //   <Header>
      //     <Left>
      //       <MaterialIcons
      //         color={screenProps.tintColor}
      //         onPress={() => navigation.navigate('DrawerOpen')}
      //         name='dehaze'
      //         size={24}
      //       />
      //     </Left>
      //     <Body>
      //       <Title>ATORY</Title>
      //     </Body>
      //     <Right />
      //   </Header>
      // ),
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
  }

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
