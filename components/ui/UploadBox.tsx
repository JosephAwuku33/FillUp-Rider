import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { Alert, Image, Pressable, Text, View } from "react-native";

type UploadBoxProps = {
  label: string; // e.g. "Driver's License", "Profile Picture"
  placeholderText?: string; // optional override for "Upload your ..."
  maxSizeMB?: number; // default 5MB
  aspect?: [number, number]; // optional crop aspect ratio
  onFileSelected?: (file: {
    uri: string;
    name?: string;
    type?: string;
  }) => void; // callback
};

export default function UploadBox({
  label,
  placeholderText,
  maxSizeMB = 5,
  aspect,
  onFileSelected,
}: UploadBoxProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleUpload = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsMultipleSelection: false,
      allowsEditing: true,
      quality: 1,
      exif: false,
      aspect, // apply if passed
      base64: true,
    });

    if (result.canceled || !result.assets?.length) return;

    const file = result.assets[0];

    if (file.fileSize && file.fileSize > maxSizeMB * 1024 * 1024) {
      Alert.alert("File too large", `Maximum size is ${maxSizeMB}MB.`);
      return;
    }

    setSelectedImage(file.uri);

    onFileSelected?.({
      uri: file.uri,
      name: file.fileName ?? "upload.jpg",
      type: file.type ?? "image/*",
    });
  };

  return (
    <View className="mt-4 w-full">
      <Text className="text-white text-base mb-2">{label}</Text>

      <Pressable
        onPress={handleUpload}
        className="bg-white border border-dashed border-gray-400 rounded-xl px-4 py-6 items-center justify-center min-h-[160px]"
      >
        {selectedImage ? (
          <Image
            source={{ uri: selectedImage }}
            className="w-36 h-36 rounded-md"
            resizeMode="cover"
          />
        ) : (
          <>
            <Feather name="upload-cloud" size={28} color="#6b7280" />
            <Text className="text-gray-800 mt-2">
              {placeholderText ?? `Upload your ${label.toLowerCase()}`}
            </Text>
            <Text className="text-gray-400 text-sm">
              JPG or PNG (max. {maxSizeMB}MB)
            </Text>
          </>
        )}
      </Pressable>
    </View>
  );
}
