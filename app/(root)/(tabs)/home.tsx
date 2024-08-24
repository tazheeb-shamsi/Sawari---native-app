import Map from "@/components/Map";
import RideCard from "@/components/RideCard";
import { icons, images } from "@/constants";
import { recentRides } from "@/mocks/mockRides";
import { useLocationStore } from "@/store";
import { useUser } from "@clerk/clerk-expo";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as Location from "expo-location";
import OlaTextInput from "@/components/OlaTextInput";
import { router } from "expo-router";

export default function Page() {
  const { setUserLocation, setDestinationLocation } = useLocationStore();
  const { user } = useUser();

  const [loading, setLoading] = useState(false);
  const [hasPermissions, setHasPermissions] = useState(false);

  const handleSignOut = () => {};
  const handleDirectionPress = (location: {
    latitude: number;
    longitude: number;
    address: string;
  }) => {
    setDestinationLocation(location);
    router.push("/(root)/find-ride");
  };

  useEffect(() => {
    const reqLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setHasPermissions(false);
      }
      let location = await Location.getCurrentPositionAsync();
      const address = await Location.reverseGeocodeAsync({
        latitude: location.coords?.latitude!,
        longitude: location.coords?.longitude!,
      });

      setUserLocation({
        latitude: location.coords?.latitude!,
        longitude: location.coords?.longitude!,
        address: `${address[0].name}, ${address[0].region}, ${address[0].country}`,
      });
    };
    reqLocation();
  }, []);

  return (
    <SafeAreaView className="bg-general-500">
      <FlatList
        data={recentRides?.slice(0, 5)}
        renderItem={({ item }) => <RideCard ride={item} />}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListEmptyComponent={() => (
          <View className="flex-1 items-center justify-center p-5">
            {loading ? (
              <ActivityIndicator size="small" color="#000000" />
            ) : (
              <>
                <Image
                  source={images.noResult}
                  className="w-40 h-40"
                  alt="No recent rides found"
                  resizeMode="contain"
                />
                <Text>No recent rides found</Text>
              </>
            )}
          </View>
        )}
        ListHeaderComponent={() => (
          <>
            <View className="flex flex-row items-center justify-between m-3 ">
              <View className="flex flex-col items-start justify-start ">
                <Text className=" flex flex-col text-xl font-JakartaMedium text-gray-500">
                  Welcome 👋 {""}
                </Text>

                <Text className="text-2xl text-primary-500 font-JakartaSemiBold capitalize">
                  {user?.firstName ||
                    user?.emailAddresses[0].emailAddress.split("@")[0]}
                </Text>
              </View>

              <TouchableOpacity
                className="flex flex-col items-center gap-x-2 "
                onPress={handleSignOut}
              >
                <Image source={icons.out} className="w-6 h-6 " />
                <Text className="text-md font-JakartaMedium ">Logout!</Text>
              </TouchableOpacity>
            </View>

            <OlaTextInput
              icon={icons.search}
              containerStyle="bg-white shadow-sm shadow-neutral-300 rounded-xl"
              textInputBackgroundColor="gray "
              handlePress={handleDirectionPress}
            />

            <>
              <Text className="text-xl font-JakartaBold mt-5 mb-3">
                Your Current Location
              </Text>
              <View className="flex flex-row items-center bg-transparent h-[300px]">
                <Map />
              </View>
            </>
            <Text className="text-xl font-JakartaBold mt-5 mb-3">
              Recent Rides
            </Text>
          </>
        )}
        className="m-5"
      />
    </SafeAreaView>
  );
}
