import { View, Text, StyleSheet } from 'react-native'

const Card = () => {
  return (
    <View
      style={[styles.card]}>
      <Text></Text>
    </View>
  )
}
const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffaeae",
    height: 150,
    aspectRatio: "3/4",
    borderRadius: 5,
    position: 'absolute',
    elevation: 3
  }
})

export default Card
