import { View, Text, TouchableOpacity, TextInput, Alert, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router } from 'expo-router'
import styles from '@/assets/styles/verificationScreen.styles'
import HeaderTabs from '@/components/HeaderTabs'
import { AssessorUserProfile } from '@/commons/zustand/useAuthStore'
import { useLocalSearchParams } from 'expo-router';

export default function VerificationScreen() {
  const [verificationCode, setVerificationCode] = useState("");
  const [isDisable, setDisable] = useState<boolean>(true);
  const { confirmEmail, isLoading, id } = AssessorUserProfile.getState();
  const { fullName,
    confirmPassword,
    password,
    email } = useLocalSearchParams();

  // console.log("dtouser", fullName);

  useEffect(() => {
    setDisable(!verificationCode);
  }, [verificationCode]);

  const handleVerify = async () => {
    if (!verificationCode) {
      Alert.alert("Lỗi", "Vui lòng nhập mã xác nhận!");
      return;
    }
    // Add actionCode to dtoUser
    const updatedDtoUser = {
      id: id || "", // Ensure id is a string
      fullName: Array.isArray(fullName) ? fullName[0] : fullName || "",
      email: Array.isArray(email) ? email[0] : email || "",
      password: Array.isArray(password) ? password[0] : password || "",
      confirmPassword: Array.isArray(confirmPassword) ? confirmPassword[0] : confirmPassword || "",
      actionCode: verificationCode,
    };

    const result = await confirmEmail(updatedDtoUser);
    if (!result) {
      Alert.alert("Error", result);
    } else {
      router.push("/(auths)");
    }
  };

  return (
    <View style={styles.container}>
      <HeaderTabs
        title='Xác nhận Email'
        showBack={true} />
      <View style={styles.body}>
        <View style={styles.innerContainer}>
          <Text style={styles.titleForm}>Xác thực Email</Text>
          <Text style={styles.subtitle}>
            Vui lòng nhập mã xác minh được gửi tới email của bạn.
          </Text>
          {/* <InputAuth
          value={verificationCode}
          onChangeText={setVerificationCode}
          keyboardType={"number-pad"}
          placeholder={"Nhập mã xác thực"}
          autoCapitalize={"none"}
          maxLength={6}
        /> */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={verificationCode}
              onChangeText={setVerificationCode}
              placeholderTextColor="#9CA3AF" // Màu placeholder
            />
          </View>
          <View style={{ marginVertical: 5 }} />
          {/* <ButtonLogin
          label={"Xác nhận"}
          onClick={handleVerify}
        /> */}
          <TouchableOpacity
            onPress={handleVerify}
            disabled={isLoading}
            style={[styles.button, isDisable && styles.disabledButton]}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Xác Nhận</Text>
            )}

          </TouchableOpacity>
          {/* === Gửi Lại mã */}
          {/* <View style={styles.rowLink}>
          <Text style={textStyles.blueLink}>
            Bạn có nhận được mã không?{" "}
          </Text>
          <Pressable onPress={() => router.back()}>
            <Text style={[textStyles.blueLink, { color: TextColors.lightBlueLink }]}>Gửi lại</Text>
          </Pressable>
        </View> */}
        </View>
      </View>
    </View>
  )
}