import COLORS from "@/constants/colors";
import { windowWidth } from "@/utils/device";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    eventContainer: {
        flex: 1,
        alignItems: "center",
        width: "100%",
        backgroundColor: COLORS.primary
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
    },
    eventButton: {
        width: "80%",
        backgroundColor: COLORS.secondary,
        marginVertical: 8,
        paddingVertical: 16,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
        padding: 10,
        marginTop: 15,
        marginRight: "auto",
        marginLeft: "auto",
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    },
    flatListEventType: {
        flex: 1,
        width: windowWidth,
        marginTop: 20,
    },
    floatButton: {
        backgroundColor: COLORS.black,
        justifyContent: 'center',
        alignItems: 'center',
        height: windowWidth * 0.15,
        width: windowWidth * 0.15,
        borderRadius: windowWidth * 0.15,
        position: 'absolute',
        bottom: 70,
        right: 15,
        shadowColor: COLORS.black,
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    },
});

export default styles;