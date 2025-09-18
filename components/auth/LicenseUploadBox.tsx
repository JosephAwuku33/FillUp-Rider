import logger from "@/utils/logger/custom-logger";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { Alert, Image, Pressable, Text, View } from "react-native";

export default function LicenseUploadBox() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleUpload = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsMultipleSelection: false, // Can only select one image
      allowsEditing: true, // Allows the user to crop / rotate their photo before uploading it
      quality: 1,
      exif: false, // We don't want nor need that data.
    });

    if (result.canceled || !result.assets || result.assets.length === 0) return;

    const file = result.assets[0];

    if (file.fileSize && file.fileSize > 5 * 1024 * 1024) {
      Alert.alert("File too large", "Maximum size is 5MB.");
      return;
    }

    setSelectedImage(file.uri);

    // TODO: Upload file.uri to Supabase Storage or your backend
    logger.info("RENDER", `Selected image file: ${file}`);
  };

  return (
    <View className="mt-4 w-full">
      <Text className="text-white text-base mb-2">Driver&apos;s License</Text>

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
              Upload your driver&apos;s license
            </Text>
            <Text className="text-gray-400 text-sm">JPG or PNG (max. 5MB)</Text>
          </>
        )}
      </Pressable>
    </View>
  );
}
