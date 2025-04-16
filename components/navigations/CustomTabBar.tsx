import React from "react";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { screens } from "../../constants/screens";
import { useTabBarVisibility } from "@/hooks/TabBarVisibilityContext";
import { IconName } from "@/constants/ionicons.icons";
import COLORS from "@/constants/colors";
// import { windowWidth } from "@/utils/device";

export default function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
    const { isTabBarVisible } = useTabBarVisibility();
    if (!isTabBarVisible) return null; 
    return (
        <View style={styles.tabBar}>
            {state.routes.map((route, index) => {
                // const { options } = descriptors[route.key];
                const isFocused = state.index === index;

                const onPress = () => {
                    if (!isFocused) {
                        navigation.navigate(route.name);
                    }
                };

                const iconName = getTabIcon(route.name);

                return (
                    <TouchableOpacity
                        key={route.key}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        onPress={onPress}
                        style={[styles.tabButton, isFocused && styles.activeTab]}
                    >
                        <Ionicons name={iconName} size={22} color={isFocused ? COLORS.black : "#fff"} />
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

const getTabIcon = (routeName: string) => {
    switch (routeName) {
        case screens.bookStacks:
            return IconName.book;
        case screens.homeStack:
            return IconName.home;
        case screens.eventStacks:
            return IconName.calendar;
        case screens.profileStacks:
            return IconName.person;
        default:
            return "help-circle";
    }
};

const styles = StyleSheet.create({
    tabBar: {
        flexDirection: "row",
        backgroundColor: COLORS.secondary,
        height: 50,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        position: "absolute",
        left: 10,
        right: 10,
        bottom: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 4,
        justifyContent: "space-evenly",
        alignItems: "center",
        paddingHorizontal: 10,
    },
    tabButton: {
        flex: 1,
        width: 'auto',
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 10,
    },
    activeTab: {
        backgroundColor: COLORS.primary,
        borderRadius: 15,
        paddingHorizontal: 10,
    },
});
