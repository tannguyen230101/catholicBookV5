import { View, Text, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import styles from '@/assets/styles/eventStacks/communityChurch.styles'
import HeaderTabs from '@/components/HeaderTabs'
// import { Feather } from '@expo/vector-icons'
import { useModalForm } from '@/hooks/ModalFormContext'
import COLORS from '@/constants/colors'
import { CatholicCongregationActivityDTO } from '@/commons/DTOs/CatholicCongregationActivityDTO'
import { useFocusEffect } from 'expo-router'
import { useTabBarVisibility } from '@/hooks/TabBarVisibilityContext'
import { CatholicCongregationActivityController } from '@/services/APIController/CatholicCongregationActivityController'
import { AssessorUserProfile } from '@/commons/zustand/useAuthStore'
import { Constants } from '@/constants/appConstant'

export default function CommunityChurch() {
  const { openModal } = useModalForm();
  const [loading, setLoading] = useState(true);
  const [catholicCongregations, setCatholicCongretions] = useState([]);
  const [catholicCongregationList, setCatholicCongretionList] = useState([]);
  const { setTabBarVisible } = useTabBarVisibility();
  const { id } = AssessorUserProfile.getState();

  // Ẩn TabBar khi vào trang 
  // Hiển thị lại khi rời đi
  useFocusEffect(
    useCallback(() => {
      setTabBarVisible(false);
      return () => setTabBarVisible(true);
    }, [setTabBarVisible])
  );

  // TODO: Sửa lại hàm tạo sử kiện hội đoàn. ChurchCongregationActivityController
  // const handleOpenForm = () => {
  //   openModal({
  //     title: "Tạo Hội Đoàn",
  //     fields: [
  //       {
  //         name: "name",
  //         label: "Tên hội đoàn",
  //         type: "text",
  //         placeholder: "Tên loại sự kiện"
  //       },
  //       {
  //         name: "dateAttended",
  //         label: "Ngày tham gia",
  //         type: "datePicker",
  //       },
  //       {
  //         name: "churchCongregationActivityId",
  //         label: "Hội đoàn",
  //         type: "dropdown",
  //         placeholder: "=== Chọn hội đoàn ===",
  //         data: catholicCongregationList
  //       },
  //     ],
  //     onSubmit: (data) => {
  //       console.log("Dữ liệu form:", data);
  //       const dtoCatholicCongregationActivity: CatholicCongregationActivityDTO = {
  //         id: Constants.emptyGuid,
  //         dateAttended: data.dateAttended,
  //         catholicId: id,
  //         churchCongregationActivityId: data.churchCongregationActivityId
  //       };

  //       CatholicCongregationActivityController.create(dtoCatholicCongregationActivity)
  //         .then((response) => {
  //           console.log("Tạo thành công:", response);
  //         })
  //         .catch((error) => {
  //           console.error("Lỗi khi tạo:", error);
  //         });
  //     },
  //   });
  // };

  const fetchCatholicCongregations = async () => {
    try {
      const response = await CatholicCongregationActivityController.getAll();
      if (response) {
        console.log("-- response: ", response);
        setCatholicCongretionList(response);
      };
    } catch (error) {
      console.error("Lỗi khi lấy danh sách hội đoàn:", error);
    } finally {
      setLoading(false);
    }
  }

  /**
     * Get CatholicCongregationActivity 
     * @param idCatholic
     * @return CatholicCongregationActivities
     */
  const getCatholicCongregationsById = useCallback(async () => {
    try {
      const response = await CatholicCongregationActivityController.getByCatholicId(id);
      if (response) {
        console.log("-- response: ", response);
        setCatholicCongretions(response);
      };
    } catch (error) {
      console.error("-- Error: ", error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    getCatholicCongregationsById();
  }, [getCatholicCongregationsById]);

  useEffect(() => {
    fetchCatholicCongregations();
  }, []);

  return (
    <View style={styles.container}>
      <HeaderTabs title='Hội Đoàn' showBack={true} />
      <View style={styles.body}>
        {loading ? (<ActivityIndicator size={"small"} color={COLORS.primary} />)
          : (
            <FlatList<CatholicCongregationActivityDTO>
              data={catholicCongregations}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                // <Link href={{
                //     pathname: '/eventType/[id]',
                //     params: { id: item.id },
                // }} asChild>
                <TouchableOpacity>
                  <Text>{item.dateAttended}</Text>
                </TouchableOpacity>
                // </Link>
              )}
              contentContainerStyle={styles.flatListContainer}
              ListEmptyComponent={
                <Text style={styles.textDanger}>
                  Chưa có hội đoàn nào
                </Text>
              }
            />
          )}
        {/* <TouchableOpacity style={styles.floatButton}
          onPress={handleOpenForm}>
          <Feather
            name={"plus"}
            size={22}
            color={"#fff"} />
        </TouchableOpacity> */}
      </View>
    </View>
  )
}