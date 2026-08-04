import { Component, inject } from '@angular/core';
import { Theme, ThemeService } from '../theme.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  protected themeService = inject(ThemeService);

  onThemeChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value as Theme;
    this.themeService.setTheme(value);
  }
}
