import { StyleSheet, Pressable } from 'react-native'
import Animated, { interpolate, SharedValue, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { data } from '@/assets/data/data'
type CardProps = {
  key: string,
  index: number,
  deg: SharedValue<number>,
  _total: number,
  img: any
}

const Index = () => {
  const deg = useSharedValue(0)
  return (
    <Pressable style={[styles.main]}
      onPress={() => {
        deg.value = withTiming(deg.value === 0 ? 1 : 0, {
          duration: 1000,
        })
      }}>
      {
        data.map((item, i) => {
          return <Card key={item.name} img={item.img} index={i} deg={deg} _total={data.length} />
        })
      }
    </Pressable>
  )
}
const Card = ({ index, deg, _total, img }: CardProps) => {
  const animatedStyles = useAnimatedStyle(() => {
    const rotation = interpolate(deg.value,
      [0, 1],
      [(-10 - (_total - index) * 3), (10 + (_total - index) * 3)]);

    const translation = interpolate(deg.value,
      [0, 1],
      [5 * (index), 10 * (_total - index)])

    return {
      transform: [
        { rotateZ: `${rotation}deg` },
        { translateX: translation }
      ]
    }
  })
  return <Animated.Image
    source={img}
    resizeMode={'cover'}
    style={
      [
        styles.card, { zIndex: _total - index },
        animatedStyles
      ]
    }
  />

}
const styles = StyleSheet.create({
  main: {
    backgroundColor: "#ef5f1e22",
    justifyContent: "center",
    alignItems: "center",
    height: "100%"
  },
  card: {
    height: 150,
    width: 100,
    borderRadius: 5,
    position: 'absolute',
    elevation: 3,
    borderWidth: 1,
    borderColor: "#ffffff"
  }
})

export default Index
