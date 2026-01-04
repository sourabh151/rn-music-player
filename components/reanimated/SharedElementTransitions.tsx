import { Stack } from 'expo-router'
import React from 'react'

const SharedElementTransitions = () => {
  return (
    <Stack>
      <Stack.Screen
        name="SharedA"
        options={{

        }}
      />
      <Stack.Screen
        name="SharedB"
      />
    </Stack>
  )
}

export default SharedElementTransitions