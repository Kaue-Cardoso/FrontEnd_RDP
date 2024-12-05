import { Component, inject, TemplateRef, ViewChild, viewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MdbModalRef, } from 'mdb-angular-ui-kit/modal';
import { Guide } from '../../../../model/guide';
import { GuideService } from '../../../../service/guide.service';
import { LoginService } from '../../../../auth/login.service';



@Component({
  selector: 'app-guide-list',
  standalone: true,
  imports: [],
  templateUrl: './guide-list.component.html',
  styleUrl: './guide-list.component.scss'
})
export class GuideListComponent {
  lista: Guide[] = [];
  sigla: string;

  guideService =  inject (GuideService);
  loginService = inject(LoginService)
  router = inject(Router);
  rotaAtual = inject(ActivatedRoute);

  
  @ViewChild('selecionaFighter') selecionaFighter!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

  constructor(){
    this.sigla = this.rotaAtual.snapshot.params['sigla'];
    this.findAllByGame(this.sigla);
  }

  goToGuide(id: number){
    this.router.navigate(['main',"guide", id])
  }


  findAllByGame(sigla: string): void {
    this.guideService.getAllGuidesByGames(sigla).subscribe({
      next: (lista) => {
        this.lista = lista;
      },
      error: (erro) => {
        console.error('Erro ao carregar guias:', erro);
      },
    });
  }
  
  // edit(id: number): void {
  //   this.router.navigate([`admin/guide/${id}`]);
  // }
  
  deletar(guide: Guide) {
    Swal.fire({
      title: 'Tem certeza?',
      text: `Deseja deletar o guia ${guide.titulo}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, deletar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.guideService.delete(guide.id).subscribe({
          next: mensagem => {
            Swal.fire({
              title: mensagem,
              text: `O eleitor ${guide.titulo} foi deletado com sucesso.`,
              icon: 'success',
              confirmButtonText: 'Ok'
            });
          },
          error: erro => {
            Swal.fire({
              title: "Erro ao Deletar",
              text: 'Não foi possível deletar o guia.',
              icon: 'error',
              confirmButtonText: 'Ok'
            });
          }
        });
      }
    });
  }

  
}
