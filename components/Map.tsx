import { calculateRegion } from "@/lib/map";
import useLocationStore from "@/store";
import { Text } from "react-native";
import MapView, { PROVIDER_DEFAULT } from "react-native-maps";

const Map = () => {
  const {
    userLatitude,
    userLongitude,
    destinationLatitude,
    destinationLongitude,
  } = useLocationStore();

  const region = calculateRegion({
    userLatitude,
    userLongitude,
    destinationLatitude,
    destinationLongitude,
  });

  return (
    <MapView
      provider={PROVIDER_DEFAULT}
      className="w-full h-full rounded-2xl "
      tintColor="#000000"
      mapType="standard"
      showsPointsOfInterest={false}
      showsCompass={true}
      showsIndoors={false}
      showsMyLocationButton={true}
      showsUserLocation={true}
      userInterfaceStyle="light"
      initialRegion={region}
    >
      {/* <Text>Map</Text> */}
    </MapView>
  );
};

export default Map;
