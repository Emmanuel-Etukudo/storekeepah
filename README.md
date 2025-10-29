# Storekeeper App

A React Native inventory management app built with Expo that helps users manage their product inventory locally.

## Features

- ✅ **CRUD Operations**: Create, Read, Update, and Delete products
- ✅ **Local Database**: SQLite database for offline data persistence
- ✅ **Image Support**: Capture or upload product images using camera or gallery
- ✅ **Input Validation**: Required fields and data type validation
- ✅ **Clean UI**: Simple and user-friendly interface

## Try Demo

- Screen Record - https://drive.google.com/file/d/1zUlgg9J0Uu4zubDl7wLD--6Ftwc4_dOg/view?usp=sharing
- Expo build - https://expo.dev/accounts/etukz/projects/storekeepah/builds/c5c73248-c03b-4932-9bfb-d566806acb43
- Appetize - https://appetize.io/app/b_izcuvmyg4crnbywqsajdu7xycq

## Tech Stack

- **Framework**: Expo React Native
- **Navigation**: expo-router (file-based routing)
- **Database**: expo-sqlites
- **Image Handling**: expo-image-picker
- **Language**: TypeScript

## Database Schema

The app uses a SQLite database with the following schema:

```sql
CREATE TABLE products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  price REAL NOT NULL,
  image_uri TEXT,
  description TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## Usage

### Adding a Product

1. Tap the blue "+" button at the bottom right
2. Fill in product name, quantity, and price
3. Optionally fill description
4. Optionally tap the image area to add a photo (camera or gallery)
5. Tap "Add Product" to save

### Editing a Product

1. Swipe left to reveal the "Edit" button on any product card
2. Modify the fields as needed
3. Tap "Update Product" to save changes

### Deleting a Product

1. Swipe left to reveal the "Delete" button on any product card
2. Confirm deletion in the alert dialog

## License

This project is created as a bootcamp/internship task.

## Author

Etukudo Emmanuel. Mobile App Developer (Flutter & React Native)
