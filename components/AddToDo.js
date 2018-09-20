import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Fab, Icon } from 'native-base';

export default class AddToDo extends Component {
  constructor() {
    super();
    this.state = {
      task: '',
    };
  }

  render() {
    return (
      <View>
        <Text>What do I do? </Text>
      </View>
    );
  }
}
