import React from 'react'
import { Stack } from 'expo-router'
import { HomeScreens, screens } from '@/constants/screens'

export default function HomeLayout() {
  return (
    <Stack>
      <Stack.Screen
        name={screens.index}
        options={{ headerShown: false }} />
      <Stack.Screen
        name={screens.detail}
        options={{ headerShown: false }} />
      <Stack.Screen
        name={HomeScreens.congregationActivities}
        options={{ headerShown: false }} />
    </Stack>
  )
}