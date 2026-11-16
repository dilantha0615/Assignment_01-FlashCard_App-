import * as Notifications from "expo-notifications";
import { Stack } from "expo-router";
import { useEffect, useRef } from "react";
import { AppState, Image } from "react-native";
import { AppProvider } from "./context";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function RootLayout() {
  const appState = useRef<string>(AppState.currentState || "active");

  useEffect(() => {
    Notifications.requestPermissionsAsync();

    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        Notifications.scheduleNotificationAsync({
          content: {
            title: "Welcome Back!",
            body: "Ready to continue studying your flashcards?",
          },
          trigger: null,
        });
      }
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <AppProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#ffffff",
          },
          headerTintColor: "#000000",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 20,
          },
          headerTitleAlign: "left",
          headerRight: () => (
            <Image
              source={require("../../assets/images/icon.png")}
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                marginRight: 16,
              }}
            />
          ),
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="details/[id]" options={{ title: "STUDY CARD" }} />
      </Stack>
    </AppProvider>
  );
}
