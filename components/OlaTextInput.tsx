import { useState, useCallback, useRef, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  TextInput,
  Image,
} from "react-native";
import InputField from "./InputField";
import { images } from "@/constants";

interface Suggestion {
  description: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  structured_formatting: {
    main_text: string;
    secondary_text: string;
  };
}

interface OlaTextInputProps {
  icon: any;
  containerStyle?: string;
  textInputBackgroundColor?: string;
  handlePress: (data: {
    latitude: number;
    longitude: number;
    address: string;
  }) => void;
}

const { height: screenHeight } = Dimensions.get("window");

const OlaTextInput = ({
  icon,
  containerStyle,
  textInputBackgroundColor = "white",
  handlePress,
}: OlaTextInputProps) => {
  const [userInput, setUserInput] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchSuggestions = async (input: string) => {
    setLoading(true);
    try {
      const apiKey = process.env.EXPO_PUBLIC_OLA_API_KEY;
      if (!apiKey) {
        console.error("API key is missing");
        return;
      }

      const response = await fetch(
        `https://api.olamaps.io/places/v1/autocomplete?input=${input}&api_key=${apiKey}`
      );

      if (!response.ok) {
        console.error("Network response was not ok", response.statusText);
        return;
      }

      const data = await response.json();

      if (data.status === "ok") {
        setSuggestions(data.predictions || []);
      } else {
        console.error(
          "API response error:",
          data.error_message || "Unknown error"
        );
        setSuggestions([]);
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error || "Unknown error");
      setSuggestions([]);
    }
    setLoading(false);
  };

  const handleInputChange = useCallback((text: string) => {
    setUserInput(text);
    if (text.length > 0) {
      fetchSuggestions(text);
    } else {
      setSuggestions([]);
    }
  }, []);

  const handleSelectSuggestion = (suggestion: Suggestion) => {
    handlePress({
      latitude: suggestion.geometry.location.lat,
      longitude: suggestion.geometry.location.lng,
      address: suggestion.description,
    });
    setUserInput(suggestion.description);
    setSuggestions([]);
  };

  const renderItem = ({ item }: { item: Suggestion }) => (
    <TouchableOpacity
      onPress={() => handleSelectSuggestion(item)}
      className="px-4 py-2 border-b border-gray-300"
    >
      <Text className="text-black">{item.structured_formatting.main_text}</Text>
      <Text className="text-gray-500">
        {item.structured_formatting.secondary_text}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View className="w-full">
      <InputField
        placeholder="Search place to go!"
        icon={icon}
        containerStyle={containerStyle}
        value={userInput}
        onChangeText={handleInputChange}
        className="w-full"
      />
      {loading && <ActivityIndicator size="small" color="#000000" />}
      {suggestions.length > 0 && (
        <View className=" w-full bg-white border border-gray-300 rounded-lg shadow-sm">
          <FlatList
            data={suggestions}
            keyExtractor={(item) => item.description}
            renderItem={renderItem}
            className="rounded-b-lg  "
            contentContainerStyle={{ paddingBottom: 10 }}
            scrollEnabled={true}
            initialNumToRender={2}
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
                    <Text>No places found</Text>
                  </>
                )}
              </View>
            )}
          />
        </View>
      )}
    </View>
  );
};

export default OlaTextInput;
