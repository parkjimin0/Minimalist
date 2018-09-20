import React, { Component } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

export default class TimerScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>What time is it? </Text>
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
