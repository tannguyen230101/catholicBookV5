import { View, Text, Image, KeyboardAvoidingView, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
import React, { useState } from 'react'
import { isAndroid } from '@/utils/device';
import { Ionicons } from '@expo/vector-icons';
import { Link, router } from 'expo-router';
import styles from '@/assets/styles/login.styles';
import { AssessorUserProfile } from '@/commons/zustand/useAuthStore';
import { LoginDTO } from '@/commons/DTOs/LoginDTO';


export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    // const [isLoading, setIsLoading] = useState(false);
    const { login, isLoading } = AssessorUserProfile.getState();

    const isDisable = !email || !password || isLoading;

    const handleLogin = async () => {
        if (!email || !password) {
            return Alert.alert("Lỗi", "Không được để trống Email và Mật khẩu!");
        };

        const dtoLogin: LoginDTO = {
            password,
            email,
            rememberMe: false,
        };

        const result = await login(dtoLogin);
        
        if (result && !result.success) 
            return Alert.alert("Đăng nhập thất bại", result.error );

        router.push("/(tabs)/(bookStacks)");
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
                    <Text style={styles.title}>Đăng nhập</Text>
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
                    <TouchableOpacity
                        style={[isDisable ? styles.disableButton : styles.button]}
                        onPress={handleLogin}
                        disabled={isDisable}>
                        {isLoading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text style={styles.buttonText}>Đăng Nhập</Text>
                        )}
                    </TouchableOpacity>
                    <View style={styles.footerContainer}>
                        <Link href={"/(auths)/forgotPassword"} asChild>
                            <TouchableOpacity>
                                <Text style={styles.footerText}>Quên mật khẩu?</Text>
                            </TouchableOpacity>
                        </Link>
                        <View style={styles.footer}>
                            <Text style={styles.footerText}>Bạn chưa có tài khoản?</Text>
                            <Link href={"/(auths)/registerScreen"} asChild>
                                <TouchableOpacity>
                                    <Text style={styles.link}>Đăng ký?</Text>
                                </TouchableOpacity>
                            </Link>
                        </View>
                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

