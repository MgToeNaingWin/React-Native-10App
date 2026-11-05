
import React, { useState, useEffect, useRef } from 'react';

import {
  Dimensions,
  Image,
  StyleSheet,
  View,
} from 'react-native';

import {
  useAudioPlayer,
  useAudioPlayerStatus,
} from 'expo-audio';

import { SongsData } from '../constants/songs';

import MusicControl from '../components/MusicControl';
import SongInfo from '../components/SongInfo';
import SongSlider from '../components/SongSlider';

const { width } = Dimensions.get('window');

const MusicPlayer = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentTrack = SongsData[currentIndex];

  const player = useAudioPlayer(currentTrack.url);
  const status = useAudioPlayerStatus(player);

  const shouldPlayAfterLoad = useRef(false);
  const hasStartedLoading = useRef(false);
  const finishedHandled = useRef(false);

  // Change track
  const playTrack = (index: number) => {
    const song = SongsData[index];

    if (!song) return;

    shouldPlayAfterLoad.current = true;
    hasStartedLoading.current = false;

    player.pause();

    setCurrentIndex(index);

    player.replace(song.url);
  };

  // Wait for new audio source to load
  useEffect(() => {
    if (!shouldPlayAfterLoad.current) return;

    if (!status.isLoaded) {
      hasStartedLoading.current = true;
      return;
    }

    if (hasStartedLoading.current && status.isLoaded) {
      shouldPlayAfterLoad.current = false;
      player.play();
    }
  }, [status.isLoaded, player]);

  // Next song
  const playNext = () => {
    const nextIndex =
      (currentIndex + 1) % SongsData.length;

    playTrack(nextIndex);
  };

  // Previous song
  const playPrevious = () => {
    const previousIndex =
      (currentIndex - 1 + SongsData.length) %
      SongsData.length;

    playTrack(previousIndex);
  };

  // Automatically play next song when finished
  useEffect(() => {
    if (!status.didJustFinish) {
      finishedHandled.current = false;
      return;
    }

    if (finishedHandled.current) return;

    finishedHandled.current = true;

    playNext();
  }, [status.didJustFinish, currentIndex]);

  // Audio debugging
  useEffect(() => {
    console.log('Current song:', currentTrack.title);
    console.log('Loaded:', status.isLoaded);
    console.log('Playing:', status.playing);
    console.log('Finished:', status.didJustFinish);
    console.log('Error:', status.error);
  }, [
    currentIndex,
    status.isLoaded,
    status.playing,
    status.didJustFinish,
    status.error,
  ]);

  return (
    <View style={styles.container}>

      {/* Album Artwork */}
      <View style={styles.listArtWrapper}>
        <View style={styles.albumContainer}>
          <Image
            key={currentTrack.id}
            style={styles.albumImage}
            source={currentTrack.artwork}
            resizeMode="cover"
          />
        </View>
      </View>

      {/* Song Information */}
      <SongInfo track={currentTrack} />

      {/* Song Slider */}
      <SongSlider player={player} />

      {/* Music Controls */}
      <MusicControl
        player={player}
        status={status}
        onNext={playNext}
        onPrevious={playPrevious}
      />

    </View>
  );
};

export default MusicPlayer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'center',
    alignItems: 'center',
  },

  listArtWrapper: {
    width,
    justifyContent: 'center',
    alignItems: 'center',
  },

  albumContainer: {
    width: width * 0.75,
    height: width * 0.75,
    borderRadius: 15,
    overflow: 'hidden',
  },

  albumImage: {
    width: '100%',
    height: '100%',
  },
});
