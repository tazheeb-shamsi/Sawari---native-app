import CustomButton from "@/components/CustomButton";
import OlaTextInput from "@/components/OlaTextInput";
import RideLayout from "@/components/RideLayout";
import { icons } from "@/constants";
import { useLocationStore } from "@/store";
import { router } from "expo-router";
import { Text, View } from "react-native";

const FindRide = () => {
  const {
    userAddress,
    destinationAddress,
    setDestinationLocation,
    setUserLocation,
  } = useLocationStore();
  console.log({
    "userAddress -->": userAddress,
    "destinationAddress -->": destinationAddress,
  });

  return (
    <RideLayout title="Ride Finder" snapPoints={["60%", "85%"]}>
      <View className="my-3 flex-row items-center justify-center">
        <OlaTextInput
          icon={icons.target}
          placeholder="Your current location"
          initialLocation={userAddress!}
          containerStyle="bg-neutral-100 shadow-sm shadow-neutral-300 rounded-xl"
          textInputBackgroundColor="#f5f5f5"
          handlePress={(location) => setUserLocation(location)}
        />
      </View>
      <View className="my-3">
        <OlaTextInput
          icon={icons.map}
          placeholder="Your destination location"
          initialLocation={destinationAddress!}
          containerStyle="bg-neutral-100 shadow-sm shadow-neutral-300 rounded-xl"
          textInputBackgroundColor="transparent"
          handlePress={(location) => setDestinationLocation(location)}
        />
      </View>
      <CustomButton
        title="Find Ride"
        className="mt-5"
        onPress={() => router.push("/(root)/confirm-ride")}
      />
    </RideLayout>
  );
};

export default FindRide;
