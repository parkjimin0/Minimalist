import React, { Component } from 'react';
// import AddToDoButton from './AddToDoButton';
import AddToDo from './AddToDo';
import {
  StyleSheet,
  View,
  ScrollView,
  AsyncStorage,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    borderBottomWidth: 1.5,
  },
  scrollContainer: {
    // flex: 1,
    marginBottom: 100,

    marginTop: 25,
  },
  textInput: {
    alignSelf: 'stretch',
    color: 'black',
    padding: 5,
    borderBottomWidth: 5,
    fontSize: 18,
    borderTopWidth: 5,
    borderTopColor: '#fff',
    marginBottom: 10,
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

let counter = 1;
export default class TodoListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task: '',
      taskList: [],
    };
  }

  // async getAllTasks() {
  //   try {
  //     // AsyncStorage.clear();
  //     const allKeys = await AsyncStorage.getAllKeys();
  //     console.log('what is all keys', allKeys);
  //     let newTaskList = [];
  //     for (let i = 1; i < allKeys.length; i++) {
  //       let task = await AsyncStorage.getItem(`${i}`);
  //       newTaskList.push(task);
  //     }

  //     this.setState({ taskList: newTaskList });
  //   } catch (err) {
  //     alert(err);
  //   }
  // }
  // componentDidMount() {
  //   this.getAllTasks();
  // }
  newTodoItem = txt => {
    this.setState({
      task: txt,
    });
  };

  addNote() {
    const { taskList, task } = this.state;
    if (task) {
      taskList.push({
        task: task,
      });

      const taskArr = {
        taskList: taskList,
      };

      // console.log('counter before', counter);
      // AsyncStorage.setItem(`${counter}`, task);
      // counter++;
      // console.log('counter', counter);

      this.setState({ taskList: taskList });
      this.setState({ task: '' });
    }
  }

  async deleteTask(key) {
    // await AsyncStorage.removeItem(key);
    this.state.taskList.splice(key, 1);
    this.setState({ taskList: this.state.taskList });
  }

  render() {
    // console.log('all tasks?', this.state.taskList);
    let tasks = this.state.taskList.map((val, key) => {
      return (
        <AddToDo
          key={key}
          keyval={key}
          val={val}
          deleteMethod={() => this.deleteTask(key)}
          timer={() => this.props.navigation.navigate('Timer')}
        />
      );
    });

    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollContainer}>{tasks}</ScrollView>
        <TextInput
          style={styles.textInput}
          placeholder="What do you need to do?"
          placerholderTextColor="white"
          underlineColorAndroid="transparent"
          onChangeText={this.newTodoItem}
          value={this.state.task}
        />
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
