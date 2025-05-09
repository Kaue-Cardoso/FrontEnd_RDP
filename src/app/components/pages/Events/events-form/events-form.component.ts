import { Component, inject } from '@angular/core';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { Evento } from '../../../../model/evento';
import { EventService } from '../../../../service/event.service';
import { User } from '../../../../model/user';
import { Game } from '../../../../model/game';
import { GameService } from '../../../../service/game.service';
import { LoginService } from '../../../../auth/login.service';
import { UserService } from '../../../../service/user.service';


@Component({
  selector: 'app-events-form',
  standalone: true,
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './events-form.component.html',
  styleUrl: './events-form.component.scss',
})
export class EventsFormComponent {
  router = inject(Router);
  activeroutes = inject(ActivatedRoute);
  evento: Evento = new Evento();
  eventService = inject(EventService);
  gameService = inject(GameService);
  loginService = inject(LoginService)
  userService = inject(UserService);
  user: User[] = [];
  criador: User = new User();
  games: Game[] = [];

  constructor() {
    let id = this.activeroutes.snapshot.params["id"];
    if (id && !isNaN(+id)) {
      this.findById(+id);
    }
    this.findAllGames();

  }
  selectedGame: Game | null = null;
  save() {
    if (this.selectedGame) {
      this.evento.game = [this.selectedGame];
    }
    this.evento.user = [this.loginService.jwtDecode() as User]
    if (this.evento.id > 0) {
      this.eventService.update(this.evento, this.evento.id).subscribe({
        next: (mensagem) => {
          Swal.fire({
            title: mensagem,
            icon: 'success',
            confirmButtonText: 'Ok',
          });
          this.router.navigate(['main', 'community', 'events-list']);
        },
        error: (erro) => {
          Swal.fire({
            title: 'Ocorreu um erro: ' + erro.error,
            icon: 'error',
            confirmButtonText: 'Ok',
          });
        },
      });
    } else {
      this.eventService.save(this.evento).subscribe({
        next: (mensagem) => {
          Swal.fire({
            title: mensagem,
            icon: 'success',
            confirmButtonText: 'Ok',
          });
        },
        error: (erro) => {
          Swal.fire({
            title: 'Ocorreu um erro: ' + erro.error,
            icon: 'error',
            confirmButtonText: 'Ok',
          });
        },
      });
    }
  }

  findById(id: number) {
    this.eventService.findById(id).subscribe({
      next: (retorno) => {
        this.evento = retorno;
      },
      error: (erro) => {
        Swal.fire({
          title: 'Ocorreu um erro: ' + erro.error,
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      },
    });
  }
  findAllGames() {
    this.gameService.findAllGames().subscribe({
      next: jogo => {
        this.games = jogo;
      },
      error: erro => {
        console.log(erro.error)
      }
    })
  }
}

