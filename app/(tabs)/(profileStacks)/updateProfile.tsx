import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useFocusEffect } from 'expo-router';
import { useTabBarVisibility } from '@/hooks/TabBarVisibilityContext';
import styles from '@/assets/styles/profilesStyle/updateProfile.styles';
import HeaderTabs from '@/components/HeaderTabs';
import { TextInput } from 'react-native-paper';
import COLORS from '@/constants/colors';
import GenderSelection from '@/components/GenderSelection';
import { genderEnum } from '@/enums/gender.enum';
import { formatDateToDDMMYYYY } from '@/utils/formatDate';
import { FontAwesome } from '@expo/vector-icons';
import { isAndroid } from '@/utils/device';
import { Picker } from '@react-native-picker/picker'
import ModalDropDown, { ObjectInput } from '@/components/ios/ModalDropDown';
import useGetData from '@/commons/zustand/useChurchStore'
import { AssessorUserProfile } from '@/commons/zustand/useAuthStore';
import { CatholicController } from '@/services/APIController/CatholicController';
import { CatholicDTO } from '@/commons/DTOs/CatholicDTO';
import CustomDatePickerModal from '@/components/customDatePickerModal';

export default function UpdateProfile() {
  const { setTabBarVisible } = useTabBarVisibility();
  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState(genderEnum.unknown);
  const [dateOfBirth, setDOB] = useState(new Date());
  const [showDOB, setShowDOB] = useState(false);
  const [placeOfBirth, setPlaceOfBirth] = useState("");
  const [feastDay, setFeastDay] = useState(new Date());
  const [showFeast, setShowFeast] = useState(false);

  const [churchId, setChurchId] = useState();
  const [selectedChurch, setSelectedChurch] = useState<ObjectInput | null>(null);
  // const [churches, setChurches] = useState<ObjectInput[]>([]);

  const [ethnicMinorityId, setEthnicMinorityId] = useState();
  // const [ethnicMinorities, setEthnicMinorities] = useState<ObjectInput[]>([]);
  const [selectEdethnicMinority, setSelectedEdethnicMinority] = useState<ObjectInput | null>(null);

  const [saintId, setSaintId] = useState();
  // const [saints, setSaints] = useState<ObjectInput[]>([]);
  const [selectSaint, setSelectedSaint] = useState<ObjectInput | null>(null);

  const { id } = AssessorUserProfile.getState();
  const [initialData, setInitialData] = useState<CatholicDTO | null>(null);

  const [isDisable, setDisable] = useState<boolean>(true);

  // Ẩn TabBar khi vào trang 
  // Hiển thị lại khi rời đi
  useFocusEffect(
    useCallback(() => {
      setTabBarVisible(false);
      return () => setTabBarVisible(true);
    }, [setTabBarVisible])
  );

  const { churches, fetchChurches, isLoading,
    saints,
    fetchSaints,
    ethnicMinorities,
    fetchEthnics
  } = useGetData();

  useEffect(() => {
    fetchChurches();
    fetchSaints();
    fetchEthnics();
  }, [fetchChurches, fetchEthnics, fetchSaints]);

  useEffect(() => {
    getCatholicDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!initialData) return;

    const hasChanged =
      fullName !== initialData.fullName ||
      gender !== initialData.gender ||
      dateOfBirth.toISOString() !== new Date(initialData.dateOfBirth).toISOString() ||
      placeOfBirth !== initialData.placeOfBirth ||
      feastDay.toISOString() !== new Date(initialData.feastDay).toISOString() ||
      (selectedChurch?.id || churchId) !== initialData.churchId ||
      (selectSaint?.id || saintId) !== initialData.saintId ||
      (selectEdethnicMinority?.id || ethnicMinorityId) !== initialData.ethnicMinorityId;

    setDisable(!hasChanged || !fullName);
  }, [fullName, gender, dateOfBirth, placeOfBirth, feastDay, selectedChurch, selectSaint, selectEdethnicMinority, initialData, churchId, ethnicMinorityId, saintId]);

  async function getCatholicDetails() {
    try {
      const response = await CatholicController.getById(id);
      if (response != null) {
        console.log("-- User Detail: ", response.churchId);
        setFullName(response.fullName);
        setGender(response.gender);
        setDOB(new Date(response.dateOfBirth));
        setPlaceOfBirth(response.placeOfBirth);
        setFeastDay(new Date(response.feastDay));
        setChurchId(response.churchId);
        setEthnicMinorityId(response.ethnicMinorityId);
        setSaintId(response.saintId);
      }
      // Lưu trạng thái ban đầu
      setInitialData({
        id: id,
        fullName: response.fullName,
        gender: response.gender,
        dateOfBirth: response.dateOfBirth,
        placeOfBirth: response.placeOfBirth,
        feastDay: response.feastDay,
        churchId: response.churchId,
        saintId: response.saintId,
        ethnicMinorityId: response.ethnicMinorityId,
      });
    } catch (error) {
      console.log("-- Lỗi Khi getCatholicDetails", error);
    }
  };

  const handleUpdate = async () => {
    try {
      const newCatholicDTO: CatholicDTO = {
        id: id,
        fullName,
        gender,
        dateOfBirth: dateOfBirth,
        placeOfBirth,
        feastDay: feastDay.toISOString().split("T")[0],
        churchId: selectedChurch?.id || churchId,
        saintId: selectSaint?.id || saintId,
        ethnicMinorityId: selectEdethnicMinority?.id || ethnicMinorityId,
      }
      console.log("-- CatholicDTO: ", newCatholicDTO);
    } catch (error) {
      console.log("-- Lỗi không thể cập nhật Catholic!", error);
    }
  };

  return (
    <View style={styles.container}>
      <HeaderTabs title='Cập nhật thông tin'
        showBack={true} />
      <ScrollView contentContainerStyle={styles.bodyContainer}>
        <View style={styles.inputRow}>
          <TextInput
            textColor={COLORS.black}
            activeOutlineColor={COLORS.black}
            outlineColor={COLORS.black}
            label={"Họ tên"}
            value={fullName}
            mode="outlined"
            style={styles.input}
            placeholder={"Nhập họ và tên"}
            onChangeText={(text) => setFullName(text)}
            autoCorrect={false}
          />
        </View>
        <View style={styles.inputRow}>
          <Text style={styles.label}>Giới tính: </Text>
          <GenderSelection
            selectedGender={gender ?? genderEnum.unknown}
            onGenderChange={setGender} />
        </View>
        <View style={styles.inputRow}>
          <Text style={styles.label}>Ngày sinh: </Text>
          <TouchableOpacity
            onPress={() => setShowDOB(true)}
            style={styles.datePicker}>
            <Text style={styles.txtDate}>
              {formatDateToDDMMYYYY(dateOfBirth)}</Text>
            <FontAwesome name="calendar-plus-o" size={18} color={COLORS.secondary} />
          </TouchableOpacity>
        </View>
        <View style={styles.inputRow}>
          <TextInput
            textColor={COLORS.black}
            activeOutlineColor={COLORS.black}
            outlineColor={COLORS.black}
            label={"Nơi sinh"}
            value={placeOfBirth}
            mode="outlined"
            style={styles.input}
            placeholder={"Nhập nơi sinh"}
            onChangeText={(text) => setPlaceOfBirth(text)}
            autoCorrect={false}
          />
        </View>
        <View style={styles.inputRow}>
          <Text style={styles.label}>Chọn nhà thờ: </Text>
          {isAndroid ? (
            <Picker
              selectedValue={churchId || selectedChurch}
              style={styles.dropDown}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedChurch(itemValue)
              }>
              <Picker.Item label={"=== Chọn nhà thờ ==="} value={""} />
              {churches.map((church) => (
                <Picker.Item key={church.id} label={church.name} value={church.id} />
              ))}
            </Picker>
          ) : (
            <ModalDropDown
              data={churches}
              onSelect={(church) => setSelectedChurch(church)}
              selectedId={churchId}
              placeholder="=== Chọn nhà thờ ==="
            />
          )}
        </View>
        <View style={styles.inputRow}>
          <Text style={styles.label}>Chọn dân tộc: </Text>
          {isAndroid ? (
            <Picker
              selectedValue={ethnicMinorityId || selectEdethnicMinority}
              style={styles.dropDown}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedEdethnicMinority(itemValue)
              }>
              <Picker.Item label={"=== Chọn dân tộc ==="} value={""} />
              {ethnicMinorities.map((ethnicMinority) => (
                <Picker.Item key={ethnicMinority.id} label={ethnicMinority.name} value={ethnicMinority.id} />
              ))}
            </Picker>
          ) : (
            <ModalDropDown
              data={ethnicMinorities.map(ethnicMinority => ({ ...ethnicMinority, id: ethnicMinority.id || '' }))}
              selectedId={ethnicMinorityId}
              onSelect={(ethnicMinority) => setSelectedEdethnicMinority(ethnicMinority)}
              placeholder='=== Chọn dân tộc ===' />
          )}
        </View>
        <View style={styles.inputRow}>
          <Text style={styles.label}>Chọn tên thánh: </Text>
          {isAndroid ? (
            <Picker
              selectedValue={saintId || selectSaint}
              style={styles.dropDown}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedSaint(itemValue)
              }>
              <Picker.Item label={"=== Chọn tên thánh ==="} value={""} />
              {saints.map((saint) => (
                <Picker.Item key={saint.id} label={saint.name} value={saint.id} />
              ))}
            </Picker>
          ) : (
            <ModalDropDown
              data={saints.map(saint => ({ ...saint, id: saint.id || '' }))}
              selectedId={saintId}

              onSelect={(saint) => setSelectedSaint(selectSaint || saint)}
              placeholder='=== Chọn tên thánh ===' />
          )}
        </View>
        <View style={styles.inputRow}>
          <Text style={styles.label}>Ngày lễ quan thầy: </Text>
          <TouchableOpacity
            onPress={() => setShowFeast(true)}
            style={styles.datePicker}>
            <Text style={styles.txtDate}>
              {formatDateToDDMMYYYY(feastDay)}</Text>
            <FontAwesome name="calendar-plus-o" size={18} color={COLORS.secondary} />
          </TouchableOpacity>
        </View>
        <View style={{ borderBottomWidth: 1, marginVertical: 20, marginHorizontal: 20, borderBottomColor: '#bdbdbd99' }} />
        <TouchableOpacity
          style={styles.buttonAdd}
          onPress={handleUpdate}
          disabled={isDisable}
        >
          <Text style={styles.label}>
            {isLoading ?
              <ActivityIndicator size={"small"} color={COLORS.red} /> : "Cập nhật"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
      {/* Modal show datepicker */}
      <CustomDatePickerModal
        visible={showDOB}
        initialDate={dateOfBirth}
        onDateSelected={(date) => setDOB(date)}
        onClose={() => setShowDOB(false)}
      />
      <CustomDatePickerModal
        visible={showFeast}
        initialDate={feastDay}
        onDateSelected={(date) => setFeastDay(date)}
        onClose={() => setShowFeast(false)}
      />
    </View>
  )
}