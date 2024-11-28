import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Loader2 } from 'lucide-react';
import { AnalysisResult } from '../types/chat';

interface ImageAnalysisProps {
  imageUrl: string;
  analysis: AnalysisResult;
}

export const ImageAnalysis: React.FC<ImageAnalysisProps> = ({ imageUrl, analysis }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white rounded-xl shadow-lg p-6">
      {/* Image Display */}
      <div className="flex flex-col">
        <h2 className="text-lg font-semibold mb-4">Uploaded Image</h2>
        <div className="relative rounded-lg overflow-hidden bg-gray-50">
          <img
            src={imageUrl}
            alt="Uploaded for analysis"
            className="w-full h-auto object-contain"
          />
        </div>
      </div>

      {/* Analysis Display */}
      <div className="flex flex-col">
        <h2 className="text-lg font-semibold mb-4">Image Analysis</h2>
        <div className="bg-gray-50 rounded-lg p-4 flex-1">
          {analysis.isLoading ? (
            <div className="flex items-center justify-center h-full">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
          ) : analysis.error ? (
            <div className="text-red-500">{analysis.error}</div>
          ) : (
            <div className="prose prose-sm max-w-none">
              <ReactMarkdown>{analysis.description}</ReactMarkdown>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};