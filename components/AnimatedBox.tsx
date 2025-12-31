import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

// This is our new component that will contain the animated box.
export default function AnimatedBox() {
  // useSharedValue is a hook that creates a shared value.
  // Shared values are similar to React's state, but they are designed to be
  // used with animations. They can be updated from the UI thread without
  // triggering a re-render of the component, which is great for performance.
  // Here, we're creating a shared value to hold the box's horizontal offset.
  const offset = useSharedValue(0);

  // useAnimatedStyle is a hook that creates an animated style object.
  // This style object can be passed to an Animated component.
  // The style will update automatically whenever the shared values it depends on change.
  const animatedStyles = useAnimatedStyle(() => {
    return {
      // We're using the 'transform' property to move the box.
      // The 'translateX' property will be updated based on the 'offset' shared value.
      transform: [{ translateX: offset.value }],
    };
  });

  // This function will be called when the button is pressed.
  const moveBox = () => {
    // We're updating the 'offset' shared value.
    // We use withSpring to create a spring animation.
    // The value will animate from its current value to a new value.
    // If the box is at the starting position (0), it will move to 100.
    // If it's at 100, it will move back to 0.
    offset.value = withSpring(offset.value === 0 ? 100 : 0);
  };

  return (
    <View style={styles.container}>
      {/* 
        The Animated.View component is a special component from Reanimated 
        that can accept animated styles. We pass our animatedStyles object to it.
      */}
      <Animated.View style={[styles.box, animatedStyles]} />
      <Button onPress={moveBox} title="Move Box" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: 'violet',
    borderRadius: 10,
    marginBottom: 20,
  },
});
