import React, { Component } from 'react';
import TodoListScreen from './TodoList';
import { createStackNavigator } from 'react-navigation';
import TimerScreen from './Timer';

const RootStack = createStackNavigator({
  ToDoList: {
    screen: TodoListScreen,
    navigationOptions: () => ({
      title: 'M I N I M A L I S T',
      headerTitleStyle: {
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: 20,
        justifyContent: 'center',
        flex: 1,
        fontFamily: 'sans-serif-thin',
      },
      headerTransparent: true,
    }),
  },
  Timer: {
    screen: TimerScreen,
  },
  initialRouteName: 'TodoList',
});

export default class App extends Component {
  render() {
    return <RootStack />;
  }
}
