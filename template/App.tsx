import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  useColorScheme,
  AppState,
} from "react-native";
import JailMonkey from "jail-monkey";
import { identifyServiceConfig } from "./src/utils/helper";
import NoInternetConnection from "./src/components/error/nointernet";
import RNRestart from "react-native-restart";
import { ErrorBoundary } from "react-error-boundary";
import { EVENTS, sendEventsToAnalytics } from "./src/utils/events";
import ErrorBoundaryScreen from "./src/components/error/errorboundary";
import { Mixpanel } from "mixpanel-react-native";
import { isNull, isUndefined } from "lodash";
import { init } from "@amplitude/analytics-react-native";
import moment from "moment";
import crashlytics, { firebase } from "@react-native-firebase/crashlytics";
import { OneSignal } from "react-native-onesignal";
import { createNavigationContainerRef } from "@react-navigation/native";
import {
  CodePushOptions,
  checkIfDeviceIsRooted,
  navigateToScreen,
} from "./src/utils/utility";
import { APP_CONSTANTS } from "./src/constants/enums";
import RootedScreen from "./src/components/error/rootedscreen";
import { persistor, store } from "./src/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CodePush from "react-native-code-push";

export const SERVICE_CONFIG = identifyServiceConfig();
export let mixPanelRef: Mixpanel | null;
let isDeviceRooted = JailMonkey.isJailBroken();
if (JailMonkey.hookDetected()) {
  isDeviceRooted = true;
}
if (JailMonkey.AdbEnabled()) {
  isDeviceRooted = true;
}
const setupAnalytics = (mixPanelKey: string) => {
  try {
    const trackAutomaticEvents = false;
    const mixpanel = new Mixpanel(mixPanelKey, trackAutomaticEvents);
    mixpanel.init();
    return mixpanel;
  } catch (error) {
    return null;
  }
};
export const navigationRef = createNavigationContainerRef();
function App(): React.JSX.Element {
  const [appState, setAppState] = useState(AppState.currentState);
  const [bugId, setBugId] = useState(0);
  const [routeName, setRouteName] = useState("");
  const isDarkMode = useColorScheme() === "dark";
  const backgroundStyle = {
    backgroundColor: isDarkMode ? "#000000" : "#FFFFFF",
  };

  const handleNoInternetRetry = () => {
    RNRestart.Restart();
  };
  useEffect(() => {
    const appStateListener = AppState.addEventListener(
      "change",
      (nextAppState) => setAppState(nextAppState)
    );
    return () => appStateListener?.remove();
  }, []);

  useEffect(() => {
    if (!isUndefined(SERVICE_CONFIG) && !isNull(SERVICE_CONFIG)) {
      init(SERVICE_CONFIG.AmplitudeKey);
      mixPanelRef = setupAnalytics(SERVICE_CONFIG.MixPanelKey);
    }

    // OneSignal Initialization
    OneSignal.initialize(SERVICE_CONFIG?.OneSignalId);

    //OneSignal.Debug.setLogLevel(LogLevel.Verbose);
    // requestPermission will show the native iOS or Android notification permission prompt.
    OneSignal.Notifications.requestPermission(true);

    let currentAppState =
      appState == APP_CONSTANTS.APPSTATE_UNKNOWN
        ? APP_CONSTANTS.APPSTATE_NEWSESSION
        : appState.toString();

    OneSignal.Notifications.addEventListener(
      "foregroundWillDisplay",
      (event: any) => {
        event.preventDefault();
        event.getNotification().display();
        let notificationType = event.notification.attachments
          ? APP_CONSTANTS.ONESIGNAL_RICHTEXT
          : APP_CONSTANTS.ONESIGNAL_NORMAL;
        sendEventsToAnalytics(EVENTS.PUSHNOTIFICATION_RECEIVED, {
          notificationTitle: event.notification.title,
          notificationMessage: event.notification.body,
          notificationType: notificationType,
          appState: currentAppState,
        });
      }
    );

    // Method for listening for notification clicks
    OneSignal.Notifications.addEventListener("click", (event) => {
      const additionalData: any = event.notification.additionalData;
      let messageType = event.notification.attachments
        ? APP_CONSTANTS.ONESIGNAL_RICHTEXT
        : APP_CONSTANTS.ONESIGNAL_NORMAL;
      let notificationType =
        additionalData?.notificationType == APP_CONSTANTS.ONESIGNAL_DEEPLINK
          ? APP_CONSTANTS.ONESIGNAL_DEEPLINK
          : APP_CONSTANTS.ONESIGNAL_NORMAL;

      sendEventsToAnalytics(EVENTS.PUSHNOTIFICATION_TAP, {
        notificationTitle: event.notification.title,
        notificationMessage: event.notification.body,
        messageType: messageType,
        notificationType: notificationType,
        appState: currentAppState,
        routeName: additionalData?.routeName,
        kpiId: additionalData?.kpiId,
        timeFilter: additionalData?.timeFilter,
      });
      setTimeout(() => navigateToScreen(additionalData?.routeName, true), 1000);
    });

    OneSignal.InAppMessages.addEventListener("didDisplay", (event) => {
      sendEventsToAnalytics(EVENTS.IN_APP_MESSAGE_DID_DISPLAY, {
        inAppMessageTitle: event.message,
      });
    });

    OneSignal.InAppMessages.addEventListener("click", (event) => {
      sendEventsToAnalytics(EVENTS.IN_APP_MESSAGE_TAP, {
        inAppMessageTitle: event.message,
      });
      setTimeout(() => navigateToScreen(event?.result?.actionId, false), 1000);
    });
    return () => {};
  }, [SERVICE_CONFIG]);

  const handleAppError = (error: Error, stackTrace: string) => {
    try {
      let bugId = moment().unix();
      setBugId(bugId);
      sendEventsToAnalytics(EVENTS.ERROR_BOUNDARY, {
        route: routeName,
        stack: stackTrace,
        error: error?.message,
        bugId: bugId,
      });
    } catch (error) {}
  };

  const checkDeviceRooted = async () => {
    isDeviceRooted = await checkIfDeviceIsRooted();
  };

  useEffect(() => {
    // firebase?.initializeApp({});
    // // if (!firebase?.apps?.length) {
    // //   firebase?.initializeApp({});
    // // }
    // crashlytics().setCrashlyticsCollectionEnabled(true);
    if (!__DEV__) {
      console.log = () => null;
      console.error = () => null;
    }
    checkDeviceRooted();
  }, []);
  if (false) {
    return <RootedScreen />;
  } else {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView style={backgroundStyle}>
              <StatusBar
                barStyle={isDarkMode ? "light-content" : "dark-content"}
                backgroundColor={backgroundStyle.backgroundColor}
              />
              <NoInternetConnection
                handleNoInternetRetry={handleNoInternetRetry}
              >
                <ErrorBoundary
                  onError={handleAppError}
                  fallback={
                    <ErrorBoundaryScreen routeName={routeName} bugId={bugId} />
                  }
                >
                  <NavigationContainer
                    onReady={() => {
                      setRouteName(navigationRef?.getCurrentRoute()?.name);
                    }}
                    onStateChange={async () => {
                      const currentRouteName =
                        navigationRef?.getCurrentRoute()?.name;
                      setRouteName(currentRouteName);
                    }}
                    ref={navigationRef}
                  >
                    <ScrollView
                      contentInsetAdjustmentBehavior="automatic"
                      style={backgroundStyle}
                    >
                      {/* 
         Write Your Child Component Here
        */}

                      <Text>Hi DHRE Template</Text>
                    </ScrollView>
                  </NavigationContainer>
                </ErrorBoundary>
              </NoInternetConnection>
            </SafeAreaView>
          </GestureHandlerRootView>
        </PersistGate>
      </Provider>
    );
  }
}
export default CodePush(CodePushOptions)(App);
