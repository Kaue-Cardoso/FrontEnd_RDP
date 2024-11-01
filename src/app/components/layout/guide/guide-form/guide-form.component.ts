import { Component, Inject, inject, Input, input, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { FighterListComponent } from '../../../pages/fighter/fighter-list/fighter-list.component';
import { Guide } from '../../../../model/guide';
import { Router } from 'express';
import { GuideService } from '../../../../service/guide.service';
import { Fighter } from '../../../../model/fighter';
import { Game } from '../../../../model/game';
import Swal from 'sweetalert2';




@Component({
  selector: 'app-guide-form',
  standalone: true,
  imports: [MdbFormsModule, FormsModule, MdbDropdownModule, MdbModalModule, FighterListComponent],
  templateUrl: './guide-form.component.html',
  styleUrl: './guide-form.component.scss'
})
export class GuideFormComponent {
  guide: Guide = new Guide();
  router = inject(Router);

  guideService = inject(GuideService);

  fighters : Fighter [] = [];
  games : Game [] = [];
  constructor(){
    
  }

  save(){
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

  
}