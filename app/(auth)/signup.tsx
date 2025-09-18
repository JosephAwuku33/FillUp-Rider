import VehicleDetailsSection from "@/components/auth/VehicleTypeNum";
import CustomButton from "@/components/ui/CustomButton";
import Loader from "@/components/ui/Loader";
import { ItalicText, Text, WhiteText } from "@/components/ui/Text";
import UploadBox from "@/components/ui/UploadBox";
import { supabase } from "@/config/supabase";
import { useAuth } from "@/context/supabase-provider";
import logger from "@/utils/logger/custom-logger";
import { Role, VehicleType } from "@/utils/types";
import { signUpSchema } from "@/utils/validationSchema/authValidationSchema";
import { Feather } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
// import * as FileSystem from "expo-file-system";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Alert,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { SafeAreaView } from "react-native-safe-area-context";

type FormValues = {
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  vehicleType?: VehicleType;
  vehicleNumber?: string;
  licenseFile?: any;
};

export default function SignUp() {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] =
    useState<boolean>(false);
  const [isChecked, setChecked] = useState(false);
  const { signUp, signIn } = useAuth();

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: yupResolver(signUpSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    },
  });

  const router = useRouter();

  const onSubmit = async (form: FormValues) => {
    if (!form.licenseFile) {
      Alert.alert("Error", "Please add a picture of your license");
      return;
    }

    try {
      logger.info("APP", "All the form values");
      logger.info("APP", `${JSON.stringify(form)}`);

      // Step 1: Sign up the user first (without license yet)
      const response = await signUp({
        email: form.email,
        password: form.password,
        full_name: form.fullName,
        phone_number: form.phoneNumber,
        role: Role.rider,
        profileData: {
          vehicle_type: form.vehicleType,
          vehicle_number: form.vehicleNumber,
          license_image: null, // placeholder for now
        },
      });

      if (!response?.success) {
        Alert.alert("Error", "Signup failed, please try again");
        logger.error(`APP`, `${JSON.stringify(response)}`);
        return;
      }

      // Step 2: Auto sign in and redirect
      const signInResponse = await signIn(form.email, form.password);
      if (!signInResponse) {
        Alert.alert(
          "Error",
          "Account created but login failed. Please try signing in"
        );
        return;
      }

      const userId = signInResponse.id;

      // Step 3: Upload the license image to Supabase Storage
      const imageFile = form.licenseFile;
      const arraybuffer = await fetch(imageFile.uri).then((res) =>
        res.arrayBuffer()
      );

      const fileExt = imageFile.uri?.split(".").pop()?.toLowerCase();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `private/${userId}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("licenses")
        .upload(filePath, arraybuffer, {
          contentType: "image/*",
          upsert: false,
        });

      if (uploadError) {
        logger.info("APP", "Upload Error");
        logger.info("APP", `${JSON.stringify(uploadError)}`);
        return;
      }

      // Step 4: Update rider profile with the file path (not signed URL)
      const { error: updateError } = await supabase
        .from("riders")
        .update({ license_image: filePath })
        .eq("id", userId)
        .select();

      if (updateError) {
        logger.info("APP", "Update Error");
        logger.info("APP", `${JSON.stringify(updateError)}`);
        return;
      }

      router.replace("/(home)/tabs");
      Alert.alert("APP", "Registration successful");
    } catch (err: any) {
      console.error("Signup error:", err);
      Alert.alert("Signup failed", err.message || "Unknown error");
    }
  };

  return (
    <SafeAreaView
      style={{ flex: 1, paddingBottom: 20, backgroundColor: "#121417" }}
    >
      <View className="bg-primary flex-1">
        {isSubmitting && <Loader />}
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

            {/* Full Name */}
            <Controller
              control={control}
              name="fullName"
              render={({ field: { onChange, value } }) => (
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
                    onChangeText={onChange}
                    value={value}
                  />
                </View>
              )}
            />
            {errors.fullName && (
              <Text className="text-red-500 text-sm">
                {errors.fullName.message}
              </Text>
            )}

            {/* Phone Number */}
            <Controller
              control={control}
              name="phoneNumber"
              render={({ field: { onChange, value } }) => (
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
                    onChangeText={onChange}
                    value={value}
                  />
                </View>
              )}
            />
            {errors.phoneNumber && (
              <Text className="text-red-500 text-sm">
                {errors.phoneNumber.message}
              </Text>
            )}

            {/* Email */}
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
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
                    onChangeText={onChange}
                    value={value}
                  />
                </View>
              )}
            />
            {errors.email && (
              <Text className="text-red-500 text-sm">
                {errors.email.message}
              </Text>
            )}

            {/* Password */}
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value } }) => (
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
                      placeholderTextColor="#98A2B3"
                      onChangeText={onChange}
                      value={value}
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
              )}
            />
            {errors.password && (
              <Text className="text-red-500 text-sm">
                {errors.password.message}
              </Text>
            )}

            {/* Confirm Password */}
            <Controller
              control={control}
              name="confirmPassword"
              render={({ field: { onChange, value } }) => (
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
                      placeholderTextColor="#98A2B3"
                      onChangeText={onChange}
                      value={value}
                    />
                    <TouchableOpacity
                      onPress={() =>
                        setConfirmPasswordVisible(!confirmPasswordVisible)
                      }
                      className="absolute right-4 top-4"
                    >
                      <Feather
                        name={confirmPasswordVisible ? "eye-off" : "eye"}
                        size={24}
                        color="black"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />
            {errors.confirmPassword && (
              <Text className="text-red-500 text-sm">
                {errors.confirmPassword.message}
              </Text>
            )}

            {/* Vehicle Details Section */}
            <VehicleDetailsSection
              vehicleType={getValues("vehicleType")}
              vehicleNumber={getValues("vehicleNumber")}
              onVehicleNumberChange={(num) => setValue("vehicleNumber", num)}
              onVehicleTypeChange={(type) => setValue("vehicleType", type)}
            />
            {errors.vehicleType && (
              <Text className="text-red-500 text-sm">
                {errors.vehicleType.message}
              </Text>
            )}
            {errors.vehicleNumber && (
              <Text className="text-red-500 text-sm">
                {errors.vehicleNumber.message}
              </Text>
            )}

            {/* License Upload */}
            <UploadBox
              label="Driver's License"
              onFileSelected={(file) => setValue("licenseFile", file)}
            />

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
                    </Text>{" "}
                    and{" "}
                    <Text className="text-blue-500 text-sm">
                      Privacy Policy
                    </Text>
                  </Text>
                }
                onPress={(checked: boolean) => setChecked(checked)}
              />
            </View>

            {/* Submit Button */}
            <View className="mt-2 w-full">
              <CustomButton
                title={isSubmitting ? "Registering..." : "Register"}
                onPress={handleSubmit(onSubmit)}
                disabled={isSubmitting || !isChecked}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
