import { View, Text } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import HeaderTabs from '@/components/HeaderTabs'
import { useSearchParams } from 'expo-router/build/hooks';
import PagerView from 'react-native-pager-view';
import { CatholicDTO } from '@/commons/DTOs/CatholicDTO';
import { formatDateToDDMMYYYY } from '@/utils/formatDate';
import { useTabBarVisibility } from '@/hooks/TabBarVisibilityContext';
import { useFocusEffect } from 'expo-router';
import styles from '@/assets/styles/bookStacks/bookFlipped.styles';

export default function BookFlipped() {
  const searchParams = useSearchParams();
  const catholics = searchParams.get('catholics');
  // const catholicList = catholics ? JSON.parse(catholics) : [];
  let catholicList : CatholicDTO[] = [];
  const [currentPage, setCurrentPage] = useState(0);
  const { setTabBarVisible } = useTabBarVisibility();

  useFocusEffect(
    useCallback(() => {
      setTabBarVisible(false);
      return () => setTabBarVisible(true);
    }, [setTabBarVisible])
  );

  

  useEffect(() => {
    if (catholics && catholics.length > 0) {
      catholicList = JSON.parse(catholics);
    }
  }, [catholics]);

  const lineCount = 30;

  return (
    <View style={styles.container}>
      <HeaderTabs title='Sổ Công Giáo' showBack={true} />
      <View style={styles.body}>
        {catholicList.length > 0 ? (
          <View style={styles.pageContainer}>
            <PagerView
              style={styles.container}
              initialPage={0}
              onPageSelected={(e) => setCurrentPage(e.nativeEvent.position)}>
              {catholicList.map((item: CatholicDTO) => (
                <View style={styles.page} key={item.id.toString()}>
                  {Array.from({ length: lineCount }).map((_, index) => (
                    <View
                      key={index}
                      style={[
                        styles.line,
                        { top: index * 30 } // <-- Đặt vị trí top riêng cho mỗi dòng
                      ]}
                    />
                  ))}
                  <View style={styles.content}>
                    <Text style={styles.label}>Họ và tên</Text>
                    <Text style={styles.value}>{item?.fullName}</Text>

                    <Text style={styles.label}>Ngày sinh</Text>
                    <Text style={styles.value}>{formatDateToDDMMYYYY(item?.dateOfBirth.toLocaleString())}</Text>

                    <Text style={styles.label}>Nơi sinh</Text>
                    <Text style={styles.value}>{item?.placeOfBirth || "..... "}</Text>

                    <Text style={styles.label}>Quan Thầy</Text>
                    <Text style={styles.value}>{item?.saintName || "..... "}</Text>

                    <Text style={styles.label}>Ngày mừng lễ quan thầy</Text>
                    <Text style={styles.value}>{formatDateToDDMMYYYY(item?.feastDay.toLocaleString())}</Text>

                    <Text style={styles.label}>Giáo xứ</Text>
                    <Text style={styles.value}>{item?.church}</Text>

                    <Text style={styles.label}>Dân tộc</Text>
                    <Text style={styles.value}>{item?.ethnicMinorityName}</Text>
                  </View>
                </View>
              ))}
            </PagerView>
            {catholicList.length > 1 && (
              <View style={styles.indicatorContainer}>
                {catholicList.map((_: CatholicDTO, index: number) => (
                  <View
                    key={index}
                    style={[
                      styles.indicator,
                      currentPage === index && styles.activeIndicator,
                    ]}
                  />
                ))}
              </View>
            )}
          </View>
        ) : (
          <Text style={styles.label}>Không có dữ liệu</Text>
        )}
      </View>
    </View >
  );
}

