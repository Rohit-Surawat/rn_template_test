import { Dimensions, Linking, PixelRatio } from "react-native";
import { navigationRef } from "../../App";
import CodePush from "react-native-code-push";
import RNRootbeer from "react-native-rootbeer";
export const getDeviceWidth = () => Dimensions.get("screen").width;
export const getDeviceHeight = () => Dimensions.get("screen").height;

export const sendEmail = (config: any, contentPrefix: string) => {
  try {
    let toEmail = config?.toEmail;
    let subject = config?.subject;
    let body: string = config?.content;
    body = body?.replaceAll("#{info}", contentPrefix);
    //your send email code
  } catch (error) {}
};

export const navigateToScreen = (
  screenName: any,
  isFromPush: boolean | false
) => {
  try {
    if (isFromPush) {
      navigationRef.navigate(screenName);
    } else if (
      screenName &&
      navigationRef.getRootState()?.routeNames?.includes(screenName)
    ) {
      navigationRef.navigate(screenName);
    }
  } catch (error) {}
};

export const CodePushOptions = {
  updateDialog: false,
  checkFrequency: CodePush.CheckFrequency.MANUAL,
  installMode: CodePush.InstallMode.ON_NEXT_RESTART,
};

export const checkIfDeviceIsRooted = async () => {
  try {
    const isRooted = await RNRootbeer.isRooted();
    const isRootedWithBusyBoxCheck =
      await RNRootbeer.isRootedWithBusyBoxCheck();
    if (isRooted || isRootedWithBusyBoxCheck) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};
