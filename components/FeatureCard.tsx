import { Text, TouchableOpacity, Image, StyleSheet, ImageSourcePropType } from 'react-native'
import React from 'react'
import { windowWidth } from '@/utils/device';
import COLORS from '@/constants/colors';


type FeatureCardProps = {
    title: string;
    imageSource: ImageSourcePropType;
    onPress?: () => void;
};

const FeatureCard: React.FC<FeatureCardProps> = ({ title, imageSource, onPress }) => {
    return (
        <TouchableOpacity style={styles.featureItem} onPress={onPress}>
            <Image style={styles.tinyLogo} source={imageSource} />
            <Text style={styles.textFeatureItem}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    tinyLogo: {
        width: 70,
        height: 70,
        borderRadius: 40,
        resizeMode: 'contain',
        borderColor: '#ffffff',
        borderWidth: 2,
    },
    featureItem: {
        justifyContent: "center",
        backgroundColor: COLORS.secondary,
        alignItems: 'center',
        paddingHorizontal: 6,
        paddingVertical: 10,
        borderRadius: 10,
        width: windowWidth * 0.27,
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    },
    textFeatureItem: {
        marginTop: 5,
        fontSize: 16,
        color: "#3f8fd0",
        flexWrap: "wrap"
    }
});

export default FeatureCard;