import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import styles from '@/assets/styles/createCatholicBook.styles'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { IconName } from '@/constants/ionicons.icons'
import { TextColors } from '@/constants/text.colors'
import { router, useFocusEffect } from 'expo-router'
import { InputAuth } from '@/components/InputAuth'
import GenderSelection from '@/components/GenderSelection'
import { genderEnum } from '@/enums/gender.enum'
import { formatDateToDDMMYYYY } from '@/utils/formatDate'
import COLORS from '@/constants/colors'
import { isAndroid } from '@/utils/device'
import { Picker } from '@react-native-picker/picker'
import ModalDropDown from '@/components/ios/ModalDropDown'
import CustomDatePickerModal from '@/components/customDatePickerModal'
// import  from '@/commons/zustand/useChurchStore'
import useGetData from '@/commons/zustand/useChurchStore'
import { Constants } from '@/constants/appConstant'
import { CatholicDTO } from '@/commons/DTOs/CatholicDTO'
import { CatholicBookDTO } from '@/commons/DTOs/CatholicBookDTO'
import { CatholicBookController } from '@/services/APIController/CatholicBookController'
import { CatholicController } from '@/services/APIController/CatholicController'
import { useTabBarVisibility } from '@/hooks/TabBarVisibilityContext'
import { AssessorUserProfile } from '@/commons/zustand/useAuthStore'


