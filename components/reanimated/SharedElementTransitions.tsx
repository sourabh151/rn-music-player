
import React, { useState } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

// This component demonstrates shared element transitions on a single screen.
const SharedElementTransitions = () => {
  const [showDetail, setShowDetail] = useState(false);

  const handlePress = () => {
    setShowDetail(!showDetail);
  };

  return (
    <View style={styles.container}>
      <Button
        title={showDetail ? 'Hide Detail' : 'Show Detail'}
        onPress={handlePress}
      />
      {showDetail ? (
        <Animated.View
          style={styles.detailBox}
          entering={FadeIn}
          exiting={FadeOut}
        />
      ) : (
        <Animated.View
          style={styles.box}
          entering={FadeIn}
          exiting={FadeOut}
        />
      )}
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
    marginTop: 20,
  },
  detailBox: {
    width: 200,
    height: 200,
    backgroundColor: 'tomato',
    borderRadius: 20,
    marginTop: 20,
  },
});

export default SharedElementTransitions;
