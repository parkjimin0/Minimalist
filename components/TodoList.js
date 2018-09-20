import React, { Component } from 'react';
// import AddToDoButton from './AddToDoButton';
import AddToDo from './AddToDo';
import {
  StyleSheet,
  View,
  ScrollView,
  Button,
  AsyncStorage,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1.5,
  },
  scrollContainer: {
    flex: 1,
    marginBottom: 100,
  },
  textInput: {
    alignSelf: 'stretch',
    color: 'black',
    padding: 5,
    borderBottomWidth: 2,
    fontSize: 18,
    borderTopWidth: 5,
    borderTopColor: '#fff',
  },
  addButton: {
    position: 'absolute',
    zIndex: 11,
    right: 20,
    bottom: 90,
    backgroundColor: 'black',
    width: 90,
    height: 90,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 24,
  },
});

export default class TodoListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task: '',
      taskList: [],
    };
  }

  addNote() {
    if (this.state.task) {
      this.state.taskList.push({
        task: this.state.task,
      });
      this.setState({ taskList: this.state.taskList });
      this.setState({ task: '' });
    }
  }

  deleteTask(key) {
    this.state.taskList.splice(key, 1);
    this.setState({ taskList: this.state.taskList });
  }

  render() {
    let tasks = this.state.taskList.map((val, key) => {
      return (
        <View key={val}>
          <AddToDo
            key={key}
            keyval={key}
            val={val}
            deleteMethod={() => this.deleteTask(key)}
          />
          <Button
            title="Go to Timer"
            onPress={() => this.props.navigation.navigate('Timer')}
          />
        </View>
      );
    });

    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollContainer}>{tasks}</ScrollView>
        <View>
          <TextInput
            style={styles.textInput}
            placeholder=">task"
            placerholderTextColor="white"
            underlineColorAndroid="transparent"
            onChangeText={task => this.setState({ task: task })}
            value={this.state.task}
          />
        </View>
        <TouchableOpacity
          style={styles.addButton}
          onPress={this.addNote.bind(this)}
        >
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
