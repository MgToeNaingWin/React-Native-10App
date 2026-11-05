
import {
  createAudioPlayer,
  setAudioModeAsync,
} from 'expo-audio';

import { SongsData } from './src/constants/songs';

export const musicPlayer = createAudioPlayer(
  SongsData[0]?.url ?? null
);

let isSetup = false;

export async function SetupPlayer() {
  if (isSetup) return true;

  try {
    await setAudioModeAsync({
      playsInSilentMode: true,
      shouldPlayInBackground: false,
    });

    isSetup = true;
    return true;
  } catch (error) {
    console.error('Player setup failed:', error);
    return false;
  }
}

export async function addTrack(index = 0) {
  const song = SongsData[index];

  if (!song) {
    console.error('Song not found');
    return;
  }

  musicPlayer.replace(song.url);
}

export async function playTrack(index) {
  const song = SongsData[index];

  if (!song) return;

  musicPlayer.replace(song.url);
  musicPlayer.play();
}

export async function playbackService() {
}
