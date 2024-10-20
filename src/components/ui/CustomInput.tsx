import { Colors, Fonts } from "@utils/Constants";
import React, { FC } from "react";
import { StyleSheet, TouchableOpacity, View, TextInput, Platform } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import Icon from "react-native-vector-icons/Ionicons";

interface InputProps {
  left: React.ReactNode;
  onClear?: () => void;
  right?: boolean;
  inputMode?: 'numeric' | 'text' | 'tel' | 'email' | 'url';
}

const CustomInput: FC<InputProps & React.ComponentProps<typeof TextInput>> = ({
  onClear,
  left,
  right = true,
  inputMode,
  ...props
}) => {
  const keyboardType = Platform.select({
    ios: inputMode === 'numeric' ? 'number-pad' : props.keyboardType,
    android: props.keyboardType,
  });

  return (
    <View style={styles.flexRow}>
      <View style={styles.leftContainer}>{left}</View>
      <TextInput
        {...props}
        style={styles.inputContainer}
        placeholderTextColor="#ccc"
        keyboardType={keyboardType}
      />
      <View style={styles.icon}>
        {props.value?.length !== 0 && right && (
          <TouchableOpacity onPress={onClear}>
            <Icon name="close-circle-sharp" size={RFValue(16)} color="#ccc" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 0.5,
    width: "100%",
    marginVertical: 10,
    backgroundColor: "#fff",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.6,
    shadowRadius: 2,
    shadowColor: Colors.border,
    borderColor: Colors.border,
  },
  leftContainer: {
    paddingLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: '15%',
  },
  inputContainer: {
    flex: 1,
    fontFamily: Fonts.SemiBold,
    fontSize: RFValue(12),
    paddingVertical: 14,
    paddingHorizontal: 5,
    color: Colors.text,
  },
  icon: {
    width: "15%",
    justifyContent: "center",
    alignItems: "center",
  },
});