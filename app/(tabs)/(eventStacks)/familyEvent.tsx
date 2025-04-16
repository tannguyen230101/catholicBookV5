import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import COLORS from '@/constants/colors';
import { useModalForm } from '@/hooks/ModalFormContext';
import useGetData from '@/commons/zustand/useChurchStore'
import { EventTypeDTO } from '@/commons/DTOs/EventTypeDTO';
import { windowWidth } from '@/utils/device';
import { Feather } from '@expo/vector-icons';
import { IconFeatherName } from '@/constants/feather.icons';
import { Link } from 'expo-router';

const FamilyEvent = () => {
  const { openModal } = useModalForm();
  const { fetchEventTypes, isLoading, eventTypes } = useGetData();

  useEffect(() => {
    fetchEventTypes();
  }
    , [fetchEventTypes]);

  const handleOpenForm = () => {
    openModal({
      title: "Tạo thể loại sự kiện",
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
      {isLoading ? <ActivityIndicator
        size={"small"}
        color={COLORS.red}
        style={{ flex: 1, justifyContent: 'center' }} /> :
        <FlatList<EventTypeDTO>
          data={eventTypes}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Link href={{
              pathname: '/eventType/[id]',
              params: { id: item.id },
            }} asChild>
              <TouchableOpacity style={styles.eventButton}>
                <Text style={styles.buttonText}>
                  {item.name}
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
  )
}

const styles = StyleSheet.create({
  eventContainer: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    backgroundColor: COLORS.primary,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  eventButton: {
    width: "80%",
    backgroundColor: COLORS.secondary,
    marginVertical: 8,
    paddingVertical: 16,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    padding: 10,
    marginTop: 15,
    marginRight: "auto",
    marginLeft: "auto",
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  flatListEventType: {
    flex: 1,
    width: windowWidth * 0.9,
    marginTop: 20,
  },
  floatButton: {
    backgroundColor: COLORS.black,
    justifyContent: 'center',
    alignItems: 'center',
    height: windowWidth * 0.15,
    width: windowWidth * 0.15,
    borderRadius: windowWidth * 0.15,
    position: 'absolute',
    bottom: 70,
    right: 15,
    shadowColor: COLORS.black,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
});

export default FamilyEvent;