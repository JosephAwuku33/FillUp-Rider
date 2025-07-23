import LicenseUploadBox from "@/components/auth/LicenseUploadBox";
import VehicleDetailsSection from "@/components/auth/VehicleTypeNum";
import CustomButton from "@/components/ui/CustomButton";
import { ItalicText, Text, WhiteText } from "@/components/ui/Text";
import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";

export default function SignUp() {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [isChecked, setChecked] = useState(false);
  return (
    <SafeAreaView
      style={{ flex: 1, paddingBottom: 20, backgroundColor: "#121417" }}
    >
      <View className="bg-primary flex-1">
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="flex flex-col items-start justify-start w-full gap-6 p-6">
            <View>
              <WhiteText className="text-3xl text-secondary font-bold">
                Hello
              </WhiteText>
              <WhiteText className="text-3xl text-black font-bold">
                there!
              </WhiteText>
            </View>
            <ItalicText className="text-sm leading-6 text-quaternary">
              Create an account to save your favorites, get personalized
              recommendations, and receive instant updates on new listings!
            </ItalicText>

            {/* Inputs */}

            {/* Full Name */}
            <View className="gap-3 w-full">
              <WhiteText className="text-lg">Full Name</WhiteText>
              <TextInput
                style={{
                  borderRadius: 8,
                  borderWidth: 2,
                  color: "black",
                  backgroundColor: "white",
                  padding: 15,
                  borderColor: "#3B4A54",
                }}
                placeholder="Enter your full name"
                keyboardType="default"
                placeholderTextColor="#98A2B3"
              />
            </View>

            {/* Phone Number input */}
            <View className="gap-3 w-full">
              <WhiteText className="text-lg">Phone Number</WhiteText>
              <TextInput
                style={{
                  borderRadius: 8,
                  borderWidth: 2,
                  color: "black",
                  backgroundColor: "white",
                  padding: 15,
                  borderColor: "#3B4A54",
                }}
                placeholder="Enter your phone number"
                keyboardType="number-pad"
                placeholderTextColor="#98A2B3"
              />
            </View>

            {/* Email */}
            <View className="gap-3 w-full">
              <WhiteText className="text-lg">Email</WhiteText>
              <TextInput
                style={{
                  borderRadius: 8,
                  borderWidth: 2,
                  color: "black",
                  backgroundColor: "white",
                  padding: 15,
                  borderColor: "#3B4A54",
                }}
                placeholder="Enter your email"
                keyboardType="email-address"
                placeholderTextColor="#98A2B3"
              />
            </View>

            {/* Password */}
            <View className="gap-2 w-full">
              <WhiteText className="text-lg">Password</WhiteText>
              <View className="relative w-full">
                <TextInput
                  style={{
                    borderRadius: 8,
                    borderWidth: 2,
                    color: "black",
                    backgroundColor: "white",
                    padding: 15,
                    borderColor: "#3B4A54",
                  }}
                  secureTextEntry={!passwordVisible}
                  placeholder="Password"
                  keyboardType="visible-password"
                  placeholderTextColor="#98A2B3"
                />
                <TouchableOpacity
                  onPress={() => setPasswordVisible(!passwordVisible)}
                  className="absolute right-4 top-4"
                >
                  <Feather
                    name={passwordVisible ? "eye-off" : "eye"}
                    size={24}
                    color="black"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Confirm Password */}
            <View className="gap-2 w-full">
              <WhiteText className="text-lg">Confirm Password</WhiteText>
              <View className="relative w-full">
                <TextInput
                  style={{
                    borderRadius: 8,
                    borderWidth: 2,
                    color: "black",
                    backgroundColor: "white",
                    padding: 15,
                    borderColor: "#3B4A54",
                  }}
                  secureTextEntry={!confirmPasswordVisible}
                  placeholder="Confirm Password"
                  keyboardType="visible-password"
                  placeholderTextColor="#98A2B3"
                />
                <TouchableOpacity
                  onPress={() =>
                    setConfirmPasswordVisible(!confirmPasswordVisible)
                  }
                  className="absolute right-4 top-4"
                >
                  <Feather
                    name={passwordVisible ? "eye-off" : "eye"}
                    size={24}
                    color="black"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Vehicle Details, i.e Number and Type */}
            <VehicleDetailsSection />

            {/* Upload License Section */}
            <LicenseUploadBox />

            {/* Terms Checkbox */}
            <View className="flex-row items-center space-x-2 w-full">
              <BouncyCheckbox
                size={24}
                isChecked={isChecked}
                fillColor="#fff"
                iconStyle={{ borderColor: "#fff", borderRadius: 4 }}
                innerIconStyle={{ borderRadius: 4, backgroundColor: "black" }}
                textComponent={
                  <Text className="text-white text-sm flex-wrap pl-3">
                    I agree to{" "}
                    <Text className="text-blue-500 text-sm">
                      Terms of Service
                    </Text>
                     {" "} and {" "}
                    <Text className="text-blue-500 text-sm">
                      Privacy Policy
                    </Text>
                  </Text>
                }
                onPress={(checked: boolean) => setChecked(checked)}
              />
            </View>

            {/* Sign Up button */}
            <View className="mt-2 w-full">
              <CustomButton
                title="Register"
                onPress={() => console.log("Hello")}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
