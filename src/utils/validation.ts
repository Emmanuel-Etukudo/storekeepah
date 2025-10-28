/**
 * Validation error type
 */
export interface ValidationErrors {
  name?: string;
  quantity?: string;
  price?: string;
}

/**
 * Validate product name
 * @param name - Product name to validate
 * @returns Error message if invalid, undefined if valid
 */
export const validateProductName = (name: string): string | undefined => {
  if (!name || name.trim().length === 0) {
    return "Product name is required";
  }
  if (name.trim().length < 2) {
    return "Product name must be at least 2 characters";
  }
  if (name.length > 100) {
    return "Product name must be less than 100 characters";
  }
  return undefined;
};

/**
 * Validate quantity
 * @param quantity - Quantity to validate (can be string or number)
 * @returns Error message if invalid, undefined if valid
 */
export const validateQuantity = (
  quantity: string | number
): string | undefined => {
  const numQuantity =
    typeof quantity === "string" ? parseFloat(quantity) : quantity;

  if (quantity === "" || quantity === null || quantity === undefined) {
    return "Quantity is required";
  }

  if (isNaN(numQuantity)) {
    return "Quantity must be a valid number";
  }

  if (!Number.isInteger(numQuantity)) {
    return "Quantity must be a whole number";
  }

  if (numQuantity < 0) {
    return "Quantity cannot be negative";
  }

  if (numQuantity > 1000000) {
    return "Quantity is too large";
  }

  return undefined;
};

/**
 * Validate price
 * @param price - Price to validate (can be string or number)
 * @returns Error message if invalid, undefined if valid
 */
export const validatePrice = (price: string | number): string | undefined => {
  const numPrice = typeof price === "string" ? parseFloat(price) : price;

  if (price === "" || price === null || price === undefined) {
    return "Price is required";
  }

  if (isNaN(numPrice)) {
    return "Price must be a valid number";
  }

  if (numPrice < 0) {
    return "Price cannot be negative";
  }

  if (numPrice > 10000000) {
    return "Price is too large";
  }

  // Check for max 2 decimal places
  const decimalPlaces = (numPrice.toString().split(".")[1] || "").length;
  if (decimalPlaces > 2) {
    return "Price can have at most 2 decimal places";
  }

  return undefined;
};

/**
 * Validate entire product
 * @param name - Product name
 * @param quantity - Product quantity
 * @param price - Product price
 * @returns Object with validation errors, empty object if all valid
 */
export const validateProduct = (
  name: string,
  quantity: string | number,
  price: string | number
): ValidationErrors => {
  const errors: ValidationErrors = {};

  const nameError = validateProductName(name);
  if (nameError) {
    errors.name = nameError;
  }

  const quantityError = validateQuantity(quantity);
  if (quantityError) {
    errors.quantity = quantityError;
  }

  const priceError = validatePrice(price);
  if (priceError) {
    errors.price = priceError;
  }

  return errors;
};

/**
 * Check if there are any validation errors
 * @param errors - Validation errors object
 * @returns true if there are errors, false otherwise
 */
export const hasValidationErrors = (errors: ValidationErrors): boolean => {
  return Object.keys(errors).length > 0;
};
