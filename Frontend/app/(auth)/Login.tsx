import Button from "@/components/Button";
import IconButton from "@/components/IconButton";
import PrimaryButton from "@/components/PrimaryButton";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  PanResponder,
  Platform,
  Pressable,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const validCredentials = [
  { email: "user@example.com", password: "Password123!" },
  { email: "test@example.com", password: "Test1234!" },
  { email: "admin@example.com", password: "Admin123!" },
];

const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidPassword = (password: string) => {
  return {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    number: /\d/.test(password),
  };
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const [modalEmail, setModalEmail] = useState("");
  const [modalEmailTouched, setModalEmailTouched] = useState(false);
  const [isModalEmailValid, setIsModalEmailValid] = useState(false);
  const [isEmailAssigned, setIsEmailAssigned] = useState(true);

  const [password, setPassword] = useState("");
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordCriteria, setPasswordCriteria] = useState({
    length: false,
    uppercase: false,
    specialChar: false,
    number: false,
  });

  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [isEnteringCode, setIsEnteringCode] = useState(false);
  const [code, setCode] = useState(["", "", "", ""]);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [focusedCodeIndex, setFocusedCodeIndex] = useState<number | null>(null);
  const [normalCodeText, setNormalCodeText] = useState(true);

  const panY = useState(new Animated.Value(0))[0];
  const panResponder = useState(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => false,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          panY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 50) {
          closeModal();
        } else {
          resetPosition();
        }
      },
    })
  )[0];

  const resetPosition = () => {
    Animated.spring(panY, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    setShowForgotPasswordModal(false);
    Animated.timing(panY, {
      toValue: 500,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      panY.setValue(0);
      setIsEmailAssigned(true);
      setModalEmail("");
      setIsModalEmailValid(false);
      setModalEmailTouched(false);
      setIsEnteringCode(false);
      setCode(["", "", "", ""]);
      setIsResettingPassword(false);
      setNewPassword("");
      setConfirmPassword("");
    });
  };

  const checkCredentials = () => {
    return validCredentials.some(
      (cred) => cred.email === email && cred.password === password
    );
  };

  useEffect(() => {
    setIsEmailValid(isValidEmail(email));
    const passwordValid = isValidPassword(password);

    if (
      isValidEmail(email) &&
      passwordValid.length &&
      passwordValid.uppercase &&
      passwordValid.specialChar &&
      passwordValid.number
    ) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [email, password]);

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    setPasswordCriteria(isValidPassword(text));
  };

  const handleEmailSubmit = () => {
    if (!isModalEmailValid) return;

    const emailExists = validCredentials.some(
      (cred) => cred.email === modalEmail
    );
    setIsEmailAssigned(emailExists);

    if (emailExists) {
      setIsEnteringCode(true);
    }
  };

  const handleCodeChange = (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text.slice(0, 1);
    setCode(newCode);

    if (text.length === 1 && index < code.length - 1) {
      inputRefs.current[index + 1]?.focus();
    } else if (text.length === 0 && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const validCodes = ["1234", "5678", "9101"];

  const handleCodeSubmit = () => {
    const enteredCode = code.join("");

    if (validCodes.includes(enteredCode)) {
      setIsResettingPassword(true);
      setNormalCodeText(true);
    } else {
      setNormalCodeText(false);
    }
  };

  const handlePasswordResetSubmit = () => {
    if (newPassword !== confirmPassword) {
      console.log("Passwords do not match!");
      return;
    }

    if (!isValidPassword(newPassword).length) {
      console.log("Password does not meet the criteria!");
      return;
    }

    closeModal();

    Alert.alert(
      "Password Reset Successful",
      "Your password has been successfully reset. You can now log in with your new password.",
      [{ text: "OK" }]
    );
  };

  const handleLogin = () => {
    if (checkCredentials()) {
      router.push("/Home");
    } else {
      Alert.alert(
        "Invalid Credentials",
        "The email or password you entered is incorrect. Please try again.",
        [{ text: "OK" }]
      );
    }
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView className="flex-1 bg-neutral-10 p-4 gap-8">
          <View className="w-[343px] gap-2">
            <Text className="text-Heading2 text-text">Welcome Back!</Text>
            <Text className="text-BodyRegular text-neutral-70">
              Enter your email to start shopping and get awesome deals today!
            </Text>
          </View>

          <View className="flex gap-6">
            <View className="flex gap-4">
              <View
                className={`w-full border px-[18px] flex-row items-center gap-4 border-neutral-40 rounded-xl py-2 ${
                  emailTouched && !isEmailValid
                    ? "border-red-500"
                    : "border-neutral-40"
                }`}
              >
                <MaterialIcons name="mail-outline" size={24} color="#757575" />
                <View className="gap-1 w-full">
                  <Text className="text-BodySmallRegular text-neutral-70">
                    Email
                  </Text>
                  <TextInput
                    value={email}
                    onChangeText={(text) => {
                      setEmail(text);
                      setIsEmailValid(isValidEmail(text));
                    }}
                    onFocus={() => setEmailTouched(true)}
                    placeholder=""
                    selectionColor={"#404040"}
                    className="w-full text-text text-BodyRegular"
                  />
                </View>
              </View>

              <View className="mt-4">
                <View
                  className={`w-full flex flex-row gap-4 py-2 px-[18px] items-center border border-neutral-40 rounded-xl ${
                    passwordTouched && !passwordCriteria.length
                      ? "border-red-500"
                      : "border-neutral-40"
                  }`}
                >
                  <Feather name="lock" size={24} color="#757575" />
                  <View className="gap-1 flex-1">
                    <Text className="text-BodySmallRegular text-neutral-70">
                      Password
                    </Text>
                    <TextInput
                      value={password}
                      onChangeText={handlePasswordChange}
                      onFocus={() => {
                        setPasswordFocused(true);
                        setPasswordTouched(true);
                      }}
                      onBlur={() => setPasswordFocused(false)}
                      placeholder=""
                      secureTextEntry={!passwordVisible}
                      className="w-full h-[20px] text-text text-BodyRegular"
                      selectionColor={"#404040"}
                    />
                  </View>
                  <Pressable
                    onPress={() => setPasswordVisible(!passwordVisible)}
                    style={{ padding: 4 }}
                  >
                    <Feather
                      name={passwordVisible ? "eye" : "eye-off"}
                      size={24}
                      color="#757575"
                    />
                  </Pressable>
                </View>
              </View>
              <View className="w-[170px]">
                <Pressable
                  onPress={() => {
                    setShowForgotPasswordModal(true);
                  }}
                >
                  <Text className="text-primary text-BodyRegular">
                    Forgot your password?
                  </Text>
                </Pressable>
              </View>
            </View>

            <View className="w-full">
              <PrimaryButton
                BtnText="Log In"
                onPress={handleLogin}
                disabled={isButtonDisabled}
              />
            </View>
          </View>

          <View className="flex flex-row items-center">
            <View className="h-[1px] flex-1 bg-neutral-50" />
            <Text className="mx-4 text-Caption text-text">OR</Text>
            <View className="h-[1px] flex-1 bg-neutral-50" />
          </View>

          <IconButton
            icon={require("@/assets/images/google-icon.png")}
            BtnText="Continue with Google"
            textColor="text-primary"
            borderColor="border-primary"
            bgColor="bg-neutral-10"
          />
          <IconButton
            icon={require("@/assets/images/facebook-icon.png")}
            BtnText="Continue with Facebook"
            textColor="text-primary"
            borderColor="border-primary"
            bgColor="bg-neutral-10"
          />

          <View className="flex-row items-center justify-center">
            <Text className="text-BodyRegular text-text">
              Don't have an account?{" "}
            </Text>
            <Pressable onPress={() => router.push("/GetStarted")}>
              <Text className="text-primary text-BodyRegular">Register</Text>
            </Pressable>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>

      <Modal
        visible={showForgotPasswordModal}
        transparent={true}
        animationType="slide"
        onRequestClose={closeModal}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
          keyboardVerticalOffset={Platform.select({ ios: 0, android: 0 })}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View className="flex-1 justify-end gap-4 bg-black/50">
              <Animated.View
                className="flex items-center gap-4"
                style={{
                  transform: [{ translateY: panY }],
                  width: "100%",
                  backgroundColor: "white",
                  borderTopLeftRadius: 32,
                  borderTopRightRadius: 32,
                  paddingTop: 16,
                  paddingBottom: 64,
                  paddingHorizontal: 16,
                }}
                {...panResponder.panHandlers}
              >
                <View
                  className="w-[100px] h-[5px] rounded-full bg-black/15 "
                  {...panResponder.panHandlers}
                />

                <View className="justify-center items-center relative">
                  <View
                    className={`rounded-full h-[150px] w-[150px] ${
                      isEmailAssigned ? "bg-primary/15" : "bg-alert/15"
                    }`}
                  ></View>
                  <View
                    className={`rounded-full absolute h-[100px] w-[100px] ${
                      isEmailAssigned ? "bg-primary" : "bg-alert"
                    }`}
                  ></View>
                  <FontAwesome5
                    className={`absolute ${
                      isEmailAssigned ? "-rotate-45" : "rotate-0"
                    }`}
                    name={isEmailAssigned ? "key" : "search"}
                    size={32}
                    color="white"
                  />
                </View>

                {isEmailAssigned ? (
                  <>
                    {isResettingPassword ? (
                      <>
                        <View className="items-center gap-2 mb-2 w-[319px]">
                          <Text className="text-Heading3 text-text ">
                            Create New Password!
                          </Text>
                          <Text className="text-BodyRegular text-neutral-70 text-center ">
                            The new passwords should match each other and also
                            meet the criteria.
                          </Text>
                        </View>
                        <View className="w-full gap-4 relative">
                          <View
                            className={`w-full border px-[18px] flex-row items-center gap-4 rounded-xl py-2 ${
                              newPassword &&
                              !isValidPassword(newPassword).length
                                ? "border-alert"
                                : "border-neutral-40"
                            }`}
                          >
                            <Feather name="lock" size={24} color="#757575" />
                            <View className="gap-1 flex-1">
                              <Text className="text-BodySmallRegular text-neutral-70">
                                New Password
                              </Text>
                              <TextInput
                                value={newPassword}
                                onChangeText={(text) => {
                                  setNewPassword(text);
                                  setPasswordCriteria(isValidPassword(text));
                                }}
                                onFocus={() => setPasswordFocused(true)}
                                onBlur={() => setPasswordFocused(false)}
                                secureTextEntry={!newPasswordVisible}
                                placeholder=""
                                selectionColor={"#404040"}
                                className="w-full h-[32px] text-text text-BodyRegular"
                              />
                            </View>
                            <Pressable
                              onPress={() =>
                                setNewPasswordVisible(!newPasswordVisible)
                              }
                              style={{ padding: 4 }}
                            >
                              <Feather
                                name={newPasswordVisible ? "eye" : "eye-off"}
                                size={24}
                                color="#757575"
                              />
                            </Pressable>
                          </View>

                          {passwordFocused && (
                            <View className="absolute top-[80px] left-0 z-10 bg-neutral-10 p-4 rounded-lg shadow">
                              <Text className="text-BodySmallRegular text-neutral-70">
                                Password must meet the following criteria:
                              </Text>
                              <View className="flex flex-col gap-2 mt-2">
                                <Text
                                  className={`text-BodySmallRegular ${
                                    passwordCriteria.length
                                      ? "text-primary"
                                      : "text-alert"
                                  }`}
                                >
                                  • At least 8 characters
                                </Text>
                                <Text
                                  className={`text-BodySmallRegular ${
                                    passwordCriteria.uppercase
                                      ? "text-primary"
                                      : "text-alert"
                                  }`}
                                >
                                  • At least one uppercase letter
                                </Text>
                                <Text
                                  className={`text-BodySmallRegular ${
                                    passwordCriteria.specialChar
                                      ? "text-primary"
                                      : "text-alert"
                                  }`}
                                >
                                  • At least one special character
                                </Text>
                                <Text
                                  className={`text-BodySmallRegular ${
                                    passwordCriteria.number
                                      ? "text-primary"
                                      : "text-alert"
                                  }`}
                                >
                                  • At least one number
                                </Text>
                              </View>
                            </View>
                          )}

                          <View
                            className={`w-full border px-[18px] flex-row items-center gap-4 rounded-xl py-2 ${
                              confirmPassword && confirmPassword !== newPassword
                                ? "border-alert"
                                : "border-neutral-40"
                            }`}
                          >
                            <Feather name="lock" size={24} color="#757575" />
                            <View className="gap-1 flex-1">
                              <Text className="text-BodySmallRegular text-neutral-70">
                                Confirm Password
                              </Text>
                              <TextInput
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                                secureTextEntry={!confirmPasswordVisible}
                                placeholder=""
                                selectionColor={"#404040"}
                                className="w-full h-[32px] text-text text-BodyRegular"
                              />
                            </View>
                            <Pressable
                              onPress={() =>
                                setConfirmPasswordVisible(
                                  !confirmPasswordVisible
                                )
                              }
                              style={{ padding: 4 }}
                            >
                              <Feather
                                name={
                                  confirmPasswordVisible ? "eye" : "eye-off"
                                }
                                size={24}
                                color="#757575"
                              />
                            </Pressable>
                          </View>
                        </View>

                        <View className="w-full">
                          <PrimaryButton
                            BtnText="Reset Password"
                            disabled={
                              !newPassword ||
                              !confirmPassword ||
                              newPassword !== confirmPassword ||
                              !passwordCriteria.length ||
                              !passwordCriteria.uppercase ||
                              !passwordCriteria.specialChar ||
                              !passwordCriteria.number
                            }
                            onPress={handlePasswordResetSubmit}
                          />
                        </View>
                      </>
                    ) : isEnteringCode ? (
                      <>
                        <View className="items-center gap-2 mb-2 w-[319px]">
                          <Text className="text-Heading3 text-text ">
                            {normalCodeText
                              ? "Forgot Password!"
                              : "Invalid Code!"}
                          </Text>
                          <Text className="text-BodyRegular text-neutral-70 text-center ">
                            {normalCodeText
                              ? "Enter code"
                              : "The code you entered is incorrect. Please try again."}
                          </Text>
                        </View>
                        <View className="flex flex-row w-full gap-5 justify-center">
                          {code.map((value, index) => (
                            <TextInput
                              selectionColor={"#404040"}
                              key={index}
                              ref={(ref) => {
                                inputRefs.current[index] = ref;
                              }}
                              value={value}
                              onChangeText={(text) =>
                                handleCodeChange(text, index)
                              }
                              onFocus={() => setFocusedCodeIndex(index)}
                              onBlur={() => setFocusedCodeIndex(null)}
                              className={`border rounded-2xl bg-secondary/10 px-[10px] py-[10px] w-[64px] h-[88px] text-text text-center text-Heading2 ${
                                focusedCodeIndex === index
                                  ? "border-primary"
                                  : "border-neutral-30"
                              }`}
                              keyboardType="numeric"
                              maxLength={1}
                            />
                          ))}
                        </View>

                        <View className="w-full">
                          <PrimaryButton
                            BtnText="Submit"
                            disabled={code.some((digit) => digit === "")}
                            onPress={handleCodeSubmit}
                          />
                        </View>
                      </>
                    ) : (
                      <>
                        <View className="items-center gap-2 mb-2 w-[319px]">
                          <Text className="text-Heading3 text-text ">
                            {isEmailAssigned
                              ? "Forgot Password!"
                              : "No Account Found!"}
                          </Text>
                          <Text className="text-BodyRegular text-neutral-70 text-center ">
                            {isEmailAssigned
                              ? "Enter your email"
                              : "The email address you entered is not linked to any SwiftMart account."}
                          </Text>
                        </View>
                        <View
                          className={`w-full border px-[18px] mb-2 flex-row items-center gap-4 rounded-xl py-2 ${
                            modalEmailTouched && !isModalEmailValid
                              ? "border-alert"
                              : "border-neutral-40"
                          }`}
                        >
                          <MaterialIcons
                            name="mail-outline"
                            size={24}
                            color="#757575"
                          />
                          <View className="gap-1 w-full">
                            <Text className="text-BodySmallRegular text-neutral-70">
                              Email
                            </Text>
                            <TextInput
                              value={modalEmail}
                              onChangeText={(text) => {
                                setModalEmail(text);
                                setIsModalEmailValid(isValidEmail(text));
                              }}
                              onFocus={() => setModalEmailTouched(true)}
                              placeholder=""
                              selectionColor={"#404040"}
                              className="w-full h-[32px] text-text text-BodyRegular"
                            />
                          </View>
                        </View>

                        <View className="w-full">
                          <PrimaryButton
                            BtnText="Send Code"
                            disabled={!isModalEmailValid}
                            onPress={handleEmailSubmit}
                          />
                        </View>
                      </>
                    )}
                  </>
                ) : (
                  <View className="w-full flex items-center gap-4">
                    <Button
                      BtnText="Create Account"
                      bgColor="bg-alert"
                      onPress={() => {
                        closeModal();
                        router.push("/GetStarted");
                      }}
                    />
                    <Button
                      BtnText="Try Again"
                      bgColor="bg-neutral-10"
                      textColor="text-alert"
                      hasBorder={true}
                      borderColor="border-alert"
                      onPress={() => {
                        setIsEmailAssigned(true);
                        setModalEmail("");
                        setIsModalEmailValid(false);
                        setModalEmailTouched(false);
                        setIsEnteringCode(false);
                        setIsResettingPassword(false);
                        setCode(["", "", "", ""]);
                        setNewPassword("");
                        setConfirmPassword("");
                      }}
                    />
                  </View>
                )}
              </Animated.View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </Modal>
    </>
  );
};

export default Login;
