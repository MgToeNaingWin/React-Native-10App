
import React from 'react';

import { StyleSheet, Text, View } from 'react-native';

import { useAudioPlayerStatus } from 'expo-audio';
import type { AudioPlayer } from 'expo-audio';

import Slider from '@react-native-community/slider';

type SongSliderProps = {
  player: AudioPlayer;
};

const formatTime = (seconds: number) => {
  const safeSeconds = Number.isFinite(seconds) ? seconds : 0;

  const minutes = Math.floor(safeSeconds / 60);
  const remainingSeconds = Math.floor(safeSeconds % 60);

  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

const SongSlider = ({ player }: SongSliderProps) => {
  const status = useAudioPlayerStatus(player);

  const position = status.currentTime ?? 0;
  const duration = status.duration ?? 0;

  const handleSeek = (value: number) => {
    player.seekTo(value);
  };

  return (
    <View style={styles.container}>
      <Slider
        style={styles.slider}
        value={position}
        minimumValue={0}
        maximumValue={duration > 0 ? duration : 1}
        minimumTrackTintColor="#1DB954"
        maximumTrackTintColor="#555555"
        thumbTintColor="#FFFFFF"
        onSlidingComplete={handleSeek}
        disabled={duration <= 0}
      />

      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>
          {formatTime(position)}
        </Text>

        <Text style={styles.timeText}>
          -{formatTime(Math.max(0, duration - position))}
        </Text>
      </View>
    </View>
  );
};

export default SongSlider;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 20,
    marginVertical: 15,
  },

  slider: {
    width: '100%',
    height: 40,
  },

  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  timeText: {
    fontSize: 12,
    color: '#AAAAAA',
  },
});
