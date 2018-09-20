import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import TodoListScreen from './TodoList';
import { createStackNavigator } from 'react-navigation';
import { Container, Header, Body, Title } from 'native-base';
import TimerScreen from './Timer';

const RootStack = createStackNavigator(
  {
    TodoList: TodoListScreen,
    Timer: TimerScreen,
  },
  {
    initialRouteName: 'TodoList',
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <RootStack />
      </View>
    );
  }
}
