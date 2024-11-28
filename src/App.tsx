import React, { useState } from 'react';
import { BrainCircuit } from 'lucide-react';
import { ImageUpload } from './components/ImageUpload';
import { ImageAnalysis } from './components/ImageAnalysis';
import { analyzeImage } from './services/api';
import { AnalysisResult } from './types/chat';

function App() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisResult>({
    description: '',
    isLoading: false
  });

  const handleImageSelect = async (base64Image: string) => {
    setSelectedImage(base64Image);
    setAnalysis({ description: '', isLoading: true });

    try {
      const response = await analyzeImage(base64Image);
      setAnalysis({
        description: response.choices[0].message.content,
        isLoading: false
      });
    } catch (error) {
      setAnalysis({
        description: '',
        isLoading: false,
        error: 'Failed to analyze image. Please try again.'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="bg-blue-600 p-4 flex items-center gap-2">
            <BrainCircuit className="w-6 h-6 text-white" />
            <h1 className="text-xl font-semibold text-white">Azure OpenAI Vision Analysis</h1>
          </div>
          <div className="p-6">
            <ImageUpload
              onImageSelect={handleImageSelect}
              disabled={analysis.isLoading}
            />
          </div>
        </div>

        {/* Analysis Section */}
        {selectedImage && (
          <ImageAnalysis
            imageUrl={selectedImage}
            analysis={analysis}
          />
        )}
      </div>
    </div>
  );
}

export default App;