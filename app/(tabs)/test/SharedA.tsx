import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Animated from 'react-native-reanimated'

const SharedA = () => {
    return (
        <View>
            <Animated.Image style={styles.img}
                source={require('@/assets/images/img1.jpg')}
            />
            <Text>hello world</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    img: {
        width: 200,
        height: 200,
        borderRadius: 100,
    }
})

export default SharedA