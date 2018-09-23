import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Vibration,
} from 'react-native';

import Expo from 'expo';

import { Ionicons } from '@expo/vector-icons';

export default class TimerScreen extends Component {
  constructor() {
    super();
    this.state = {
      countDown: false,
      remainingSeconds: 30 * 60,
      interval: null,
    };
  }

  handleStart() {
    const ival = setInterval(() => {
      if (this.state.remainingSeconds > 0 && this.state.countDown) {
        this.setState(prevState => {
          return { remainingSeconds: prevState.remainingSeconds - 1 };
        });
      }
    }, 1000);

    this.setState(prevState => {
      return {
        remainingSeconds: prevState.remainingSeconds,
        countDown: true,
        interval: ival,
      };
    });
  }

  handleStop() {
    clearInterval(this.state.interval);
    this.setState(prevState => {
      return {
        remainingSeconds: prevState.remainingSeconds,
        countDown: false,
        interval: null,
      };
    });
  }

  handleReset() {
    clearInterval(this.state.interval);
    this.setState(() => {
      return {
        remainingSeconds: 30 * 60,
        countDown: false,
      };
    });
  }

  formatRemainingSeconds(remainingSeconds) {
    let numMinutes = Math.floor(remainingSeconds / 60);

    let numSeconds = remainingSeconds % 60;
    let formattedTime = '';

    if (numMinutes.toString().length == 1) {
      formattedTime += '0';
      formattedTime += numMinutes.toString();
    } else {
      formattedTime += numMinutes.toString();
    }

    formattedTime += ':';

    if (numSeconds.toString().length == 1) {
      formattedTime += '0';
      formattedTime += numSeconds.toString();
    } else {
      formattedTime += numSeconds.toString();
    }

    return formattedTime;
  }

  async playTrack() {
    const soundObject = new Expo.Audio.Sound();
    try {
      await soundObject.loadAsync(require('./ovenbell.mp3'));
      await soundObject.playAsync();
      // Your sound is playing!
    } catch (err) {
      console.error('Sound problems', err);
    }
  }

  render() {
    if (this.state.remainingSeconds === 1) {
      Vibration.vibrate(3000);

      this.playTrack();
      alert(`Time's up!`);
    }
    return (
      <View style={styles.container}>
        <View style={styles.box}>
          <Text style={styles.timer}>
            {this.formatRemainingSeconds(this.state.remainingSeconds)}
          </Text>
        </View>
        <View
          style={(styles.box, { flexDirection: 'row', alignItems: 'baseline' })}
        >
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => this.handleStart()}
          >
            <Ionicons name="ios-play-outline" color="black" size={70} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => this.handleStop()}
          >
            <Ionicons name="ios-pause-outline" size={70} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => this.handleReset()}
          >
            <Ionicons
              name="ios-remove-circle-outline"
              size={70}
              color="black"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.box}>
          <TextInput
            style={{
              flex: 1,
              alignSelf: 'stretch',
              color: 'black',
              padding: 5,
              borderBottomWidth: 5,
              fontSize: 30,
              borderTopWidth: 5,
              borderTopColor: '#fff',
              marginBottom: 10,
            }}
            placeholder="+"
            onChangeText={text =>
              this.setState({ remainingSeconds: Number(text) * 60 })
            }
            value={this.state.remainingSeconds}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'column',
  },
  box: {
    padding: 20,
    flex: 1,
  },
  timer: {
    fontSize: 100,
    textAlign: 'center',
    color: 'black',
  },
  buttonContainer: {
    marginHorizontal: 30,
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
});
