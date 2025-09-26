import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  private apiKey = environment.apiKey;

  async generateResponse(message: string): Promise<string> {
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