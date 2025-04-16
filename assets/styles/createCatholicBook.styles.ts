import { formButton } from "@/constants/backgroud.colors";
import COLORS from "@/constants/colors";
import { windowWidth } from "@/utils/device";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.primary,
        paddingBottom: 20,
    },
    headerContainer: {
        flexDirection: 'row',
        backgroundColor: COLORS.primary,
        paddingHorizontal: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        height: windowWidth * 0.13
    },
    rightArea: {
        width: windowWidth * 0.06,
        height: windowWidth * 0.06,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textHeader: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold'
    },
    inputRow: {
        paddingHorizontal: 20,
        marginTop: 15
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        color: "#fff",
        fontWeight: 'bold'
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
    churchDropDown: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
    },
    buttonAdd: {
        backgroundColor: formButton.success,
        margin: 20,
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        borderRadius: 10
    }
});

export default styles;  