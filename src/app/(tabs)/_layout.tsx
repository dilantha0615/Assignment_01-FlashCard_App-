import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Image } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
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
            source={require("../../../assets/images/icon.png")}
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              marginRight: 16,
            }}
          />
        ),

        // Footer (Bottom Tab Bar) Design
        tabBarActiveTintColor: "#6366f1", // Active icon & text color
        tabBarInactiveTintColor: "#94a3b8", // Inactive icon & text color
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "bold",
        },
        tabBarStyle: {
          backgroundColor: "#ffffff",
          height: 65,
          paddingBottom: 8,
          paddingTop: 8,
          marginBottom: 5,
          borderTopWidth: 1,
          borderTopColor: "#e2e8f0",
          elevation: 8, // Shadow on Android
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "ALL CARDS",
          tabBarIcon: ({ color }) => (
            <Ionicons
              name="albums-outline"
              size={24}
              color={typeof color === "string" ? color : "#6366f1"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: "REVIEW LIST",
          tabBarIcon: ({ color }) => (
            <Ionicons
              name="bookmark-outline"
              size={24}
              color={typeof color === "string" ? color : "#6366f1"}
            />
          ),
        }}
      />
    </Tabs>
  );
}
