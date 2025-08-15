import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import {
  LucideAngularModule,
  Info,
  CircleCheck,
  TriangleAlert,
  Ban,
} from 'lucide-angular';

@Component({
  selector: 'app-message',
  imports: [NgClass, LucideAngularModule],
  templateUrl: './message.component.html',
})
export class MessageComponent {
  readonly infoIcon = Info;
  readonly successIcon = CircleCheck;
  readonly warningIcon = TriangleAlert;
  readonly errorIcon = Ban;

  isMessage = false;
  message: string = 'There was an error processing your request.';
  type: 'info' | 'success' | 'warning' | 'error' = 'error';
  width = 'w-5/6';

  /**
   * Displays a message with a specified type and width, and automatically clears it after a timeout.
   *
   * @param message - The message text to display.
   * @param type - The type of message to display. Can be 'info', 'success', 'warning', or 'error'. Defaults to 'success'.
   * @param width - (Optional) The width of the message box (e.g., 'w-1/2'). Defaults to 'w-1/2'.
   * @param timeout - (Optional) Duration in milliseconds before the message disappears. Defaults to 3000ms.
   */
  onMessage(
    message: string,
    type: 'info' | 'success' | 'warning' | 'error' = 'success',
    width?: string,
    timeout?: number
  ) {
    this.message = message;
    this.type = type;
    if (width !== undefined) this.width = width;
    this.isMessage = true;

    setTimeout(() => {
      this.message = 'There was an error processing your request.';
      this.type = 'error';
      this.isMessage = false;
    }, timeout || 3000);
  }
}
