import { icons } from "@/constants";
import { calculateRegion, generateMarkersFromData } from "@/lib/map";
import { mockDrivers } from "@/mocks/mockeDrivers";
import { useDriverStore, useLocationStore } from "@/store";
import { MarkerData } from "@/types/type";
import { useEffect, useState } from "react";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";

const Map = () => {
  const {
    userLatitude,
    userLongitude,
    destinationLatitude,
    destinationLongitude,
  } = useLocationStore();

  const { selectedDriver, setDrivers } = useDriverStore();
  const [markers, setMarkers] = useState<MarkerData[]>([]);

  const region = calculateRegion({
    userLatitude,
    userLongitude,
    destinationLatitude,
    destinationLongitude,
  });

  useEffect(() => {
    if (Array.isArray(mockDrivers) && mockDrivers.length > 0) {
      if (!userLatitude || !userLongitude) return;
      const newMarkers = generateMarkersFromData({
        data: mockDrivers,
        userLatitude,
        userLongitude,
      });

      setMarkers(newMarkers);
    }
  }, [mockDrivers]);

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
      {markers.map((marker) => (
        <Marker
          key={marker.id}
          coordinate={{
            latitude: marker.latitude,
            longitude: marker.longitude,
          }}
          title={marker.title}
          image={
            selectedDriver === marker.id ? icons.selectedMarker : icons.marker
          }
          pinColor="red"
        />
      ))}
    </MapView>
  );
};

export default Map;
