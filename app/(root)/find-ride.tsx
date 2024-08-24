import { useLocationStore } from "@/store";
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
    <View>
      <Text className="text-2xl">You're here: {userAddress}</Text>
      <Text className="text-2xl">You're going to: {destinationAddress}</Text>
    </View>
  );
};

export default FindRide;
