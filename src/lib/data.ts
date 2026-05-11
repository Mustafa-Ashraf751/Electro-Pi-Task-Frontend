import burger from "@/assets/food-burger.jpg";
import pizza from "@/assets/food-pizza.jpg";
import sushi from "@/assets/food-sushi.jpg";
import dessert from "@/assets/food-dessert.jpg";
import chicken from "@/assets/food-chicken.jpg";
import drinks from "@/assets/food-drinks.jpg";

export type Meal = {
  _id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  image: string;
  category: string;
};

export const categories = [
  { id: "pizza", name: "Pizza", emoji: "🍕", image: pizza },
  { id: "burgers", name: "Burgers", emoji: "🍔", image: burger },
  { id: "sushi", name: "Sushi", emoji: "🍣", image: sushi },
  { id: "chicken", name: "Chicken", emoji: "🍗", image: chicken },
  { id: "desserts", name: "Desserts", emoji: "🍰", image: dessert },
  { id: "drinks", name: "Drinks", emoji: "🥤", image: drinks },
];
