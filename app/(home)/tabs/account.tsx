import { WhiteText } from "@/components/ui/Text";
import { useAuth } from "@/context/supabase-provider";
import Entypo from "@expo/vector-icons/Entypo";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Account() {
  const { signOut } = useAuth();

  return (
    <SafeAreaView className="flex-1 bg-primary">
      <View className="bg-primary flex-1 mx-4 mt-4">
        <View className="mt-3">
          <WhiteText className="text-3xl font-bold">Account</WhiteText>
        </View>

        <View className="flex-1 mt-6 gap-8">
          <View className="flex flex-row items-center justify-between w-full">
            <WhiteText className="text-base">Personal Information</WhiteText>
            <Entypo name="chevron-right" size={24} color="white" />
          </View>
          <View className="flex flex-row items-center justify-between w-full">
            <WhiteText className="text-base">Vehicle Details</WhiteText>
            <Entypo name="chevron-right" size={24} color="white" />
          </View>
          <View className="flex flex-row items-center justify-between w-full">
            <WhiteText className="text-base">Payment Information</WhiteText>
            <Entypo name="chevron-right" size={24} color="white" />
          </View>
          <View className="flex flex-row  items-center justify-between w-full">
            <WhiteText className="text-base">Notifications</WhiteText>
            <Entypo name="chevron-right" size={24} color="white" />
          </View>
          <View className="flex flex-row items-center justify-between w-full">
            <WhiteText className="text-base">Theme</WhiteText>
            <Entypo name="chevron-right" size={24} color="white" />
          </View>
        </View>

        <View className="mt-3">
          <WhiteText className="text-3xl font-bold">Help and Support</WhiteText>
        </View>

        <View className="flex-1 mt-6 gap-8">
          <View className="flex flex-row items-center justify-between w-full">
            <WhiteText className="text-base">Get Help</WhiteText>
            <Entypo name="chevron-right" size={24} color="white" />
          </View>
          <View className="flex flex-row items-center justify-between w-full">
            <WhiteText className="text-base">Sign Out</WhiteText>
            <TouchableOpacity onPress={signOut}>
              <Entypo name="chevron-right" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
