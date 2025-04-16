import { StyleSheet } from 'react-native';
import { Image, type ImageSource } from 'expo-image';
import { windowHeight, windowWidth } from '@/utils/device';

type Props = {
    imgSource: ImageSource;
    selectedImage?: string;
};

export default function ImageViewer({ imgSource, selectedImage }: Props) {
    const imageSource = selectedImage ? { uri: selectedImage } : imgSource;
    
    return <Image source={imageSource} style={styles.image} />;
}

const styles = StyleSheet.create({
    image: {
        width: windowWidth * 0.9,
        height: windowHeight * 0.6,
        borderRadius: 18,
    },
});
