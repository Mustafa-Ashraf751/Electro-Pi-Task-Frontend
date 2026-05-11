import burger from "@/assets/food-burger.jpg";
import pizza from "@/assets/food-pizza.jpg";
import sushi from "@/assets/food-sushi.jpg";
import dessert from "@/assets/food-dessert.jpg";
import chicken from "@/assets/food-chicken.jpg";
import drinks from "@/assets/food-drinks.jpg";

export type Meal = {
  id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  image: string;
  category: string;
  restaurantId: string;
};

export type Restaurant = {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: number;
  image: string;
};

export const categories = [
  { id: "pizza", name: "Pizza", emoji: "🍕", image: pizza },
  { id: "burgers", name: "Burgers", emoji: "🍔", image: burger },
  { id: "sushi", name: "Sushi", emoji: "🍣", image: sushi },
  { id: "chicken", name: "Chicken", emoji: "🍗", image: chicken },
  { id: "desserts", name: "Desserts", emoji: "🍰", image: dessert },
  { id: "drinks", name: "Drinks", emoji: "🥤", image: drinks },
];

export const restaurants: Restaurant[] = [
  { id: "r1", name: "Bella Napoli", cuisine: "Italian · Pizza", rating: 4.8, deliveryTime: "20-30 min", deliveryFee: 1.99, image: pizza },
  { id: "r2", name: "Burger House", cuisine: "American · Burgers", rating: 4.6, deliveryTime: "15-25 min", deliveryFee: 0.99, image: burger },
  { id: "r3", name: "Sakura Sushi", cuisine: "Japanese · Sushi", rating: 4.9, deliveryTime: "25-40 min", deliveryFee: 2.99, image: sushi },
  { id: "r4", name: "Crispy Wings", cuisine: "Fast Food · Chicken", rating: 4.5, deliveryTime: "20-30 min", deliveryFee: 1.49, image: chicken },
  { id: "r5", name: "Sweet Spot", cuisine: "Bakery · Desserts", rating: 4.7, deliveryTime: "15-25 min", deliveryFee: 1.99, image: dessert },
  { id: "r6", name: "Juice Bar", cuisine: "Drinks · Healthy", rating: 4.4, deliveryTime: "10-20 min", deliveryFee: 0.99, image: drinks },
];

export const meals: Meal[] = [
  { id: "m1", name: "Margherita Pizza", description: "Fresh mozzarella, basil, San Marzano tomatoes", price: 12.99, rating: 4.8, image: pizza, category: "pizza", restaurantId: "r1" },
  { id: "m2", name: "Pepperoni Classic", description: "Loaded with pepperoni and melted cheese", price: 14.5, rating: 4.7, image: pizza, category: "pizza", restaurantId: "r1" },
  { id: "m3", name: "Cheese Burger", description: "Beef patty, cheddar, lettuce, special sauce", price: 9.99, rating: 4.6, image: burger, category: "burgers", restaurantId: "r2" },
  { id: "m4", name: "Double Smash", description: "Two smash patties, caramelized onions", price: 11.5, rating: 4.8, image: burger, category: "burgers", restaurantId: "r2" },
  { id: "m5", name: "Salmon Nigiri Set", description: "8 pieces of premium salmon nigiri", price: 18.0, rating: 4.9, image: sushi, category: "sushi", restaurantId: "r3" },
  { id: "m6", name: "Dragon Roll", description: "Eel, avocado, cucumber, tobiko", price: 16.5, rating: 4.8, image: sushi, category: "sushi", restaurantId: "r3" },
  { id: "m7", name: "Crispy Wings (10pc)", description: "Hand-breaded with secret spice blend", price: 10.99, rating: 4.5, image: chicken, category: "chicken", restaurantId: "r4" },
  { id: "m8", name: "Lava Cake", description: "Warm chocolate with vanilla ice cream", price: 6.5, rating: 4.9, image: dessert, category: "desserts", restaurantId: "r5" },
  { id: "m9", name: "Berry Smoothie", description: "Strawberry, blueberry, banana, yogurt", price: 5.5, rating: 4.6, image: drinks, category: "drinks", restaurantId: "r6" },
];
