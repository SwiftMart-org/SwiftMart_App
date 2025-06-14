import IconButton from "@/components/IconButton";
import SecondaryButton from "@/components/SecondaryButton";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Keyboard,
  Pressable,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { SafeAreaView } from "react-native-safe-area-context";

const BuyerRegister = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+1"); // Default country code
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false); // State to toggle password visibility
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [open, setOpen] = useState(false); // State for dropdown open/close
  const [items, setItems] = useState([
    { label: "+1", value: "+1" },
    { label: "+20", value: "+20" },
    { label: "+27", value: "+27" },
    { label: "+30", value: "+30" },
    { label: "+31", value: "+31" },
    { label: "+32", value: "+32" },
    { label: "+33", value: "+33" },
    { label: "+34", value: "+34" },
    { label: "+36", value: "+36" },
    { label: "+39", value: "+39" },
    { label: "+40", value: "+40" },
    { label: "+41", value: "+41" },
    { label: "+43", value: "+43" },
    { label: "+44", value: "+44" },
    { label: "+45", value: "+45" },
    { label: "+46", value: "+46" },
    { label: "+47", value: "+47" },
    { label: "+48", value: "+48" },
    { label: "+49", value: "+49" },
    { label: "+51", value: "+51" },
    { label: "+52", value: "+52" },
    { label: "+53", value: "+53" },
    { label: "+54", value: "+54" },
    { label: "+55", value: "+55" },
    { label: "+56", value: "+56" },
    { label: "+57", value: "+57" },
    { label: "+58", value: "+58" },
    { label: "+60", value: "+60" },
    { label: "+61", value: "+61" },
    { label: "+62", value: "+62" },
    { label: "+63", value: "+63" },
    { label: "+64", value: "+64" },
    { label: "+65", value: "+65" },
    { label: "+66", value: "+66" },
    { label: "+81", value: "+81" },
    { label: "+82", value: "+82" },
    { label: "+84", value: "+84" },
    { label: "+86", value: "+86" },
    { label: "+90", value: "+90" },
    { label: "+91", value: "+91" },
    { label: "+92", value: "+92" },
    { label: "+93", value: "+93" },
    { label: "+94", value: "+94" },
    { label: "+95", value: "+95" },
    { label: "+98", value: "+98" },
    { label: "+211", value: "+211" },
    { label: "+212", value: "+212" },
    { label: "+213", value: "+213" },
    { label: "+216", value: "+216" },
    { label: "+218", value: "+218" },
    { label: "+220", value: "+220" },
    { label: "+221", value: "+221" },
    { label: "+222", value: "+222" },
    { label: "+223", value: "+223" },
    { label: "+224", value: "+224" },
    { label: "+225", value: "+225" },
    { label: "+226", value: "+226" },
    { label: "+227", value: "+227" },
    { label: "+228", value: "+228" },
    { label: "+229", value: "+229" },
    { label: "+230", value: "+230" },
    { label: "+231", value: "+231" },
    { label: "+232", value: "+232" },
    { label: "+233", value: "+233" },
    { label: "+234", value: "+234" },
    { label: "+235", value: "+235" },
    { label: "+236", value: "+236" },
    { label: "+237", value: "+237" },
    { label: "+238", value: "+238" },
    { label: "+239", value: "+239" },
    { label: "+240", value: "+240" },
    { label: "+241", value: "+241" },
    { label: "+242", value: "+242" },
    { label: "+243", value: "+243" },
    { label: "+244", value: "+244" },
    { label: "+245", value: "+245" },
    { label: "+246", value: "+246" },
    { label: "+248", value: "+248" },
    { label: "+249", value: "+249" },
    { label: "+250", value: "+250" },
    { label: "+251", value: "+251" },
    { label: "+252", value: "+252" },
    { label: "+253", value: "+253" },
    { label: "+254", value: "+254" },
    { label: "+255", value: "+255" },
    { label: "+256", value: "+256" },
    { label: "+257", value: "+257" },
    { label: "+258", value: "+258" },
    { label: "+260", value: "+260" },
    { label: "+261", value: "+261" },
    { label: "+262", value: "+262" },
    { label: "+263", value: "+263" },
    { label: "+264", value: "+264" },
    { label: "+265", value: "+265" },
    { label: "+266", value: "+266" },
    { label: "+267", value: "+267" },
    { label: "+268", value: "+268" },
    { label: "+269", value: "+269" },
  ]); // Example dropdown items

  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(true);
  const [passwordCriteria, setPasswordCriteria] = useState({
    length: false,
    uppercase: false,
    specialChar: false,
    number: false,
  });

  // Track if fields have been interacted with
  const [firstNameTouched, setFirstNameTouched] = useState(false);
  const [lastNameTouched, setLastNameTouched] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [phoneTouched, setPhoneTouched] = useState(false);

  // Separate states for password focus, validation, and interaction
  const [passwordFocused, setPasswordFocused] = useState(false); // Tracks if the field is active
  const [passwordTouched, setPasswordTouched] = useState(false); // Tracks if the field has been interacted with
  const [isPasswordValid, setIsPasswordValid] = useState(false); // Tracks if the password meets criteria

  // Helper functions for validation
  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isValidPhoneNumber = (phone: string) => /^[0-9]{10,15}$/.test(phone); // Accepts 10 to 15 digits

  const validatePassword = (password: string) => {
    const criteria = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      number: /[0-9]/.test(password),
    };
    setPasswordCriteria(criteria);
    return Object.values(criteria).every((value) => value);
  };

  // Validate password whenever it changes
  useEffect(() => {
    const isValid = validatePassword(password);
    setIsPasswordValid(isValid);
  }, [password]);

  // Enable/disable the button based on input validity
  useEffect(() => {
    setIsEmailValid(isValidEmail(email));
    setIsPhoneNumberValid(isValidPhoneNumber(phoneNumber));

    if (
      firstName.trim() !== "" &&
      lastName.trim() !== "" &&
      isValidEmail(email) &&
      isValidPhoneNumber(phoneNumber) &&
      isPasswordValid
    ) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [firstName, lastName, email, phoneNumber, isPasswordValid]);

  // Fetch country data from an API
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(
          "https://countriesnow.space/api/v0.1/countries/codes"
        );
        const data = await response.json();
        // console.log("API Response:", data); // Log the response to verify structure

        const countryItems = data.data.map((country: any) => ({
          label: country.name, // Country name
          value: `${country.dial_code}`, // Combine dial code and name for unique value
        }));

        setItems(countryItems); // Set the items for the dropdown
      } catch (error) {
        console.error("Error fetching country data:", error);
      }
    };

    fetchCountries();
  }, []);

  const handleCreateAccount = () => {
    router.push("/Verification");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView className="flex-1 gap-6 bg-white px-4 py-6 font-Manrope">
        <View className="w-[343px] gap-2">
          <Text className="text-Heading2 text-text">Create Account</Text>
          <Text className="text-BodyRegular text-neutral-70">
            Fill in your details below to get started on a seamless shopping
            experience.
          </Text>
        </View>
        {/* First Name and Last Name */}
        <View className="flex flex-row gap-2 w-full">
          {/* First Name */}
          <View
            className={`flex-1 flex-row gap-4 items-center border border-neutral-40 rounded-xl py-2 px-[18px] ${
              firstNameTouched && firstName.trim() === ""
                ? "border-red-500"
                : "border-neutral-40"
            } `}
          >
            <Feather name="user" size={24} color="#757575" />

            <View className="gap-1">
              <Text className="text-BodySmallRegular text-neutral-70">
                First Name
              </Text>
              <TextInput
                value={firstName}
                onChangeText={setFirstName}
                selectionColor={"#404040"}
                onFocus={() => setFirstNameTouched(true)}
                placeholder=""
                className="w-full h-[20px]"
              />
            </View>
          </View>
          {/* Last Name  */}
          <View
            className={`flex-1 items-center flex-row gap-4 border border-neutral-40 rounded-xl py-2 px-[18px]  ${
              lastNameTouched && lastName.trim() === ""
                ? "border-red-500"
                : "border-neutral-40"
            }`}
          >
            <Feather name="user" size={24} color="#757575" />

            <View className="gap-1">
              <Text className="text-BodySmallRegular text-neutral-70">
                Last Name
              </Text>
              <TextInput
                value={lastName}
                selectionColor={'#404040'}

                onChangeText={setLastName}
                onFocus={() => setLastNameTouched(true)}
                placeholder=""
                className={`flex-1 h-[20px] `}
              />
            </View>
          </View>
        </View>
        {/* Email Field */}
        <View
          className={`w-full  border px-[18px] flex-row items-center gap-4 border-neutral-40 rounded-xl py-2  ${
            emailTouched && !isEmailValid
              ? "border-red-500"
              : "border-neutral-40"
          } `}
        >
          <MaterialIcons name="mail-outline" size={24} color="#757575" />
          <View className=" gap-1 w-full ">
            <Text className="text-BodySmallRegular text-neutral-70">Email</Text>
            <TextInput
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                setIsEmailValid(isValidEmail(text));
              }}
              onFocus={() => setEmailTouched(true)}
              placeholder=""
              selectionColor={"#404040"}
              className={`w-full text-text text-BodyRegular`}
            />
          </View>
        </View>
        {/* Phone Number Field */}
        <View
          className={`w-full py-2 px-[18px] border rounded-xl flex-row items-center gap-2 ${
            phoneTouched && !isPhoneNumberValid
              ? "border-red-500"
              : "border-neutral-40"
          }`}
        >
          <Feather name="phone" size={24} color="#757575" />
          {/* Country Code Dropdown */}
          <View className="w-[40%] text-text border-r border-neutral-40">
            <DropDownPicker
              open={open}
              value={countryCode}
              items={items}
              setOpen={setOpen}
              setValue={setCountryCode}
              setItems={setItems}
              searchable={true}
              searchTextInputStyle={{
                borderRadius: 8,
                borderWidth: 1,
                borderColor: "#E0E0E0",
                color: "#404040", // Text color for search input
              }} // Enable search functionality
              placeholder="Select a country"
              style={{
                borderWidth: 0,
                borderRadius: 8,
              }}
              dropDownContainerStyle={{
                borderWidth: 1,
                borderColor: "#E0E0E0",
                borderRadius: 8,
              }}
            />
          </View>
          <View><Text>{countryCode}</Text></View>

          {/* Phone Number Input */}
          <View className="flex-1">
            <TextInput
              value={phoneNumber}
              onChangeText={(text) => {
                setPhoneNumber(text);
                setIsPhoneNumberValid(isValidPhoneNumber(text));
              }}
              onFocus={() => setPhoneTouched(true)}
              selectionColor={"#404040"}
              placeholder=""
              className={`w-full h-[20px] text-text  text-BodyRegular`}
            />
          </View>
        </View>
        {/* Password Field */}
        <View>
          <View
            className={`w-full flex flex-row gap-4 py-2 px-[18px] items-center border border-neutral-40 rounded-xl  ${
              passwordTouched && !isPasswordValid
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
                onChangeText={setPassword}
                onFocus={() => {
                  setPasswordFocused(true);
                  setPasswordTouched(true); // Mark the field as interacted with
                }}
                onBlur={() => setPasswordFocused(false)}
                placeholder=""
                secureTextEntry={!passwordVisible} // Toggle visibility
                className={`w-full h-[20px] text-text text-BodyRegular `}
                selectionColor={"#404040"}
              />
            </View>
            {/* Eye Icon */}
            <Pressable onPress={() => setPasswordVisible(!passwordVisible)}>
              <Feather
                name={passwordVisible ? "eye" : "eye-off"} // Toggle icon
                size={24}
                color="#757575"
              />
            </Pressable>
          </View>
          {/* Password Criteria Dropdown */}
          {passwordFocused && (
            <View
              className="mt-2  bg-neutral-10 p-4 rounded-lg shadow"
              style={{
                alignSelf: "flex-start", // Ensures the dropdown does not stretch to the full width
                maxWidth: 300, // Optional: Set a maximum width for the dropdown
              }}
            >
              <Text
                className={`text-BodySmallRegular ${
                  passwordCriteria.length ? "text-primary" : "text-alert"
                }`}
              >
                • At least 8 characters
              </Text>
              <Text
                className={`text-BodySmallRegular ${
                  passwordCriteria.uppercase ? "text-primary" : "text-alert"
                }`}
              >
                • At least one uppercase letter
              </Text>
              <Text
                className={`text-BodySmallRegular ${
                  passwordCriteria.specialChar ? "text-primary" : "text-alert"
                }`}
              >
                • At least one special character
              </Text>
              <Text
                className={`text-BodySmallRegular ${
                  passwordCriteria.number ? "text-primary" : "text-alert"
                }`}
              >
                • At least one number
              </Text>
            </View>
          )}
        </View>

        {/* Terms and Conditions */}
        <View className="w-full ">
          <Text className="w-full text-BodySmallRegular text-neutral-70">
            By clicking Create Account, you acknowledge you have read and agreed
            to our <Text className="text-primary">Terms of Use</Text> and{" "}
            <Text className="text-primary">Privacy Policy</Text>
          </Text>
        </View>

        {/* Create Account Button */}
        <SecondaryButton
          BtnText="Create Account"
          disabled={isButtonDisabled}
          onPress={handleCreateAccount}
        />
        {/* OR Separator */}
        <View className=" flex flex-row items-center">
          <View className="h-[1px] flex-1 bg-neutral-50" />
          <Text className="mx-4 text-Caption text-text">OR</Text>
          <View className="h-[1px] flex-1 bg-neutral-50" />
        </View>
        {/* Social Buttons */}
        <IconButton
          icon={require("@/assets/images/google-icon.png")}
          BtnText="Continue with Google"
          textColor="text-secondary"
          borderColor="border-secondary"
          bgColor="bg-neutral-10"
        />
        <IconButton
          icon={require("@/assets/images/facebook-icon.png")}
          BtnText="Continue with Facebook"
          textColor="text-secondary"
          borderColor="border-secondary"
          bgColor="bg-neutral-10"
        />

        {/* Text */}
        <View className="flex-row items-center justify-center">
          <Text className="text-BodyRegular text-text">
            Already have an account?{" "}
          </Text>
          <Pressable onPress={() => router.push("/Login")}>
            <Text className="text-secondary text-BodyRegular">Login</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default BuyerRegister;
