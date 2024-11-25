import { Routes } from '@angular/router';
import { MainComponent } from './components/layout/main/main.component';
import { LoginComponent } from './components/layout/login/login.component';
import { DashboardComponent } from './components/layout/dashboard/dashboard.component';
import { GamesListComponent } from './components/pages/games/games-list/games-list.component';
import { GamesFormsComponent } from './components/pages/games/games-forms/games-forms.component';
import { GamesProfileComponent } from './components/pages/games/games-profile/games-profile.component';
import { FighterListComponent } from './components/pages/fighter/fighter-list/fighter-list.component';
import { FighterFormComponent } from './components/pages/fighter/fighter-form/fighter-form.component';
import { FighterComponent } from './components/pages/fighter/fighter/fighter.component';
import { CommunityComponent } from './components/pages/community/community.component';
import { EventsFormComponent } from './components/pages/Events/events-form/events-form.component';
import { EventsListComponent } from './components/pages/Events/events-list/events-list.component';
import { GuideFormComponent } from './components/layout/guide/guide-form/guide-form.component';
import { GuideListComponent } from './components/layout/guide/guide-list/guide-list.component';
import { UserFormComponent } from './components/layout/user/user-form/user-form.component';
import { UserListComponent } from './components/layout/user/user-list/user-list.component';
import { GuideComponent } from './components/layout/guide/guide/guide.component';
import { loginGuard } from './auth/login.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'main', component: MainComponent, children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'games', component: GamesListComponent },
      { path: 'games/cadastro', component: GamesFormsComponent },
      { path: 'games/edit/:id', component: GamesFormsComponent },
      { path: 'games/:sigla', component: GamesProfileComponent },
      { path: 'fighter-list', component: FighterListComponent },  
      { path: 'fighter-form/:sigla/new', component: FighterFormComponent },
      { path: 'fighter/:name', component: FighterComponent },
      { path: 'fighter-form/edit/:name', component: FighterFormComponent },
      { path: 'guide-form', component: GuideFormComponent },
      { path: 'guide-list', component: GuideListComponent },
      { path: 'guide/:id', component: GuideComponent },
      { path: 'user-form', component: UserFormComponent },
      { path: 'user-list', component: UserListComponent },
      {path: 'community',component: CommunityComponent,children: [
          { path: 'event-form', component: EventsFormComponent },
          { path: 'event-form/edit/:id', component: EventsFormComponent },
          { path: 'event-list', component: EventsListComponent },
        ],
      },
      
    ],
  },
];
