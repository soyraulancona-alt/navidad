
import { GoogleGenAI } from "@google/genai";
import { SelectedDecoration, PoseOption, TextConfiguration } from "../types";
import { DECORATIONS, TEXT_STYLES } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Converts a File object to a Base64 string.
 */
export const fileToGenerativePart = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      const base64Data = base64String.split(',')[1];
      resolve(base64Data);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

/**
 * Generates a Christmas scene with custom positions and decorations.
 */
export const generateChristmasScene = async (
  imageBase64: string,
  stylePrompt: string,
  decorations: SelectedDecoration[],
  pose: PoseOption,
  textConfig: TextConfiguration,
  mimeType: string = 'image/jpeg'
): Promise<string> => {
  try {
    // Build the decoration string
    let decorationPrompt = "";
    if (decorations.length > 0) {
      decorationPrompt = "Integrate the following decorative elements into the scene: ";
      decorations.forEach(d => {
        const decorInfo = DECORATIONS.find(ref => ref.id === d.id);
        if (decorInfo) {
          decorationPrompt += `${decorInfo.label} positioned ${d.position}. `;
        }
      });
    }

    // Build Text Prompt
    let textPrompt = "";
    if (textConfig.content.trim().length > 0) {
        const styleInfo = TEXT_STYLES.find(t => t.id === textConfig.styleId);
        const styleDesc = styleInfo ? styleInfo.promptDescription : "elegant festive lettering";
        textPrompt = `
        IMPORTANT TEXT INSTRUCTION:
        Render the text "${textConfig.content}" visible in the image.
        Style of text: ${styleDesc}.
        Ensure the text is spelled correctly, legible, and aesthetically integrated into the environment (not just an overlay).
        `;
    }

    // Build Pose Prompt
    const posePrompt = pose.id === 'original' 
      ? "Keep the facial features and body positions strictly consistent with the original image." 
      : `Change the body positions of the people to match this description: ${pose.promptDescription}. However, preserve the facial identity of the people from the original image as much as possible.`;

    const fullPrompt = `
      Transform this image into a detailed Christmas scene.
      
      Visual Style: ${stylePrompt}
      
      Scene Composition & Pose:
      ${posePrompt}
      
      Decorations:
      ${decorationPrompt}

      Text/Title:
      ${textPrompt}
      
      Instructions:
      1. Change the clothing to festive winter/Christmas attire appropriate for the style.
      2. Replace the background completely to match the description.
      3. Ensure high photorealism and lighting consistency.
      4. Make it look like a professional holiday card.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: fullPrompt,
          },
          {
            inlineData: {
              mimeType: mimeType,
              data: imageBase64,
            },
          },
        ],
      },
    });

    const parts = response.candidates?.[0]?.content?.parts;
    if (!parts) {
      throw new Error("No content generated.");
    }

    for (const part of parts) {
      if (part.inlineData && part.inlineData.data) {
        return `data:${part.inlineData.mimeType || 'image/png'};base64,${part.inlineData.data}`;
      }
    }

    throw new Error("The model did not return an image.");

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
