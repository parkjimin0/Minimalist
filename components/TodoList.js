import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Button,
  TextInput,
} from 'react-native';
import AddTodo from './AddToDo';
import { Container, Header, Body, Title } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
// import { Header, Title } from 'react-native-elements';
// import AddTodoButton from './AddToDoButton';
import { AsyncStorage } from 'react-native';

export default class TodoListScreen extends Component {
  render() {
    console.log('what is this', AsyncStorage);
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>MINIMALIST</Text>
        </View>
        <ScrollView style={styles.scrollContainer} />
        <AddTodo />

        <View style={styles.footer}>
          <TextInput
            style={styles.textInput}
            placeholder="note"
            placeholderTextColor="white"
            underlineColorAndroid="transparent"
          />
        </View>
        <Text>List of things to doo </Text>
        <Button
          title="Go to Timer"
          onPress={() => this.props.navigation.navigate('Timer')}
        />
        {/* <AddTodoButton /> */}
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
