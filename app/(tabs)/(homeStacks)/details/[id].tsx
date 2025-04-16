import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import HeaderTabs from '@/components/HeaderTabs'
import { useTabBarVisibility } from '@/hooks/TabBarVisibilityContext';
import { Link, useFocusEffect, useLocalSearchParams } from 'expo-router';
import styles from '@/assets/styles/homeStacks/detailChurch.styles';
import useGetData from '@/commons/zustand/useChurchStore';
import { ChurchCongregationActivityController } from '@/services/APIController/ChurchCongregationActivityController';
import { CongregationDTO } from '@/commons/DTOs/CongregationDTO';
import COLORS from '@/constants/colors';
import { formatDateToDDMMYYYY } from '@/utils/formatDate';
import { ChurchDTO } from '@/commons/DTOs/ChurchDTO';
import { ChurchControllerAPI } from '@/services/APIController/ChurchController';
import { getParishName } from '@/utils/getParishName';
import { CongregationController } from '@/services/APIController/CongregationController';

export default function DetailChurch() {
  const { setTabBarVisible } = useTabBarVisibility();
  const { id } = useLocalSearchParams();
  const churchId = Array.isArray(id) ? id[0] : id;
  const [churchCongregationActivities, setChurchCongregationActivities] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [congregations, setCongregations] = useState([]);
  const [churchDetail, setChurchDetail] = useState<ChurchDTO>();
  const [parishName, setParishName] = useState<string>();

  const { fetchChurches,
    fetchSaints,
    fetchEthnics
  } = useGetData.getState();

  // Ẩn TabBar khi vào trang 
  // Hiển thị lại khi rời đi
  useFocusEffect(
    useCallback(() => {
      setTabBarVisible(false);
      return () => setTabBarVisible(true);
    }, [setTabBarVisible])
  );

  useEffect(() => {
    fetchChurches();
    fetchSaints();
    fetchEthnics();
  }, [fetchChurches, fetchSaints, fetchEthnics]);

  useEffect(() => {
    getChurchCongregations();
  }, [churchId]);

  const getChurchCongregations = async () => {
    try {
      if (typeof id === 'string') {
        const response = await ChurchCongregationActivityController.getByChurchId(churchId);
        if (response) {
          console.log("ChurchCongregationActivities: ", response);
          setChurchCongregationActivities(response);
        }
      } else {
        console.error("Invalid id: Expected a string but received ", id);
      }
    } catch (error) {
      console.error("-- Error when fetching ChurchCongregationActivities: ", error);
    } finally {
      setLoading(false);
    }
  };

  const getChurch = useCallback(async () => {
    try {
      const response = await ChurchControllerAPI.getById(churchId);
      if (response) {
        setChurchDetail(response);
      }

      if (response) {
        const nameRespone = await getParishName(response.parishId);
        if (nameRespone) {
          setParishName(nameRespone);
        }
      }
    } catch (error) {
      console.error("-- Lỗi Khi get Church Details: ", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Get All Congregations.
  const getAllCongregation = async () => {
    try {
      const response = await CongregationController.getAll();
      if (response) {
        setCongregations(response);
      }
    } catch (error) {
      console.error("-- Error when fetching Congregations: ", error);
    }
  }

  useEffect(() => {
    getChurch();
    getChurchCongregations();
    getAllCongregation();
  }, [getChurch]);

  return (
    <View style={styles.container}>
      <HeaderTabs
        title='Chi tiết'
        showBack={true} />
      {isLoading ? (
        <ActivityIndicator
          size={"small"}
          color={COLORS.black} />
      ) : (
        <FlatList<CongregationDTO>
          data={congregations}
          keyExtractor={(item, index) => index.toString()}
          ListHeaderComponent={
            <>
              <View style={styles.bodyContainer}>
                <View style={styles.rowInfor}>
                  <Text style={styles.textLabel}>Địa Chỉ:</Text>
                  <Text style={styles.textData}>{churchDetail?.address}</Text>
                </View>
                <View style={styles.rowInfor}>
                  <Text style={styles.textLabel}>Tên Nhà Thờ:</Text>
                  <Text style={styles.textData}>{churchDetail?.name}</Text>
                </View>
                <View style={styles.rowInfor}>
                  <Text style={styles.textLabel}>Mô Tả:</Text>
                  <Text style={styles.textData}>{churchDetail?.description}</Text>
                </View>
                <View style={styles.rowInfor}>
                  <Text style={styles.textLabel}>Người Đại Diện:</Text>
                  <Text style={styles.textData}>{churchDetail?.representative}</Text>
                </View>
                <View style={styles.rowInfor}>
                  <Text style={styles.textLabel}>Giáo Xứ:</Text>
                  <Text style={styles.textData}>{parishName || "Đang cập nhật..."}</Text>
                </View>
                <View style={styles.rowInfor}>
                  <Text style={styles.textLabel}>Ngày Thành Lập:</Text>
                  <Text style={styles.textData}>
                    {churchDetail?.establishedOn
                      && formatDateToDDMMYYYY(churchDetail?.establishedOn)}
                  </Text>
                </View>
              </View>
              <Text style={[styles.textCongregation, { color: COLORS.primary }]}>
                Các hội đoàn
              </Text>
            </>
          }
          renderItem={({ item }) => (
            <Link href={{
              pathname: "/congregationActivities/[id]",
              params: { id: item.id }
            }} asChild>
              <TouchableOpacity style={styles.cardContainer}>
                <Text style={styles.buttonText}>{item.name}</Text>
              </TouchableOpacity>
            </Link>
          )}
          contentContainerStyle={styles.flatListContainer}
          ListEmptyComponent={
            <Text style={[styles.textTitle, { color: 'red', textAlign: 'center' }]}>
              Chưa có hội đoàn nào
            </Text>
          }
        />
      )}
    </View>
  )
};

