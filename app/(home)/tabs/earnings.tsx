import Avatar from "@/components/Home/CustomAvatar";
import CustomButton from "@/components/ui/CustomButton";
import { Text, WhiteText } from "@/components/ui/Text";
import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Earnings() {
  return (
    <SafeAreaView className="flex-1 bg-primary">
      <View className="bg-primary flex-1 mx-4 mt-4">
        <View className="flex flex-row items-center justify-around w-full">
          <Avatar
            size={150}
            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            verified
          />
          <View className="flex flex-col items-start gap-2">
            <WhiteText className="text-xl font-bold">Romeo Sarkcess</WhiteText>
            <Text className="font-light text-sm text-gray-400">
              Driver ID: 123453T6
            </Text>
            <Text className="font-light text-sm text-gray-400">
              Rating: 4.5
            </Text>
          </View>
        </View>

        <View className="w-full mt-4">
          <CustomButton title="Edit Profile" color="#293038" />
        </View>

        <View className="mt-8">
          <WhiteText className="text-3xl font-bold">Performance</WhiteText>
        </View>
        <View className="flex flex-row items-center justify-between w-full gap-2 mt-4">
          <View className="bg-[#293038] w-1/2 rounded-lg flex flex-col items-start p-6 gap-2">
            <WhiteText className="text-base font-semibold">
              Completed Trips
            </WhiteText>
            <WhiteText className="text-xl font-bold">5000</WhiteText>
          </View>

          <View className="bg-[#293038] w-1/2 rounded-lg flex flex-col items-start p-6 gap-2">
            <WhiteText className="text-base font-semibold">
              Average Rating
            </WhiteText>
            <WhiteText className="text-xl font-bold">4.5</WhiteText>
          </View>
        </View>

        {/* Earnings Overview */}
        <View className="mt-4">
          <WhiteText className="text-2xl font-bold">
            Earnings Overview
          </WhiteText>
          <View className="mt-4 gap-6">
            <View className="flex flex-row items-center justify-between w-full ">
              <WhiteText className="text-base font-semibold">Today</WhiteText>
              <WhiteText className="text-xl font-bold">GHS 150.00</WhiteText>
            </View>
            <View className="flex flex-row items-center justify-between w-full ">
              <WhiteText className="text-base font-semibold">This Week</WhiteText>
              <WhiteText className="text-xl font-bold">GHS 1,050.00</WhiteText>
            </View>
            <View className="flex flex-row items-center justify-between w-full ">
              <WhiteText className="text-base font-semibold">This Month</WhiteText>
              <WhiteText className="text-xl font-bold">GHS 4,500.00</WhiteText>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
