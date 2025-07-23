import React from "react";
import {
  Text as RNText,
  TextProps as RNTextProps,
  StyleSheet,
} from "react-native";

interface TextProps extends RNTextProps {
  children: React.ReactNode;
}

export const Text: React.FC<TextProps> = ({ children, style, ...props }) => {
  return (
    <RNText style={[styles.regularText, style]} {...props}>
      {children}
    </RNText>
  );
};


export const WhiteText: React.FC<TextProps> = ({ children, style, ...props }) => {
  return (
    <RNText style={[styles.regularWhiteText, style]} {...props}>
      {children}
    </RNText>
  );
};

export const BlackText: React.FC<TextProps> = ({ children, style, ...props }) => {
  return (
    <RNText style={[styles.regularBlackText, style]} {...props}>
      {children}
    </RNText>
  );
};

export const BoldenText: React.FC<TextProps> = ({
  children,
  style,
  ...props
}) => {
  return (
    <RNText style={[styles.boldenText, style]} {...props}>
      {children}
    </RNText>
  );
};

export const ItalicText: React.FC<TextProps> = ({
  children,
  style,
  ...props
}) => {
  return (
    <RNText style={[styles.italicWhiteText, style]} {...props}>
      {children}
    </RNText>
  );
};

export const MograText: React.FC<TextProps> = ({
  children,
  style,
  ...props
}) => {
  return <RNText style={[styles.mograText, style]}>{children}</RNText>;
};

export const TitleText: React.FC<TextProps> = ({
  children,
  style,
  ...props
}) => {
  return <RNText style={[styles.titleText, style]}>{children}</RNText>;
};

const styles = StyleSheet.create({
  regularText: {
    fontFamily: "Lato",
  },
  regularWhiteText: {
    fontFamily: "Lato",
    color: "white"
  },
  regularBlackText: {
    fontFamily: "Lato",
    color: "black"
  },
  boldenText: {
    fontFamily: "Lato-Bold",
  },
  italicWhiteText: {
    fontFamily: "Lato-Italic",
    color: "white"
  },
  mograText: {
    fontFamily: "Mogra",
  },
  titleText: {
    fontFamily: "Mogra",
    fontWeight: 400,
    fontSize: 32,
    color: "white"
  },
});
