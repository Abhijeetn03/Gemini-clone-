import { GoogleGenAI } from '@google/genai';

const models = [
  'gemini-2.5-flash',
  'gemini-2.5-flash-lite',
  'gemini-2.0-flash',
];

export async function generateResponse(prompt) {
  if (!prompt?.trim()) {
    return '';
  }

  const apiKey = (
    import.meta.env.VITE_GEMINI_API_KEY ||
    import.meta.env.VITE_GOOGLE_API_KEY
  )?.trim();

  if (!apiKey) {
    console.warn(
      'Missing Gemini API key. Add VITE_GEMINI_API_KEY to your .env or .env.local file.',
    );
    return 'Missing Gemini API key. Add VITE_GEMINI_API_KEY to your .env or .env.local file and restart the Vite server.';
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    let lastError;

    for (const model of models) {
      try {
        const response = await ai.models.generateContent({
          model,
          contents: prompt,
        });

        return response.text || 'No response received from Gemini.';
      } catch (error) {
        lastError = error;

        const errorMessage =
          error?.message ||
          error?.error?.message ||
          error?.statusText ||
          '';

        const isQuotaError =
          errorMessage.includes('429') ||
          errorMessage.includes('RESOURCE_EXHAUSTED') ||
          errorMessage.toLowerCase().includes('quota exceeded');

        if (!isQuotaError) {
          throw error;
        }
      }
    }

    throw lastError;
  } catch (error) {
    console.error('Gemini request failed:', error);
    const errorMessage =
      error?.message ||
      error?.error?.message ||
      error?.statusText ||
      'Unknown Gemini API error.';

    if (
      errorMessage.includes('429') ||
      errorMessage.includes('RESOURCE_EXHAUSTED') ||
      errorMessage.toLowerCase().includes('quota exceeded')
    ) {
      return 'Gemini free-tier quota is exhausted right now. Please wait a bit, or enable billing in Google AI Studio / Google Cloud for higher limits.';
    }

    return `Gemini request failed: ${errorMessage}`;
  }
}

export default generateResponse;
