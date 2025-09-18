import OrderDetails from "@/components/Home/Order";
import MapComponent from "@/components/map/Map";
import { } from "@/components/ui/Text";
import { sampleRequestData } from "@/misc/requestData";
import React from "react";
import { FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  return (
    <SafeAreaView
      style={{ flex: 1 }}
      className="bg-primary"
      edges={["bottom", "left", "right"]}
    >
      <View className="bg-primary flex-1 mx-4">
        <View className="h-1/3 w-full">
          <MapComponent latitude={6.5244} longitude={3.3792} />
        </View>


        {/* Order Details List */}
        <FlatList
          data={sampleRequestData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <OrderDetails order={item} />}
          contentContainerStyle={{ paddingVertical: 16 }}
        />
      </View>
    </SafeAreaView>
  );
}
