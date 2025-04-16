import COLORS from "@/constants/colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.primary,
    },
    bodyContainer: {
        padding: 10,
        paddingBottom: 40,
    },
    inputRow: {
        paddingHorizontal: 20,
        marginTop: 15
    },
    input: { marginBottom: 10 },
    label: {
        fontSize: 16,
        marginBottom: 5,
        color: "white",
        fontWeight: 'bold',
    },
    datePicker: {
        backgroundColor: '#ffffff',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    txtDate: {
        fontSize: 16,
        marginEnd: 10
    },
    dropDown: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
    },
    buttonAdd: { 
        backgroundColor: COLORS.black,
        margin: 20,
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        borderRadius: 10
    }
});

export default styles;