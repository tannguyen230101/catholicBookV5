import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import COLORS from '@/constants/colors';
import { Link } from 'expo-router';
import { ChurchEventDTO } from '@/commons/DTOs/ChurchEventDTO';
import { ChurchEventController } from '@/services/APIController/ChurchEventController';
import styles from '@/assets/styles/eventStacks/churchEvent.styles';
import { checkNetwork } from '@/hooks/NetworkManager';
import { Feather } from '@expo/vector-icons';
import { IconFeatherName } from '@/constants/feather.icons';
import { useModalForm } from '@/hooks/ModalFormContext';

const ChurchEvent = () => {
  const [loading, setLoading] = useState(true);
  const [churchEvents, setChurchEvents] = useState<ChurchEventDTO[]>([]);
  const { openModal } = useModalForm();
  
  useEffect(() => {
    getEventTypes();
  }, []);

  const getEventTypes = async () => {
    if (!checkNetwork()) {
      console.log('Không có kết nối mạng!');
      return;
    }
    try {
      console.log("📡 Fetching data...");
      // const churchEvents = await ChurchEventController.getByChurchId("1457c983-2155-4602-9b76-da1ab9899024");
      const churchEvents = await ChurchEventController.getAll();
      console.log("📡 Fetched data...", churchEvents);

      setChurchEvents(churchEvents);
    } catch (error) {
      console.error("❌ Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Function Tạo Hội đoàn (Church Congregation Activity)
  const handleOpenForm = () => {
    openModal({
      title: "Tạo Hội Đoàn",
      fields: [
        {
          name: "name",
          label: "Tên loại sự kiện",
          type: "text",
          placeholder: "Tên loại sự kiện"
        },
        {
          name: "description",
          label: "Mô tả",
          type: "description",
          placeholder: "Nhập mô tả"
        },
      ],
      onSubmit: (data) => {
        console.log("Dữ liệu form:", data);
        // uploadData(data);
      },
    });
  };

  return (
    <View style={styles.eventContainer}>
      <Link href={{
        pathname: '/communityChurch',
        // params: { id: item.id },
      }} asChild>
        <TouchableOpacity style={styles.eventButton}>
          <Text style={styles.buttonText}>Hội Đoàn</Text>
        </TouchableOpacity>
      </Link>
      {loading ? <ActivityIndicator size={"small"} color={COLORS.primary} style={{ flex: 1, justifyContent: 'center' }} /> :
        <FlatList<ChurchEventDTO>
          data={churchEvents}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Link href={{
              pathname: '/eventType/[id]',
              params: { id: item.id },
            }} asChild>
              <TouchableOpacity style={styles.eventButton}>
                <Text style={styles.buttonText}>
                  {item.eventType}
                </Text>
              </TouchableOpacity>
            </Link>
          )}
          contentContainerStyle={styles.flatListEventType}
        />}
      <TouchableOpacity style={styles.floatButton}
        onPress={handleOpenForm}>
        <Feather
          name={IconFeatherName.plus}
          size={22}
          color={"#fff"} />
      </TouchableOpacity>
    </View>
  );
};

export default ChurchEvent;