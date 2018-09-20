import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default class AddToDo extends Component {
  render() {
    return (
      <View key={this.props.keyval}>
        <Text>{this.props.val.task}</Text>
        <TouchableOpacity
          onPress={this.props.deleteMethod}
          style={styles.deleteButton}
        >
          <Text style={styles.deleteButtonText}>x</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textInput: {
    alignSelf: 'stretch',
    color: 'black',
    padding: 5,
    borderBottomWidth: 2,
    fontSize: 18,
    borderTopWidth: 5,
    borderTopColor: '#fff',
  },
  deleteButton: {
    position: 'absolute',
    zIndex: 11,
    right: 10,
    bottom: 10,
    backgroundColor: 'black',
    width: 10,
    height: 10,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 10,
  },
});
