
import React, { useState } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import Animated, { Layout, FadeIn, FadeOut, LinearTransition } from 'react-native-reanimated';

// This component demonstrates how to use layout animations.
const LayoutAnimations = () => {
  const [items, setItems] = useState([0, 1, 2]);

  const addItem = () => {
    setItems([...items, Math.random()]);
  };

  const removeItem = (item: number) => {
    setItems(items.filter((i) => i !== item));
  };

  return (
    <View style={styles.container}>
      <Button title="Add Item" onPress={addItem} />
      <Animated.View style={styles.list} layout={LinearTransition.springify()}>
        {items.map((item) => (
          <Animated.View
            key={item}
            style={styles.item}
            entering={FadeIn}
            exiting={FadeOut}
            onTouchEnd={() => removeItem(item)}
          />
        ))}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50,
  },
  list: {
    marginTop: 20,
    width: '80%',
  },
  item: {
    height: 50,
    backgroundColor: 'tomato',
    borderRadius: 10,
    marginBottom: 10,
  },
});

export default LayoutAnimations;
