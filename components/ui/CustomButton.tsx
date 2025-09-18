import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

type CustomButtonProps = {
  title: string;
  color?: string;
} & TouchableOpacityProps;

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  color = "#388FE5",
  style,
  ...rest
}) => (
  <TouchableOpacity
  style={[styles.button, { backgroundColor: color }, style]}
  activeOpacity={0.7}
  {...rest}
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