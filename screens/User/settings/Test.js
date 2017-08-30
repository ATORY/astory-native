import React from 'react';
import { View, Text, Button } from 'react-native';

const Test1 = () => (
  <View>
    <Text>Test1</Text>
    <Button
      onPress={() => this.props.navigation.navigate('Test')}
      title='Go back home'
    />
  </View>
);

export default Test1;
