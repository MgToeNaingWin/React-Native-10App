
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

import { Track } from '../constants/songs';

type SongInfoProps = {
  track: Track | null | undefined;
};

const SongInfo = ({ track }: SongInfoProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title} numberOfLines={1}>
        {track?.title ?? 'Unknown Title'}
      </Text>

      <Text style={styles.artist} numberOfLines={1}>
        {track?.artist ?? 'Unknown Artist'}
      </Text>

      <Text style={styles.album} numberOfLines={1}>
        {track?.album ?? 'Unknown Album'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginVertical: 20,
  },

  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },

  artist: {
    fontSize: 17,
    color: '#B3B3B3',
    marginBottom: 5,
  },

  album: {
    fontSize: 14,
    color: '#777777',
  },
});

export default SongInfo;
