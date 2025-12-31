import { View, Text, StyleSheet } from 'react-native'

const Popup = () => {
  return (
    <View style={styles.card}>
      <Text>card</Text>
    </View>
  )
}

const styles = StyleSheet.create({
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

export default Popup
