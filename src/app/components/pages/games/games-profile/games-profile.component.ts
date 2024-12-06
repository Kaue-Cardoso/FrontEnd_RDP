import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { GameService } from '../../../../service/game.service';
import { Game } from '../../../../model/game';
import { FighterListComponent } from '../../fighter/fighter-list/fighter-list.component';

@Component({
  selector: 'app-games-profile',
  standalone: true,
  imports: [MdbCollapseModule, FighterListComponent],
  templateUrl: './games-profile.component.html',
  styleUrl: './games-profile.component.scss'
})
export class GamesProfileComponent {

  rotaAtual = inject(ActivatedRoute);
  gameService = inject(GameService);

  router = inject(Router);

  game: Game = new Game();

  sigla: string;

  voltarAoInicio(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  constructor() {
    this.sigla = this.rotaAtual.snapshot.params['sigla']
    this.findBySigla(this.sigla);
  }

  findBySigla(sigla: string) {
    this.gameService.findBySigla(sigla).subscribe({
      next: char => {
        this.game = char;
      },
      error: erro => {
        alert('Jogo Não Encontrado');      }
    })
  }
  irParaGuias(): void {
    this.router.navigate(['/main/guides', this.sigla]);
  }
  irParaEventos(): void {
    this.router.navigate(['/main/community/event-list']);
  }
  

}





