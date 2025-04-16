import COLORS from "@/constants/colors";
import { windowWidth } from "@/utils/device";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    infoContainer: {
        marginVertical: 10,
        width: '100%',
        padding: 20,
        backgroundColor: COLORS.primary,
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 4,
    },
    churchName: {
        fontSize: 28,
        fontWeight: 'bold',
        color: COLORS.black,
        marginBottom: 10,
        textAlign: 'center',
    },
    infoLabel: {
        fontSize: 14,
        fontWeight: 'bold',
        color: "#fff",
        marginBottom: 8,
    },
    infoBox: {
        padding: 12,
        backgroundColor: COLORS.secondary,
        // backgroundColor: '#f1f1f1',
        borderRadius: 10,
        marginBottom: 18,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    infoText: {
        fontSize: 14,
        color: "#f1f1f1",
        textAlign: 'center',
    },
    button: {
        backgroundColor: COLORS.black,
        paddingVertical: 10,
        paddingEnd: 20,
        paddingStart: 15,
        borderRadius: 10,
        marginTop: 10,
        elevation: 4,
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    buttonText: {
        color: '#fff',
        fontSize: 13,
        fontWeight: 'bold',
        marginStart: 5
    },
    flatListContainer: {
        width: windowWidth,
        paddingBottom: 60,
        paddingHorizontal: 20
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default styles;