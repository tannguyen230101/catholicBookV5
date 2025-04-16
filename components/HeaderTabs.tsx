import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import COLORS from '@/constants/colors'
import { Ionicons } from '@expo/vector-icons'
import { IconName } from '@/constants/ionicons.icons'
import { router } from 'expo-router'
import { windowWidth } from '@/utils/device'
// import { windowWidth } from '@/utils/device'

interface HeaderTabsProps {
    title: string,
    showBack?: boolean,
    rightAction?: () => void,
    titleRight?: React.ReactNode,
}

export default function HeaderTabs({ title, showBack = false, rightAction, titleRight }: HeaderTabsProps) {
    return (
        <View style={styles.headerContainer}>
            {showBack ?
                <TouchableOpacity onPress={() => router.back()} style={styles.placeholder}>
                    <Ionicons name={IconName.back} size={22} color={COLORS.black} />
                </TouchableOpacity>
                : <View style={styles.placeholder}></View>}
            <View style={styles.headerTextContainer}>
                <Text style={styles.textHeader}>{title}</Text>
            </View>
            {rightAction ?
                <TouchableOpacity onPress={rightAction}>
                    {titleRight}
                </TouchableOpacity>
                : <View style={styles.placeholder}></View>}
        </View>
    )
};

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        backgroundColor: COLORS.secondary,
        paddingHorizontal: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        // height: windowWidth * 0.13,
    },
    textHeader: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
    },
    headerTextContainer: {
        backgroundColor: COLORS.black,
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 5,
        marginTop: 20,
        marginBottom: 10
    },
    iconContainer: {
        // padding: 5,
        width: windowWidth * 0.06,
        height: windowWidth * 0.06,
        backgroundColor: 'red' // Thêm padding để tăng vùng bấm
      },
    placeholder: {
        width: windowWidth * 0.08,
        height: windowWidth * 0.08,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: "red",
        margin: 5,
    },

})