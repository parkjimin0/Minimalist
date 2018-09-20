import React, { Component } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import AddTodo from './AddToDo';
import { Container, Header, Body, Title } from 'native-base';

export default class TodoListScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Title
          leftComponent={{ icon: 'menu', color: '#fff' }}
          centerComponent={{ text: 'MY TITLE', style: { color: '#fff' } }}
          rightComponent={{ icon: 'home', color: '#fff' }}
        />
        <Text>MINIMALIST</Text>
        <AddTodo />
        <Text>List of things to doo </Text>
        <Button
          title="Go to Timer"
          onPress={() => this.props.navigation.navigate('Timer')}
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
