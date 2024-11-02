import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { Fighter } from '../../../../model/fighter';
import { GameService } from '../../../../service/game.service';
import { FighterService } from '../../../../service/fighter.service';

@Component({
  selector: 'app-fighter-form',
  standalone: true,
  imports: [MdbFormsModule, FormsModule, RouterLink],
  templateUrl: './fighter-form.component.html',
  styleUrl: './fighter-form.component.scss'
})

export class FighterFormComponent {

  fighter: Fighter = new Fighter();

  tituloComponente = "Criar Novo Personagem"

  gameService = inject(GameService)
  router = inject(Router)
  activatedRoute = inject(ActivatedRoute)
  fighterService = inject(FighterService)

  name!: string; 

  constructor() {
    let name = this.activatedRoute.snapshot.params['name']
    let sigla = this.activatedRoute.snapshot.params['sigla']

    this.findGameBySigla(sigla)

    if (name != null) {
      this.findByNome(name);
      this.tituloComponente = "Editar Personagem"
    }
  }

  findGameBySigla(sigla: string) {
    this.gameService.findBySigla(sigla).subscribe({
      next: gam => {
        this.fighter.game = gam;
      },
      error: erro => {
        Swal.fire({
          title: erro.error,
          icon: "error"
        })
      }
    }) 
  }

  findByNome(nome: string) {
    this.fighterService.findByNome(nome).subscribe({
      next: char => {
        this.fighter = char;
      },
      error: erro => {
        console.log(erro.error)
      }
    })
  }

  editar() {
    this.fighterService.editar(this.fighter).subscribe({
      next: msg => {
        Swal.fire({
          title: msg,
          icon: "success"
        }).then(() => {
          this.router.navigate(['main', 'games', this.fighter.game.sigla]);
        });
      },
      error: erro => {
        Swal.fire({
          title: erro.error,
          icon: "error"
        }).then(() => {
          this.router.navigate(['main', 'games', this.fighter.game.sigla]);
        });
      }
    })
  }

  salvar() {
    this.fighterService.salvar(this.fighter).subscribe({
      next: msg => {
        Swal.fire({
          title: msg,
          icon: "success"
        }).then(() => {
          this.router.navigate(['main', 'games', this.fighter.game.sigla]);
        });
      },
      error: erro => {
        Swal.fire({
          title: erro.error,
          icon: "error"
        })
      }
    })
  }

}
