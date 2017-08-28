import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-native';

class ArticleScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.name,
  });
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }
  render() {
    const { goBack } = this.props.navigation;
    return (
      <Button
        title='Go back'
        onPress={() => goBack()}
      />
    );
  }
}

export default ArticleScreen;
