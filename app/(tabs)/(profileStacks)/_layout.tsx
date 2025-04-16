import React from 'react'
import { Stack } from 'expo-router'
import { ProfileScreenNames, screens } from '@/constants/screens'

export default function ProfileLayout() {
  return (
    <Stack>
      <Stack.Screen
        name={screens.index}
        options={{ headerShown: false }} />
      <Stack.Screen
        name={ProfileScreenNames.changePassword}
        options={{ headerShown: false }} />
      <Stack.Screen
        name={ProfileScreenNames.updateProfile}
        options={{ headerShown: false }} />
    </Stack>
  )
}