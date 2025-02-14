import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-unauthorized',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>
      You user is not authorized to access this page.
    </p>
  `,
  styleUrls: ['./unauthorized.component.css']
})
export class UnauthorizedComponent {

}
