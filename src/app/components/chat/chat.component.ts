import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Message } from '../../models/message.model';
import { ChatbotService, AIModel } from '../../services/chatbot.service';
import { MessageComponent } from '../message/message.component';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule, MessageComponent],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  messages: Message[] = [];
  currentMessage = '';
  isTyping = false;
  isDarkMode = false;
  availableModels: AIModel[] = [];
  selectedModel = '';
  showModelDropdown = false;

  constructor(private chatbotService: ChatbotService) {}

  ngOnInit() {
    this.availableModels = this.chatbotService.availableModels;
    this.selectedModel = this.chatbotService.getSelectedModel();
    this.addMessage('Hello! I\'m your AI assistant. How can I help you today?', false);
  }

  selectModel(modelId: string) {
    this.selectedModel = modelId;
    this.chatbotService.setModel(modelId);
    this.showModelDropdown = false;
  }

  toggleModelDropdown() {
    this.showModelDropdown = !this.showModelDropdown;
  }

  onClickOutside(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.model-selector')) {
      this.showModelDropdown = false;
    }
  }

  getSelectedModelIcon(): string {
    const model = this.availableModels.find(m => m.id === this.selectedModel);
    return model?.icon || 'G';
  }

  getSelectedModelName(): string {
    const model = this.availableModels.find(m => m.id === this.selectedModel);
    return model?.name || 'Select Model';
  }

  async sendMessage() {
    if (!this.currentMessage.trim()) return;

    this.addMessage(this.currentMessage, true);
    const userMessage = this.currentMessage;
    this.currentMessage = '';
    this.isTyping = true;

    try {
      const response = await this.chatbotService.generateResponse(userMessage);
      this.isTyping = false;
      this.addMessage(response, false);
    } catch (error) {
      this.isTyping = false;
      this.addMessage('Sorry, something went wrong. Please try again.', false);
    }
  }

  private addMessage(content: string, isUser: boolean) {
    const message: Message = {
      id: Date.now().toString(),
      content,
      isUser,
      timestamp: new Date()
    };
    this.messages.push(message);
  }

  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.sendMessage();
    }
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
  }
}