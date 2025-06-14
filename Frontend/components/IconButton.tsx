import React from "react";
import { Image, Text, TouchableOpacity } from "react-native";

type IconButtonProps = {
  BtnText: string; // Text for the button
  icon: any; // Path to the icon
  bgColor?: string; // Optional background color
  borderColor?: string;
  textColor?: string; // Optional text color
  onPress?: () => void; // Function to handle button press
};

const IconButton = ({
  BtnText,
  icon,
  bgColor = "",
  borderColor = "border-primary",
  textColor = "text-neutral-10",
  onPress,
}: IconButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`flex flex-row border items-center justify-center gap-[14px] rounded-lg px-[18px] py-3 ${bgColor} ${borderColor}`}
    >
      {/* Icon */}
      <Image source={icon} className="h-[24px] w-[24px]" />
      {/* Text */}
      <Text className={`text-BodyBold ${textColor}`}>{BtnText}</Text>
    </TouchableOpacity>
  );
};

export default IconButton;
