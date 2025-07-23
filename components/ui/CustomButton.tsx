import React from "react";
import {
    GestureResponderEvent,
    StyleSheet,
    Text,
    TouchableOpacity,
} from "react-native";

type CustomButtonProps = {
  title: string;
  color?: string;
  onPress: (event: GestureResponderEvent) => void;
};

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  color = "#388FE5",
  onPress,
}) => (
  <TouchableOpacity
    style={[styles.button, { backgroundColor: color }]}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <Text style={styles.text}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  text: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    fontFamily: "Lato"
  },
});

export default CustomButton;
