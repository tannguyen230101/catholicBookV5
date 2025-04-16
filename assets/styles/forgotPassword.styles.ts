import COLORS from "@/constants/colors"
import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inputGroup: {
        width: "90%",
        padding: 30,
        backgroundColor: COLORS.primary,
        borderRadius: 15,
        shadowColor: "#000000",
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 5 },
        shadowRadius: 10,
        elevation: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: "#4B5563",
        backgroundColor: COLORS.secondary,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 12,
        height: 45,
    },
    body: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f1f1f1",
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: COLORS.secondary,
        borderRadius: 12,
        paddingHorizontal: 12,
    },
    titleForm: {
        fontSize: 28,
        fontWeight: "700",
        marginBottom: 25,
        textAlign: "center",
        color: COLORS.black,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: COLORS.black,
        borderRadius: 6,
        alignItems: 'center',
    },
    disabledButton: {
        backgroundColor: COLORS.disableButton, // Màu xám khi disabled
    },
});

export default styles;