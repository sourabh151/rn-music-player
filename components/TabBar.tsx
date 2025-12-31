import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { View, Text, StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const TabBar = ({ state, navigation, descriptors }: BottomTabBarProps) => {
  const insets = useSafeAreaInsets()
  return (
    <View style={[styles.tabbar, { top: insets.top, left: insets.left }]}>
      {
        state.routes.map((v) => {
          return <View key={v.key}>
            <Text>{v.name}</Text>
          </View>
        })
      }
    </View>
  )
}
const styles = StyleSheet.create({
  tabbar: {
    flexDirection: "row",
    width: "100%",
    backgroundColor: "red",
  }
})

export default TabBar
