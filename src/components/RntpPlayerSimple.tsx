
import React from 'react';
import {
  View,
  Text,
  Pressable,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

import Slider from '@react-native-community/slider';

import {
  useAudioPlayer,
  useAudioPlayerStatus,
} from 'expo-audio';

const AUDIO_URL =
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';

export default function RntpPlayerSimple() {
  // Create the audio player
  const player = useAudioPlayer(AUDIO_URL, {
    updateInterval: 500,
  });

  // Get live playback information
  const status = useAudioPlayerStatus(player);

  // Format seconds into minutes and seconds
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = Math.floor(secs % 60);

    return `${mins}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  // Loading state
  if (!status.isLoaded) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#1DB954" />
        <Text>Loading audio...</Text>
        {status.error && (
          <Text style={styles.errorText}>{status.error}</Text>
        )}
      </View>
    );
  }

  // Buffering state
  if (status.isBuffering) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#1DB954" />
        <Text>Buffering...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Track Information */}
      <View style={styles.trackInfo}>
        <Text style={styles.title}>Demo Track</Text>
        <Text style={styles.artist}>SoundHelix</Text>
      </View>

      {/* Progress Slider */}
      <View style={styles.progressContainer}>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={status.duration || 1}
          value={Math.min(status.currentTime, status.duration || 1)}
          onSlidingComplete={(value) => {
            void player.seekTo(value);
          }}
          minimumTrackTintColor="#1DB954"
          maximumTrackTintColor="#ccc"
          thumbTintColor="#1DB954"
        />

        <View style={styles.timeRow}>
          <Text style={styles.timeText}>
            {formatTime(status.currentTime)}
          </Text>

          <Text style={styles.timeText}>
            {formatTime(status.duration)}
          </Text>
        </View>
      </View>

      {/* Play / Pause Button */}
      <Pressable
        style={styles.playButton}
        onPress={() => {
          if (status.playing) {
            player.pause();
          } else {
            player.play();
          }
        }}
      >
        <Text style={styles.playButtonText}>
          {status.playing ? 'Pause' : 'Play'}
        </Text>
      </Pressable>

      {/* Playback Error */}
      {status.error && (
        <Text style={styles.errorText}>{status.error}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },

  trackInfo: {
    alignItems: 'center',
    marginBottom: 40,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  artist: {
    fontSize: 18,
    color: '#666',
  },

  progressContainer: {
    width: '100%',
    marginBottom: 40,
  },

  slider: {
    width: '100%',
    height: 40,
  },

  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: -10,
  },

  timeText: {
    fontSize: 14,
    color: '#666',
  },

  playButton: {
    backgroundColor: '#1DB954',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 30,
  },

  playButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },

  errorText: {
    color: 'red',
    marginTop: 15,
  },
});
