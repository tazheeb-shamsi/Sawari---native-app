import CustomButton from "@/components/CustomButton";
import { onboarding } from "@/constants";
import { router } from "expo-router";
import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";

const Onboarding = () => {
  const swiperRef = React.useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const isLastSlide = activeIndex === onboarding.length - 1;

  return (
    <SafeAreaView className="flex h-full items-center justify-between bg-white">
      <TouchableOpacity
        onPress={() => {
          router.replace("/(auth)/sign-in");
        }}
        className="w-full flex justify-end  items-end p-5"
      >
        <Text className="text-black text-md font-JakartaBold">Skip</Text>
      </TouchableOpacity>

      <Swiper
        ref={swiperRef}
        loop={false}
        showsButtons={false}
        dot={
          <View className="w-[32px] h-[4px] rounded-full mx-1 bg-[#e2e8f0] " />
        }
        activeDot={
          <View className="w-[32px] h-[4px] rounded-full mx-1 bg-primary-500 " />
        }
        onIndexChanged={(index) => setActiveIndex(index)}
      >
        {onboarding.map((item) => (
          <View
            key={item.id}
            className="w-full h-full flex  items-center justify-center p-5"
          >
            <Image
              source={item.image}
              className="w-full h-[300px] "
              resizeMode="contain"
            />
            <Text className="text-center text-3xl font-JakartaExtraBold mt-5">
              {item.title}
            </Text>
            <Text className="text-center text-md text-general-200 font-JakartaSemiBold mt-3 mx-10">
              {item.description}
            </Text>
          </View>
        ))}
      </Swiper>

      <CustomButton
        title={isLastSlide ? "Get Started" : "Next"}
        onPress={() =>
          isLastSlide
            ? router.replace("/(auth)/sign-up")
            : swiperRef.current?.scrollBy(1)
        }
        className="w-11/12 h-12 mt-10 rounded-full mb-6"
      />
    </SafeAreaView>
  );
};

export default Onboarding;
