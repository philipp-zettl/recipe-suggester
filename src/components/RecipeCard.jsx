import React from 'react';
import { Clock } from 'lucide-react';

export function RecipeCard({ recipe }) {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-2xl font-bold text-gray-900">{recipe.name}</h3>
          <div className="flex items-center text-gray-500">
            <Clock size={20} className="mr-1" />
            <span>{recipe.cookingTime} mins</span>
          </div>
        </div>

        <div className="mb-6">
          <h4 className="text-lg font-semibold text-gray-700 mb-2">Ingredients</h4>
          <ul className="list-disc list-inside space-y-1">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="text-gray-600">{ingredient}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-gray-700 mb-2">Instructions</h4>
          <ol className="list-decimal list-inside space-y-2">
            {recipe.instructions.map((instruction, index) => (
              <li key={index} className="text-gray-600">{instruction}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}