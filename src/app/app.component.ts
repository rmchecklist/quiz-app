import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-root',
  imports: [
    MatToolbarModule,
    RouterOutlet,
    MatButtonModule,
    RouterLink,
    MatMenuModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  quizMenus = [
    {
      name: 'States and Capitals',
      id: 'states-capitals',
      items: [
        { id: 'us', name: 'US', routerLink: 'quiz/setup/us' },
        { id: 'india', name: 'India', routerLink: 'quiz/setup/india' },
      ],
    },
    {
      name: 'Geography',
      id: 'geography',
      items: [
        { id: 'world-rivers', name: 'World Rivers' },
        { id: 'mountains', name: 'Mountains' },
      ],
    },
  ];
}
