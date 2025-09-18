import { RequestData } from "@/misc/requestData";
import Entypo from "@expo/vector-icons/Entypo";
import Fontisto from "@expo/vector-icons/Fontisto";
import React from "react";
import { View } from "react-native";
import { BlackText, Text } from "../ui/Text";

interface OrderDetailsProps {
  order: RequestData;
}

export default function OrderDetails({ order }: OrderDetailsProps) {
  return (
    <View className="flex flex-col gap-3 w-full bg-white border border-gray-500 rounded-lg p-4 mt-2">
      <View className="flex-1 flex-row items-center justify-between">
        <BlackText className="text-base font-bold">
          {order.requesterName}
        </BlackText>
        <Text className="text-base font-bold text-blue-500">
          GHS {order.amountToPay}
        </Text>
      </View>

      <View className="flex flex-row items-center gap-2">
        <Entypo name="location-pin" size={24} color="gray" />
        <BlackText className="text-sm text-gray-500">
          {order.distanceAway} km away
        </BlackText>
      </View>

      <View className="border border-gray-300 my-1 w-full" />

      <View className="flex-1 flex-row items-center justify-between ">
        <View className="flex flex-row items-center gap-2">
          <Fontisto name="spinner-refresh" size={24} color="black" />
          <BlackText className="text-sm text-gray-500">
            {order.cylinderDetails.quantity}
          </BlackText>
          <BlackText className="text-sm text-gray-500">x</BlackText>
          <BlackText className="text-sm text-gray-500">
            Standard Cylinders
          </BlackText>
        </View>

        <BlackText className="text-sm text-gray-500">
          {order.timeElapsed} ago
        </BlackText>
      </View>
    </View>
  );
}
