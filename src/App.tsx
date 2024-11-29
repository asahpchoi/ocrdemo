import React, { useState } from 'react';
import { BrainCircuit, Settings } from 'lucide-react';
import { ImageUpload } from './components/ImageUpload';
import { ImageAnalysis } from './components/ImageAnalysis';
import { ConfigPopup } from './components/ConfigPopup';
import { Snow } from './components/Snow';
import { analyzeImage } from './services/api';
import { AnalysisResult } from './types/chat';

const DEFAULT_PROMPT = "Identify the type of document and extract the data. For Chinese text, provide detailed extraction including characters and their meanings.";

function App() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisResult>({
    description: '',
    isLoading: false
  });
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [extractionPrompt, setExtractionPrompt] = useState(DEFAULT_PROMPT);

  const handleImageSelect = async (base64Image: string) => {
    setSelectedImage(base64Image);
    setAnalysis({ description: '', isLoading: true });

    try {
      const response = await analyzeImage(base64Image, extractionPrompt);
      setAnalysis({
        description: response.choices[0].message.content,
        isLoading: false
      });
    } catch (error) {
      setAnalysis({
        description: '',
        isLoading: false,
        error: '图片分析失败，请重试。'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-green-50 to-red-50 py-6 relative">
      <Snow />
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* Simple Header */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg mb-6 p-3 flex items-center justify-between border border-red-100">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-red-100 rounded-lg">
              <BrainCircuit className="w-5 h-5 text-red-600" />
            </div>
            <h1 className="text-lg font-semibold text-gray-800">
              🎄 中文文字识别分析
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <ImageUpload
              onImageSelect={handleImageSelect}
              disabled={analysis.isLoading}
            />
            <button
              onClick={() => setIsConfigOpen(true)}
              className="p-1.5 text-gray-600 hover:bg-red-50 rounded-lg transition-colors"
              title="配置提取设置"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Analysis Section */}
        {selectedImage && (
          <div className="transition-all duration-300 ease-in-out">
            <ImageAnalysis
              imageUrl={selectedImage}
              analysis={analysis}
            />
          </div>
        )}

        {/* Configuration Popup */}
        <ConfigPopup
          isOpen={isConfigOpen}
          onClose={() => setIsConfigOpen(false)}
          currentPrompt={extractionPrompt}
          onSave={setExtractionPrompt}
        />
      </div>
      
      {/* Christmas Decorations */}
      <div className="fixed top-0 left-0 w-32 h-32 pointer-events-none z-20">
        <span className="absolute text-4xl" style={{ left: '20px', top: '20px' }}>🎄</span>
      </div>
      <div className="fixed top-0 right-0 w-32 h-32 pointer-events-none z-20">
        <span className="absolute text-4xl" style={{ right: '20px', top: '20px' }}>🎄</span>
      </div>
      <div className="fixed bottom-0 left-0 w-32 h-32 pointer-events-none z-20">
        <span className="absolute text-4xl" style={{ left: '20px', bottom: '20px' }}>🎁</span>
      </div>
      <div className="fixed bottom-0 right-0 w-32 h-32 pointer-events-none z-20">
        <span className="absolute text-4xl" style={{ right: '20px', bottom: '20px' }}>🎁</span>
      </div>
    </div>
  );
}

export default App;
