export const CATEGORIES = [
  "Spiritual",
  "Education",
  "Science",
  "Computer Science",
  "Technology",
  "Health & Medicine",
  "Health & Fitness",
  "Business",
  "Sports",
  "Lifestyle",
  "Food & Cooking",
  "Travel", 
  "Entertainment",
] as const;

export type CategoryName = typeof CATEGORIES[number];