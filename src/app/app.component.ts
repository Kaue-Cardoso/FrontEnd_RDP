import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BsDropdownConfig, BsDropdownModule } from 'ngx-bootstrap/dropdown';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BsDropdownModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [
    { provide: BsDropdownConfig, useValue: { autoClose: true, isAnimated: true, display: 'static' } }
  ]
})
export class AppComponent {
  title = 'frontend';
}
