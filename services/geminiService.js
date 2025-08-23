import { GoogleGenAI } from "@google/genai";

// Ensure the API key is available from environment variables
const apiKey = process.env.API_KEY;

// Fallback care tips for when API is not available
const fallbackCareTips = {
  'Snake Plant': `**Watering**: Water sparingly, only when soil is completely dry. Overwatering is the most common cause of death.

**Sunlight**: Tolerates low light but prefers bright indirect light. Avoid direct sunlight.

**Soil**: Well-draining potting mix with perlite or sand.

**Pro Tip**: This plant is nearly indestructible and perfect for beginners!`,

  'Monstera Deliciosa': `**Watering**: Water when top 2-3 inches of soil are dry. Keep soil consistently moist but not soggy.

**Sunlight**: Bright indirect light. Can tolerate some direct morning sun.

**Soil**: Rich, well-draining potting mix with organic matter.

**Pro Tip**: Wipe the leaves regularly to keep them clean and allow better photosynthesis.`,

  'Spider Plant': `**Watering**: Keep soil evenly moist during growing season. Reduce watering in winter.

**Sunlight**: Bright indirect light. Can tolerate some direct sun.

**Soil**: Well-draining potting mix.

**Pro Tip**: This plant produces "babies" that you can propagate to create new plants!`,

  'Pothos': `**Watering**: Water when top inch of soil is dry. Tolerates occasional underwatering.

**Sunlight**: Low to bright indirect light. Avoid direct sunlight.

**Soil**: Well-draining potting mix.

**Pro Tip**: Perfect for hanging baskets or trailing down shelves. Very forgiving plant!`,

  'ZZ Plant': `**Watering**: Water only when soil is completely dry. Very drought-tolerant.

**Sunlight**: Low to bright indirect light. Avoid direct sun.

**Soil**: Well-draining potting mix.

**Pro Tip**: This plant stores water in its rhizomes, so it's very forgiving of neglect.`
};

export const getPlantCareTips = async (plantName) => {
  try {
    // If no API key is available, return fallback tips
    if (!apiKey) {
      const fallbackTip = fallbackCareTips[plantName];
      if (fallbackTip) {
        return fallbackTip;
      }
      return `**Watering**: Water when the top inch of soil feels dry to the touch.

**Sunlight**: Most plants prefer bright indirect light. Avoid direct sunlight which can scorch leaves.

**Soil**: Use well-draining potting mix to prevent root rot.

**Pro Tip**: Always check the soil moisture before watering - it's better to underwater than overwater!`;
    }

    const ai = new GoogleGenAI({ apiKey });

    const prompt = `
      You are a friendly and helpful botanist.
      Provide concise and easy-to-follow plant care tips for a "${plantName}".
      Organize the tips into the following sections:
      - **Watering**: How often and how much to water.
      - **Sunlight**: What kind of light it needs (e.g., bright indirect, direct, low light).
      - **Soil**: What type of soil is best.
      - **Pro Tip**: One extra helpful tip for this plant.

      Keep the language simple and encouraging for a beginner plant owner. Do not use markdown headers (#, ##, etc.), just use bolding as shown.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        temperature: 0.5,
        topP: 0.95,
      },
    });

    return response.text;
  } catch (error) {
    console.error(`Error fetching care tips for ${plantName}:`, error);

    // Return fallback tips on error
    const fallbackTip = fallbackCareTips[plantName];
    if (fallbackTip) {
      return fallbackTip;
    }

    return `**Watering**: Water when the top inch of soil feels dry to the touch.

**Sunlight**: Most plants prefer bright indirect light. Avoid direct sunlight which can scorch leaves.

**Soil**: Use well-draining potting mix to prevent root rot.

**Pro Tip**: Always check the soil moisture before watering - it's better to underwater than overwater!`;
  }
};
