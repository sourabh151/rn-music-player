import { View, Button, Text } from "react-native";
import Animated, { useSharedValue, withSpring, useAnimatedProps, withTiming } from "react-native-reanimated"
import Svg, { Circle } from "react-native-svg"
const AnimatedCircle = Animated.createAnimatedComponent(Circle)

export default function Index() {
  const radius = useSharedValue(10)
  const AnimatedProps = useAnimatedProps(() => {
    return {
      r: withTiming(radius.value)
    }
  })
  const handleClick = () => {
    radius.value = withSpring(radius.value + 50)
  }
  const handleReset = () => {
    radius.value = withSpring(50)
  }
  return (
    <>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* <Animated.View */}
        {/*   style={ */}
        {/*     { */}
        {/*       width: 100, */}
        {/*       height: 100, */}
        {/*       position: "absolute", */}
        {/*       top: 0, */}
        {/*       left: 0, */}
        {/*       backgroundColor: "red", */}
        {/*       transform: [{ translateX: width }] */}
        {/*     } */}
        {/*   }> */}
        {/**/}
        {/* </Animated.View> */}
        <Svg>
          <AnimatedCircle cx="50" cy="50" animatedProps={AnimatedProps} fill="blue" />
        </Svg>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button onPress={handleClick} title="Click Me" />
        <Button onPress={handleReset} title="Reset" />
      </View>
    </>
  );
}
