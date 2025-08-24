import { UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings',
  imports: [FormsModule, UpperCasePipe],
  templateUrl: './settings.component.html',
})
export class SettingsComponent {
  user = {
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane.doe@example.com',
    role: 'user',
  };

  onUpdateSettings() {
    // Handle settings update logic here
    console.log('Settings updated:', this.user);
  }

  onLogout() {
    // Handle logout logic here
    console.log('User logged out');
  }

  onDeleteAccount() {
    // Handle account deletion logic here
    console.log('Account deleted');
  }
}
