import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { FighterService } from '../../../../service/fighter.service';
import { GameService } from '../../../../service/game.service';
import { Game } from '../../../../model/game';
import { Fighter } from '../../../../model/fighter';
import { LoginService } from '../../../../auth/login.service';

@Component({
  selector: 'app-fighter-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './fighter-list.component.html',
  styleUrl: './fighter-list.component.scss'
})
export class FighterListComponent implements OnInit {
  @Input() modalMode! : boolean;
  @Input() sigla!: string;
  @Output("fighter") fighter = new EventEmitter<Fighter>();

  ngOnInit(): void {
    this.findGameBySigla(this.sigla)
  }
  user: User = new User();
  game: Game = new Game();

  router = inject(Router);
  fighterService = inject(FighterService)
  gameService = inject(GameService)
  loginService = inject(LoginService)

  constructor() {
  }

  characters: Fighter[] = [];

  goToFighter(name: string) {
    this.router.navigate(['main', "fighter", name])
  }

  findGameBySigla(sigla: string) {
    this.gameService.findBySigla(sigla).subscribe({
      next: gam => {
        this.game = gam;
        this.findAllFighters()
      },
      error: erro => {
        Swal.fire({
          title: erro.error,
          icon: "error"
        })
      }
    }) 
  }

  findAllFighters() {
    this.fighterService.findByGameNome(this.game.nome).subscribe({
      next: char => {
        this.characters = char;
      },
      error: erro => {
        Swal.fire({
          title: erro.error,
          icon: "error"
        })
      }
    })
  }

  deleteCharacter(delCharacter: Fighter) {
    Swal.fire({
      title: "Tem certeza que deseja deletar o personagem: " + delCharacter.nome + "?",
      showCancelButton: true,
      confirmButtonText: "Sim",
      cancelButtonText: `Cancelar`
    }).then((result) => {
      if (result.isConfirmed) {
        this.fighterService.delete(delCharacter.id).subscribe({
          next: mensagem => {
            Swal.fire(mensagem, "", "success");
            this.findAllFighters();
          },
          error: erro => {
            Swal.fire({
              title: erro.error,
              icon: "error"
            })
          }
        });
      }
    });
  }

  retorno(character: Fighter){
    this.fighter.emit(character);
  }
}
