import { Stack } from 'expo-router'
import React from 'react'

const sample = () => {
    return (
        <Stack>
            <Stack.Screen name="(tabs)/test/SharedA" options={{ title: 'SharedA' }} />
            <Stack.Screen name="(tabs)/test/SharedB" options={{ title: 'SharedB' }} />
        </Stack>
    )
}

export default sample