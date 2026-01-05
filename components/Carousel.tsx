import { data } from '@/assets/data/data';
import { useRef } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import Animated, { interpolate, SharedValue, useAnimatedReaction, useAnimatedScrollHandler, useAnimatedStyle } from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';

type dataType = typeof data[0]
type carouselProps = {
  scrollOffset: SharedValue<number>
}
type carouselItemProps = {
  item: dataType,
  index: number,
  scrollOffset: SharedValue<number>
}
const _width = 100;
const _gap = 12;
const _total = _width + _gap;
const middle = (Dimensions.get('window').width - _width) / 2

const Carousel = ({ scrollOffset }: carouselProps) => {
  const flatListRef = useRef<Animated.FlatList<dataType>>(null)

  const scrollToOffset = (offset: number) => {
    if (flatListRef.current && (offset % 1 === 0)) {
      flatListRef.current.scrollToOffset({
        offset: offset * _total,
        animated: false
      });
    }

    // if (flatListRef.current) {
    //   flatListRef.current.scrollToOffset({
    //     offset: offset * _total,
    //     animated: false
    //   });
    // }
  };

  useAnimatedReaction(
    () => scrollOffset.value,
    (offset) => {
      'worklet';
      scheduleOnRN(scrollToOffset, offset);
    }
  );
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (e) => {
      'worklet';
      const t = e.contentOffset.x / _total
      scrollOffset.value = t;
    }
  })
  return (
    <Animated.FlatList
      ref={flatListRef}
      data={data}
      renderItem={(info) => <CarouselItem {...info} scrollOffset={scrollOffset} />}
      keyExtractor={(item) => item.name}
      horizontal
      style={styles.carousel}
      snapToInterval={_width + _gap}
      contentContainerStyle={styles.carouselContainer}
      showsHorizontalScrollIndicator={false}
      onScroll={scrollHandler}
      scrollEventThrottle={16}
    />
  )
}
const CarouselItem = ({ item, index, scrollOffset }: carouselItemProps) => {
  const imgStyle = useAnimatedStyle(() => {
    const translation = interpolate(scrollOffset.value,
      [index - 1, index, index + 1],
      [-20, -40, -20],
    )
    return {
      transform: [
        { translateY: translation }
      ]
    }
  })

  return (
    <Animated.Image
      source={item.img}
      style={[styles.imgContainer, imgStyle]}
      resizeMode='cover'
    />
  )
}

const styles = StyleSheet.create({
  carousel: {
    flexGrow: 0,
    paddingHorizontal: 20,
    paddingTop: 45,
    backgroundColor: 'transparent'
  },
  carouselContainer: {
    flexDirection: 'row',
    gap: _gap,
    paddingHorizontal: middle,
    backgroundColor: 'transparent'
  },
  imgContainer: {
    width: _width,
    height: _width,
    borderRadius: _width,
    borderWidth: 1,
  }
})

export default Carousel
