import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import {
  validateProduct,
  hasValidationErrors,
  ValidationErrors,
} from "@/utils/validation";
import { AntDesign } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import ImagePickerButton from "@/components/ImagePickerButton";
import FormInput from "@/components/FormInput";
import { getProductById, updateProduct, addProduct } from "@/database/db";

export default function ProductFormScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const productId = params.id ? parseInt(params.id as string) : null;
  const isEditMode = productId !== null;

  // Form state
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState<string | null>(null);
  const [imageUri, setImageUri] = useState<string | null>(null);

  // UI state
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(isEditMode);

  // Load product data if in edit mode
  useEffect(() => {
    if (isEditMode && productId) {
      loadProduct(productId);
    }
  }, [productId]);

  const loadProduct = async (id: number) => {
    try {
      setInitialLoading(true);
      const product = await getProductById(id);
      if (product) {
        setName(product.name);
        setQuantity(product.quantity.toString());
        setPrice(product.price.toString());
        setDescription(product.description);
        setImageUri(product.image_uri);
      } else {
        Alert.alert("Error", "Product not found");
        router.back();
      }
    } catch (error) {
      console.error("Error loading product:", error);
      Alert.alert("Error", "Failed to load product");
      router.back();
    } finally {
      setInitialLoading(false);
    }
  };

  const handleSave = async () => {
    // Validate inputs
    const validationErrors = validateProduct(name, quantity, price);
    setErrors(validationErrors);

    if (hasValidationErrors(validationErrors)) {
      Alert.alert("Validation Error", "Please fix the errors before saving");
      return;
    }

    try {
      setLoading(true);

      const quantityNum = parseInt(quantity);
      const priceNum = parseFloat(price);

      if (isEditMode && productId) {
        // Update existing product
        await updateProduct(
          productId,
          name.trim(),
          quantityNum,
          priceNum,
          description ? description.trim() : null,
          imageUri
        );
        Alert.alert("Success", "Product updated successfully");
      } else {
        // Add new product
        await addProduct(
          name.trim(),
          quantityNum,
          priceNum,
          description ? description.trim() : null,
          imageUri
        );
        Alert.alert("Success", "Product added successfully");
      }

      router.back();
    } catch (error) {
      console.error("Error saving product:", error);
      Alert.alert("Error", "Failed to save product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  if (initialLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.light.tint} />
        <Text style={styles.loadingText}>Loading product...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.header}>
        <View style={styles.placeholder} />
        <Text style={styles.headerTitle}>
          {isEditMode ? "Edit Product" : "Add Product"}
        </Text>
        <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
          <AntDesign name="close" size={24} color={Colors.light.text} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.formContainer}
        keyboardShouldPersistTaps="handled"
      >
        {/* Product Name */}
        <FormInput
          label="Product Name"
          value={name}
          onChangeText={(text) => {
            setName(text);
            if (errors.name) {
              setErrors({ ...errors, name: undefined });
            }
          }}
          placeholder="Enter product name"
          error={errors.name}
          required
        />

        {/* Quantity */}
        <FormInput
          label="Quantity"
          value={quantity}
          onChangeText={(text) => {
            setQuantity(text);
            if (errors.quantity) {
              setErrors({ ...errors, quantity: undefined });
            }
          }}
          placeholder="Enter quantity"
          keyboardType="numeric"
          error={errors.quantity}
          required
        />

        {/* Price */}
        <FormInput
          label="Price"
          value={price}
          onChangeText={(text) => {
            setPrice(text);
            if (errors.price) {
              setErrors({ ...errors, price: undefined });
            }
          }}
          placeholder="Enter price"
          keyboardType="decimal-pad"
          error={errors.price}
          required
        />

        <FormInput
          label="Description"
          value={description ?? ""}
          onChangeText={(text) => {
            setDescription(text);
          }}
          placeholder="Enter short description"
          keyboardType="default"
        />

        {/* Image Picker */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Product Image</Text>
          <ImagePickerButton
            imageUri={imageUri}
            onImageSelected={setImageUri}
          />
        </View>

        {/* Save Button */}
        <TouchableOpacity
          style={[styles.saveButton, loading && styles.saveButtonDisabled]}
          onPress={handleSave}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.saveButtonText}>
              {isEditMode ? "Update Product" : "Add Product"}
            </Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 32,
    backgroundColor: Colors.light.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.light.background,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: "#666",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  cancelButton: {
    padding: 8,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.light.text,
  },
  placeholder: {
    width: 60,
  },
  scrollView: {
    flex: 1,
  },
  formContainer: {
    padding: 16,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.light.text,
    marginBottom: 8,
  },
  saveButton: {
    backgroundColor: Colors.light.tint,
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginTop: 8,
    marginBottom: 32,
  },
  saveButtonDisabled: {
    opacity: 0.6,
  },
  saveButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
