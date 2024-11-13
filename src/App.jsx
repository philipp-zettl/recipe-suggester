import React, { useState } from 'react';
import { ChefHat } from 'lucide-react';
import { SearchBar } from './components/SearchBar';
import { RecipeCard } from './components/RecipeCard';
import { ErrorMessage } from './components/ErrorMessage';
import { LoadingSpinner } from './components/LoadingSpinner';

const mlAPI = "";
const apiKey = "";

function App() {
  const [ingredients, setIngredients] = useState('');
  const [extractedIngredients, setExtractedIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  
  let userId = localStorage.getItem('userId');
  if(!userId){
    userId = Date.now();
    localStorage.setItem('userId', userId);
  }

  const extractIngredients = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(mlAPI, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({ message: {recipient: {id: userId}, text: `[extract:ingredients] ${ingredients}` }, timestamp: Date.now()}),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch recipes. Please try again.');
      }

      const data = await response.json();
      setExtractedIngredients(data.message.data.split(','));
      await fetchRecipes();
    } catch (err) {
      setError("Failed to extract ingredients.");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchRecipes = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(mlAPI, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({ message: {recipient: {id: userId}, text: `[suggest:recipe] ${extractedIngredients}` }, timestamp: Date.now()}),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch recipes. Please try again.');
      }

      const data = await response.json();
      setRecipes(data.message.data);
    } catch (err) {
      setError('Failed to fetch recipes.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-emerald-500 rounded-full mb-4">
            <ChefHat size={32} className="text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Recipe AI Assistant</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Tell me what ingredients you have, and I'll suggest delicious recipes you can make!
          </p>
        </div>

        {/* Search Section */}
        <div className="flex justify-center mb-12">
          <SearchBar
            value={ingredients}
            onChange={setIngredients}
            onSubmit={extractIngredients}
            disabled={isLoading}
          />
        </div>

        {/* Results Section */}
        <div className="max-w-4xl mx-auto">
          {isLoading && <LoadingSpinner />}
          
          {error && (
            <ErrorMessage 
              message={error}
              onRetry={fetchRecipes}
            />
          )}

          {!isLoading && !error && extractedIngredients.length > 0 && (
            <div className="space-y-8">
              {extractedIngredients.map((ingredient, index) => (
                <p id="`ingredient-${index}`">"`${ingredient}`"</p>
              ))}
            </div>
          )}
          
          {!isLoading && !error && recipes.length > 0 && (
            <div className="space-y-8">
              {recipes.map((recipe, index) => (
                <RecipeCard key={index} recipe={recipe} />
              ))}
            </div>
          )}

          {!isLoading && !error && extractedIngredients.length === 0 && ingredients && (
            <div className="text-center text-gray-500">
              No ingredients found. Try different prompt!
            </div>
          )}
          {!isLoading && !error && extractedIngredients.length !== 0 && recipes.length === 0 && ingredients && (
            <div className="text-center text-gray-500">
              No recipes found. Try different ingredients!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;