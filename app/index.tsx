import { View, StyleSheet } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withTiming, Easing } from 'react-native-reanimated'

const Index = () => {
  const a = new Array(5).fill(null)
  const deg = useSharedValue(-10)
  const anim = useAnimatedStyle(() => {
    return {
      transform: [
        { rotateZ: `${(deg.value)}deg` }
      ],
    }
  })
  // const degree = interpolate(deg.value, [0, 1], [-10, 30])
  return (
    <View style={[styles.main]}>
      {
        a.map((_, i) => {
          return <Animated.View key={i} style={
            [
              styles.card,
              {
                zIndex: a.length - i,
                transform: [
                  { rotateZ: `${(deg.value * i)}deg` }
                ],
              }, anim
            ]
          }
            onTouchStart={() => {
              // setDegree(-20)
              deg.value = withTiming(30, {
                duration: 500,
                easing: Easing.in(Easing.ease)
              })

            }}
            onTouchEnd={() => {
              // setDegree(-10)
              deg.value = withTiming(-10, {
                duration: 500,
                easing: Easing.in(Easing.ease)
              })
            }}

          />
        })
      }
    </View>
  )
}
const styles = StyleSheet.create({
  main: {
    backgroundColor: "#888888",
    justifyContent: "center",
    alignItems: "center",
    height: "100%"
  },
  card: {
    backgroundColor: "#ffaeae",
    height: 150,
    aspectRatio: "3/4",
    borderRadius: 5,
    position: 'absolute',
    elevation: 3,
    borderWidth: 2,
    borderColor: "#444444"
  }
})

export default Index
