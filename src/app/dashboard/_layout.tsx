import { Tabs } from "expo-router";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Feather from "@expo/vector-icons/Feather";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarActiveTintColor: "#2563EB",
        tabBarInactiveTintColor: "#9CA3AF",

        tabBarStyle: {
          height: 76,
          paddingBottom: 8,
          paddingTop: 8,
          backgroundColor: "#FFFFFF",
          borderTopWidth: 0,
          elevation: 10,
        },

        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "500",
        },

        tabBarItemStyle: {
          paddingVertical: 4,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Início",
          tabBarIcon: ({ color, size, focused }) => (
            <FontAwesome5 name="home" size={focused ? 22 : 20} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="transactions"
        options={{
          title: "Transações",
          tabBarIcon: ({ color, size, focused }) => (
            <FontAwesome5 name="list" size={focused ? 22 : 20} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="goals"
        options={{
          title: "Metas",
          tabBarIcon: ({ color, size, focused }) => (
            <FontAwesome5
              name="bullseye"
              size={focused ? 22 : 20}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color, size, focused }) => (
            <Feather name="user" size={focused ? 22 : 20} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
