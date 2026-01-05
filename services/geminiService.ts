
import { GoogleGenAI } from "@google/genai";
import { DataItem } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getSmartInsights = async (data: DataItem[]) => {
  try {
    const prompt = `Analyze this dataset and provide a concise summary (max 3 sentences) highlighting key trends, risks, and performance. Dataset: ${JSON.stringify(data.map(d => ({ ...d, id: undefined })))}`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: "You are a professional data analyst. Provide actionable insights based on project data."
      }
    });

    return response.text || "Unable to generate insights at this time.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Insights unavailable.";
  }
};
