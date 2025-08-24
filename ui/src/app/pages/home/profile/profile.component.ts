import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { IUser } from '../../../models/user.model';
import { AuthService } from '../../../services/auth.service';
import { MessageComponent } from '../../../shared/message/message.component';

import { LucideAngularModule, Info } from 'lucide-angular';

@Component({
  selector: 'app-profile',
  imports: [LucideAngularModule],
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  readonly infoIcon = Info;
  private authService = inject(AuthService);

  @ViewChild(MessageComponent) messageComponent?: MessageComponent;

  user: Partial<IUser> | null = null;

  ngOnInit() {
    this.user = this.authService.currentUserSubject.value;
  }

  onUpdate(event: Event) {
    console.log('saved', event);
  }

  // async updateProfile() {
  //   try {
  //     if (!this.user) {
  //       throw new Error('No user data available to update.');
  //     }

  //     // Validate all fields
  //     if (!isValidFields(this.user.firstName, this.user.lastName, this.user.email)) {
  //       throw new Error('Missing fields.');
  //     }

  //     // Validate email
  //     if (!isValidEmail(this.user.email)) {
  //       throw new Error('Enter valid email address.');
  //     }

  //     await this.authService.updateUser(this.user);

  //     this.handleSuccessChange('Profile updated successfully.');
  //   } catch (error) {
  //     this.handleErrorChange(error);
  //   }
  // }

  // async onDeleteProfile() {
  //   try {
  //     if (!this.user || !this.user._id) {
  //       throw new Error('No user data available to delete.');
  //     }

  //     await this.authService.deleteUser();
  //     this.onLogout();
  //   } catch (error) {
  //     this.handleErrorChange(error);
  //   }
  // }

  // onLogout() {
  //   this.router.navigate(['/']);
  //   this.authService.logout();
  // }

  // handleErrorChange(error: unknown) {
  //   error = ErrorType(error);
  //   this.messageComponent?.onMessage(error as string, 'error');
  // }

  // handleSuccessChange(mssg: string) {
  //   this.messageComponent?.onMessage(mssg, 'error');
  // }
}
