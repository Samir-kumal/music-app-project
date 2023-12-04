// play audio

export const play = async (playbackObj, uri) => {
  try {
    return await playbackObj.loadAsync({ uri: uri }, { shouldPlay: true });
  } catch (err) {
    console.log(err);
  }
};
// pause audio
export const pause = async (playbackObj) => {
  try {
    return await playbackObj.setStatusAsync({ shouldPlay: false });
  } catch (err) {
    console.log(err);
  }
};

// resume audio
export const resume = async (playbackObj) => {
  try {
    return await playbackObj.setStatusAsync({ shouldPlay: true });
  } catch (err) {
    console.log(err);
  }
};
// select audio
export const playNext = async (playbackObj, uri) => {
  try {
    await playbackObj.stopAsync();
    await playbackObj.unloadAsync();
    console.log("function revoked")
    return await play(playbackObj, uri);
  } catch (err) {
    console.log(err);
  }
};
