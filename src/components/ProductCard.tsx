import { Product } from "@/interface/product";
import React, { useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
} from "react-native";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import ImageIcon from "./icons/ImageIcon";
import Colors from "@/constants/Colors";
import { AntDesign } from "@expo/vector-icons";

interface ProductCardProps {
  product: Product;
  onEdit: () => void;
  onDelete: () => void;
}

const ACTION_WIDTH = 160;

export default function ProductCard({
  product,
  onEdit,
  onDelete,
}: ProductCardProps) {
  const translateX = useRef(new Animated.Value(0)).current;
  const gestureRef = useRef(null);

  const onGestureEvent = Animated.event(
    [{ nativeEvent: { translationX: translateX } }],
    { useNativeDriver: true }
  );

  const onHandlerStateChange = (event: any) => {
    if (event.nativeEvent.state === State.END) {
      const { translationX, velocityX } = event.nativeEvent;
      const threshold = -ACTION_WIDTH / 2;

      let toValue = 0;
      if (translationX < threshold || velocityX < -500) {
        toValue = -ACTION_WIDTH;
      }

      Animated.spring(translateX, {
        toValue,
        useNativeDriver: true,
        damping: 20,
        stiffness: 300,
      }).start();
    }
  };

  const handleEdit = () => {
    // Close the swipe first
    Animated.spring(translateX, {
      toValue: 0,
      useNativeDriver: true,
      damping: 20,
      stiffness: 300,
    }).start();
    onEdit();
  };

  const handleDelete = () => {
    // Close the swipe first
    Animated.spring(translateX, {
      toValue: 0,
      useNativeDriver: true,
      damping: 20,
      stiffness: 300,
    }).start();
    onDelete();
  };

  return (
    <View style={styles.container}>
      {/* Hidden Action Buttons */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
          <AntDesign name="edit" size={24} color="#FFF" />
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <AntDesign name="delete" size={24} color="#FFF" />
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>

      {/* Main Card Content */}
      <PanGestureHandler
        ref={gestureRef}
        onGestureEvent={onGestureEvent}
        onHandlerStateChange={onHandlerStateChange}
        activeOffsetX={[-10, 10]}
      >
        <Animated.View
          style={[
            styles.card,
            {
              transform: [{ translateX }],
            },
          ]}
        >
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
                  <Text style={styles.infoValue}>
                    ${product.price.toFixed(2)}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
    overflow: "hidden",
    borderRadius: 12,
  },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 12,
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
  actionsContainer: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    width: ACTION_WIDTH,
    flexDirection: "row",
  },
  editButton: {
    flex: 1,
    backgroundColor: "#FF9E55",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  editButtonText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#FFF",
  },
  deleteButton: {
    flex: 1,
    backgroundColor: "#FF3B30",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  deleteButtonText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#FFF",
  },
});
