import registerRootComponent from 'expo/src/launch/registerRootComponent';
import { playbackService } from './src/services'
import TrackPlayer from 'react-native-track-player';

import App from './app';

registerRootComponent(App);
TrackPlayer.registerPlaybackService(() => playbackService)
