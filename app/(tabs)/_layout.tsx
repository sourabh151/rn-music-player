import { Tabs } from 'expo-router'
import React from 'react'

const _layout = () => {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
            }}
        >
            <Tabs.Screen name="(tabs)/index" options={{ title: 'Home' }} />
            <Tabs.Screen name="(tabs)/reanimated-examples" options={{ title: 'Reanimated' }} />
            <Tabs.Screen name="(tabs)/sample" options={{ title: 'Sample' }} />
            <Tabs.Screen name="(tabs)/test/SharedA" options={{ href: null }} />
        </Tabs>
    )
}

export default _layout