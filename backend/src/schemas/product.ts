import mongoose, { Schema } from 'mongoose';

enum Categories {
  ELECTRONICS = 'Electronics',
  CLOTHING = 'Clothing',
  GROCERIES = 'Groceries',
  BEAUTY = 'Beauty',
  BOOKS = 'Books',
  HOME_APPLIANCES = 'Home Appliances',
  SPORTS_OUTDOORS = 'Sports & Outdoors',
  TOYS_GAMES = 'Toys & Games',
  FURNITURE = 'Furniture',
  JEWELRY = 'Jewelry',
  AUTOMOTIVE = 'Automotive',
  HEALTH_WELLNESS = 'Health & Wellness',
  OTHER = 'Other',
}

enum PriceUnits {
  PIECE = 'Piece',
  KILOGRAM = 'Kilogram',
  LITER = 'Liter',
  OTHER = 'Other',
}

enum FoodAllergens {
  GLUTEN = 'Gluten',
  PEANUTS = 'Peanuts',
  TREE_NUTS = 'Tree Nuts',
  DAIRY = 'Dairy',
  EGGS = 'Eggs',
  SOY = 'Soy',
  FISH = 'Fish',
  SHELLFISH = 'Shellfish',
  MUSTARD = 'Mustard',
  SESAME = 'Sesame',
  SULFITES = 'Sulfites',
  LUPIN = 'Lupin',
  MOLLUSKS = 'Mollusks',
  OTHER = 'Other',
}


const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, enum: ['Electronics', 'Clothing', 'Groceries', 'Beauty', 'Books', 'Home Appliances', 'Sports & Outdoors', 'Toys & Games', 'Furniture', 'Jewelry', 'Automotive', 'Health & Wellness', 'Other'], required: true },
  identifier: { type: String, required: true, unique: true },
  allergens: { type: [String], enum: ['Gluten', 'Peanuts', 'Tree Nuts', 'Dairy', 'Eggs', 'Soy', 'Fish', 'Shellfish', 'Mustard', 'Sesame', 'Sulfites', 'Lupin', 'Mollusks', 'Other'], default: null },
  images: { link: String, default: '' },
});

export const Product = mongoose.model('Product', ProductSchema);

