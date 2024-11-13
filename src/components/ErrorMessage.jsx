import React from 'react';
import { AlertCircle } from 'lucide-react';


export function ErrorMessage({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-red-50 rounded-xl">
      <AlertCircle className="text-red-500 w-12 h-12 mb-4" />
      <p className="text-red-700 text-center mb-4">{message}</p>
      <button
        onClick={onRetry}
        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
      >
        Try Again
      </button>
    </div>
  );
}