import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import { Feather, MaterialIcons, EvilIcons } from '@expo/vector-icons';
import { LinearGradient, AppLoading } from 'expo';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
  },
  text: {
    paddingLeft: 10,
    alignSelf: 'stretch',
    color: 'black',
    borderBottomWidth: 2,
    fontSize: 18,
    borderTopWidth: 5,
    borderTopColor: '#fff',
    marginRight: 140,
  },
  strikeText: {
    color: '#bbb',
    textDecorationLine: 'line-through',
  },
  unstrikeText: {
    color: 'black',
  },

  buttonContainer: {
    marginVertical: 0,
    marginHorizontal: 10,
    flexDirection: 'column',
    alignItems: 'center',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
});

export default class AddToDo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      changedTask: this.props.textValue,
      dataIsReady: false,
      // todos: this.props.todos,
    };
  }

  static propTypes = {
    textValue: PropTypes.string.isRequired,
    isCompleted: PropTypes.bool.isRequired,
    deleteTodo: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    inCompleteTodo: PropTypes.func.isRequired,
    completeTodo: PropTypes.func.isRequired,
    updateTodo: PropTypes.func.isRequired,
  };

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

  controlInput = txt => {
    this.setState({ changedTask: txt });
  };

  startEdit = () => {
    this.setState({
      isEditing: true,
    });
  };

  finishEdit = () => {
    const { changedTask } = this.state;
    const { id, updateTodo } = this.props;
    updateTodo(id, changedTask);
    this.setState({
      isEditing: false,
    });
  };

  toggleItem = () => {
    const { isCompleted, inCompleteTodo, completeTodo, id } = this.props;
    if (isCompleted) {
      inCompleteTodo(id);
    } else {
      completeTodo(id);
    }
  };

  render() {
    const { isEditing, changedTask, dataIsReady } = this.state;

    const { textValue, id, deleteTodo, isCompleted } = this.props;
    if (!dataIsReady) return <AppLoading />;
    return (
      <View key={this.props.keyval} style={styles.container}>
        {isEditing ? (
          <View key={this.props.keyval} style={styles.buttons}>
            <TouchableOpacity onPress={this.finishEdit}>
              <View style={styles.buttonContainer}>
                <MaterialIcons name="done" size={20} color="black" />
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          <View key={this.props.keyval} style={styles.buttons}>
            <TouchableOpacity onPress={this.startEdit}>
              <View style={styles.buttonContainer}>
                <Feather name="edit-2" size={22} color="black" />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={this.props.timer}
              style={styles.buttonContainer}
            >
              <EvilIcons name="clock" size={30} color="black" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => deleteTodo(id)}
              style={styles.buttonContainer}
            >
              <MaterialIcons name="clear" size={25} color="black" />
            </TouchableOpacity>
          </View>
        )}

        {isEditing ? (
          <TextInput
            style={[
              styles.text,
              isCompleted ? styles.strikeText : styles.unstrikeText,
            ]}
            multiline={true}
            onBlur={this.finishEdit}
            onChangeText={this.controlInput}
            value={changedTask}
          />
        ) : (
          <TouchableOpacity onPress={this.toggleItem}>
            <Text
              style={[
                styles.text,
                isCompleted ? styles.strikeText : styles.unstrikeText,
              ]}
            >
              {textValue}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}
