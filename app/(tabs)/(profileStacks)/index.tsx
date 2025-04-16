import { View, Text, TouchableOpacity, Alert, ScrollView, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import HeaderTabs from '@/components/HeaderTabs'
import ImageViewer from '@/components/ImageViewer'
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'expo-image';
import styles from '@/assets/styles/profilesStyle/profile.styles';
import FeatureCard from '@/components/FeatureCard';
import { router } from 'expo-router';
import ButtonForm from '@/components/ButtonForm';
import { AssessorUserProfile } from '@/commons/zustand/useAuthStore';
import { CatholicController } from '@/services/APIController/CatholicController';
import { CatholicDTO } from '@/commons/DTOs/CatholicDTO';
import { formatDateToDDMMYYYY } from '@/utils/formatDate';
import { Constants } from '@/constants/appConstant';


export default function Profile() {
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [user, setUser] = useState<CatholicDTO>();
  const Placeholder = require('../../../assets/images/react-logo.png');
  const { logout, id } = AssessorUserProfile.getState();
  // const userId = AsyncStorage.getItem('user');

  console.log("user", id);
  // console.log("accessToken", accessToken);

  const fetchUser = async () => {
    try {
      const userId = id;
      if(userId && userId !== Constants.emptyGuid) {
        const res = await CatholicController.getById(userId);
        // console.log("res", res);
        if (res) {
          setUser(res);
        }
      }
      
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      console.log(result);
    } else {
      Alert.alert("Cảnh báo", 'Bạn chưa chọn hình ảnh.');
    }
  };

  function handleDeleteAccount() {
    Alert.alert("Cảnh báo!", "Hiện chức năng này đang trong giai đoạn phát triển");
  }

  const signOut = () => {
    logout();
    router.replace("/(auths)");
  };

  return (
    <View style={styles.container}>
      <HeaderTabs title='Hồ Sơ' />
      <View style={styles.userContainer}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Image
            style={styles.avatar}
            source={selectedImage
              ? selectedImage
              : Placeholder} />
        </TouchableOpacity>
        <View style={styles.inforContainer}>
          {/* <Text style={styles.txtName}>{user?.fullName}</Text> */}
          <Text style={styles.txtName}>{user?.fullName}</Text>

          <Text style={styles.txtEmail}>{user?.dateOfBirth
            ? formatDateToDDMMYYYY(user?.dateOfBirth)
            : "Chưa cập nhật"}
          </Text>
          {/* <Text style={styles.txtEmail}>Email
          </Text> */}
        </View>
      </View>
      <ScrollView contentContainerStyle={{ paddingBottom: 70 }}>
        <View style={styles.featureContainer}>
          <Text style={styles.textSubtitle}>
            Thông tin tài khoản
          </Text>
          <View style={styles.viewFeatures}>
            <FeatureCard
              title="Đổi mật khẩu"
              imageSource={require("../../../assets/images/changePassword.png")}
              onPress={handleDeleteAccount} />
            <FeatureCard
              title="Cập nhật thông tin"
              imageSource={require("../../../assets/images/tao_tai_khoan.png")}
              onPress={() => router.push("/updateProfile")} />
            <FeatureCard
              title="Xoá tài khoản"
              imageSource={require("../../../assets/images/delete_account.png")}
              onPress={handleDeleteAccount} />
          </View>
        </View>
        <View style={styles.featerLogout}>
          <FeatureCard
            title="Đăng xuất"
            imageSource={require("../../../assets/images/dang_xuat.png")}
            onPress={signOut}
          />
        </View>
      </ScrollView>
      {/* Modal hiển thị ảnh full màn hình */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade">
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}>
            <Text style={styles.closeText}>✖</Text>
          </TouchableOpacity>
          <View style={styles.imageContainer}>
            <ImageViewer
              imgSource={Placeholder}
              selectedImage={selectedImage} />
          </View>
          <View style={styles.footerContainer}>
            <ButtonForm
              theme="primary"
              label="Thay đổi ảnh"
              onPress={pickImageAsync} />
          </View>
        </View>
      </Modal>
    </View>
  )
}