import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useTabBarVisibility } from '@/hooks/TabBarVisibilityContext'
import { Link, useFocusEffect, useLocalSearchParams } from 'expo-router';
import HeaderTabs from '@/components/HeaderTabs';
import { Feather, FontAwesome } from '@expo/vector-icons';
import COLORS from '@/constants/colors';
import { CatholicEventDTO } from '@/commons/DTOs/CatholicEventDTO';
import styles from '@/assets/styles/eventStacks/eventTypeById.styles';
import { Constants } from '@/constants/appConstant';
import { CatholicEventController } from '@/services/APIController/CatholicEventController';
import { AssessorUserProfile } from '@/commons/zustand/useAuthStore';
import { useModalForm } from '@/hooks/ModalFormContext';
import useGetData from '@/commons/zustand/useChurchStore';
import { getChurchName } from '@/utils/getChurchName';
import { getCatholicName } from '@/utils/getCatholicName';
import { getEventTypeName } from '@/utils/getEventTypeName';

export default function EventTypeById() {
  const { setTabBarVisible } = useTabBarVisibility();
  const [catholicEventList, setCatholicEventList] = useState<CatholicEventDTO[]>([]);
  const { id } = AssessorUserProfile.getState();
  const { eventTypeId } = useLocalSearchParams();
  const { churches, isLoading } = useGetData.getState();
  const [eventTypeName, setEventTypeName] = useState<string>();
  const { openModal } = useModalForm();

  // Ẩn TabBar khi vào trang 
  // Hiển thị lại khi rời đi
  useFocusEffect(
    useCallback(() => {
      setTabBarVisible(false);
      return () => setTabBarVisible(true);
    }, [setTabBarVisible])
  );

  const handleOpenForm = () => {
    openModal({
      title: "Tạo thể loại sự kiện",
      fields: [
        {
          name: "dateOfEvent",
          label: "Ngày tổ chức",
          type: "datePicker"
        },
        {
          name: "eventBookNumber",
          label: "Số sổ sự kiện",
          type: "text",
          placeholder: "Nhập số sổ sự kiện"
        },
        {
          name: "church",
          label: "Nhà thờ",
          type: "dropdown",
          placeholder: "=== Chọn nhà thờ ===",
          data: churches
        },
        // {
        //   name: "catholicId",
        //   label: `Do ai làm ${eventTypeName}`,
        //   type: "dropdown",
        //   placeholder: `=== Chọn người làm ${eventTypeName} ===`,
        //   data: churches
        // },
      ],
      onSubmit: async (data) => {
        // console.log("Dữ liệu form:", data.church);
        try {
          const dtoCatholicEvent: CatholicEventDTO = {
            id: Constants.emptyGuid,
            dateOfEvent: data.dateOfEvent || "",
            eventBookNumber: data.eventBookNumber || "",
            eventTypeId: Array.isArray(eventTypeId) ? eventTypeId[0] : eventTypeId || "",
            churchId: data.church,
            catholicId: id,
            dateCreated: data.dateOfEvent || "",
            dateUpdated: data.dateOfEvent || "",
            position: 1
          };
          await CatholicEventController.create(dtoCatholicEvent);
        } catch (error) {
          console.log("-- Lỗi không thể tạo Catholic Event: ", error);
        }
      },
    });
  };

  const fetchData = useCallback(async () => {
    try {
      const catholicEventByEventTypeId = await CatholicEventController.getByEventTypeId(
        Array.isArray(eventTypeId) ? eventTypeId[0] : eventTypeId || ""
      );
      const catholicEventByCatholicId = await CatholicEventController.getByCatholicId(id);

      // Lọc danh sách sự kiện mà người dùng có tham gia
      const filteredData = catholicEventByEventTypeId.filter((event: CatholicEventDTO) =>
        catholicEventByCatholicId.some((userEvent: CatholicEventDTO) => userEvent.id === event.id)
      );

      // Thêm churchName vào từng sự kiện
      const eventsWithChurchName = await Promise.all(
        filteredData.map(async (event: CatholicEventDTO) => ({
          ...event,
          churchName: event.churchId ? await getChurchName(event.churchId) : "Không xác định",
          catholicName: event.catholicId ? await getCatholicName(event.catholicId) : "Không xác định"
        }))
      );

      const eventTypeName = await getEventTypeName(Array.isArray(eventTypeId) ? eventTypeId[0] : eventTypeId || "");
      setEventTypeName(eventTypeName);

      setCatholicEventList(eventsWithChurchName);
    } catch (error) {
      console.log("-- Error fetching events: ", error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Function Edit, and upload to modal form.
  const actionEditCatholicEvent = async (idCatholicEvent: string) => {
    try {
      const response = await CatholicEventController.getById(idCatholicEvent);
      openModal({
        title: "Chỉnh sửa thông tin",
        fields: [
          {
            name: "dateOfEvent",
            label: "Ngày tổ chức",
            type: "datePicker"
          },
          {
            name: "eventBookNumber",
            label: "Số sổ sự kiện",
            type: "text",
            placeholder: "Nhập số sổ sự kiện"
          },
          {
            name: "church",
            label: "Nhà thờ",
            type: "dropdown",
            placeholder: "=== Chọn nhà thờ ===",
            data: churches
          },
          {
            name: "catholic",
            label: "Do ai rửa tội",
            type: "dropdown",
            placeholder: "=== Chọn người rửa tội ===",
            data: churches
          },
        ],
        initialValues: {
          id: Constants.emptyGuid,
          dateOfEvent: response.dateOfEvent,
          eventBookNumber: response.eventBookNumber,
          church: response.churchId,
          catholic: response.catholicId,
        },
        onSubmit: (updatedData) => {
          console.log("Dữ liệu đã cập nhật:", updatedData);
        }
      });
    } catch (error) {
      console.log("-- Error: ", error);
    }
  };

  const handleDeleteCatholicEvent = async (idCatholicEvent: string) => {
    try {
      console.log("-- idCatholicEvent Deleted: ", idCatholicEvent);

      await CatholicEventController.delete(idCatholicEvent);
    } catch (error) {
      console.log("-- Error: ", error);
    }
  };

  const renderEventItem = ({ item }: { item: CatholicEventDTO }) => (
    <Link
      href={{
        pathname: '/details/[id]',
        params: { id: item.id },
      }} asChild>
      <TouchableOpacity style={styles.eventItem}>
        <View>
          <Text style={[styles.eventLabel]}>Số sổ sự kiện: <Text style={[styles.eventText]}>{item.eventBookNumber}</Text> </Text>
          <Text style={[styles.eventLabel]}>Nhà thờ:</Text>
          <Text style={[styles.eventText]}>{item.churchName}</Text>
          <Text style={[styles.eventLabel]}>Của người công giáo nào</Text>
          <Text style={[styles.eventText]}>{item.catholicName}</Text>
          <Text style={[styles.eventLabel]}>Loại sự kiện: </Text>
          <Text style={[styles.eventText]}>{item.eventType}</Text>
        </View>
        <View style={styles.iconContainer}>
          <TouchableOpacity
            style={styles.iconPress}
            onPress={() => actionEditCatholicEvent(item.id)}>
            <FontAwesome
              name="edit"
              size={24}
              color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconPress}
            onPress={() => handleDeleteCatholicEvent(item.id)}>
            <FontAwesome
              name="trash"
              size={24}
              color="red" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Link>
  );


  return (
    <View style={styles.container}>
      <HeaderTabs title='Loại sự kiện'
        showBack={true} />
      <View style={styles.body}>
        {isLoading ? <ActivityIndicator
          size={"small"}
          color={COLORS.primary}
          style={{ flex: 1, justifyContent: 'center' }} />
          : (catholicEventList.length === 0 ? (
            <Text style={styles.emptyText}>
              Hiện không có sự kiện nào diễn ra.
            </Text>
          ) : (
            <FlatList
              data={catholicEventList}
              renderItem={renderEventItem}
              keyExtractor={(item, index) => index.toString()}
            />
          ))}
      </View>
      <TouchableOpacity style={styles.floatButton}
        onPress={handleOpenForm}>
        <Feather
          name={"plus"}
          size={22}
          color={"#fff"} />
      </TouchableOpacity>
    </View>
  )
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });