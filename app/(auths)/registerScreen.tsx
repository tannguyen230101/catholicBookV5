import { View, Text, Image, KeyboardAvoidingView, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
import React, { useState } from 'react'
import { isAndroid } from '@/utils/device';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import styles from '@/assets/styles/register.styles';
import { AssessorUserProfile } from '@/commons/zustand/useAuthStore';
import { UserDTO } from '@/commons/DTOs/UserDTO';
import { Constants } from '@/constants/appConstant';

export default function Regsiter() {
    const [email, setEmail] = useState("");
    const [fullName, setFullName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { register, isLoading } = AssessorUserProfile();

    const isDisabled = !email || !fullName || !password || !confirmPassword || isLoading;

    const handleSignup = async () => {
        const dtoUser: UserDTO = {
            id: Constants.emptyGuid,
            fullName,
            password,
            confirmPassword,
            email,
        };

        const result = await register(dtoUser);
        if (!result.success) return Alert.alert("Lỗi đăng ký", result.error);
        
        router.push({
            pathname: '/(auths)/verificationScreen',
            params: {
                fullName,
                confirmPassword,
                password,
                email
            },
        });
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={isAndroid ? 'height' : 'padding'}
        >
            <View style={styles.container}>
                <View style={styles.bookMark}>
                    <Text style={styles.textBookMark}>Xin Chào!</Text>
                    <Image
                        source={require('@/assets/images/logo_book.png')}
                        style={styles.image}
                    />
                </View>
                <View style={styles.card}>
                    <Text style={styles.title}>Đăng ký tài khoản</Text>
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Họ và tên</Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                value={fullName}
                                onChangeText={setFullName}
                                autoCapitalize='none'
                                keyboardType='default'
                            />
                        </View>
                    </View>
                    {/* Input Email holder */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Email</Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                value={email}
                                onChangeText={setEmail}
                                keyboardType='email-address'
                                autoCapitalize='none'
                            />
                        </View>
                    </View>
                    {/* Input Password holder */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Mật Khẩu</Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={!showPassword}
                            />
                            <TouchableOpacity
                                onPress={() => setShowPassword(!showPassword)}
                                style={styles.eyeIcon}
                            >
                                <Ionicons
                                    name={showPassword ? "eye-outline" : "eye-off-outline"}
                                    size={20}
                                    color={"black"}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Xác nhận mật Khẩu</Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                                secureTextEntry={!showConfirmPassword}
                            />
                            <TouchableOpacity
                                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                                style={styles.eyeIcon}
                            >
                                <Ionicons
                                    name={showConfirmPassword ? "eye-outline" : "eye-off-outline"}
                                    size={20}
                                    color={"black"}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity
                        style={!isDisabled ? styles.button : styles.disableButton}
                        onPress={handleSignup}
                        disabled={isDisabled}>
                        {isLoading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text style={styles.buttonText}>Đăng ký</Text>
                        )}
                    </TouchableOpacity>
                    <View style={styles.footerContainer}>
                        <View style={styles.footer}>
                            <Text style={styles.footerText}>Bạn đã có tài khoản?</Text>
                            <TouchableOpacity onPress={() => router.back()}>
                                <Text style={styles.link}>Đăng nhập</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

