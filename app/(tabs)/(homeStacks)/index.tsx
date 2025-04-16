import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import useGetData from '@/commons/zustand/useChurchStore'
import { Link } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import COLORS from '@/constants/colors';
import styles from '@/assets/styles/home.styles';
import HeaderTabs from '@/components/HeaderTabs';

export default function Home() {

  const { churches, fetchChurches, isLoading } = useGetData()

  useEffect(() => {
    fetchChurches()
  }, [fetchChurches]);

  return (
    <View style={styles.container}>
      <HeaderTabs title='Trang Chủ' />
      <View style={{ flex: 1 }}>
        {isLoading ? (
          <ActivityIndicator
            size={'small'}
            color={COLORS.secondary}
            style={styles.loadingContainer} />
        ) : (
          <FlatList
            data={churches}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <Link href={{
                pathname: '/details/[id]',
                params: { id: item.id },
              }} asChild>
                <TouchableOpacity style={styles.infoContainer}>
                  <Text style={styles.churchName}>{item.name}</Text>

                  <Text style={styles.infoLabel}>Giờ lễ:</Text>
                  <View style={styles.infoBox}>
                    <Text style={styles.infoText}>9:00</Text>
                  </View>

                  <Text style={styles.infoLabel}>Địa chỉ:</Text>
                  <View style={styles.infoBox}>
                    {/* <Text style={styles.infoText}>{churchAddresses[item.id] || "Đang tải..."}
                    </Text> */}
                  </View>

                  <TouchableOpacity
                    style={styles.button}
                  // onPress={() => Linking.openURL(getGoogleMapsLink(item.location))}
                  >
                    <MaterialCommunityIcons
                      name="map-marker-radius"
                      size={20}
                      color={"#f1f1f1"} />
                    <Text style={styles.buttonText}>Đường đi</Text>
                  </TouchableOpacity>
                </TouchableOpacity>
              </Link>
            )}
            contentContainerStyle={styles.flatListContainer}
          />)}
      </View>
    </View>
  )
};

