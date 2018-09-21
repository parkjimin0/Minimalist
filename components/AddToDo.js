import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialIcons, EvilIcons } from '@expo/vector-icons';

export default class AddToDo extends Component {
  // async componentWillMount() {
  //   await Font.loadAsync({
  //     'Material Icons': require('@expo/vector-icons/fonts/MaterialIcons.ttf'),
  //   });
  //   this.setState({ fontsAreLoaded: true });
  // }

  render() {
    return (
      <View key={this.props.keyval} style={styles.container}>
        <TouchableOpacity
          onPress={this.props.deleteMethod}
          style={styles.deleteButton}
        >
          <MaterialIcons name="clear" size={20} color="black" />
        </TouchableOpacity>

        <TouchableOpacity onPress={this.props.timer} style={styles.timer}>
          <EvilIcons name="clock" size={30} color="black" />
        </TouchableOpacity>

        <Text style={styles.text}>{this.props.val.task}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  text: {
    alignSelf: 'stretch',
    color: 'black',
    borderBottomWidth: 5,
    fontSize: 18,
    borderTopWidth: 5,
    borderTopColor: '#fff',
  },
  deleteButton: {
    position: 'absolute',
    zIndex: 11,
    right: 15,
    bottom: 20,

    width: 20,
    height: 20,

    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    // alignSelf: 'flex-end',
  },

  timer: {
    alignSelf: 'flex-end',
  },
});
