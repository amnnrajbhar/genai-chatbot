import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Message } from '../../models/message.model';
import { ChatbotService } from '../../services/chatbot.service';
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

  constructor(private chatbotService: ChatbotService) {}

  ngOnInit() {
    this.addMessage('Hello! I\'m your AI assistant. How can I help you today?', false);
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