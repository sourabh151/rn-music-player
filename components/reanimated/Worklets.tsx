
import React from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';
import Animated, { useSharedValue, useAnimatedReaction } from 'react-native-reanimated';
import { Worklets } from 'react-native-worklets';

// This component demonstrates the use of worklets.
const Worklets = () => {
  const randomNumber = useSharedValue(0);
  const [number, setNumber] = React.useState(0);

  // This is a worklet. It's a JavaScript function that can be run on the UI thread.
  // We use the 'worklet' directive to mark it as a worklet.
  const generateRandomNumber = () => {
    'worklet';
    randomNumber.value = Math.random();
  };

  // useAnimatedReaction is a hook that allows you to react to changes in shared values.
  // It takes two worklets as arguments: a "prepare" worklet and a "react" worklet.
  // The "prepare" worklet is called whenever its dependencies change. It returns a value that is passed to the "react" worklet.
  // The "react" worklet is called with the value returned by the "prepare" worklet.
  useAnimatedReaction(
    () => randomNumber.value,
    (result, previousResult) => {
      if (result !== previousResult) {
        // We can't directly call setNumber from a worklet, so we use runOnJS to run it on the JS thread.
        Worklets.createRunInJsFn(setNumber)(result);
      }
    }
  );

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Random Number: {number}</Text>
      <Button title="Generate Random Number" onPress={generateRandomNumber} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
});

export default Worklets;
