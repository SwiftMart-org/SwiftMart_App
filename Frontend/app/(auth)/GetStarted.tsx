import PrimaryButton from "@/components/PrimaryButton";
import SecondaryButton from "@/components/SecondaryButton";
import { router } from "expo-router";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const GetStarted = () => {
  return (
    <SafeAreaView className="flex-1 font-Manrope justify-center items-center gap-8 px-4 bg-neutral-10">
      {/* Image */}
      <View>
        <Image source={require("@/assets/images/LogoLG.png")} />
      </View>
      {/* TextBox */}
      <View className="items-center w-[335px] gap-8">
        <Text className="text-Heading3 text-text text-center tracking-wide">
          Your one-stop shop for everything you love
        </Text>
        <Text className="text-Heading5 text-text tracking-tight">
          Are you a buyer or seller?
        </Text>
      </View>
      {/* Buttons */}
      <View className="flex w-full gap-2">
        <PrimaryButton
          BtnText="Buyer"
          onPress={() => router.push("/BuyerRegister")}
        />
        <SecondaryButton
          BtnText="Seller"
          onPress={() => router.push("/SellerRegister1")}
        />
      </View>
      {/* Text */}
      <View className="flex-row items-center justify-center">
        <Text className="text-BodyRegular text-text">
          Already have an account?{" "}
        </Text>
        <Pressable onPress={() => router.push("/Login")}>
          <Text className="text-primary text-BodyRegular">Login</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default GetStarted;
