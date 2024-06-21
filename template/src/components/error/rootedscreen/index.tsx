import { Text, View } from "react-native";
import React from "react";
import styles from "./styles";
import RootDetectionSvg from "../../../assets/svg/error/rootdetetction.svg";
const RootedScreen = () => {
  return (
    <View style={styles.contentContainer}>
      <View style={styles.root}>
        <RootDetectionSvg style={{ alignSelf: "center" }} />
        <Text style={styles.error}>{"Connection is not secure"}</Text>
        <Text style={styles.errorDesc}>
          {"Unrooted device required for secure\n connections. Data at risk."}
        </Text>
      </View>
    </View>
  );
};

export default RootedScreen;
