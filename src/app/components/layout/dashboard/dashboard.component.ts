import { Component, inject, Inject, PLATFORM_ID } from '@angular/core';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { EventService } from '../../../service/event.service';
import { Evento } from '../../../model/evento';
import { Game } from '../../../model/game';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CarouselModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  isBrowser: boolean;


  lista: Evento[] = [];
  game: Game[] = []
  eventService = inject(EventService);

  findAll() {
    this.eventService.findLast5().subscribe({
      next: (lista) => {
        this.lista = lista; 
      },
      error: (erro) => {
        Swal.fire({
          title: 'Ocorreu um erro: '+erro,
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }
    });
  }

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.findAll();

  }

}
