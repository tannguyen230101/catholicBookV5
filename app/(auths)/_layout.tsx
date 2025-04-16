import React from 'react'
import { Stack } from 'expo-router';
import { authScreens, screens } from '@/constants/screens';


export default function Authlayout() {
    return (
        <Stack>
            <Stack.Screen
                name={screens.index}
                options={{ headerShown: false }} />
            <Stack.Screen
                name={authScreens.register}
                options={{ headerShown: false }} />
            <Stack.Screen
                name={authScreens.forgotPassword}
                options={{ headerShown: false }} />
            <Stack.Screen
                name={authScreens.verificationScreen}
                options={{ headerShown: false }} />
        </Stack>
    );
}