import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { Evento } from '../../../../model/evento';
import { Game } from '../../../../model/game';
import { EventService } from '../../../../service/event.service';
import { LoginService } from '../../../../auth/login.service';

@Component({
  selector: 'app-events-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss'] // Corrigido: "styleUrl" para "styleUrls"
})
export class EventsListComponent {
  lista: Evento[] = [];
  game: Game[] = []
  eventService = inject(EventService);
  loginService = inject(LoginService)
  constructor() {
    this.findAll();
  }

  findAll() {
    this.eventService.findAll().subscribe({
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

  deleteById(evento: Evento){
    Swal.fire({
      title: 'Tem certeza que deseja deletar?',
      icon: 'warning',
      showConfirmButton: true,
      showDenyButton: true,
      confirmButtonText: 'Deletar',
      denyButtonText: 'Cancelar',
    }).then((result) =>{
      if(result.isConfirmed){

        this.eventService.delete(evento.id).subscribe({
          next: mensagem =>{
            Swal.fire({
              title: mensagem,
              icon: 'success',
              confirmButtonText: "Ok",

            }).then(() =>{
              this.findAll();
            });
          },error: erro => {
            Swal.fire({
              title: 'Ocorreu um erro: '+erro,
              icon: 'error',
              confirmButtonText: 'Ok',
            })
          }
        
        })
      }
    })
  }

  //FindById

  // findById(){
  //   this.eventService.findById(id).subscribe({
  //     next: retorno =>{

  //     },
  //     error: erro =>{

  //     }
  //   })
  // }

  // save(){
  //   this.eventService.findById(id).subscribe({
  //     next: mensagem =>{
  //       Swal.fire({
  //         title: mensagem,
  //         icon: 'success',
  //         confirmButtonText: "Ok",

  //       })
  //     },
  //     error: erro =>{
  //       Swal.fire({
  //         title: 'Ocorreu um erro: '+erro,
  //         icon: 'error',
  //         confirmButtonText: 'Ok',
  //       })
  //     }
  //   })
  // }
  // update(){
  //   this.eventService.findById(id).subscribe({
  //     next: retorno =>{

  //     },
  //     error: erro =>{
        
  //     }
  //   })
  // }
   
}

