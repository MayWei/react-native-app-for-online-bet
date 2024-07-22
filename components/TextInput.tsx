import { Body } from "@/components/Fonts/Body";
import { Colors } from "@/constants/Colors";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const ANIMATION_DURATION = 200;
const LABEL_SIZE_ANIMATION_RATIO = 14 / 18;
const LABEL_VERTICAL_OFFSET = 24;

export interface TextInputFieldProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  errorMessage: string;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  type: "username" | "password" | "emailAddress";
}

export default function TextInputImpl(props: TextInputFieldProps) {
  const { value, setValue, errorMessage, type } = props;
  const [isFocused, setIsFocused] = useState(false);
  const [labelWidth, setLabelWidth] = useState(0);
  const labelPosYAnim = useRef(new Animated.Value(0)).current;
  const labelPosXAnim = useRef(new Animated.Value(0)).current;
  const fontSizeAnim = useRef(new Animated.Value(1)).current;
  const [showPassword, setShowPassword] = useState(false);

  const animateLabelPos = (toYValue: number, toXValue: number) => {
    Animated.timing(labelPosYAnim, {
      toValue: toYValue,
      duration: ANIMATION_DURATION,
      useNativeDriver: true,
    }).start();

    Animated.timing(labelPosXAnim, {
      toValue: toXValue,
      duration: ANIMATION_DURATION,
      useNativeDriver: true,
    }).start();
  };

  const animateLabelSize = (toValue: number) => {
    Animated.timing(fontSizeAnim, {
      toValue,
      duration: ANIMATION_DURATION,
      useNativeDriver: true,
    }).start();
  };

  const customOnFocus = () => {
    setIsFocused(true);

    animateLabelPos(
      -LABEL_VERTICAL_OFFSET,
      -(labelWidth - labelWidth * LABEL_SIZE_ANIMATION_RATIO) / 2
    );
    animateLabelSize(LABEL_SIZE_ANIMATION_RATIO);
  };

  const customOnBlur = () => {
    setIsFocused(false);

    if (!value || value == "") {
      console.log("value emptey", value, typeof value, !!value);
      animateLabelPos(0, 0);
      animateLabelSize(1);
    }
  };

  useEffect(() => {
    console.log("value", value);
  }, [value]);

  return (
    <View style={styles.container}>
      <Animated.View
        onLayout={(event) => {
          setLabelWidth(event.nativeEvent.layout.width);
        }}
        style={[
          styles.labelWrapper,
          {
            transform: [
              { translateX: labelPosXAnim },
              { translateY: labelPosYAnim },
            ],
          },
        ]}
      >
        <Animated.Text
          style={[
            styles.label,
            {
              transform: [{ scale: fontSizeAnim }],
            },
          ]}
        >
          Enter your email or user name
        </Animated.Text>
      </Animated.View>

      <View
        style={[
          styles.inputWrapper,
          isFocused && styles.inputWrapperFocus,
          !!errorMessage && styles.inputWrapperError,
        ]}
      >
        <TextInput
          style={styles.input}
          onFocus={customOnFocus}
          onBlur={customOnBlur}
          onChangeText={(value) => setValue(value)}
          value={value}
          textContentType={type}
          secureTextEntry={showPassword}
        />
        {type === "password" && (
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Icon
              name={showPassword ? "visibility" : "visibility-off"}
              size={24}
              color="gray"
            />
          </TouchableOpacity>
        )}
      </View>

      {errorMessage ? (
        <Body.B4
          style={[styles.bottomText, styles.error]}
          testID="text-input-error"
        >
          {errorMessage}
        </Body.B4>
      ) : null}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingTop: 24,
    marginBottom: 24,
  },
  inputWrapper: {
    width: "100%",
    flexDirection: "row",
    borderColor: "#dde1e3",
    borderRadius: 2,
    borderWidth: 1,
    borderBottomWidth: 2,
    borderBottomColor: Colors.tertiaryGrey02,
    alignItems: "center",
  },
  inputWrapperFocus: {
    borderBottomColor: Colors.primary01,
  },
  inputWrapperError: {
    borderBottomColor: Colors.alert01,
  },
  iconContainer: {
    padding: 10,
  },
  input: {
    flex: 1,
    paddingHorizontal: 0,
    backgroundColor: "transparent",
    color: Colors.warmBlack,
    position: "relative",
    fontSize: 18,
    padding: 0,
    paddingBottom: 8,
  },
  bottomText: {
    marginTop: 4,
    color: Colors.secondary01,
  },
  error: {
    color: Colors.alert01,
  },
  labelWrapper: {
    position: "absolute",
    top: LABEL_VERTICAL_OFFSET,
  },
  label: {
    fontSize: 18,
    color: Colors.secondary01,
  },
});
