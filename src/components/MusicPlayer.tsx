import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {addTrack, playbackService, SetupPlayer} from '../../musicPlyaerServices'

const MusicPlayerC = () => {
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  useEffect( ()=>{
    setup()
  },[])
  async function setup() {
    let isSetup = await SetupPlayer()
    if (isSetup){
      await addTrack()
    }
    setIsPlayerReady(isSetup)
  }
  if (!isPlayerReady){
    return
    <SafeAreaView>
      <ActivityIndicator></ActivityIndicator>
    </SafeAreaView>
  }
  return (
    <SafeAreaView>
      <Text>MusicPlayer</Text> 
    </SafeAreaView>
  ) 
}

export default MusicPlayerC

const styles = StyleSheet.create({})