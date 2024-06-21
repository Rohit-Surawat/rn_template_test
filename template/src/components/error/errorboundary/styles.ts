import { StyleSheet } from "react-native";
import { colors } from "../../../theme/colors";

export default StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: colors.white,
    padding: 15,
  },
  error: {
    fontSize: 20,
    color: colors.textDark,
    textAlign: "center",
    fontFamily: "Inter-Bold",
    marginTop: 20,
  },
  errorDesc: {
    fontSize: 14,
    color: colors.textLight,
    textAlign: "center",
    fontFamily: "Inter-Regular",
    marginTop: 10,
  },
  tryAgainBtn: {
    marginTop: 40,
    backgroundColor: colors.textDark,
    borderRadius: 10,
    paddingVertical: 12,
    width: 236,
    alignSelf: "center",
    height: 48,
    maxHeight: 48,
    justifyContent: "center",
  },
  tryAgain: {
    fontSize: 14,
    color: colors.white,
    textAlign: "center",
    fontFamily: "Inter-SemiBold",
  },
  errorImage: {
    height: 80,
    width: 80,
    alignSelf: "center",
  },
  sendEmailBtn: {
    alignSelf: "center",
  },
  sendEmail: {
    fontSize: 14,
    marginLeft: 6,
    color: colors.black,
    textAlign: "center",
    fontFamily: "Inter-SemiBold",
  },
  masterView: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 32,
  },
});
