import { Image, Text, View } from "react-native";
import CustomButton from "./CustomButton";
import { icons } from "@/constants";

const OAuth = () => {
  const handleGoogleSignIn = async () => {};

  return (
    <View>
      <View className="flex flex-row justify-center items-center mt-4 gap-x-3">
        <View className="flex-1 h-[1px] bg-green-100" />
        <Text className="text-lg text-gray-700">Or</Text>
        <View className="flex-1 h-[1px] bg-green-100" />
      </View>

      <CustomButton
        title="Sign In with Google"
        className="mt-5 w-full shadow-sm"
        IconLeft={() => (
          <Image
            source={icons.google}
            className="w-6 h-6 mx-3"
            resizeMode="contain"
          />
        )}
        bgVariant="outline"
        textVariant="primary"
        onPress={handleGoogleSignIn}
      />
    </View>
  );
};

export default OAuth;
