import axios from 'axios';
import { ChatResponse } from '../types/chat';

const API_URL = import.meta.env.VITE_AZURE_ENDPOINT;
const API_KEY = import.meta.env.VITE_AZURE_API_KEY;
const DEPLOYMENT_NAME = import.meta.env.VITE_AZURE_DEPLOYMENT_NAME;

export const analyzeImage = async (imageUrl: string, prompt: string): Promise<ChatResponse> => {
  try {
    const payload = {
      messages: [
        {
          role: "user",
          content: [
            { 
              type: "text", 
              text: prompt
            },
            {
              type: "image_url",
              image_url: {
                url: imageUrl
              }
            }
          ]
        }
      ],
      max_tokens: 800,
      temperature: 0.3, // Lower temperature for more focused extraction
      frequency_penalty: 0,
      presence_penalty: 0,
      top_p: 0.95
    };

    const response = await axios.post(
      `${API_URL}/openai/deployments/${DEPLOYMENT_NAME}/chat/completions?api-version=2024-02-15-preview`,
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
          'api-key': API_KEY
        }
      }
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to analyze image');
  }
};
