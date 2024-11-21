import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import Swal from 'sweetalert2';
import { Login } from '../../../model/login'; 
import { LoginService } from '../../../auth/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,MdbFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  login: Login = new Login();

  router = inject(Router);
  loginService = inject(LoginService)

  autenticar(){
    this.loginService.logar(this.login).subscribe({
      next: token => {
        this.loginService.addToken(token);
        this.router.navigate(['/main/dashboard']);
      },
      error: erro => {
        Swal.fire({
          icon: "error",
          title: erro.error
        })
      }
    })

  }


}
