import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

interface AvatarProps {
  size?: number;
  name?: string;
  src?: string;
  verified?: boolean;
}

const getInitials = (name?: string): string => {
  if (!name) return "?";
  const nameParts = name.split(" ");
  const first = nameParts[0]?.charAt(0).toUpperCase() || "";
  const last =
    nameParts.length > 1
      ? nameParts[nameParts.length - 1].charAt(0).toUpperCase()
      : "";
  return first + last;
};

// Generate a random color for initials background
const getRandomColor = () => {
  const colors = ["#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#33FFF2"];
  return colors[Math.floor(Math.random() * colors.length)];
};

const Avatar: React.FC<AvatarProps> = ({
  size = 50,
  name,
  src,
  verified = false,
}) => {
  const initials = getInitials(name);
  const bgColor = getRandomColor();

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      {src ? (
        <Image
          source={{ uri: src }}
          style={[
            styles.image,
            { width: size, height: size, borderRadius: size / 2 },
          ]}
        />
      ) : (
        <View
          style={[
            styles.initialsContainer,
            {
              width: size,
              height: size,
              borderRadius: size / 2,
              backgroundColor: bgColor,
            },
          ]}
        >
          <Text style={[styles.initialsText, { fontSize: size * 0.4 }]}>
            {initials}
          </Text>
        </View>
      )}

      {verified && (
        <View
          style={[
            styles.verifiedBadge,
            {
              width: size * 0.3,
              height: size * 0.3,
              borderRadius: (size * 0.3) / 2,
            },
          ]}
        >
          {/* <Ionicons name="checkmark-circle" size={size * 0.25} color="#1DA1F2" /> */}
          <MaterialIcons name="verified" size={24} color="blue" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    resizeMode: "cover",
  },
  initialsContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  initialsText: {
    color: "white",
    fontWeight: "bold",
  },
  verifiedBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Avatar;