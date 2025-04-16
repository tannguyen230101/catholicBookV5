import COLORS from "@/constants/colors";
import { windowHeight, windowWidth } from "@/utils/device";
import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    body: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 70,
        paddingTop: 10
    },
    card: {
        flex: 1,
        borderWidth: 1,
        borderColor: COLORS.black,
        width: windowWidth * 0.9,
        // height: windowHeight * 0.8,
        padding: 20,
        borderRadius: windowWidth * 0.05,
    },
    innerCard: {
        flex: 100,
        borderWidth: 1,
        borderColor: COLORS.black,
        justifyContent: 'center',
        paddingTop: 20,
        borderRadius: windowWidth * 0.05,
    },
    illustrator: {
        // flex: 50,
        marginTop: windowHeight / 30,
        alignItems: 'center',
    },
    footer: {
        flex: 30,
        // height: windowHeight * 0.25,
        backgroundColor: COLORS.secondary,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        borderTopLeftRadius: windowWidth * 0.15,
        borderBottomLeftRadius: windowWidth * 0.05,
        borderBottomRightRadius: windowWidth * 0.05,
    },
    images: {
        resizeMode: 'contain',
        width: windowWidth * 0.8,
        height: windowHeight * 0.3,
        

    },
    logoBook: {
        resizeMode: 'contain',
        width: windowWidth * 0.37,
        height: windowHeight / 10,
        tintColor: '#fff',
        top: -20

    },
    footerImages: {
        resizeMode: 'contain',
        width: windowWidth * 0.2,
        height: windowHeight / 8,
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    },
    bookMark: {
        flexDirection: "row",
        height: windowHeight / 20,
        width: windowWidth * 0.5,
        // paddingVertical: 10,
        backgroundColor: COLORS.primary,
        borderBottomRightRadius: windowWidth * 0.5,
        borderTopRightRadius: windowWidth * 0.5,
        justifyContent: "center",
        alignItems: "center",
        // marginBottom: windowHeight / 20,
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    },
    textBookMark: {
        color: "#fff",
        // color: COLORS.primary,
        fontWeight: 'bold',
        // fontSize: 16,
    },
});

export default styles;