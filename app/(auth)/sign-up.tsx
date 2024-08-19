import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import { icons, images } from "@/constants";
import { Link } from "expo-router";
import { useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";

const SignUp = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const onSignUpPress = async () => {
    console.log("Sign Up Pressed");
  };

  return (
    <ScrollView className="flex-1  bg-white">
      <View className="flex-1 bg-white">
        <View className="relative w-full h-[250px] ">
          <Image source={images.signUpCar} className="w-full h-[250px] z-0 " />
          <Text className="text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5 -translate-x-1/2 -translate-y-1/2 z-10">
            Create Your Account
          </Text>
        </View>

        <View className="p-5">
          <View className="p-5">
            <InputField
              label="Name"
              placeholder="Enter your name"
              icon={icons.person}
              value={form.name}
              onChangeText={(value) => setForm({ ...form, name: value })}
            />
            <InputField
              label="Email"
              placeholder="Enter your email"
              icon={icons.email}
              textContentType="emailAddress"
              value={form.email}
              onChangeText={(value) => setForm({ ...form, email: value })}
            />
            <InputField
              label="Password"
              placeholder="Enter your password"
              icon={icons.lock}
              secureTextEntry={true}
              textContentType="password"
              value={form.password}
              onChangeText={(value) => setForm({ ...form, password: value })}
            />
            <CustomButton
              title="Sign Up"
              onPress={onSignUpPress}
              className="mt-6"
            />

            {/* OAuth */}

            <Link
              href="/sign-in"
              className="text-lg text-center text-general-200 mt-10"
            >
              <Text>Already have an account? </Text>
              <Text className="text-primary-500">Log In</Text>
            </Link>

            {/* Verification Modal*/}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUp;