export default function CreateCatholicBook() {
    const [bookNumber, setBookNumber] = useState("");
    const [fullName, setFullName] = useState("");
    const [gender, setGender] = useState(genderEnum.male);
    const [show, setShow] = useState(false);
    const currentDay = new Date();
    const [dateOfBirth, setDOB] = useState(currentDay);
    const [showFeast, setShowFeast] = useState(false);
    const [placeOfBirth, setPlaceOfBirth] = useState("");
    const [selectedChurch, setSelectedChurch] = useState<string>();
    const [selectEdethnicMinority, setSelectedEdethnicMinority] = useState<string>();
    const [selectSaint, setSelectedSaint] = useState<string>();
    const [feastDay, setFeastDay] = useState(new Date());
    const { setTabBarVisible } = useTabBarVisibility();
    const { idBook, setIdBook, id, setUserId } = AssessorUserProfile.getState();
    // Ẩn TabBar khi vào trang + Hiển thị lại khi rời đi
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
    }, [fetchChurches, fetchSaints, fetchEthnics]);

    const handleBack = () => {
        router.back()
    }

    /**
     * TODO: complete function.
     */
    const onClickCreate = async () => {
        try {
            const newCatholic: CatholicDTO = {
                id: Constants.emptyGuid,
                fullName,
                gender,
                dateOfBirth: dateOfBirth,
                placeOfBirth,
                feastDay: feastDay.toISOString().split("T")[0],
                bookNumber,
                churchId: selectedChurch,
                saintId: selectSaint,
                ethnicMinorityId: selectEdethnicMinority,
            };
            // {"bookNumber": "56464", "dateCreated": "2024-12-22", "dateIssued": "0001-01-01", "id": "1f97ef36-aab7-40c8-a978-80a91a66e774", "position": 9}
            const newBook: CatholicBookDTO = {
                id: Constants.emptyGuid,
                dateCreated: currentDay.toISOString().split("T")[0],
                // dateIssused: dateIssues.toISOString().split("T")[0],
                bookNumber: bookNumber
            };

            const responseBook = await CatholicBookController.create(newBook);
            // console.log('-- Date of birth: ', feastDay.toISOString().split("T")[0]);
            const response = await CatholicController.create(newCatholic);

            if (response.code === 1 && response.idReturn) {
               setUserId(response.idReturn);
            }

            if (responseBook.code === 1 && responseBook.idReturn) {
                setIdBook(responseBook.idReturn);
            }

            router.push("/(tabs)/(bookStacks)");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <View style={styles.rightArea}>
                    <TouchableOpacity onPress={handleBack}>
                        <Ionicons name={IconName.back} size={22} color={TextColors.white} />
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={styles.textHeader}>Tạo Sổ Công Giáo</Text>
                </View>
                <View style={styles.rightArea}>
                    {/* <TouchableOpacity onPress={onClickRightAction}>
                        <Feather name={options.rightIconName} size={IconSize.header20} color={textColors.white} />
                    </TouchableOpacity> */}
                </View>
            </View>
            <ScrollView>
                <View style={styles.inputRow}>
                    <Text style={styles.label}>Số sổ: </Text>
                    <InputAuth
                        value={bookNumber}
                        onChangeText={setBookNumber}
                        placeholder="Nhập số sổ"
                    />
                </View>
                <View style={styles.inputRow}>
                    <Text style={styles.label}>Họ và Tên: </Text>
                    <InputAuth
                        value={fullName}
                        onChangeText={setFullName}
                        placeholder="Nhập họ và tên"
                    />
                </View>
                <View style={styles.inputRow}>
                    <Text style={styles.label}>Giới tính: </Text>
                    <GenderSelection
                        selectedGender={gender ?? genderEnum.unknown} // Gán giá trị hiện tại từ formData
                        onGenderChange={setGender}
                    />
                </View>
                <View style={styles.inputRow}>
                    <Text style={styles.label}>Ngày sinh: </Text>
                    <TouchableOpacity
                        onPress={() => setShow(true)}
                        style={styles.datePicker}>
                        <Text style={styles.txtDate}>
                            {formatDateToDDMMYYYY(dateOfBirth)}</Text>
                        <FontAwesome name="calendar-plus-o" size={18} color={COLORS.primary} />
                    </TouchableOpacity>
                </View>
                <View style={styles.inputRow}>
                    <Text style={styles.label}>Nơi sinh: </Text>
                    <InputAuth
                        value={placeOfBirth}
                        onChangeText={setPlaceOfBirth}
                        placeholder="Nhập nơi sinh:"
                    />
                </View>
                <View style={styles.inputRow}>
                    <Text style={styles.label}>Chọn nhà thờ: </Text>
                    {isAndroid ? (
                        <Picker
                            selectedValue={selectedChurch}
                            style={styles.churchDropDown}
                            onValueChange={(itemValue, itemIndex) => {
                                // console.log(itemValue)
                                setSelectedChurch(itemValue)
                            }
                            }>
                            <Picker.Item label={"=== Chọn nhà thờ ==="} value={""} />
                            {churches.map((church) => (
                                <Picker.Item key={church.id} label={church.name} value={church.id} />
                            ))}
                        </Picker>
                    ) : (
                        <ModalDropDown
                            data={churches}
                            onSelect={(church) => setSelectedChurch(church.id)} />
                    )}
                </View>
                <View style={styles.inputRow}>
                    <Text style={styles.label}>Chọn dân tộc: </Text>
                    {isAndroid ? (
                        <Picker
                            selectedValue={selectEdethnicMinority}
                            style={styles.churchDropDown}
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
                            data={ethnicMinorities.map(ethnicMinority => ({ ...ethnicMinority, id: ethnicMinority.id || '' }))} // Fix type error
                            onSelect={(ethnicMinority) => setSelectedEdethnicMinority(ethnicMinority.id)}
                            placeholder='=== Chọn dân tộc ===' />
                    )}
                </View>
                <View style={styles.inputRow}>
                    <Text style={styles.label}>Chọn tên thánh: </Text>
                    {isAndroid ? (
                        <Picker
                            selectedValue={selectSaint}
                            style={styles.churchDropDown}
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
                            onSelect={(saint) => setSelectedSaint(saint.id)}
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
                        <FontAwesome name="calendar-plus-o" size={18} color={COLORS.primary} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.buttonAdd} onPress={onClickCreate}
                    disabled={isLoading}>
                    <Text style={styles.label}>
                        {isLoading ?
                            <ActivityIndicator size={"small"} color={COLORS.red} /> : "Tạo sổ mới"}
                    </Text>
                </TouchableOpacity>
            </ScrollView>
            <CustomDatePickerModal
                visible={show}
                initialDate={dateOfBirth}
                onDateSelected={(date) => setDOB(date)}
                onClose={() => setShow(false)}
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