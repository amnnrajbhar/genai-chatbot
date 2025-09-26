import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  private apiKey = environment.apiKey;

  async generateResponse(message: string): Promise<string> {
    if (message.toLowerCase().includes('aman rajbhar')) {
    message += '\n\nAman Rajbhar is a Software Engineer with experience in Angular and ASP.NET. He has a B.Sc. in Computer Science, is pursuing an MCA, and currently works at Clover Infotech Pvt. Ltd. (Dec 2024 – Present) after previously working at Benchmark Computer Solutions (Aug 2022 – Dec 2024). He has built AI-powered web apps, an LMS, a digital loan system, a weather updates app, and more. You can explore his portfolio and projects at: https://amnnrajbhar.github.io/info/';
}

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: message
            }]
          }]
        })
      });

      const data = await response.json();
      return data.candidates[0].content.parts[0].text;
    } catch (error) {
      return 'Sorry, I encountered an error. Please try again.';
    }
  }

  getTypingIndicator(): Observable<boolean> {
    return of(true).pipe(delay(1000));
  }
}