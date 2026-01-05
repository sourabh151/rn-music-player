import { data } from '@/assets/data/data'
import { useRef } from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, { SharedValue, interpolate, useAnimatedReaction, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { scheduleOnRN } from 'react-native-worklets'
import Carousel from '../Carousel'

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

  const scrollToOffset = (offset: number) => {

    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({
        offset: offset * _width,
        animated: false
      });
    }
  };

  useAnimatedReaction(
    () => scrollOffset.value,
    (offset) => {
      'worklet';
      scheduleOnRN(scrollToOffset, offset);
    }
  );

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
    const opacity = interpolate(scrollOffset.value,
      [index - 1, index, index + 1],
      [0, 1, 0],
    )
    return {
      transform: [
        { scale: scale }
      ],
      opacity: opacity
    }
  })

  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      'worklet';
      // Calculate a temporary scroll offset based on current index and translation
      // Divide translationX by _width to normalize it to a "page" unit
      let newScrollOffset = index - (e.translationX / _width);

      // Clamp the newScrollOffset to prevent it from going out of bounds visually during the drag
      newScrollOffset = Math.max(0, Math.min(data.length - 1, newScrollOffset));

      scrollOffset.value = newScrollOffset;
    })
    .onEnd((e) => {
      'worklet';
      // Determine the target index based on the final position or velocity
      let targetIndex = index;

      // Define thresholds for snapping to the next/previous item
      const swipeThreshold = _width * 0.3; // 30% of item width
      const velocityThreshold = 500; // pixels per second

      if (e.translationX > swipeThreshold || e.velocityX > velocityThreshold) {
        // Swiped right enough or fast enough, go to previous item
        targetIndex = Math.max(0, index - 1);
      } else if (e.translationX < -swipeThreshold || e.velocityX < -velocityThreshold) {
        // Swiped left enough or fast enough, go to next item
        targetIndex = Math.min(data.length - 1, index + 1);
      } else {
        // Not enough swipe, snap back to the current item
        targetIndex = index;
      }

      // Animate to the target index using withTiming for a smooth transition
      scrollOffset.value = withTiming(targetIndex, { duration: 200 });
    });

  return (
    <GestureDetector gesture={panGesture}>
      <View style={styles.imgContainer}>
        <Animated.Image
          source={item.img}
          style={[styles.img, imgStyle]}
          resizeMode='cover'
        />
      </View>
    </GestureDetector>
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
    borderRadius: 20,
  }
})

export default CarouselTest
