import COLORS from "@/constants/colors";
import { windowWidth } from "@/utils/device";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    body: {
        flex: 1,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
    },
    page: {
        flex: 1,
        padding: 0
    },
    pageContainer: {
        width: windowWidth - 40,
        height: '90%',
        backgroundColor: COLORS.page,
        borderRadius: 20,
        overflow: 'hidden',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 4,
    },
    line: {
        position: 'absolute',
        width: '100%',
        height: 1,
        backgroundColor: '#ccc',
    },
    content: {
        padding: 20,
        flex: 1,
    },
    label: {
        fontSize: 14,
        fontWeight: '400',
        color: '#444',
        marginTop: 20,
        fontFamily: 'monospace',
    },
    value: {
        fontSize: 16,
        fontWeight: '700',
        color: '#000',
        fontFamily: 'monospace',
    },
    indicatorContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
    },
    indicator: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: 'gray',
        marginHorizontal: 4,
    },
    activeIndicator: {
        backgroundColor: COLORS.primary,
        width: 10,
        height: 10,
        borderRadius: 5,
    },
});

export default styles;