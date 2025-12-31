
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
} from 'react-native-gesture-handler';

// This component demonstrates how to create a draggable element.
const Drag = () => {
  // We use two shared values to store the x and y coordinates of the box.
  const offsetX = useSharedValue(0);
  const offsetY = useSharedValue(0);
  const velocity = useSharedValue(0);

  // The animated style for the box.
  // We use the offsetX and offsetY shared values to update the transform property.
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: offsetX.value },
        { translateY: offsetY.value },
      ],
    };
  });
  const animatedVelocity = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: velocity.value },
      ],
    };
  });

  // The pan gesture handler.
  const panGesture = Gesture.Pan()
    // .onBegin is called when the gesture starts.
    // We store the initial position of the box.
    .onBegin(() => {
      // no-op
    })
    // .onUpdate is called whenever the gesture position changes.
    // We update the offsetX and offsetY shared values with the new position.
    .onUpdate((e) => {
      offsetX.value = e.translationX;
      offsetY.value = e.translationY;
      velocity.value = e.velocityX;
    })
    // .onEnd is called when the gesture ends.
    // We use withSpring to animate the box back to its original position.
    .onEnd(() => {
      offsetX.value = withSpring(0);
      offsetY.value = withSpring(0);
      velocity.value = 0;
    });

  return (
    <View style={styles.container}>
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.box, animatedStyle]} />
      </GestureDetector>
      <Animated.View>
        <Animated.Text
          style={[animatedVelocity]}>
          {velocity.value}
        </Animated.Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: 'tomato',
    borderRadius: 10,
  },
});

export default Drag;
