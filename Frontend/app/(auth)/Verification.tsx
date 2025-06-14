import Button from "@/components/Button";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Alert,
  Keyboard,
  Modal,
  Pressable,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";

const Verification = () => {
  const [focusedInput, setFocusedInput] = useState<number | null>(null); // Tracks which input is focused
  const [code, setCode] = useState(["", "", "", ""]); // Stores the verification code
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [isCodeCorrect, setIsCodeCorrect] = useState<boolean | null>(null); // Tracks if the code is correct or incorrect
  const [showSuccessModal, setShowSuccessModal] = useState(false); // Tracks if the success modal is visible
  const inputRefs = useRef<(TextInput | null)[]>([]); // References to all input fields

  const handleChangeText = (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text.slice(0, 1); // Ensure only one character is stored
    setCode(newCode);

    // Move to the next input field if available
    if (text.length === 1 && index < code.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === "Backspace" && index > 0 && code[index] === "") {
      // Move to the previous input field if backspace is pressed and the current field is empty
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    // Simulate API call to validate the code
    setTimeout(() => {
      setIsSubmitting(false);
      if (code.join("") === "1234") {
        // Replace "1234" with the actual correct code
        setIsCodeCorrect(true);
        setShowSuccessModal(true); // Show success modal
      } else {
        setIsCodeCorrect(false);
      }
    }, 2000);
  };

  const handleResendCode = () => {
    setIsResending(true);
    // Simulate API call
    setTimeout(() => {
      setIsResending(false);
      Alert.alert("Verification code has been resent to your email.");
    }, 2000);
  };

  const isCodeComplete = code.every((value) => value !== ""); // Check if all fields are filled

  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView className="flex-1 font-Manrope bg-neutral-10 px-4 py-2">
          {/* Header with Left Arrow */}
          <View className="flex-row items-center w-full bg-white ">
            <Pressable onPress={() => router.back()}>
              <Ionicons name="chevron-back" size={24} color="#404040" />
            </Pressable>
            <Text className="flex-1 text-Heading2 text-center text-text">
              Verification
            </Text>
          </View>

          {/* Centered Verification Content */}
          <View className="flex-1 justify-center items-center gap-8">
            <View className="justify-center items-center relative">
              {/* Outer Circle */}
              <View
                className={`rounded-full h-[150px] w-[150px] ${
                  isCodeCorrect === false ? "bg-alert/15" : "bg-primary/15"
                }`}
              ></View>
              {/* Inner Circle */}
              <View
                className={`rounded-full absolute h-[100px] w-[100px] ${
                  isCodeCorrect === false ? "bg-alert" : "bg-primary"
                }`}
              ></View>
              {/* Icon */}
              <MaterialIcons
                className="absolute"
                name={isCodeCorrect === false ? "close" : "mail-outline"}
                size={40}
                color="#ffffff"
              />
            </View>
            <View className="items-center gap-1">
              {/* Dynamic Text */}
              <Text
                className={`text-Heading3 ${
                  isCodeCorrect === false ? "text-alert" : "text-text"
                } text-center`}
              >
                {isCodeCorrect === false
                  ? "Incorrect Code"
                  : "Verification Code"}
              </Text>
              <Text
                className={`text-BodyRegular ${
                  isCodeCorrect === false ? "text-alert" : "text-neutral-70"
                }`}
              >
                {isCodeCorrect === false
                  ? "Please make sure the code is correct"
                  : "We have sent a verification code to"}
              </Text>
              {isCodeCorrect !== false && (
                <Text className="text-BodyBold text-text">
                  claire.cooper@mail.com
                </Text>
              )}
            </View>

            {/* Input Fields */}
            <View className="flex flex-row w-full gap-5 justify-center">
              {code.map((value, index) => (
                <TextInput
                  selectionColor={"#404040"} // Change selection color
                  key={index}
                  ref={(ref) => {
                    inputRefs.current[index] = ref;
                  }} // Store reference to the input field
                  value={value}
                  onChangeText={(text) => handleChangeText(text, index)} // Handle text change
                  onKeyPress={({ nativeEvent }) =>
                    handleKeyPress(nativeEvent.key, index)
                  } // Handle backspace
                  className={`border rounded-2xl bg-secondary/10 px-[10px] py-[10px] w-[64px] h-[88px] text-text text-center text-Heading2 ${
                    focusedInput === index
                      ? "border-primary"
                      : "border-neutral-30"
                  }`}
                  keyboardType="numeric"
                  maxLength={1} // Limit input to one character
                  onFocus={() => setFocusedInput(index)} // Custom focus logic
                  onBlur={() => setFocusedInput(null)} // Clear focus state
                />
              ))}
            </View>
            <View className="w-full gap-4 flex">
              <Button
                BtnText={isSubmitting ? "Submitting..." : "Submit"}
                bgColor="bg-primary"
                disabled={!isCodeComplete || isSubmitting}
                onPress={handleSubmit}
              />
              {/* Text */}
              <View className="flex-row items-center justify-center">
                <Text className="text-BodyRegular text-text">
                  Didn't receive code?{" "}
                </Text>
                <Pressable onPress={handleResendCode} disabled={isResending}>
                  <Text
                    className={`text-primary text-BodyRegular ${
                      isResending ? "opacity-50" : ""
                    }`}
                  >
                    {isResending ? "Resending..." : "Resend"}
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>

      {/* Sliding Success Modal */}
      <Modal
        visible={showSuccessModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowSuccessModal(false)}
      >
        <View className="flex-1 justify-end bg-black/50">
          <View className="bg-white rounded-t-[32px] px-4 pt-12 pb-16 gap-8 w-full items-center">
            {/* <View className="w-[100px] h-[5px] rounded-full bg-black/15"></View> */}
            <View className="justify-center items-center relative">
              {/* Outer Circle */}
              <View
                className={`rounded-full h-[150px] w-[150px] bg-primary/15`}
              ></View>
              {/* Inner Circle */}
              <View
                className={`rounded-full absolute h-[100px] bg-primary w-[100px]`}
              ></View>
              {/* Icon */}
              <Ionicons
                className="absolute"
                name="checkmark-circle"
                size={40}
                color="white"
              />
            </View>
            <View className="items-center gap-2 w-[319px]">
              <Text className="text-Heading3 text-text ">
                Register Success!
              </Text>
              <Text className="text-BodyRegular text-neutral-70 text-center ">
                Congratulations! Your account has been created{" "}
              </Text>
            </View>
            <View className="w-full">
            <Button
              BtnText="Go To Homepage"
              bgColor="bg-primary"
              onPress={() => {
                setShowSuccessModal(false);
                router.push("/Home"); // Navigate to the next page
              }}
            />

            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default Verification;
