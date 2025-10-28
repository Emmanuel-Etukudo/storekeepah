import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import ImageIcon from "./icons/ImageIcon";
import Colors from "@/constants/Colors";

interface ImagePickerButtonProps {
  imageUri: string | null;
  onImageSelected: (uri: string | null) => void;
}

export default function ImagePickerButton({
  imageUri,
  onImageSelected,
}: ImagePickerButtonProps) {
  // Request permissions and pick image
  const pickImage = async () => {
    try {
      // Request permissions
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Permission Required",
          "Please grant photo library permissions to select images"
        );
        return;
      }

      // Launch image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        onImageSelected(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error picking image:", error);
      Alert.alert("Error", "Failed to pick image. Please try again.");
    }
  };

  // Request camera permissions and take photo
  const takePhoto = async () => {
    try {
      // Request permissions
      const { status } = await ImagePicker.requestCameraPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Permission Required",
          "Please grant camera permissions to take photos"
        );
        return;
      }

      // Launch camera
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        onImageSelected(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error taking photo:", error);
      Alert.alert("Error", "Failed to take photo. Please try again.");
    }
  };

  // Show options to pick from gallery or take photo
  const showImageOptions = () => {
    Alert.alert(
      "Product Image",
      "Choose an option",
      [
        {
          text: "Take Photo",
          onPress: takePhoto,
        },
        {
          text: "Choose from Gallery",
          onPress: pickImage,
        },
        {
          text: "Remove Image",
          onPress: () => onImageSelected(null),
          style: "destructive",
        },
        {
          text: "Close",
          style: "cancel",
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.imageButton}
        onPress={imageUri ? showImageOptions : pickImage}
        activeOpacity={0.7}
      >
        {imageUri ? (
          <Image
            source={{ uri: imageUri }}
            style={styles.image}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.placeholder}>
            <ImageIcon />
            <Text style={styles.placeholderText}>Tap to add image</Text>
          </View>
        )}
      </TouchableOpacity>

      {imageUri && (
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.changeButton}
            onPress={showImageOptions}
          >
            <Text style={styles.changeButtonText}>Change Image</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // alignItems: "center",
  },
  imageButton: {
    height: 200,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: Colors.light.background,
    borderWidth: 1,
    borderColor: "#DDD",
    borderStyle: "dashed",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  placeholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  placeholderIcon: {
    fontSize: 48,
    marginBottom: 8,
  },
  placeholderText: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
  },
  actionButtons: {
    marginTop: 12,
  },
  changeButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  changeButtonText: {
    fontSize: 14,
    color: Colors.light.tint,
    fontWeight: "600",
  },
});
