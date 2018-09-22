import React, { Component } from 'react';
import uuidv1 from 'uuid/v1';
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

export default class TodoListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task: '',
      todos: {},
      isCompleted: false,
    };
  }
  componentDidMount = () => {
    this.loadTodos();
  };

  loadTodos = async () => {
    try {
      const getTodos = await AsyncStorage.getItem('todos');
      const parsedTodos = JSON.parse(getTodos);
      console.log('what is stored', parsedTodos);
      this.setState({ dataIsReady: true, todos: parsedTodos || {} });
    } catch (err) {
      console.log(err);
    }
  };

  taskStored = newToDos => {
    const saveToDos = AsyncStorage.setItem('todos', JSON.stringify(newToDos));

    return saveToDos;
  };

  inCompleteTodo = id => {
    this.setState(prevState => {
      const newState = {
        ...prevState,
        todos: {
          ...prevState.todos,
          [id]: {
            ...prevState.todos[id],
            isCompleted: false,
          },
        },
      };

      this.taskStored(newState.todos);
      return { ...newState };
    });
  };

  completeTodo = id => {
    this.setState(prevState => {
      const newState = {
        ...prevState,
        todos: {
          ...prevState.todos,
          [id]: {
            ...prevState.todos[id],
            isCompleted: true,
          },
        },
      };
      this.taskStored(newState.todos);
      return { ...newState };
    });
  };

  newTask = txt => {
    this.setState({
      task: txt,
    });
  };

  addNote() {
    const { task } = this.state;
    if (task) {
      this.setState(prevState => {
        const ID = uuidv1();
        const newToDoObject = {
          [ID]: {
            id: ID,
            isCompleted: false,
            textValue: task,
          },
        };
        const newState = {
          ...prevState,
          task: '',
          todos: {
            ...prevState.todos,
            ...newToDoObject,
          },
        };
        this.taskStored(newState.todos);
        return { ...newState };
      });
    }
  }

  updateTodo = (id, textValue) => {
    this.setState(prevState => {
      const newState = {
        ...prevState,
        todos: {
          ...prevState.todos,
          [id]: {
            ...prevState.todos[id],
            textValue: textValue,
          },
        },
      };
      this.taskStored(newState.todos);
      return { ...newState };
    });
  };

  deleteTodo = id => {
    this.setState(prevState => {
      const todos = prevState.todos;
      delete todos[id];
      const newState = {
        ...prevState,
        ...todos,
      };
      this.taskStored(newState.todos);
      return { ...newState };
    });
  };

  render() {
    const { task, todos, isCompleted } = this.state;
    console.log('my AsyncStorage', AsyncStorage);

    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollContainer}>
          {Object.values(todos).map(todo => (
            <AddToDo
              key={todo.id}
              {...todo}
              deleteTodo={this.deleteTodo}
              isCompleted={isCompleted}
              inCompleteTodo={this.inCompleteTodo}
              completeTodo={this.completeTodo}
              updateTodo={this.updateTodo}
              timer={() => this.props.navigation.navigate('Timer')}
            />
          ))}
        </ScrollView>
        <TextInput
          style={styles.textInput}
          placeholder="What do you need to do?"
          placerholderTextColor="white"
          underlineColorAndroid="transparent"
          onChangeText={this.newTask}
          value={task}
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
