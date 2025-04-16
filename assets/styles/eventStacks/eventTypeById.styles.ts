import COLORS from "@/constants/colors"
import { windowWidth } from "@/utils/device"
import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        color: "#fff",
        fontWeight: 'bold'
    },
    iconWrapper: {
        width: windowWidth * 0.06,
        height: windowWidth * 0.06,
        justifyContent: 'center',
        alignItems: 'center'
    },
    body: {
        flex: 1,
        padding: 20,
    },
    emptyText: {
        fontSize: 16,
        color: "#aaa",
        marginVertical: 20,
        textAlign: "center",
    },
    eventItem: {
        backgroundColor: COLORS.primary,
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
    },
    eventLabel: {
        fontSize: 16,
        color: "#1E293B",
        textAlign: 'left',
        fontWeight: 'bold',
    },
    eventText: {
        fontSize: 16,
        color: "#fff",
    },
    iconContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
    },
    iconPress: {
        padding: 6,
    },
    floatButton: {
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        height: windowWidth * 0.15,
        width: windowWidth * 0.15,
        borderRadius: windowWidth * 0.15,
        position: 'absolute',
        bottom: 10,
        right: 10,
    }
});

export default styles;