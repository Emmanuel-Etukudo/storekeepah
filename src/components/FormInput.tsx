import React from "react";
import { View, Text, TextInput, StyleSheet, TextInputProps } from "react-native";
import Colors from "@/constants/Colors";

interface FormInputProps extends TextInputProps {
  label: string;
  error?: string;
  required?: boolean;
}

export default function FormInput({
  label,
  error,
  required = false,
  style,
  ...textInputProps
}: FormInputProps) {
  return (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>
        {label}
        {required && " *"}
      </Text>
      <TextInput
        style={[
          styles.input,
          error && styles.inputError,
          style,
        ]}
        placeholderTextColor="#999"
        {...textInputProps}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.light.text,
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: Colors.light.text,
  },
  inputError: {
    borderColor: "#FF3B30",
  },
  errorText: {
    fontSize: 12,
    color: "#FF3B30",
    marginTop: 4,
  },
});