import COLORS from "@/constants/colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bodyContainer: {
        paddingHorizontal: 20,
        paddingTop: 10
    },
    rowInfor: {
        flexDirection: 'row',
        padding: 10,
    },
    textLabel: {
        fontSize: 16,
        fontWeight: "bold",
    },
    textData: {
        fontSize: 16,
        marginStart: 5
    },
    textCongregation: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
        textAlign: 'center',
    },
    textTitle: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    cardContainer: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: COLORS.black,
        marginVertical: 5,
        marginHorizontal: 10,
        borderRadius: 10,
    },
    buttonText: {
        fontSize: 16,
        color: "white",
    },
    flatListContainer: {
        marginBottom: 20
    },
});

export default styles;