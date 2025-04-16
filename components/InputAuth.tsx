import React, { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View, TextInputProps } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
// import { windowHeight } from "@/utils/Dimensions";
import { windowHeight } from "@/utils/device";

interface InputAuthProps extends TextInputProps {
    value: string;
    onChangeText: (text: string) => void;
    showPasswordToggle?: boolean;
    secureTextEntry?: boolean;
}

export function InputAuth({
    value,
    onChangeText,
    showPasswordToggle = false,
    secureTextEntry = false,
    ...options
}: InputAuthProps) {

    const [isPasswordHidden, setIsPasswordHidden] = useState(secureTextEntry);

    return (
        <View style={styles.inputContainer}>
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={isPasswordHidden}
                placeholderTextColor="#9CA3AF" // Màu placeholder
                {...options}
            />
            {showPasswordToggle && (
                <TouchableOpacity
                    style={styles.toggleButton}
                    onPress={() => setIsPasswordHidden(!isPasswordHidden)}
                >
                    <FontAwesome
                        name={isPasswordHidden ? "eye-slash" : "eye"}
                        size={20}
                        color="#666"
                    />
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        marginTop: 5,
        marginBottom: 10,
        width: "100%",
        height: windowHeight / 15,
        borderColor: "#E5E7EB",
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: "#F9FAFB",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10, // Thêm padding để không bị dính sát viền
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: "#4B5563",
        paddingVertical: 8, // Thêm padding dọc để text không bị dính trên/dưới
    },
    toggleButton: {
        padding: 5,
    },
}); 