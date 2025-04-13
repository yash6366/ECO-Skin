
import { toast } from "sonner";

// Types for Gemini API interaction
export type GeminiMessage = {
  role: "user" | "model";
  parts: { text: string }[];
};

type GeminiResponse = {
  candidates: Array<{
    content: {
      parts: Array<{ text: string }>;
    };
    finishReason: string;
  }>;
};

export class GeminiService {
  private apiKey: string | null = null;
  private static instance: GeminiService | null = null;
  
  constructor() {
    // Initialize by loading API key from localStorage
    this.apiKey = localStorage.getItem("gemini_api_key");
  }
  
  // Singleton pattern
  static getInstance(): GeminiService {
    if (!this.instance) {
      this.instance = new GeminiService();
    }
    return this.instance;
  }

  setApiKey(key: string): void {
    if (!key || key.trim() === "") {
      console.error("Attempted to set empty API key");
      return;
    }
    
    this.apiKey = key.trim();
    // Store API key in local storage for persistence
    localStorage.setItem("gemini_api_key", this.apiKey);
    console.log("API key set and saved to localStorage");
  }

  getApiKey(): string | null {
    // Try to get API key from instance or local storage
    if (!this.apiKey) {
      this.apiKey = localStorage.getItem("gemini_api_key");
      console.log("Retrieved API key from localStorage:", !!this.apiKey);
    }
    return this.apiKey;
  }

  clearApiKey(): void {
    this.apiKey = null;
    localStorage.removeItem("gemini_api_key");
    console.log("API key cleared from service and localStorage");
  }

  async generateResponse(prompt: string, context: string = ""): Promise<string> {
    const apiKey = this.getApiKey();
    
    if (!apiKey) {
      console.log("No API key found, requesting user to provide one");
      return "Please provide your Gemini API key to enable AI-powered responses.";
    }

    try {
      console.log("Generating response with Gemini API");
      // Create system context and user message
      const messages: GeminiMessage[] = [
        {
          role: "user",
          parts: [{ 
            text: `You are a helpful beauty assistant AI for ECO Skin.
            
Context about our website: ${context || "We offer eco-friendly beauty products, skincare routines, fashion tips, and personalized product recommendations."}
            
The user's question is: ${prompt}
            
Please provide a helpful, accurate, and friendly response. Focus on skincare, beauty, eco-friendly products, or our website features as appropriate to the question.
If the question is not related to beauty, skincare, fashion, or our website features, politely redirect the conversation.
Keep your answer concise (100 words maximum) and conversational.`
          }]
        }
      ];

      // Correct API endpoint for Gemini 1.0 Pro model
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.0-pro:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: messages,
            generationConfig: {
              temperature: 0.7,
              topK: 40,
              topP: 0.95,
              maxOutputTokens: 800,
            },
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Gemini API error:", errorData);
        
        if (response.status === 400) {
          return "I couldn't process that request. Please try rephrasing your question.";
        } else if (response.status === 401) {
          console.error("Authentication error - clearing API key");
          this.clearApiKey();
          return "There's an issue with the API key. Please provide a valid Gemini API key.";
        } else {
          return "I'm having trouble connecting to my AI services right now. Please try again later.";
        }
      }

      const data = await response.json() as GeminiResponse;
      
      if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
        console.log("Successfully generated AI response");
        return data.candidates[0].content.parts[0].text;
      } else {
        console.error("Empty or invalid response from Gemini API");
        return "I wasn't able to generate a response. Please try asking a different question.";
      }
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      return "I encountered an error while processing your request. Please try again later.";
    }
  }
}

// Export a singleton instance
export const geminiService = GeminiService.getInstance();
