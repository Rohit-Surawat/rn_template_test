import React from "react";
import { Pressable, Text, View } from "react-native";
import styles from "./styles";
import RNRestart from "react-native-restart";
import ErrorIcon from "../../../assets/svg/error/error.svg";
import MailIcon from "../../../assets/svg/mail.svg";
import { sendEmail } from "../../../utils/utility";
interface ErrorBoundaryProps {
  bugId: number;
  routeName: string;
}

const ErrorBoundaryScreen = (props: ErrorBoundaryProps) => {
  return (
    <View style={styles.root}>
      <ErrorIcon style={{ alignSelf: "center" }} />
      <Text style={styles.error}>{"OOPS..."}</Text>
      <Text style={styles.errorDesc}>{"We are facing an issue"}</Text>
      <Pressable
        style={styles.tryAgainBtn}
        onPress={() => {
          RNRestart.Restart();
        }}
      >
        <Text style={styles.tryAgain}>{"Try Reload"}</Text>
      </Pressable>
      <View style={styles.masterView}>
        <MailIcon />
        <Pressable
          style={styles.sendEmailBtn}
          onPress={() => {
            let contentPrefix = `Dimension : ${props?.routeName} \n Reference No : ${props?.bugId} `;
            sendEmail(null, contentPrefix);
          }}
        >
          <Text style={styles.sendEmail}>{"Report"}</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ErrorBoundaryScreen;
