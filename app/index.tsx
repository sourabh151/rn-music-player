import { useEffect, useState } from 'react'
import { View, Text, Pressable } from 'react-native'
import { usePermissions } from 'expo-media-library'
import { FlatList } from 'react-native-gesture-handler'
import TrackPlayer, { Track } from 'react-native-track-player'
import { getAll } from 'react-native-get-music-files'
import { SongToTrack } from '@/utility'

type TrackItemProps = {
  item: Track,
  index: number
}

const Index = () => {
  const [tracks, setTracks] = useState<Track[] | []>([])
  const [permission, requestPermission] = usePermissions()
  useEffect(() => {
    (async () => {
      if (!permission?.granted) {
        const response = await requestPermission()
        if (!response.granted) {
          return;
        }
        // await loadMusic();
        // TrackPlayer.add(tracks)
        const result = await getAll();
        setTracks(SongToTrack(result))
      }
    })()
    TrackPlayer.setupPlayer();
  }, [permission?.granted, requestPermission, tracks])
  // const loadMusic = async () => {
  //   const first = await getAssetsAsync({
  //     first: 1,
  //     mediaType: 'audio'
  //   })
  //   if (first.totalCount === 0) {
  //     return;
  //   }
  //   const all = await getAssetsAsync({
  //     first: first.totalCount,
  //     mediaType: 'audio'
  //   })
  //   const trackArray: Track[] = all.assets.map((v) => {
  //     return {
  //       url: v.uri,
  //       album: v.filename,
  //       title: v.filename
  //     }
  //   })
  //   setTracks(trackArray);
  // }
  return (
    <View>
      <FlatList
        data={tracks}
        renderItem={(info) => <TrackItem {...info} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  )
}

const TrackItem = ({ item }: TrackItemProps) => {
  const pressHandler = () => {
  }
  return <View>
    <Pressable onPress={pressHandler}>
      <Text>{item.title}</Text>
    </Pressable>
  </View>
}

export default Index
