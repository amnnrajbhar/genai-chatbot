import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';

export interface AIModel {
  id: string;
  name: string;
  provider: string;
  icon: string;
}

interface HuggingFaceResponse {
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
  error?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {

  public availableModels: AIModel[] = [
    // =========================
    // QWEN
    // =========================
    {
      id: 'Qwen/Qwen3-32B:nscale',
      name: 'Qwen 3 32B',
      provider: 'Hugging Face',
      icon: '🤗'
    },
    {
      id: 'Qwen/Qwen3-8B:nscale',
      name: 'Qwen 3 8B',
      provider: 'Hugging Face',
      icon: '🤗'
    },
    {
      id: 'Qwen/Qwen2.5-1.5B-Instruct',
      name: 'Qwen 2.5 1.5B',
      provider: 'Hugging Face',
      icon: '🤗'
    },

    // =========================
    // DEEPSEEK
    // =========================
    {
      id: 'deepseek-ai/DeepSeek-R1-Distill-Qwen-7B:nscale',
      name: 'DeepSeek R1 Distill 7B',
      provider: 'Hugging Face',
      icon: '🐋'
    },
    {
      id: 'deepseek-ai/DeepSeek-R1-Distill-Qwen-32B',
      name: 'DeepSeek R1 Distill 32B',
      provider: 'Hugging Face',
      icon: '🐋'
    },
    {
      id: 'deepseek-ai/DeepSeek-V3.1-Terminus',
      name: 'DeepSeek V3.1 Terminus',
      provider: 'Hugging Face',
      icon: '🐋'
    },
    {
      id: 'deepseek-ai/DeepSeek-V4-Flash-0731',
      name: 'DeepSeek V4 Flash',
      provider: 'Hugging Face',
      icon: '🐋'
    },

    // =========================
    // META LLAMA
    // =========================
    {
      id: 'meta-llama/Llama-3.1-8B-Instruct:nscale',
      name: 'Llama 3.1 8B',
      provider: 'Hugging Face',
      icon: '🦙'
    },

    // =========================
    // GOOGLE GEMMA
    // =========================
    {
      id: 'google/gemma-4-26B-A4B-it',
      name: 'Gemma 4 26B',
      provider: 'Hugging Face',
      icon: 'G'
    },

    // =========================
    // MICROSOFT
    // =========================
    {
      id: 'microsoft/phi-4',
      name: 'Microsoft Phi-4',
      provider: 'Hugging Face',
      icon: 'M'
    },

    // =========================
    // OPENAI OPEN-WEIGHTS
    // =========================
    {
      id: 'openai/gpt-oss-120b',
      name: 'GPT OSS 120B',
      provider: 'Hugging Face',
      icon: 'O'
    },
    {
      id: 'openai/gpt-oss-20b',
      name: 'GPT OSS 20B',
      provider: 'Hugging Face',
      icon: 'O'
    }
  ];

  private selectedModel = 'Qwen/Qwen3-32B:nscale';

  constructor() { }

  setModel(modelId: string): void {
    this.selectedModel = modelId;
  }

  getSelectedModel(): string {
    return this.selectedModel;
  }

  async generateResponse(message: string): Promise<string> {

    if (message.toLowerCase().includes('aman rajbhar')) {
      message += `

Aman Rajbhar is a Software Engineer with experience in Angular and ASP.NET.
He has a B.Sc. in Computer Science, is pursuing an MCA, and currently works
at Clover Infotech Pvt. Ltd. (Dec 2024 – Present) after previously working
at Benchmark Computer Solutions (Aug 2022 – Dec 2024).

He has built AI-powered web apps, an LMS, a digital loan system, a weather
updates app, and more.

Portfolio:
https://amnnrajbhar.github.io/info/
`;
    }

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message,
          model: this.selectedModel
        })
      });

      const result: HuggingFaceResponse = await response.json();

      console.log('Chat API status:', response.status);
      console.log('Chat API response:', result);

      if (!response.ok) {
        console.error('Chat API error:', result);

        if (response.status === 401) {
          return 'Hugging Face authentication failed.';
        }

        if (response.status === 429) {
          return 'Hugging Face rate limit exceeded. Please try again later.';
        }

        return result.error || 'AI request failed.';
      }

      return (
        result.choices?.[0]?.message?.content ||
        'No response received.'
      );

    } catch (error) {
      console.error('Chat API request failed:', error);

      return 'Sorry, I encountered an error. Please try again.';
    }
  }

  getTypingIndicator(): Observable<boolean> {
    return of(true).pipe(delay(1000));
  }
}