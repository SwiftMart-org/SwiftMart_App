import Feather from "@expo/vector-icons/Feather";
import React from "react";
import { Text, TextInput, TextInputProps, View } from "react-native";

type SignUpInputFieldProps = {
  label: string;
  placeholder: string;
  containerClassName?: string;
  textInputClassName?: string;
  selectionColor?: string;
 
} & TextInputProps;

const SignUpInputField: React.FC<SignUpInputFieldProps> = ({
  label,
  placeholder,
  containerClassName,
  textInputClassName,
  selectionColor,
 
  ...props
}) => {
 

  return (
    <View className={`flex border rounded-xl  flex-row items-center gap-4 px-[18px] py-2 ${containerClassName}`}>
      <Feather name="user" size={24} color="#757575" />
      <View className="flex-1 gap-1">
        <Text className="text-BodySmallRegular w-full text-text">
          {label}
        </Text>
        <TextInput
          placeholder={placeholder}
          selectionColor={selectionColor}
          className={`w-full text-BodyRegular ${textInputClassName}`}
        ></TextInput>
      </View>
    </View>
  );
};

export default SignUpInputField;
