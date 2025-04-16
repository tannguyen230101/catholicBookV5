import React from 'react'
import { Stack } from 'expo-router'
import { EventTypeScreens, screens } from '@/constants/screens'

export default function EventStackLayout() {
    return (
        <Stack>
            <Stack.Screen 
                name={screens.index} 
                options={{ headerShown: false }} />
            <Stack.Screen 
                name={screens.detail}
                options={{ headerShown: false }} />
            <Stack.Screen
                name={EventTypeScreens.eventType}
                options={{ headerShown: false }} />
            <Stack.Screen
                name={EventTypeScreens.communityChurch}
                options={{ headerShown: false }} />
        </Stack>
    )
}