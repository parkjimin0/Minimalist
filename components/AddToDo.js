import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather, MaterialIcons, EvilIcons } from '@expo/vector-icons';

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
  // rowContainer: {
  //   flexDirection: 'column',
  //   // width: this.width / 2,
  //   alignItems: 'flex-start',
  //   justifyContent: 'flex-start',
  // },
});

export default class AddToDo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCompleted: false,
      isEditing: false,
    };
  }

  startEdit = () => {
    this.setState({
      isEditing: true,
    });
  };

  finishEdit = () => {
    this.setState({
      isEditing: false,
    });
  };

  toggleItem = () => {
    this.setState(prevState => {
      return {
        isCompleted: !prevState.isCompleted,
      };
    });
  };

  render() {
    const { isEditing, isCompleted } = this.state;
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
              onPress={this.props.deleteMethod}
              style={styles.buttonContainer}
            >
              <MaterialIcons name="clear" size={25} color="black" />
            </TouchableOpacity>
          </View>
        )}
        {/* <View style={styles.rowContainer}> */}
        <TouchableOpacity onPress={this.toggleItem}>
          <Text
            style={[
              styles.text,
              isCompleted ? styles.strikeText : styles.unstrikeText,
            ]}
          >
            {this.props.val.task}
          </Text>
        </TouchableOpacity>
        {/* </View> */}
      </View>
    );
  }
}
