import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import React, { useEffect, useState } from 'react'
import HeaderTabs from '@/components/HeaderTabs'
import COLORS from '@/constants/colors'
import styles from '@/assets/styles/forgotPassword.styles';

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isDisable, setDisable] = useState<boolean>(true);

  const onClickBtnForgot = () => {

  };

  useEffect(() => {
    setDisable(!email);
  }, [email]);

  return (
    <KeyboardAvoidingView style={styles.container}>
      <HeaderTabs
        title='Quên Mật Khẩu'
        showBack={true} />
      <View style={styles.body}>
        <View style={styles.inputGroup}>
          <Text style={styles.titleForm}>Nhập Email</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholderTextColor={COLORS.placeHolderText}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          <View style={{ marginVertical: 10 }} />
          <TouchableOpacity
            onPress={onClickBtnForgot}
            disabled={isDisable}
            style={[styles.button, isDisable && styles.disabledButton]}
          >
            <Text style={styles.buttonText}>Xác Nhận</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  )
};

