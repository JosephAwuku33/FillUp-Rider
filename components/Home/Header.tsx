import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import React from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { WhiteText } from "../ui/Text";
import Avatar from "./CustomAvatar";

export default function Header() {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{ paddingTop: insets.top }}
      className="flex flex-row items-center justify-between w-full gap-4 bg-primary p-4"
    >
      <View className="flex-1">
        <Avatar
          
          src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
      </View>

      <View className="flex flex-row items-center justify-evenly w-1/2">
        <View className="flex flex-row w-1/2 items-center">
          <Entypo name="dot-single" size={24} color="green" />
          <WhiteText className="font-bold">Online</WhiteText>
        </View>

        <FontAwesome name="bell" size={24} color="white" />
      </View>
    </View>
  );
}
