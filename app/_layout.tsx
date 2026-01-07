import SafeAreaProviderCustom from '@/components/SafeAreaProviderCustom'
import { Tabs } from 'expo-router'
import React from 'react'

const _layout = () => {
  return (
    <SafeAreaProviderCustom>
      <Tabs />
    </SafeAreaProviderCustom>
  )
}

export default _layout
