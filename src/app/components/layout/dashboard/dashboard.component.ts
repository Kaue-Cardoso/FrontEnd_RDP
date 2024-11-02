import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { CommonModule, isPlatformBrowser } from '@angular/common';



@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CarouselModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

}
