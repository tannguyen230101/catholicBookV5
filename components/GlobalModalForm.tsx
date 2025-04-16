import React, { useEffect, useState } from "react";
import { Modal, View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useModalForm } from "@/hooks/ModalFormContext";
import { TextInput, Button, RadioButton } from 'react-native-paper';
import { FontAwesome } from "@expo/vector-icons";
import COLORS from "@/constants/colors";
import { windowHeight, windowWidth } from "@/utils/device";
import ModalDropDown from "./ios/ModalDropDown";
import CustomDatePickerModal from "./customDatePickerModal";
import { isAndroid } from "@/utils/device";
import { Picker } from '@react-native-picker/picker'

interface FormField {
    name: string;
    label: string;
    type: string;
    placeholder?: string;
    data?: any[];

    options?: { label: string; value: number }[];
}

const GlobalModalForm: React.FC = () => {
    const { isVisible, formConfig, closeModal } = useModalForm();
    const [formData, setFormData] = useState<Record<string, any>>(formConfig.initialValues || {});
    const [showDatePicker, setShowDatePicker] = useState<{ [key: string]: boolean }>({});
    const [isCreate, setIsCreate] = useState<boolean>(true);

    const handleChange = (name: string, value: any) => {
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = () => {
        if (formConfig.onSubmit) {
            formConfig.onSubmit(formData);
        }
        closeModal();
    };

    const handleDateChange = (event: any, selectedDate: Date | undefined, fieldName: string) => {
        setShowDatePicker((prev) => ({
            ...prev,
            [fieldName]: false
        }));
        if (selectedDate)
            handleChange(fieldName, selectedDate);
    };

    useEffect(() => {
        if (formConfig.initialValues) {
            setFormData(formConfig.initialValues);
            setIsCreate(false);
        } else {
            setFormData({});
            setIsCreate(true);
        }
    }, [formConfig.initialValues]);

    return (
        <Modal visible={isVisible} animationType="fade" transparent>
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                    <Text style={styles.title}>{formConfig.title}</Text>
                    <ScrollView>
                        {formConfig.fields.map((field: FormField) => (
                            <View key={field.name} style={styles.fieldContainer}>
                                {/* <Text>{field.label}</Text> */}
                                {field.type === "text" && (
                                    <TextInput
                                        textColor={COLORS.primary}
                                        activeOutlineColor={COLORS.primary}
                                        outlineColor={COLORS.secondary}
                                        label={field.label}
                                        mode="outlined"
                                        value={formData[field.name] || ""}
                                        style={styles.input}
                                        placeholder={field.placeholder}
                                        onChangeText={(text) => handleChange(field.name, text)}
                                        autoCorrect={false}
                                    />
                                )}

                                {field.type === "description" && (
                                    <TextInput
                                        activeOutlineColor={COLORS.primary}
                                        outlineColor={COLORS.secondary}
                                        label={field.label}
                                        mode="outlined"
                                        value={formData[field.name] || ""}
                                        textColor={COLORS.primary}
                                        style={[styles.input]}
                                        autoCorrect={false}
                                        numberOfLines={4}
                                        multiline={true}
                                        placeholder={field.placeholder}
                                        onChangeText={(text) => handleChange(field.name, text)}
                                    />
                                )}

                                {field.type === "datePicker" && (
                                    <View style={{ marginBottom: 10 }}>
                                        <Text style={styles.label}>{field.label}</Text>
                                        <TouchableOpacity
                                            onPress={() => setShowDatePicker((prev) => ({ ...prev, [field.name]: true }))}
                                            style={styles.datePicker}>
                                            <Text style={styles.txtDate}>
                                                {formData[field.name] instanceof Date
                                                    ? formData[field.name].toLocaleDateString()
                                                    : formData[field.name]
                                                        ? new Date(formData[field.name]).toLocaleDateString()
                                                        : "Chọn ngày"}
                                            </Text>
                                            <FontAwesome name="calendar-plus-o" size={18} color="#007AFF" />
                                        </TouchableOpacity>
                                        <CustomDatePickerModal
                                            visible={showDatePicker[field.name] || false}
                                            initialDate={
                                                formData[field.name] instanceof Date
                                                    ? formData[field.name]
                                                    : formData[field.name]
                                                        ? new Date(formData[field.name])
                                                        : new Date()
                                            }
                                            onDateSelected={(selectedDate) => {
                                                handleDateChange(null, selectedDate, field.name);
                                                setShowDatePicker((prev) => ({ ...prev, [field.name]: false }));
                                            }}
                                            onClose={() => setShowDatePicker((prev) => ({ ...prev, [field.name]: false }))}
                                        />
                                    </View>
                                )}

                                {field.type === "dropdown" &&
                                    (
                                        isAndroid ? (
                                            <View style={{ flex: 1,
                                                backgroundColor: 'white',
                                                paddingHorizontal: 10,
                                                borderRadius: 10,
                                                maxHeight: windowHeight * 0.5,
                                                width: windowWidth * 0.8,}}>
                                                <Text style={styles.label}>{field.label}</Text>
                                                <Picker
                                                    selectedValue={formData[field.name] || ""}
                                                    style={styles.churchDropDown}
                                                    onValueChange={(selectedItem) => handleChange(field.name, selectedItem)
                                                    }>
                                                    <Picker.Item label={field.placeholder || "=== Chọn giá trị ==="} value={""} />
                                                    {field.data?.map((item) => (
                                                        <Picker.Item key={item.id} label={item.name} value={item.id} />
                                                    ))}
                                                </Picker>
                                            </View>
                                        ) : (
                                            <View style={{ marginBottom: 10 }}>
                                                <Text style={styles.label}>{field.label}</Text>
                                                <ModalDropDown
                                                    data={field.data || []}
                                                    selectedId={formData[field.name] || ""}
                                                    onSelect={(selectedItem) => handleChange(field.name, selectedItem)}
                                                    placeholder={field.placeholder || "=== Chọn giá trị ==="} />
                                            </View>
                                        )
                                    )}

                                {field.type === "radio" && (
                                    <View>
                                        <Text style={styles.label}>{field.label}</Text>
                                        <RadioButton.Group
                                            onValueChange={(newValue) => handleChange(field.name, newValue)}
                                            value={formData[field.name]}
                                        >
                                            <View style={styles.radioGroup}>
                                                {field.options?.map((option) => (
                                                    <View key={option.value} style={styles.radioItem}>
                                                        <RadioButton value={option.value.toString()} />
                                                        <Text>{option.label}</Text>
                                                    </View>
                                                ))}
                                            </View>
                                        </RadioButton.Group>
                                    </View>
                                )}
                            </View>
                        ))}
                    </ScrollView>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: "space-between",
                        alignItems: 'center'
                    }}>
                        <Button mode="contained" onPress={handleSubmit} buttonColor={COLORS.primary} style={styles.button}>
                            {isCreate ? "Tạo" : "Cập nhật"}
                        </Button>
                        <Button mode="outlined" onPress={closeModal} textColor="red" style={styles.button}>
                            Huỷ
                        </Button>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalContainer: {
        width: windowWidth * 0.85,
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        maxHeight: "80%",
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10
    },
    fieldContainer: {
        marginBottom: 10
    },
    button: {
        marginTop: 10,
    },
    input: { marginBottom: 10 },
    datePicker: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        borderWidth: 1,
        borderColor: COLORS.secondary,
        borderRadius: 5
    },
    txtDate: {
        flex: 1,
        fontSize: 16
    },
    label: {
        marginBottom: 6,
        fontSize: 16,
        fontWeight: "500",
        color: COLORS.primary
    },
    radioGroup: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    radioItem: {
        flexDirection: "row",
        alignItems: "center",
        marginRight: 10,
    },
    textArea: {
        height: 120,
        textAlignVertical: "top",
        paddingVertical: 10,
    },
    churchDropDown: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
    },
});

export default GlobalModalForm;
