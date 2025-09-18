import CustomButton from "@/components/ui/CustomButton";
import Loader from "@/components/ui/Loader";
import { ItalicText, Text, WhiteText } from "@/components/ui/Text";
import { useAuth } from "@/context/supabase-provider";
import logger from "@/utils/logger/custom-logger";
import { loginSchema } from "@/utils/validationSchema/authValidationSchema";
import { Feather } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type FormValues = {
  email: string;
  password: string;
};

export default function Login() {
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const { signIn } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (form: FormValues) => {
    const { email, password } = form;

    try {
      const user = await signIn(email, password);
      if (!user) {
        Alert.alert("Error", "Trouble Signing in, check your credentials");
        return;
      }
      router.replace("/(home)/tabs");
    } catch (error: Error | any) {
      logger.error("APP", `There was an error with signup ${error}`);
      Alert.alert("Error", "There was an issue with signup");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#121417" }}>
      {isSubmitting && <Loader />}
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
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <>
                <TextInput
                  style={{
                    borderRadius: 8,
                    borderWidth: 2,
                    color: "black",
                    backgroundColor: "white",
                    padding: 15,
                    borderColor: "#3B4A54",
                  }}
                  value={value}
                  onChangeText={onChange}
                  placeholder="josephamoakoawuku@gmail.com"
                  keyboardType="email-address"
                  placeholderTextColor="#98A2B3"
                />
              </>
            )}
          />
          {errors.email && (
            <Text className="text-red-500 text-sm">{errors.email.message}</Text>
          )}
        </View>

        <View className="gap-2">
          <WhiteText className="text-lg">Password</WhiteText>
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
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
                  value={value}
                  onChangeText={onChange}
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
            )}
          />
          {errors.password && (
            <Text className="text-red-500 text-sm">
              {errors.password.message}
            </Text>
          )}

          {/* Forgot Password */}
          <TouchableOpacity>
            <Text className="text-gray-500">Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        {/* Sign In button */}
        <View className="mt-2 w-full">
          <CustomButton
            title="Log In"
            onPress={handleSubmit(onSubmit)}
            disabled={isSubmitting}
          />
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
