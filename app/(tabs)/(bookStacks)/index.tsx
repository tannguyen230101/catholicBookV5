import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import HeaderTabs from '@/components/HeaderTabs'
import styles from '@/assets/styles/book.styles'
import { Image } from 'expo-image'
import { AssessorUserProfile } from '@/commons/zustand/useAuthStore'
import { Constants } from '@/constants/appConstant'
import { CatholicController } from '@/services/APIController/CatholicController'
import { useModalForm } from '@/hooks/ModalFormContext'
import { genderEnum } from '@/enums/gender.enum'
import useGetData from '@/commons/zustand/useChurchStore'
import { CatholicDTO } from '@/commons/DTOs/CatholicDTO'
import { CatholicBookDTO } from '@/commons/DTOs/CatholicBookDTO'
import { CatholicBookController } from '@/services/APIController/CatholicBookController'
import { router } from 'expo-router'

export default function Book() {
  const { idBook, setIdBook, id } = AssessorUserProfile.getState();
  const currentDay = new Date();
  const { openModal } = useModalForm();
  const [catholics, setCatholics] = useState([]);
  const { churches, fetchChurches, isLoading,
    saints,
    fetchSaints,
    ethnicMinorities,
    fetchEthnics
  } = useGetData();
  // console.log("--- id Book", id);

  useEffect(() => {
    fetchChurches();
    fetchSaints();
    fetchEthnics();
  }, [fetchChurches, fetchSaints, fetchEthnics]);

  useEffect(() => {
    // getCatholicById();
    getCatholicByBookId();
  }, []);

  // const getCatholicById = async () => {
  //   try {
  //     // userId loged in
  //     // const userId = "adbeb3ba-6a5f-4451-8616-f5d06dceafed"
  //     const userId = id;
  //     const res = await CatholicController.getById(userId);
  //     console.log(res);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const getCatholicByBookId = async () => {
    try {
      // const bookId = idBook;
      const bookId = "1f97ef36-aab7-40c8-a978-80a91a66e774";
      // const response = await CatholicBookController.getById(idBook);
      // "1f97ef36-aab7-40c8-a978-80a91a66e774"
      const response = await CatholicController.getByBookId(bookId);
      if (response) {
        setCatholics(response);
      }
      // console.log("-- res of catholic book: ", response);
    } catch (error) {
      console.log(error);
    }
  };

  // const handleOpenForm = () => {
  //   openModal({
  //     title: "Tạo người công giáo",
  //     fields: [
  //       {
  //         name: "bookNumber",
  //         label: "Số sổ",
  //         type: "text",
  //         placeholder: "Nhập số sổ"
  //       },1
  //       {
  //         name: "fullName",
  //         label: "Họ tên",
  //         type: "text",
  //         placeholder: "Nhập tên"
  //       },
  //       {
  //         name: "placeOfBirth",
  //         label: "Nơi sinh",
  //         type: "text",
  //         placeholder: "Nhập nơi sinh"
  //       },
  //       {
  //         name: "gender",
  //         label: "Giới tính",
  //         type: "radio",
  //         options: [
  //           { label: "Nam", value: genderEnum.male },
  //           { label: "Nữ", value: genderEnum.female },
  //           { label: "Khác", value: genderEnum.unknown },
  //         ],
  //       },
  //       {
  //         name: "dateOfBirth",
  //         label: "Ngày sinh",
  //         type: "datePicker"
  //       },
  //       {
  //         name: "saint",
  //         label: "Tên thánh",
  //         type: "dropdown",
  //         placeholder: "=== Chọn tên thánh ===",
  //         data: saints
  //       },
  //       {
  //         name: "feastDay",
  //         label: "Ngày lễ quan thầy",
  //         type: "datePicker"
  //       },
  //       {
  //         name: "church",
  //         label: "Nhà thờ",
  //         type: "dropdown",
  //         placeholder: "=== Chọn nhà thờ ===",
  //         data: churches
  //       },
  //       {
  //         name: "ethnicMinority",
  //         label: "Dân tộc",
  //         type: "dropdown",
  //         placeholder: "=== Chọn dân tộc ===",
  //         data: ethnicMinorities
  //       },
  //     ],
  //     onSubmit: async (data) => {
  //       // console.log("Dữ liệu form:", data);
  //       const newCatholic: CatholicDTO = {
  //         id: Constants.emptyGuid,
  //         fullName: data.fullName,
  //         gender: data.gender.value,
  //         dateOfBirth: data.dateOfBirth,
  //         placeOfBirth: data.placeOfBirth,
  //         feastDay: data.feastDay.toISOString().split("T")[0],
  //         bookNumber: data.bookNumber,
  //         churchId: data.church,
  //         saintId: data.saint,
  //         ethnicMinorityId: data.ethnicMinority,
  //       };

  //       const newBook: CatholicBookDTO = {
  //         id: Constants.emptyGuid,
  //         dateCreated: currentDay.toISOString().split("T")[0],
  //         dateIssused: currentDay.toISOString().split("T")[0],
  //         bookNumber: data.bookNumber
  //       };

  //       await CatholicController.create(newCatholic);
  //       const responseBook = await CatholicBookController.create(newBook);

  //       if (responseBook.code === 1 && responseBook.idReturn) {
  //         setIdBook(responseBook.idReturn);
  //         console.log("idBook updated:", responseBook.idReturn);
  //       }
  //     },
  //   });
  // };

  const handleOpenBookFlipper = () => {
    //=== Cảnh bổ sung thêm vòng if ===//
    if(catholics && catholics.length > 0) {
      router.push({
        pathname: "/(tabs)/(bookStacks)/bookFlipped",
        params: { catholics: JSON.stringify(catholics) },
      });
    }
  };
  
  return (
    <View style={styles.container}>
      <HeaderTabs title='Sổ Công Giáo' />
      <View style={styles.body}>
        {/* TODO: Người dugnf đã có sổ chưa */}
        {catholics && catholics.length > 0 ? (
          <TouchableOpacity style={styles.card}
            onPress={handleOpenBookFlipper}>
            <View style={styles.innerCard}>
              <View style={{ flex: 60 }}>
                <View style={styles.illustrator}>
                  <Image
                    source={require("@/assets/images/soconggiao2.png")}
                    style={styles.images} />
                </View>
                <View style={styles.bookMark}>
                  <Text style={styles.textBookMark}>Sổ Gia Đình Công Giáo</Text>
                </View>
              </View>
              <View style={styles.footer}>
                <Image
                  source={require("@/assets/images/luatrai.png")}
                  style={styles.footerImages} />
                <Image
                  source={require("@/assets/images/logo_book.png")}
                  style={styles.logoBook} />
                <Image
                  source={require("@/assets/images/luaphai.png")}
                  style={styles.footerImages} />
              </View>
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => router.push("/(tabs)/(bookStacks)/createCatholicBook")}>
            <Text>Thêm mới</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
};




