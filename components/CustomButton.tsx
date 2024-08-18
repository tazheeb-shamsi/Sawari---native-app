import { ButtonProps } from "@/types/type";
import { getBgVariantStyle, getTextVariantStyle } from "@/utils";
import React from "react";
import { Text, TouchableOpacity } from "react-native";

const CustomButton = ({
  onPress,
  title,
  bgVariant = "primary",
  textVariant = "default",
  IconLeft,
  IconRight,
  className,
  ...props
}: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`w-full p-2 rounded-full flex flex-row items-center justify-center shdow-md shadow-neutral-400/70 ${getBgVariantStyle(
        bgVariant
      )} ${className}`}
      {...props}
    >
      {IconLeft && <IconLeft className="w-5 h-5 mr-2" />}
      <Text className={`text-lg font-bold ${getTextVariantStyle(textVariant)}`}>
        {title}
      </Text>
      {IconRight && <IconRight className="w-5 h-5 mr-2" />}
    </TouchableOpacity>
  );
};

export default CustomButton;
