import COLORS from '@/constants/colors';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    userContainer: {
        backgroundColor: COLORS.primary,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 5,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        resizeMode: 'cover',
        borderColor: '#ffffff',
        borderWidth: 2,
    },
    inforContainer: {
        paddingVertical: 5,
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: COLORS.secondary,
        paddingHorizontal: 20,
        marginTop: 6,
        borderRadius: 5,
        borderColor: COLORS.black,
        borderTopWidth: 1.5,
        borderRightWidth: 1.5,
        borderBottomWidth: 3,
        borderLeftWidth: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 4,
    },
    txtName: {
        fontSize: 15,
        color: COLORS.black,
        fontWeight: 'bold'
    },
    txtEmail: {
        fontSize: 15,
        color: COLORS.black,
    },
    featureContainer: {
        padding: 10,
    },
    textSubtitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: COLORS.primary
    },
    viewFeatures: {
        borderWidth: 1,
        borderColor: COLORS.primary,
        paddingHorizontal: 15,
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 6,
        marginTop: 6,
        gap: 9,
    },
    featerLogout: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeButton: {
        paddingTop: 20,
        paddingHorizontal: 10,
        alignSelf: 'flex-end'
    },
    closeText: {
        fontSize: 30,
        color: 'white',
    },
    footerContainer: {
        flex: 1 / 3,
        alignItems: 'center',
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
});

export default styles;