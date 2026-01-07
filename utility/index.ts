import { Song } from "react-native-get-music-files/lib/typescript/src/NativeTurboSongs";
import { Track } from "react-native-track-player";

export const SongToTrack = (list: Song[] | string): Track[] | [] => {
  if (typeof list === 'string') {
    console.log(list);
    return []
  }
  return list.map((item) => {
    return {
      url: item.url,
      album: item.album,
      cover: item.cover,
      genre: item.genre,
      title: item.title,
      artist: item.artist,
      duration: item.duration
    }
  })
}
