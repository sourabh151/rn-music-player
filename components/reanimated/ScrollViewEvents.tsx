
import React from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  interpolateColor,
  interpolate,
} from 'react-native-reanimated';

// This component demonstrates how to react to scroll events.
const ScrollViewEvents = () => {
  // We use a shared value to store the scroll position.
  const scrollY = useSharedValue(0);
  const w = Dimensions.get('screen').width;

  // The scroll handler is an object with an onScroll method.
  // This method is called whenever the user scrolls the ScrollView.
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      // We update the scrollY shared value with the current scroll position.
      scrollY.value = event.contentOffset.y;
    },
  });

  // The animated style for the box.
  const animatedStyle = useAnimatedStyle(() => {
    const c = interpolateColor(scrollY.value,
      [-10, 374],
      ['#ff0000', '#00ff00'])
    const pos = {
      x: interpolate(scrollY.value,
        [0, 374],
        [0, w])
    }
    return {
      // We use the scrollY shared value to move the box up and down.
      transform: [{ translateY: -(scrollY.value / 5) },
      { translateX: pos.x }],
      backgroundColor: c
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.box, animatedStyle]} />
      <Animated.ScrollView
        style={styles.scrollView}
        onScroll={scrollHandler}
        scrollEventThrottle={16} // This is important for performance on Android.
      >
        <View style={styles.content} />
        <Text style={styles.text}>Scroll down to see the box move</Text>
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: 'tomato',
    borderRadius: 10,
    position: 'absolute',
    top: 50,
    zIndex: 1,
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  content: {
    height: 1000,
    backgroundColor: 'purple'
  },
  text: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: 20,
  },
});

export default ScrollViewEvents;
