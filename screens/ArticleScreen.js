import React from 'react';
import PropTypes from 'prop-types';
import { View, ActivityIndicator,
  Text, WebView, Platform } from 'react-native';
import { graphql } from 'react-apollo';

import { articleQuery } from '../graphql/querys';
import webStyle from './ArticleCSS';

class ArticleScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.title,
  });
  static propTypes = {
    // navigation: PropTypes.object.isRequired,
    data: PropTypes.shape({
      loading: PropTypes.bool,
      error: PropTypes.object,
      article: PropTypes.object,
    }).isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      webViewHight: 100,
    };
  }

  setWebViewHight = () => {

  }

  render() {
    // const { goBack } = this.props.navigation;
    const { loading, error, article } = this.props.data;
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
    const content = article.content.replace('\n', '\r\n', 'g');
    const html = `
      <html>
      <head>
        <meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1.0, maximum-scale=1.0">
        <link rel='stylesheet' href='https://necolas.github.io/normalize.css/7.0.0/normalize.css' />
        <link rel='stylesheet' href='https://cdn.quilljs.com/1.2.6/quill.snow.css' />
        <link rel='stylesheet' href='https://cdn.bootcss.com/highlight.js/9.12.0/styles/atom-one-dark.min.css' />
        ${webStyle}
      </head>
      <body>
        <div class='quill'>
          <div class='ql-container ql-snow'>
            <div class='ql-editor'>
            ${content}
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
    return (
      <WebView
        automaticallyAdjustContentInsets={false}
        source={{ html }}
        style={{ flex: 1 }}
        scalesPageToFit={(Platform.OS === 'ios')}
        // contentInset={{ top: 25, left: 20, bottom: 25, right: 20 }}
      />
    );
  }
}

const ArticleScreenWithData = graphql(articleQuery, {
  options: (props) => {
    const variables = { articleId: props.navigation.state.params._id };
    return { variables };
  },
})(ArticleScreen);

export default ArticleScreenWithData;
