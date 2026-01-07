import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const SafeAreaProviderCustom = ({ children }: { children: React.ReactNode }) => {
  const insets = useSafeAreaInsets()
  return (
    <View
      style={{
        marginTop: insets.top,
        marginLeft: insets.left,
        marginRight: insets.right,
        marginBottom: insets.bottom
      }}
    >
      {
        children
      }
    </View>
  )
}

export default SafeAreaProviderCustom
