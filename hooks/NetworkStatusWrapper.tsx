import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { subscribeToNetwork, checkNetwork } from '@/hooks/NetworkManager';
import COLORS from '@/constants/colors';

interface Props {
  children: React.ReactNode;
}

const NetworkStatusWrapper: React.FC<Props> = ({ children }) => {
  const [isConnected, setIsConnected] = useState<boolean>(true);

  useEffect(() => {
    // Kiểm tra trạng thái mạng ban đầu
    setIsConnected(checkNetwork());

    // Đăng ký lắng nghe thay đổi trạng thái mạng
    const unsubscribe = subscribeToNetwork((connected) => {
      setIsConnected(connected);
    });

    // Hủy đăng ký khi component bị unmount
    return () => {
      unsubscribe();
    };
  }, []);

  if (!isConnected) {
    // Hiển thị loading hoặc cảnh báo khi không có mạng
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={COLORS.black} />
        <Text style={styles.text}>Không có kết nối mạng. Vui lòng kiểm tra lại!</Text>
      </View>
    );
  }

  // Hiển thị nội dung ứng dụng khi có mạng
  return <>{children}</>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
  },
  text: {
    marginTop: 10,
    fontSize: 16,
    color: COLORS.black,
  },
});

export default NetworkStatusWrapper;