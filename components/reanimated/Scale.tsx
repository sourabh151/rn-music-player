
import React from 'react';
import { Button, View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';

// This component demonstrates a basic scaling animation.
const Scale = () => {
  // useSharedValue creates a shared value that can be accessed and modified from both the UI and JS threads.
  // We initialize it with 1, which means the initial scale of the box will be 1.
  const scale = useSharedValue(1);

  // useAnimatedStyle is a hook that creates a style object that can be animated.
  // The style object is updated whenever the shared value changes.
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  // This function is called when the button is pressed.
  const handlePress = () => {
    // withTiming is a function that creates a timing-based animation.
    // We are animating the scale value to 2 over a duration of 500ms.
    // Easing.inOut(Easing.quad) is an easing function that makes the animation start and end slowly.
    scale.value = withTiming(scale.value === 1 ? 2 : 1, {
      duration: 500,
      easing: Easing.inOut(Easing.quad),
    });
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.box, animatedStyle]} />
      <Button title="Toggle Scale" onPress={handlePress} />
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
    marginBottom: 20,
  },
});

export default Scale;
