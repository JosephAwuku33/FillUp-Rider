import { VehicleType } from "@/utils/types";
import React from "react";
import { TextInput, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { WhiteText } from "../ui/Text";

export const vehicleTypes = [
  { label: "Motorcycle", value: "MOTORCYCLE" },
  { label: "Truck", value: "TRUCK" },
  { label: "Van", value: "VAN" },
];

type VehicleDetailsSectionProps = {
  vehicleType: VehicleType | undefined;
  vehicleNumber: string | undefined;
  onVehicleTypeChange: (type: VehicleType) => void;
  onVehicleNumberChange: (num: string) => void;
};

export default function VehicleDetailsSection({
  vehicleType,
  vehicleNumber,
  onVehicleTypeChange,
  onVehicleNumberChange,
}: VehicleDetailsSectionProps) {
  return (
    <View className="gap-3 w-full">
      <WhiteText className="text-lg">Vehicle Details</WhiteText>

      {/* Labels */}
      <View className="flex-row items-center justify-evenly w-full">
        <WhiteText className="text-sm">Vehicle Type</WhiteText>
        <WhiteText className="text-sm">Vehicle Number</WhiteText>
      </View>

      <View className="flex flex-row gap-2 items-center justify-evenly w-full">
        {/* Vehicle Type Dropdown */}
        <Dropdown
          style={{
            borderRadius: 8,
            borderWidth: 2,
            backgroundColor: "white",
            padding: 15,
            borderColor: "#3B4A54",
            width: "50%",
          }}
          data={vehicleTypes}
          labelField="label"
          valueField="value"
          placeholder="Select type"
          value={vehicleType}
          onChange={(item) => onVehicleTypeChange(item.value)}
          placeholderStyle={{ color: "#98A2B3" }}
          selectedTextStyle={{ color: "black" }}
        />

        {/* Vehicle Number */}
        <TextInput
          style={{
            borderRadius: 8,
            borderWidth: 2,
            color: "black",
            backgroundColor: "white",
            padding: 15,
            borderColor: "#3B4A54",
            width: "50%",
          }}
          value={vehicleNumber}
          onChangeText={onVehicleNumberChange}
          placeholder="GG-123-246"
          keyboardType="default"
          placeholderTextColor="#98A2B3"
        />
      </View>
    </View>
  );
}
