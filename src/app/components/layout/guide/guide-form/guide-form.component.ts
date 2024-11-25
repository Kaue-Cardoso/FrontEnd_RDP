import { Component, inject, TemplateRef, ViewChild, } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { FighterListComponent } from '../../../pages/fighter/fighter-list/fighter-list.component';
import { GamesListComponent } from '../../../pages/games/games-list/games-list.component';
import { Guide } from '../../../../model/guide';
import { Router } from '@angular/router';
import { GuideService } from '../../../../service/guide.service';
import { Fighter } from '../../../../model/fighter';
import { Game } from '../../../../model/game';
import Swal from 'sweetalert2';
import { UserService } from '../../../../service/user.service';

@Component({
  selector: 'app-guide-form',
  standalone: true,
  imports: [MdbFormsModule, FormsModule, MdbModalModule, FighterListComponent, GamesListComponent],
  templateUrl: './guide-form.component.html',
  styleUrl: './guide-form.component.scss'
})
export class GuideFormComponent {
  modalMode: boolean = true;
  guide: Guide = new Guide();
  router = inject(Router);
  character: Fighter = new Fighter();
  jogo: Game = new Game();
  sigla!: string;
  tituloComponente = "Criar Novo Guia"

  guideService = inject(GuideService);
  userService = inject(UserService);

  modalService = inject(MdbModalService);
  @ViewChild('listaFighters') listaFighters!: TemplateRef<any>;
  @ViewChild('listaGames') listaGames!: TemplateRef<any>;

  modalRef!: MdbModalRef<any>;
  constructor() {
    this.findUserId();
  }

  findUserId() {
    this.userService.findById(1).subscribe({
      next: usr => {
        this.guide.user = usr;
      },
      error: erro => {
        console.error(erro);
        alert(erro.error)
        console.log(this.guide);
      }
    })
  }

  save() {
    this.guideService.save(this.guide).subscribe({
      next: mensagem => {
        Swal.fire({
          title: "Guia criado com sucesso!",
          icon: "success"
        }).then(() => {
          this.router.navigate(['guide-list']);
        });
      },
      error: erro => {
        console.error(erro);
        alert(erro.error)
        console.log(this.guide);
      }
    })
  }

  AbreFighter() {
    this.modalMode = true;
    this.modalRef = this.modalService.open(this.listaFighters);
  }

  AbreGame() {
    this.modalMode = true;
    this.modalRef = this.modalService.open(this.listaGames);
  }


  SelecionarGame(game: Game) {
    this.guide.game = game;
    this.sigla = game.sigla;

    if (this.modalRef) {
      this.modalRef.close();
    } else {
      console.error('modalRef não inicializado!');
    }
  }


  SelecionarFighter(fighter: Fighter) {
    this.guide.fighter = fighter;

    if (this.modalRef) {
      this.modalRef.close();
    } else {
      console.error('modalRef não inicializado!');
    }
  }




}