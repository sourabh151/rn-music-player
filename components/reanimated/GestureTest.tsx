import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { View, StyleSheet } from 'react-native'
// import Popup from '../Popup';

function App() {
  const offset = useSharedValue({ x: 0, y: 0 });
  const start = useSharedValue({ x: 0, y: 0 });
  const popupPosition = useSharedValue({ x: 0, y: 0 });
  const popupAlpha = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: offset.value.x },
        { translateY: offset.value.y },
      ],
    };
  });

  const animatedPopupStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: popupPosition.value.x },
        { translateY: popupPosition.value.y },
      ],
      opacity: popupAlpha.value,
    };
  });

  const dragGesture = Gesture.Pan()
    .onStart((_e) => {
      popupAlpha.value = withTiming(0);
    })
    .onUpdate((e) => {
      offset.value = {
        x: e.translationX + start.value.x,
        y: e.translationY + start.value.y,
      };
    })
    .onEnd(() => {
      start.value = {
        x: offset.value.x,
        y: offset.value.y,
      };
    });

  const longPressGesture = Gesture.LongPress().onStart((_event) => {
    popupPosition.value = { x: offset.value.x, y: offset.value.y };
    popupAlpha.value = withTiming(1);
  });

  const composed = Gesture.Race(dragGesture, longPressGesture);

  return (
    <View style={styles.container}>
      <Animated.View style={[animatedPopupStyles, styles.card]} />
      <GestureDetector gesture={composed}>
        <Animated.View style={[animatedStyles, {
          width: 50,
          height: 50,
          backgroundColor: '#22ffe3',
          position: 'absolute'
        }]} />
      </GestureDetector>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    width: 100,
    height: 30,
    borderRadius: 3,
    backgroundColor: '#aebff3',
    elevation: 3,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center'
  }
})
export default App
