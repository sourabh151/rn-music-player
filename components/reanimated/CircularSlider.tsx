import React from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

const SLIDER_WIDTH = 200;
const HANDLE_WIDTH = 20;

const CircularSlider = () => {
  const angle = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .onChange((event) => {
      const centerX = SLIDER_WIDTH / 2;
      const centerY = SLIDER_WIDTH / 2;
      const newAngle = Math.atan2(event.y - centerY, event.x - centerX);
      angle.value = newAngle;
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${angle.value}rad` }],
    };
  });

  return (
    <View style={styles.container}>
      <GestureDetector gesture={panGesture}>
        <View style={styles.slider}>
          <Animated.View style={[styles.handleContainer, animatedStyle]}>
            <View style={styles.handle} />
          </Animated.View>
        </View>
      </GestureDetector>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slider: {
    width: SLIDER_WIDTH,
    height: SLIDER_WIDTH,
    borderRadius: SLIDER_WIDTH / 2,
    borderWidth: 10,
    borderColor: 'lightgray',
  },
  handleContainer: {
    width: SLIDER_WIDTH,
    height: SLIDER_WIDTH,
    position: 'absolute',
    alignItems: 'center',
  },
  handle: {
    width: HANDLE_WIDTH,
    height: HANDLE_WIDTH,
    backgroundColor: 'tomato',
    borderRadius: HANDLE_WIDTH / 2,
    top: -HANDLE_WIDTH / 2, // Center the handle on the circle's edge
  },
});

export default CircularSlider;