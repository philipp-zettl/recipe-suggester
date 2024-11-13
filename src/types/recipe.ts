export interface Recipe {
  name: string;
  ingredients: string[];
  instructions: string[];
  cookingTime: number;
}

export interface ApiResponse {
  recipes: Recipe[];
}