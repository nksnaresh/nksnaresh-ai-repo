
import { GoogleGenAI } from "@google/genai";

const MODEL_NAME = 'gemini-2.5-flash-image';

export async function editImage(base64Image: string, prompt: string): Promise<string> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  // Extract pure base64 data if it includes metadata prefix
  const base64Data = base64Image.split(',')[1] || base64Image;
  const mimeType = base64Image.match(/data:([^;]+);/)?.[1] || 'image/png';

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Data,
              mimeType: mimeType,
            },
          },
          {
            text: prompt,
          },
        ],
      },
    });

    if (!response.candidates?.[0]?.content?.parts) {
      throw new Error("No response parts received from model");
    }

    // Iterate through parts to find the image part as per guidelines
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }

    throw new Error("No image data found in model response");
  } catch (error) {
    console.error("Gemini Image Edit Error:", error);
    throw error;
  }
}
