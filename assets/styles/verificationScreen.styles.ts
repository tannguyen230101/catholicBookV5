import COLORS from "@/constants/colors";
import { windowHeight } from "@/utils/device";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    body: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.primary,
        // padding: 10,
    },
    innerContainer: {
        width: "90%",
        padding: 30,
        backgroundColor: "#fff",
        borderRadius: 15,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 5 },
        shadowRadius: 10,
        elevation: 8,
        justifyContent: "center",
        alignItems: "center",
    },
    inputContainer: {
        marginTop: 5,
        marginBottom: 10,
        width: "100%",
        height: windowHeight / 15,
        borderColor: "#E5E7EB",
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: "#F9FAFB",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10, // Thêm padding để không bị dính sát viền
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: "#4B5563",
        paddingVertical: 8, // Thêm padding dọc để text không bị dính trên/dưới
    },
    titleForm: {
        fontSize: 24,
        fontWeight: "700",
        marginBottom: 20,
        textAlign: "center",
        color: COLORS.black,
    },
    subtitle: {
        fontSize: 16,
        color: "#4B5563",
        textAlign: "center",
        marginBottom: 10,
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: COLORS.black,
        borderRadius: 6,
        alignItems: 'center',
    },
    disabledButton: {
        backgroundColor: '#A1A1A1', // Màu xám khi disabled
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default styles;  