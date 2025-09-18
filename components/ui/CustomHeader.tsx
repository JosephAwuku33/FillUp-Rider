import React from "react";
import { TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { WhiteText } from "./Text";

import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";

interface CustomHeaderProps {
  title: string;
}

export default function CustomHeader({ title }: CustomHeaderProps) {
  const insets = useSafeAreaInsets();

  const router = useRouter();

  return (
    <View
      style={{ paddingTop: insets.top }}
      className="w-full bg-primary p-6"
    >
      <View className="flex flex-row items-center justify-between w-3/5">
        <TouchableOpacity onPress={() => router.back()}>
        <AntDesign name="arrow-left" size={24} color="white" />
      </TouchableOpacity>

      <WhiteText className="text-2xl">{title}</WhiteText>
      </View>
    </View>
  );
}
