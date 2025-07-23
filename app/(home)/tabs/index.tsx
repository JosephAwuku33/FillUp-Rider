import { WhiteText } from "@/components/ui/Text";
import React from "react";
import { View } from "react-native";

export default function Home() {
  return (
    <View className="flex-1 items-center justify-center bg-primary">
      <WhiteText>Alerts</WhiteText>
    </View>
  );
}
