import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { GoogleGenAI } from '@google/genai';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  private ai = new GoogleGenAI({ apiKey: environment.apiKey });

  async generateResponse(message: string): Promise<string> {
    if (message.toLowerCase().includes('aman rajbhar')) {
      message += '\n\nAman Rajbhar is a Software Engineer with experience in Angular and ASP.NET. He has a B.Sc. in Computer Science, is pursuing an MCA, and currently works at Clover Infotech Pvt. Ltd. (Dec 2024 – Present) after previously working at Benchmark Computer Solutions (Aug 2022 – Dec 2024). He has built AI-powered web apps, an LMS, a digital loan system, a weather updates app, and more. You can explore his portfolio and projects at: https://amnnrajbhar.github.io/info/';
    }

    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: message,
      });
      return response.text || 'No response received.';
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