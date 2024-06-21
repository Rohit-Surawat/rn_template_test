import { useNetInfo } from "@react-native-community/netinfo";

import { Pressable, Text, View } from "react-native";
import ErrorIcon from "../../../assets/svg/error/error.svg";
import styles from "./styles";

interface NoInternetProps {
  handleNoInternetRetry: Function;
  children: React.ReactNode;
}
const netInfoTypeUnknown = "unknown";
const NoInternetConnection = (props: NoInternetProps) => {
  const { handleNoInternetRetry } = props;
  const netInfo = useNetInfo();
  const renderAlertUI = () => {
    return (
      <View style={styles.root}>
        <ErrorIcon style={{ alignSelf: "center" }} />
        <Text style={styles.error}>{"You Are Offline"}</Text>
        <Text style={styles.errorDesc}>{"Check your internet connection"}</Text>
        <Pressable
          style={styles.tryAgainBtn}
          onPress={() => {
            handleNoInternetRetry();
          }}
        >
          <Text style={styles.tryAgain}>{"Reload"}</Text>
        </Pressable>
      </View>
    );
  };

  if (!netInfo.isConnected && netInfo.type !== netInfoTypeUnknown) {
    return renderAlertUI();
  }

  return <>{props.children}</>;
};

export default NoInternetConnection;
