import React, { Component } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Vibration,
  Platform,
} from 'react-native';
import Expo from 'expo';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';
momentDurationFormatSetup(moment);

import { Ionicons } from '@expo/vector-icons';

export default class TimerScreen extends Component {
  state = {
    started: null,
    timeDifference: null,
    timer: null,
    finished: null,
  };
  constructor() {
    super();

    this.tick = this.tick.bind(this);
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
  componentWillUnmount() {
    clearInterval(this.timer);
  }
  handleStart() {
    this.setState({ started: moment() }, () => {
      this.timer = setInterval(this.tick, 1000);
    });
  }

  tick() {
    this.setState({ timeDifference: moment().diff(this.state.started) });
  }

  handleReset() {
    Vibration.vibrate(3000);

    this.playTrack();
    alert(
      `It took ${moment
        .duration(this.state.timeDifference, 'milliseconds')
        .format('h [hours], m [minutes], s [seconds]')} to finish! `
    );
    this.setState({ timeDifference: null, timer: null, started: false });
    clearInterval(this.timer);
  }

  timerText() {
    return (
      <Text style={styles.timerText}>
        {moment
          .duration(this.state.timeDifference, 'milliseconds')
          .format('h:mm:ss')}
      </Text>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView
          enableOnAndroid
          enableAutomaticScroll
          keyboardOpeningTime={0}
        >
          <View style={styles.box}>
            <Text style={styles.timer}>{this.timerText()}</Text>
          </View>
          <View
            style={
              (styles.box, { flexDirection: 'row', alignItems: 'baseline' })
            }
          >
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => this.handleStart()}
            >
              <Ionicons name="ios-play-outline" color="black" size={70} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => {
                this.handleReset();
              }}
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
              underlineColorAndroid="transparent"
              placeholder="+ Minutes"
              onChangeText={text => {
                this.handleStart();
                if (text > 0) {
                  setTimeout(() => {
                    this.playTrack();
                    alert(`Time's up! `);
                  }, text * 60000);
                }
              }}
              value={this.state.timeGoal}
            />
          </View>
        </KeyboardAwareScrollView>
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
    fontSize: 70,
    textAlign: 'center',
    color: 'black',
  },
  buttonContainer: {
    marginHorizontal: 30,
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
});
