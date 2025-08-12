import { Component, EventEmitter, inject, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ThemeComponent } from '../theme/theme.component';
import { IUser } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  private router = inject(Router);
  private themeComponent = inject(ThemeComponent);
  private authService = inject(AuthService);

  @Output() currentThemeChange = new EventEmitter();

  currentUser: Partial<IUser> | null = null;
  currentTheme: string;
  logo: string;

  constructor() {
    this.currentTheme = this.themeComponent.currentTheme;
    this.currentUser = this.authService.currentUserSubject.value;
    this.logo = this.themeComponent.logo;
  }

  // Might move to settings component
  onThemeToggle() {
    this.currentTheme = this.themeComponent.toggleTheme();
    this.logo = this.themeComponent.logo;
    this.currentThemeChange.emit(this.currentTheme);
  }

  onProfile() {
    this.router.navigate(['/app/profile']);
  }

  onApp() {
    this.router.navigate(['/app']);
  }
}
