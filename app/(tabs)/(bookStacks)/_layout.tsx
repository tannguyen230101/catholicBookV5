import React from 'react'
import { Stack } from 'expo-router'
import { authScreens, bookStackScreens, screens } from '@/constants/screens'

export default function BookStackLayout() {
  return (
    <Stack>
      <Stack.Screen
        name={screens.index}
        options={{ headerShown: false }} />
      <Stack.Screen
        name={bookStackScreens.bookFlipped}
        options={{ headerShown: false }} />
      <Stack.Screen
        name={authScreens.createCatholicBook}
        options={{ headerShown: false }} />
    </Stack>
  )
}