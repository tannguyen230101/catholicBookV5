import { StyleSheet } from "react-native";
import COLORS from "@/constants/colors";
import { windowWidth } from '@/utils/device';


const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
    },
    card: {
        flex: 1,
        backgroundColor: COLORS.primary,
        width: windowWidth * 0.85,
        alignSelf: "flex-start",
        borderTopRightRadius: windowWidth * 0.15,
        paddingHorizontal: 30,
        justifyContent: "center",
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    },
    bookMark: {
        flexDirection: "row-reverse",
        width: windowWidth * 0.5,
        paddingVertical: 10,
        backgroundColor: COLORS.primary,
        borderBottomLeftRadius: windowWidth * 0.5,
        borderTopLeftRadius: windowWidth * 0.5,
        justifyContent: "center",
        alignItems: "center",
        marginTop: windowWidth * 0.1,
        marginBottom: windowWidth * 0.1,
        alignSelf: "flex-end",
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
        fontSize: 25,
        fontWeight: "bold",
        marginBottom: 30,
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
        height: 40,
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
        paddingHorizontal: 12,
    },
    image: { 
        width: 45,
        height: 30,
        marginRight: 15
    },
    button: {
        backgroundColor: COLORS.black,
        borderRadius: 6,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 35,
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    disableButton: {
        backgroundColor: COLORS.disableButton,
        borderRadius: 6,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 35,
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    buttonText: {
        color: "white",
        fontSize: 14,
        fontWeight: "600",
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
        marginTop: 10,
        alignItems: "center",
    }
});

export default styles;