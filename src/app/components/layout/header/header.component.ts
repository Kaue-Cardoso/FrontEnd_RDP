import { Component, inject, ViewChild } from '@angular/core';
import { MdbDropdownDirective, MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { LoginService } from '../../../auth/login.service';
import { User } from '../../../model/user';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MdbDropdownModule, MdbRippleModule, MdbCollapseModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  loginAtual : User = new User();
  loginService = inject(LoginService);

  constructor(){
    this.loginAtual = this.loginService.jwtDecode() as User;
  }

  @ViewChild('dropdown') dropdown!: MdbDropdownDirective;

  openDropdown() {
    this.dropdown.show();
  }

  closeDropdown() {
    this.dropdown.hide();
  }

  sair() {
    this.loginService.removerToken()
  }

}
