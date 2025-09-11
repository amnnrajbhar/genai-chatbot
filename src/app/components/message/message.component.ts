import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Message } from '../../models/message.model';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent {
  @Input() message!: Message;
  @Input() isDarkMode!: boolean;

  formatMessage(content: string): string {
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\* (.*?)(?=\n|$)/g, '<li>$1</li>')
      .replace(/(<li>.*<\/li>)/gs, '<ul class="list-disc ml-4 mb-2">$1</ul>')
      .replace(/\n\n/g, '</p><p class="mb-2">')
      .replace(/^(.*)$/gm, '<p class="mb-2">$1</p>')
      .replace(/<p class="mb-2"><\/p>/g, '')
      .replace(/(<ul[^>]*>)\s*<p[^>]*>/g, '$1')
      .replace(/<\/p>\s*(<\/ul>)/g, '$1');
  }
}