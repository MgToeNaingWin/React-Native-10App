
import React from 'react';

import { View, StyleSheet, Pressable } from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import {
  faPlay,
  faPause,
  faForwardStep,
  faBackwardStep,
} from '@fortawesome/free-solid-svg-icons';

import type { AudioPlayer, AudioStatus } from 'expo-audio';

type MusicControlProps = {
  player: AudioPlayer;
  status: AudioStatus;
  onNext: () => void;
  onPrevious: () => void;
};

const MusicControl = ({
  player,
  status,
  onNext,
  onPrevious,
}: MusicControlProps) => {

  const togglePlayback = () => {
    if (status.playing) {
      player.pause();
    } else {
      player.play();
    }
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={onPrevious}>
        <FontAwesomeIcon
          icon={faBackwardStep}
          size={35}
          color="green"
        />
      </Pressable>

      <Pressable onPress={togglePlayback}>
        <FontAwesomeIcon
          icon={status.playing ? faPause : faPlay}
          size={50}
          color="green"
        />
      </Pressable>

      <Pressable onPress={onNext}>
        <FontAwesomeIcon
          icon={faForwardStep}
          size={35}
          color="green"
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 45,
    padding: 20,
    marginBottom:42
  },
});

export default MusicControl;
