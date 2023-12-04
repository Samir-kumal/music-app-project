import React, { Component, createContext,useState } from 'react';
import { Text, View, Alert } from 'react-native';
// import { DataProvider } from 'recyclerlistview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Audio } from 'expo-av';
// import { playNext } from '../misc/audioController';
export const AudioContext = createContext();
const AudioProvider = ({children})=> {
 const [audioFiles, setAudioFiles] = useState([]);
    const [playList, setPlayList] = useState([]);
    // const [addToPlayList, setAddToPlayList] = useState(null);
   
    const [playbackObj, setPlaybackObj] = useState(null);
    const [soundObj, setSoundObj] = useState(null);
    const [currentAudio, setCurrentAudio] = useState({});
    // const [isPlaying, setIsPlaying] = useState(false);
    // const [isPlayListRunning, setIsPlayListRunning] = useState(false);
    // const [activePlayList, setActivePlayList] = useState([]);
    // const [currentAudioIndex, setCurrentAudioIndex] = useState(null);
    // const [playbackPosition, setPlaybackPosition] = useState(null);
    // const [playbackDuration, setPlaybackDuration] = useState(null);
    // const [totalAudioCount, setTotalAudioCount] = useState(0);
   


//   loadPreviousAudio = async () => {
//     let previousAudio = await AsyncStorage.getItem('previousAudio');
//     let currentAudio;
//     let currentAudioIndex;

//     if (previousAudio === null) {
//       currentAudio = this.state.audioFiles[0];
//       currentAudioIndex = 0;
//     } else {
//       previousAudio = JSON.parse(previousAudio);
//       currentAudio = previousAudio.audio;
//       currentAudioIndex = previousAudio.index;
//     }

//     this.setState({ ...this.state, currentAudio, currentAudioIndex });
//   };

  
//   onPlaybackStatusUpdate = async playbackStatus => {
//     if (playbackStatus.isLoaded && playbackStatus.isPlaying) {
//       setPlaybackPosition(playbackStatus.positionMillis);
//         setPlaybackDuration(playbackStatus.durationMillis);
//     }

//     if (playbackStatus.isLoaded && !playbackStatus.isPlaying) {
//       storeAudioForNextOpening(
//         currentAudio,
//         currentAudioIndex,
//         playbackStatus.positionMillis
//       );
//     }

//     if (playbackStatus.didJustFinish) {
//       if (isPlayListRunning) {
//         let audio;
//         const indexOnPlayList = activePlayList.audios.findIndex(
//           ({ id }) => id === currentAudio.id
//         );
//         const nextIndex = indexOnPlayList + 1;
//         audio = activePlayList.audios[nextIndex];

//         if (!audio) audio = activePlayList.audios[0];

//         const indexOnAllList = audioFiles.findIndex(
//           ({ id }) => id === audio.id
//         );

//         const status = await playNext(playbackObj, audio.uri);
//         return this.updateState(this, {
//           soundObj: status,
//           isPlaying: true,
//           currentAudio: audio,
//           currentAudioIndex: indexOnAllList,
//         });
//       }

//       const nextAudioIndex = currentAudioIndex + 1;
//       // there is no next audio to play or the current audio is the last
//       if (nextAudioIndex >= totalAudioCount) {
//         this.state.playbackObj.unloadAsync();
//         this.updateState(this, {
//           soundObj: null,
//           currentAudio: audioFiles[0],
//           isPlaying: false,
//           currentAudioIndex: 0,
//           playbackPosition: null,
//           playbackDuration: null,
//         });
//         return await storeAudioForNextOpening(audioFiles[0], 0);
//       }
//       // otherwise we want to select the next audio
//       const audio = audioFiles[nextAudioIndex];
//       const status = await playNext(playbackObj, audio.uri);
//       this.updateState(this, {
//         soundObj: status,
//         currentAudio: audio,
//         isPlaying: true,
//         currentAudioIndex: nextAudioIndex,
//       });
//       await storeAudioForNextOpening(audio, nextAudioIndex);
//     }
//   };

 

//   updateState = (prevState, newState = {}) => {
//     this.setState({ ...prevState, ...newState });
//   };

  
    return (
      <AudioContext.Provider
        value={{
        //   audioFiles,
        //   playList,
        //   addToPlayList,
        //   dataProvider,
        setSoundObj,
        setPlaybackObj,
        setCurrentAudio,
          playbackObj,
          soundObj,
          currentAudio,
        //   isPlaying,
        //   currentAudioIndex,
        //   totalAudioCount: totalAudioCount,
        //   playbackPosition,
        //   playbackDuration,
        //   isPlayListRunning,
        //   activePlayList,
        //   updateState: updateState,
        //   loadPreviousAudio: loadPreviousAudio,
        //   onPlaybackStatusUpdate: onPlaybackStatusUpdate,
        }}
      >
        {children}      
      </AudioContext.Provider>
    );
  }


export default AudioProvider;
