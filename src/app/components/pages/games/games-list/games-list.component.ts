import { Component, inject, Output, EventEmitter, Input } from '@angular/core';
import { GameService } from '../../../../service/game.service';
import { Router } from '@angular/router';
import { Game } from '../../../../model/game';
import { MdbModalRef,} from 'mdb-angular-ui-kit/modal';
import { LoginService } from '../../../../auth/login.service';

@Component({
  selector: 'app-games-list',
  standalone: true,
  imports: [],
  templateUrl: './games-list.component.html',
  styleUrl: './games-list.component.scss'
})
export class GamesListComponent {
  modalRef!: MdbModalRef<any>;
  @Input() modalMode! : boolean;
  @Output("gameSel") gameSel = new EventEmitter<Game>();
  router = inject(Router);
  gameService = inject(GameService);

  constructor(){
    this.findAllGames();
  }

  games: Game[] = [];

  goToGame(sigla: string){
    this.router.navigate(['main',"games", sigla])
  }

  findAllGames(){
    this.gameService.findAllGames().subscribe({
      next: jogo => {
        this.games = jogo;
      },
      error: erro => {
        console.log(erro.error)
      }
    })
  }
  
  selecionarGame(game : Game){
    this.gameSel.emit(game);
  }
}
