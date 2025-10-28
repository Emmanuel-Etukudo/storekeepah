import { Product } from "@/interface/product";
import * as SQLite from "expo-sqlite";

// Open database connection
const db = SQLite.openDatabaseSync("storekeeper.db");

/**
 * Initialize the database and create the products table if it doesn't exist
 */
export const initDatabase = async (): Promise<void> => {
  try {
    // Create the table if it doesn't exist
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        quantity INTEGER NOT NULL,
        price REAL NOT NULL,
        image_uri TEXT,
        description TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Check if description column exists, if not add it (for existing databases)
    try {
      await db.execAsync(`
        ALTER TABLE products ADD COLUMN description TEXT;
      `);
      console.log("Added description column to existing table");
    } catch (alterError) {
      // Column might already exist, which is fine
      console.log("Description column already exists or table is new");
    }

    console.log("Database initialized successfully");
  } catch (error) {
    console.error("Error initializing database:", error);
    throw error;
  }
};

/**
 * Get all products from the database
 */
export const getAllProducts = async (): Promise<Product[]> => {
  try {
    const result = await db.getAllAsync<Product>(
      "SELECT * FROM products ORDER BY created_at DESC"
    );
    return result;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

/**
 * Get a single product by ID
 */
export const getProductById = async (id: number): Promise<Product | null> => {
  try {
    const result = await db.getFirstAsync<Product>(
      "SELECT * FROM products WHERE id = ?",
      [id]
    );
    return result || null;
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    throw error;
  }
};

/**
 * Add a new product to the database
 */
export const addProduct = async (
  name: string,
  quantity: number,
  price: number,
  description: string | null,
  imageUri: string | null
): Promise<number> => {
  try {
    const result = await db.runAsync(
      "INSERT INTO products (name, quantity, price, image_uri, description) VALUES (?, ?, ?, ?, ?)",
      [name, quantity, price, imageUri, description]
    );
    console.log("Product added successfully with ID:", result.lastInsertRowId);
    return result.lastInsertRowId;
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};

/**
 * Update an existing product
 */
export const updateProduct = async (
  id: number,
  name: string,
  quantity: number,
  price: number,
  description: string | null,
  imageUri: string | null
): Promise<void> => {
  try {
    const result = await db.runAsync(
      "UPDATE products SET name = ?, quantity = ?, price = ?, image_uri = ?, description = ? WHERE id = ?",
      [name, quantity, price, imageUri, description, id]
    );
    console.log("Product updated successfully, rows affected:", result.changes);
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

/**
 * Delete a product from the database
 */
export const deleteProduct = async (id: number): Promise<void> => {
  try {
    const result = await db.runAsync("DELETE FROM products WHERE id = ?", [id]);
    console.log("Product deleted successfully, rows affected:", result.changes);
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};

/**
 * Delete all products (useful for testing/reset)
 */
export const deleteAllProducts = async (): Promise<void> => {
  try {
    await db.runAsync("DELETE FROM products");
    console.log("All products deleted successfully");
  } catch (error) {
    console.error("Error deleting all products:", error);
    throw error;
  }
};
