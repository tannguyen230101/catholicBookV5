import COLORS from "@/constants/colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tabBar: {
        backgroundColor: COLORS.secondary,
    },
    indicator: {
        backgroundColor: COLORS.black,
    },
    headerTextContainer: {
        backgroundColor: COLORS.black,
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 5,
        marginTop: 20,
        marginBottom: 10
    },
});

export default styles;