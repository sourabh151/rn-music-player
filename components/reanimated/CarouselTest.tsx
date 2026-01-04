import { View, StyleSheet, Dimensions } from 'react-native'
import Carousel from '../Carousel'
import { data } from '@/assets/data/data'
import Animated, { useSharedValue, useAnimatedStyle, interpolate, useAnimatedReaction, SharedValue } from 'react-native-reanimated'
import { useRef } from 'react'

const { width } = Dimensions.get('window')
const _width = width
const _height = _width * 1.2

type dataType = typeof data[0]
type carouselItemProps = {
  item: dataType,
  index: number,
  scrollOffset: SharedValue<number>
}

const CarouselTest = () => {
  const scrollOffset = useSharedValue(0)
  const flatListRef = useRef<Animated.FlatList<dataType>>(null)

  useAnimatedReaction(() => scrollOffset.value,
    (offset) => {
      flatListRef.current?.scrollToOffset({
        offset: offset * _width,
        animated: false
      })
    }
  )

  return (
    <View style={styles.container}>
      <Animated.FlatList
        ref={flatListRef}
        data={data}
        renderItem={(info) => <CarouselItem {...info} scrollOffset={scrollOffset} />}
        keyExtractor={(item) => item.name}
        horizontal
        style={styles.content}
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
        pagingEnabled
      />
      <Carousel scrollOffset={scrollOffset} />
    </View>
  )
}

const CarouselItem = ({ item, index, scrollOffset }: carouselItemProps) => {
  const imgStyle = useAnimatedStyle(() => {
    const scale = interpolate(scrollOffset.value,
      [index - 1, index, index + 1],
      [.8, 1, .8],
    )
    return {
      transform: [
        { scale: scale }
      ]
    }
  })

  return (
    <View style={styles.imgContainer}>
      <Animated.Image
        source={item.img}
        style={[styles.img, imgStyle]}
        resizeMode='cover'
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222222'
  },
  content: {
    flex: 1,
  },
  imgContainer: {
    width: _width,
    height: _height,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center'
  },
  img: {
    width: _width,
    height: _height * .8,
  }
})

export default CarouselTest
