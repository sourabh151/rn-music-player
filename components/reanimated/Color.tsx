
import React from 'react';
import { Button, View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolateColor,
} from 'react-native-reanimated';

// This component demonstrates how to animate colors.
const Color = () => {
  // We use a shared value to represent the progress of the animation.
  // 0 means the animation is at the beginning, 1 means it's at the end.
  const progress = useSharedValue(0);

  // The animated style for the box.
  const animatedStyle = useAnimatedStyle(() => {
    // interpolateColor is a function that interpolates between two colors based on a progress value.
    // In this case, we are interpolating between 'tomato' and 'blue' based on the progress shared value.
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      ['tomato', 'blue']
    );

    return {
      backgroundColor,
    };
  });

  // This function is called when the button is pressed.
  const handlePress = () => {
    // We animate the progress value to 1 if it's 0, and to 0 if it's 1.
    progress.value = withTiming(progress.value === 0 ? 1 : 0, {
      duration: 1000,
    });
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.box, animatedStyle]} />
      <Button title="Toggle Color" onPress={handlePress} />
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
    borderRadius: 10,
    marginBottom: 20,
  },
});

export default Color;
