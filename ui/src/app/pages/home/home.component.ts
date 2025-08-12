import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { ThemeComponent } from '../../shared/theme/theme.component';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, FooterComponent, RouterOutlet],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  private theme = inject(ThemeComponent);

  currentTheme: string;

  constructor() {
    this.currentTheme = this.theme.currentTheme;
  }
}
