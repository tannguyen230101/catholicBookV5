import { StyleSheet } from "react-native";
import COLORS from "@/constants/colors";
import { windowWidth } from '@/utils/device';


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    card: {
        flex: 1,
        backgroundColor: COLORS.primary,
        width: windowWidth * 0.85,
        alignSelf: "flex-end",
        borderTopLeftRadius: windowWidth * 0.15,
        paddingHorizontal: 30,
        justifyContent: "center",
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    },
    bookMark: {
        flexDirection: "row",
        width: windowWidth * 0.5,
        paddingVertical: 10,
        backgroundColor: COLORS.primary,
        borderBottomRightRadius: windowWidth * 0.5,
        borderTopRightRadius: windowWidth * 0.5,
        justifyContent: "center",
        alignItems: "center",
        marginTop: windowWidth * 0.1,
        marginBottom: windowWidth * 0.15,
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    },
    textBookMark: {
        color: "#fff",
        fontSize: 17,
    },
    title: {
        color: "#fff",
        fontSize: 28,
        // fontWeight: "bold",
        marginBottom: 30,
        fontFamily: 'JetBrainItalic'
    },
    inputGroup: {
        marginTop: 10,
    },
    label: {
        color: "#fff",
        fontSize: 14,
        marginBottom: 6,
    },
    input: {
        backgroundColor: COLORS.secondary,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 12,
        height: 45,
        flex: 1,
    },
    eyeIcon: {
        padding: 8,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: COLORS.secondary,
        borderRadius: 12,
        // borderWidth: 1,
        // borderColor: COLORS.border,
        paddingHorizontal: 12,
    },
    image: { width: 45, height: 30, marginLeft: 15 },
    button: {
        backgroundColor: COLORS.black,
        borderRadius: 12,
        height: 45,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 40,
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    disableButton: {
        backgroundColor: COLORS.disableButton,
        borderRadius: 12,
        height: 45,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 40,
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    buttonText: {
        color: "white",
        fontSize: 15,
        fontWeight: "600",
        fontFamily: "",
    },
    footer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 6,
    },
    footerText: {
        color: "#fff",
        marginRight: 5,
    },
    link: {
        color: "#fff",
        fontWeight: "600",
    },
    footerContainer: {
        marginTop: 20,
        alignItems: "center",
    }
});

export default styles;