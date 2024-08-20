import { icons } from "@/constants";
import { Stack, Tabs } from "expo-router";
import { Image, ImageSourcePropType, View } from "react-native";

const TabBarIcon = ({
  focused,
  source,
}: {
  focused: boolean;
  source: ImageSourcePropType;
}) => (
  <View
    className={`flex flex-row items-center justify-center rounded-full
   ${focused ? "bg-general-300" : ""}`}
  >
    <View
      className={`w-8 h-8 p-5 rounded-full items-center justify-center ${
        focused ? "bg-general-400" : ""
      }`}
    >
      <Image
        source={source}
        tintColor="white"
        resizeMode="contain"
        className="w-7 h-7"
      />
    </View>
  </View>
);

const Layout = () => (
  <Tabs
    initialRouteName="index"
    screenOptions={{
      tabBarActiveTintColor: "white",
      tabBarInactiveTintColor: "white",
      tabBarShowLabel: false,
      tabBarStyle: {
        backgroundColor: "#333333",
        borderRadius: 50,
        paddingBottom: 0,
        overflow: "hidden",
        marginHorizontal: 20,
        marginVertical: 20,
        height: 60,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        position: "absolute",
      },
    }}
  >
    <Tabs.Screen
      name="home"
      options={{
        headerShown: false,
        title: "Home",
        tabBarIcon: ({ focused }) => (
          <TabBarIcon focused={focused} source={icons.home} />
        ),
      }}
    />
    <Tabs.Screen
      name="chat"
      options={{
        headerShown: true,
        title: "Chats",
        tabBarIcon: ({ focused }) => (
          <TabBarIcon focused={focused} source={icons.chat} />
        ),
      }}
    />
    <Tabs.Screen
      name="rides"
      options={{
        headerShown: true,
        title: "Your Rides",
        tabBarIcon: ({ focused }) => (
          <TabBarIcon focused={focused} source={icons.list} />
        ),
      }}
    />
    <Tabs.Screen
      name="profile"
      options={{
        headerShown: true,
        title: "Profile",
        tabBarIcon: ({ focused }) => (
          <TabBarIcon focused={focused} source={icons.profile} />
        ),
      }}
    />
  </Tabs>
);

export default Layout;
