import CustomButton from "@/components/ui/CustomButton";
import { ItalicText, Text, WhiteText } from "@/components/ui/Text";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { SafeAreaView, TextInput, TouchableOpacity, View } from "react-native";

export default function Login() {
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#121417" }}>
      <View className="mt-4 gap-6 p-6">
        <View className="gap-1">
          <WhiteText className="text-3xl font-extrabold">Welcome</WhiteText>
          <WhiteText className="text-2xl font-extrabold">back!</WhiteText>
        </View>
        <ItalicText className="text-base leading-6">
          Sign in to check out user gas cylinder requests, offer deliveries, and
          receive instant updates on requesters and gas services
        </ItalicText>
      </View>

      <View className="w-full gap-6 p-6">
        <View className="gap-2">
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
            placeholder="josephamoakoawuku@gmail.com"
            keyboardType="email-address"
            placeholderTextColor="#98A2B3"
          />
        </View>

        <View className="gap-2">
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

          {/* Forgot Password */}
          <TouchableOpacity>
            <Text className="text-gray-500">Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        {/* Sign In button */}
        <View className="mt-2 w-full">
          <CustomButton title="Log In" onPress={() => console.log("Hello")} />
        </View>

        <View className="flex flex-row items-end justify-end gap-1 w-full ">
          <WhiteText>New user?</WhiteText>
          <TouchableOpacity onPress={() => router.push("/(auth)/signup")}>
            <Text className="text-gray-500">Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
