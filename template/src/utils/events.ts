import { track } from "@amplitude/analytics-react-native";
import NetInfo from "@react-native-community/netinfo";
import { mixPanelRef } from "../../App";
export const EVENTS = {
  ERROR_BOUNDARY: "error_boundary",
  EXCEPTION_BOUNDARY: "exception_boundary",
  PUSHNOTIFICATION_RECEIVED: "pushnotification_received",
  PUSHNOTIFICATION_TAP: "pushnotification_tap",
  PUSHNOTIFICATION_APPOPEN: "pushnotification_appopen",
  IN_APP_MESSAGE_DID_DISPLAY: "in_app_message_did_display",
  IN_APP_MESSAGE_TAP: "in_app_message_tap",
};
export const sendEventsToAnalytics = async (
  eventName: string,
  eventProperties: object
) => {
  const isConnected = (await NetInfo.fetch()).isConnected;
  if (isConnected) {
    try {
      track(eventName, eventProperties);
      mixPanelRef.track(eventName, eventProperties);
    } catch (error) {}
  }
};
