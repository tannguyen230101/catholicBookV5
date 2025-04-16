import COLORS from "@/constants/colors";
import { windowWidth } from "@/utils/device";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  body: {
    flex: 1,
    padding: 20
  },
  flatListContainer: {
    flex: 1,
    width: windowWidth
  },
  textDanger: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginTop: 10
  },
  floatButton: {
    backgroundColor: COLORS.black,
    justifyContent: 'center',
    alignItems: 'center',
    height: windowWidth * 0.15,
    width: windowWidth * 0.15,
    borderRadius: windowWidth * 0.15,
    position: 'absolute',
    bottom: 10,
    right: 15,
  },
});

export default styles;