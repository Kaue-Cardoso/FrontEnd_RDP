import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GuideService } from '../../../../service/guide.service';
import { Guide } from '../../../../model/guide';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-guide',
  standalone: true,
  imports: [],
  templateUrl: './guide.component.html',
  styleUrl: './guide.component.scss'
})
export class GuideComponent {

  activatedRoute = inject(ActivatedRoute);
  guideService = inject(GuideService)

  colors: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];
  guide: Guide = new Guide();

  constructor() {
    let id = this.activatedRoute.snapshot.params['id']
    this.findById(id);
  }

  findByTitulo(titulo: string) {
    this.guideService.findByTitulo(titulo).subscribe({
      next: gd => {
        this.guide = gd;
      },
      error: erro => {
        console.log(erro.error)
      }
    })
  }

  findById(id : number){
    this.guideService.findById(id).subscribe({
      next: gd => { 
        this.guide = gd;
      },
      error: erro => { 
        Swal.fire({
          title: erro,
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }
    });
  
  }

}
