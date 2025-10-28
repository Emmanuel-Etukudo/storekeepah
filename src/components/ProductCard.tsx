import { Product } from "@/interface/product";
import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import ImageIcon from "./icons/ImageIcon";
import Colors from "@/constants/Colors";

interface ProductCardProps {
  product: Product;
  onEdit: () => void;
  onDelete: () => void;
}

export default function ProductCard({
  product,
  onEdit,
  onDelete,
}: ProductCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        {/* Product Image */}
        <View style={styles.imageContainer}>
          {product.image_uri ? (
            <Image
              source={{ uri: product.image_uri }}
              style={styles.image}
              resizeMode="cover"
            />
          ) : (
            <View style={styles.placeholderImage}>
              <ImageIcon />
            </View>
          )}
        </View>

        {/* Product Details */}
        <View style={styles.details}>
          <Text style={styles.name} numberOfLines={2}>
            {product.name}
          </Text>
          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Qty:</Text>
              <Text style={styles.infoValue}>{product.quantity}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Price:</Text>
              <Text style={styles.infoValue}>${product.price.toFixed(2)}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.editButton} onPress={onEdit}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    marginBottom: 12,
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cardContent: {
    flexDirection: "row",
    padding: 12,
  },
  imageContainer: {
    width: 80,
    height: 80,
    marginRight: 12,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  placeholderImage: {
    width: "100%",
    height: "100%",
    backgroundColor: Colors.light.background,
    borderRadius: 8,
    borderColor: "#F6F6F6",
    borderWidth: 1,

    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    fontSize: 11,
    color: "#999",
    textAlign: "center",
  },
  details: {
    flex: 1,
    justifyContent: "space-between",
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: "row",
    gap: 16,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoLabel: {
    fontSize: 14,
    color: "#666",
    marginRight: 4,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  actions: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
  },
  editButton: {
    flex: 1,
    padding: 12,
    alignItems: "center",
    borderRightWidth: 1,
    borderRightColor: "#E0E0E0",
  },
  editButtonText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#007AFF",
  },
  deleteButton: {
    flex: 1,
    padding: 12,
    alignItems: "center",
  },
  deleteButtonText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#FF3B30",
  },
});
