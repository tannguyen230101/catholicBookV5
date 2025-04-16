import { View, Text, TouchableOpacity, Modal, StyleSheet, Button } from 'react-native'
import React, { useState } from 'react'
import { Picker } from '@react-native-picker/picker';
import { windowHeight, windowWidth } from '@/utils/device';
import COLORS from '@/constants/colors';


export type ObjectInput = {
    id: string;
    name: string;
};

interface ModalDropDownProps {
    data: ObjectInput[];
    onSelect: (value: ObjectInput) => void;
    placeholder?: string;
    selectedId?: string;
}

export default function ModalDropDown({ data, onSelect, placeholder = "=== Chọn nhà thờ ===", selectedId }: ModalDropDownProps) {
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState<ObjectInput | null>(null);

    React.useEffect(() => {
        if (selectedId) {
            const foundItem = data.find(item => item.id === selectedId) || null;
            setSelectedItem(foundItem);
        }
    }, [selectedId, data]);

    return (
        <>
            <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.btnDropDown}>
                <Text style={styles.labelDropdown}>{selectedItem?.name || placeholder}</Text>
            </TouchableOpacity>
            <Modal
                visible={isModalVisible}
                animationType="fade"
                transparent={true}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.listModalContainer}>
                        <View style={{ flex: 20, justifyContent: "center", alignItems: 'center' }}>
                            <Text style={{ fontSize: 16 }}>=== Danh sách nhà thờ ===</Text>
                        </View>
                        <View style={{ flex: 60 }}>
                            <Picker
                                selectedValue={selectedItem?.id}
                                itemStyle={{
                                    fontSize: 14,
                                }}
                                onValueChange={(itemValue) => {
                                    const selectedChurch = data.find(church => church.id === itemValue) || null;
                                    setSelectedItem(selectedChurch);
                                    onSelect(selectedChurch!);
                                    setModalVisible(false);
                                }}>
                                {data.map((item, index) => (
                                    <Picker.Item key={`${item.id}-${index}`} label={item.name} value={item.id} />
                                ))}
                            </Picker>
                        </View>
                        <View style={{ flex: 15 }}>
                            <Button title="Đóng" onPress={() => setModalVisible(false)} />
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    )
}

const styles = StyleSheet.create({
    btnDropDown: {
        backgroundColor: "white",
        paddingVertical: 10,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: COLORS.primary,
        borderWidth: 1,
    },
    labelDropdown: {
        fontSize: 16
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    listModalContainer: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 10,
        borderRadius: 10,
        maxHeight: windowHeight * 0.5,
        width: windowWidth * 0.8,
    }
})