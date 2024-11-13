import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { FighterService } from '../../../../service/fighter.service';
import { User } from '../../../../model/user';
import { GameService } from '../../../../service/game.service';
import { Game } from '../../../../model/game';
import { Fighter } from '../../../../model/fighter';

@Component({
  selector: 'app-fighter-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './fighter-list.component.html',
  styleUrl: './fighter-list.component.scss'
})
export class FighterListComponent {

  @Output("fighter") fighter = new EventEmitter<Fighter>();

  @Input()sigla!: string;
  user: User = new User();

  router = inject(Router);
  fighterService = inject(FighterService)

  game: string = 'BBCF';

  constructor() {
    this.user.isMod = true;
    this.findAllFighters()
  }

  characters: Fighter[] = [];

  goToFighter(name: string) {
    this.router.navigate(['main', "fighter", name])
  }

  findAllFighters() {
    this.fighterService.findByGameNome(this.game).subscribe({
      next: char => {
        this.characters = char;
      },
      error: erro => {
        console.log(erro.error)
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
            alert(erro.error);
          }
        });
      }
    });
  }

}
