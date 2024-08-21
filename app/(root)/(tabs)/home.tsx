import RideCard from "@/components/RideCard";
import { icons, images } from "@/constants";
import { recentRides } from "@/mocks/mockRides";
import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Page() {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);

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
            <View className="flex flex-row items-center justify-between mx-3 my-5">
              <View className="flex flex-col items-start justify-start ">
                <Text className=" flex flex-col text-xl font-JakartaMedium text-gray-500">
                  Welcome 👋 {""}
                </Text>

                <Text className="text-2xl text-primary-500 font-JakartaSemiBold">
                  {user?.firstName ||
                    user?.emailAddresses[0].emailAddress.split("@")[0]}
                </Text>
              </View>

              <TouchableOpacity
                className="flex flex-col items-center gap-x-2 "
                onPress={() => console.log("--> logout")}
              >
                <Image source={icons.out} className="w-6 h-6 " />
                <Text className="text-md font-JakartaMedium ">Logout!</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
        className="m-5"
      />
    </SafeAreaView>
  );
}
