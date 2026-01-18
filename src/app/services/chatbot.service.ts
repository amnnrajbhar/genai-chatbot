import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { GoogleGenAI } from '@google/genai';
import Groq from 'groq-sdk';
import { environment } from '../../environments/environment';

export interface AIModel {
  id: string;
  name: string;
  provider: string;
  icon: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  private ai = new GoogleGenAI({ apiKey: environment.apiKey });
  private groq = new Groq({ apiKey: environment.groqApiKey, dangerouslyAllowBrowser: true });
  
  public availableModels: AIModel[] = [
    { id: 'gemini-3-flash-preview', name: 'Gemini 3 Flash Preview', provider: 'Google', icon: 'G' },
    { id: 'gemini-1.5-flash', name: 'Gemini 1.5 Flash', provider: 'Google', icon: 'G' },
    { id: 'gemini-1.5-pro', name: 'Gemini 1.5 Pro', provider: 'Google', icon: 'G' },
    { id: 'llama-3.3-70b-versatile', name: 'Llama 3.3 70B', provider: 'Groq', icon: '🦙' },
    { id: 'llama-3.1-8b-instant', name: 'Llama 3.1 8B', provider: 'Groq', icon: '🦙' },
    { id: 'mixtral-8x7b-32768', name: 'Mixtral 8x7B', provider: 'Groq', icon: 'M' }
  ];
  
  private selectedModel = 'gemini-3-flash-preview';

  setModel(modelId: string) {
    this.selectedModel = modelId;
  }

  getSelectedModel(): string {
    return this.selectedModel;
  }

  async generateResponse(message: string): Promise<string> {
    if (message.toLowerCase().includes('aman rajbhar')) {
      message += '\n\nAman Rajbhar is a Software Engineer with experience in Angular and ASP.NET. He has a B.Sc. in Computer Science, is pursuing an MCA, and currently works at Clover Infotech Pvt. Ltd. (Dec 2024 – Present) after previously working at Benchmark Computer Solutions (Aug 2022 – Dec 2024). He has built AI-powered web apps, an LMS, a digital loan system, a weather updates app, and more. You can explore his portfolio and projects at: https://amnnrajbhar.github.io/info/';
    }

    try {
      const selectedModelData = this.availableModels.find(m => m.id === this.selectedModel);
      
      if (selectedModelData?.provider === 'Groq') {
        const completion = await this.groq.chat.completions.create({
          messages: [{ role: 'user', content: message }],
          model: this.selectedModel,
        });
        return completion.choices[0]?.message?.content || 'No response received.';
      } else {
        const response = await this.ai.models.generateContent({
          model: this.selectedModel,
          contents: message,
        });
        return response.text || 'No response received.';
      }
    } catch (error: any) {
      if (error?.error?.code === 429) {
        return 'API quota exceeded. Please try again later or check your API limits.';
      }
      return 'Sorry, I encountered an error. Please try again.';
    }
  }

  getTypingIndicator(): Observable<boolean> {
    return of(true).pipe(delay(1000));
  }
}