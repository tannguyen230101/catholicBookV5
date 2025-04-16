import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { genderEnum } from '@/enums/gender.enum';
import { getGenderNameById } from '@/utils/getGender';
import { formButton } from '@/constants/backgroud.colors';
import { TextColors } from '@/constants/text.colors';

// type onChangeInput = {
//     onGenderChange: React.Dispatch<React.SetStateAction<genderEnum>>
// };

export default function GenderSelection({ onGenderChange, selectedGender }: { onGenderChange: (value: genderEnum) => void, selectedGender: genderEnum }) {
    const [gender, setGender] = useState(selectedGender);

    useEffect(() => {
        setGender(selectedGender);
    }, [selectedGender]); // Cập nhật khi `selectedGender` thay đổi

    const handleGenderChange = (value: genderEnum) => {
        setGender(value);
        onGenderChange(value);
    };

    return (
        <View style={styles.container}>
            <CustomRadioButton
                label={getGenderNameById(genderEnum.male)}
                selected={gender === genderEnum.male}
                onPress={() => handleGenderChange(genderEnum.male)}
            />
            <CustomRadioButton
                label={getGenderNameById(genderEnum.female)}
                selected={gender === genderEnum.female}
                onPress={() => handleGenderChange(genderEnum.female)}
            />
            <CustomRadioButton
                label={getGenderNameById(genderEnum.unknown)}
                selected={gender === genderEnum.unknown}
                onPress={() => handleGenderChange(genderEnum.unknown)}
            />
        </View>
    );
}


type CustomRadio = {
    label: string,
    selected: boolean,
    onPress: () => void;
};

const CustomRadioButton = ({ label, selected, onPress }: CustomRadio) => {
    return (
        <TouchableOpacity style={styles.radioButton} onPress={onPress}>
            <View style={[styles.radioCircle, selected && styles.selectedRadioCircle]}>
                {selected && <View style={styles.radioInnerCircle} />}
            </View>
            <Text style={styles.radioLabel}>{label}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    radioButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 16,
    },
    radioCircle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: TextColors.white,
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedRadioCircle: {
        borderColor: TextColors.white,
    },
    radioInnerCircle: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: formButton.success,
    },
    radioLabel: {
        fontSize: 16,
        marginLeft: 5,
        color: "#fff",
        fontWeight: 'bold',
    },
});