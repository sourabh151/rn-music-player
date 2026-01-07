import TrackPlayer, { Event } from 'react-native-track-player'

export const playbackService =
  async () => {
    console.log('TrackPlayer attached to background');

    TrackPlayer.addEventListener(Event.RemotePlay, () => {
      console.log('TrackPlayer playing in background');
      TrackPlayer.play();
    })
    TrackPlayer.addEventListener(Event.RemotePause, () => {
      console.log('TrackPlayer paused in background');
      TrackPlayer.pause();
    })
  }
