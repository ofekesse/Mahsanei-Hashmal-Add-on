import { GoogleGenAI, Type } from "@google/genai";
import { SearchResult } from "../types";

const apiKey = process.env.API_KEY;

if (!apiKey) {
  console.error("API_KEY is missing from environment variables");
}

const ai = new GoogleGenAI({ apiKey: apiKey || 'DUMMY_KEY_FOR_BUILD' });

export const searchProducts = async (query: string, location: string): Promise<SearchResult> => {
  try {
    const prompt = `
      אתה סוכן מלאי חכם ומנוסה המתמחה ברשת "מחסני חשמל" (payngo.co.il).
      
      המשימה שלך:
      1. לאתר עבור המשתמש את המוצר: "${query}".
      2. לבדוק ספציפית את זמינות המלאי עבור המיקום: "${location}".
      
      הנחיות לחיפוש (Google Search):
      - בצע חיפוש מעמיק באתר payngo.co.il.
      - השתמש בשאילתות הכוללות את שם המוצר ואת שם העיר/סניף (${location}) כדי לנסות לאתר דפים רלוונטיים או מידע על מלאי מקומי.
      - חפש אינדיקציות כמו "זמין בסניף", "איסוף מיידי מ...", או רשימות סניפים בדפי המוצר.
      
      החזר תשובה בפורמט JSON בלבד (ללא Markdown) הכולל:
      - summary: סיכום טקסטואלי בעברית. הסבר מה מצאת, והאם הצלחת לאשר זמינות בסניף ${location}. תן המלצה קצרה.
      - products: רשימת המוצרים. לכל מוצר:
        * name: שם המוצר המלא.
        * price: מחיר (כולל מטבע).
        * description: תיאור קצר.
        * link: קישור ישיר לדף המוצר באתר.
        * availabilityHint: הערה קצרה על הזמינות. אם מצאת שזה זמין ב${location}, כתוב זאת במפורש (למשל: "זמין לאיסוף ב${location}"). אם לא, כתוב "במלאי (יש לוודא סניף)" או "יש לבדוק זמינות באתר".

      ודא שהקישורים תקינים ומובילים לאתר payngo.co.il.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: {
              type: Type.STRING,
              description: "סיכום ממצאי החיפוש והזמינות"
            },
            products: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  price: { type: Type.STRING },
                  description: { type: Type.STRING },
                  link: { type: Type.STRING },
                  availabilityHint: { type: Type.STRING }
                },
                required: ["name", "link"]
              }
            }
          }
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as SearchResult;
    } else {
      throw new Error("No text returned from Gemini");
    }

  } catch (error) {
    console.error("Gemini Search Error:", error);
    throw error;
  }
};