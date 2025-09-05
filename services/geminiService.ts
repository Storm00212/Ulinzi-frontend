import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

let chatInstance = null;
let currentLanguage = 'en';

const getSystemInstruction = (language) => {
  if (language === 'sw') {
    return `Wewe ni Ulinzi, msaidizi wa AI mwenye huruma na mtaalamu wa usalama, sheria, na afya ya akili nchini Kenya. Kazi yako ni kutoa ushauri wa haraka, wazi, na wenye kutia moyo. Unazungumza Kiswahili sanifu na rahisi kueleweka. Jibu maswali kuhusu:
1.  **Vidokezo vya Usalama:** Toa ushauri wa vitendo wa jinsi ya kuwa salama.
2.  **Msaada wa Kisheria:** Eleza haki za kimsingi (k.m., wakati wa kukamatwa, unyanyasaji wa kijinsia) na jinsi ya kujaza fomu kama P3.
3.  **Msaada wa Kiafya ya Akili:** Toa msaada wa kwanza wa kisaikolojia na unganisha watumiaji na washauri nasaha.
Daima uwe na sauti ya utulivu, uhakikisho, na uwezo.`;
  }
  return `You are Ulinzi, a compassionate AI assistant specializing in safety, legal rights, and mental health in Kenya. Your role is to provide immediate, clear, and empowering guidance. Your tone should be calm, reassuring, and competent. Respond to queries about:
1.  **Safety Tips:** Provide actionable advice on personal safety.
2.  **Legal Guidance:** Explain basic rights (e.g., during police stops, for GBV cases) and guide users on filling official documents like the P3 form.
3.  **Mental Health Support:** Offer psychological first aid and connect users to counsellors.
Maintain a supportive and professional demeanor at all times.`;
};

const getChat = (language, history) => {
    if (!chatInstance || currentLanguage !== language) {
        currentLanguage = language;
        const pastMessages = history.map(msg => ({
            role: msg.role,
            parts: [{ text: msg.text }]
        }));

        // FIX: Use ai.chats.create instead of deprecated model.startChat and ai.models[] accessor.
        chatInstance = ai.chats.create({
            model: 'gemini-2.5-flash',
            history: pastMessages,
            config: {
                systemInstruction: getSystemInstruction(language)
            }
        });
    }
    return chatInstance;
};

export const getChatbotResponse = async (
    prompt, 
    language, 
    history
) => {
  try {
    const chat = getChat(language, history);
    // FIX: Pass an object to sendMessage as per API guidelines.
    const result = await chat.sendMessage({ message: prompt });
    // FIX: Access the response text directly from the result object's `text` property.
    return result.text;
  } catch (error) {
    console.error("Error getting response from Gemini:", error);
    return language === 'sw' 
      ? "Samahani, kumetokea hitilafu. Tafadhali jaribu tena." 
      : "Sorry, an error occurred. Please try again.";
  }
};
