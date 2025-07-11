import {
  Component,
  Output,
  EventEmitter,
  Input,
  ViewEncapsulation,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { TablerIconsModule } from 'angular-tabler-icons';
import { FormsModule } from '@angular/forms';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { BrandingComponent } from '../sidebar/branding.component';
import { NgFor, NgIf } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import ClientAPI from 'src/app/services/client.service';
import authAPI from 'src/app/services/auth.service';
const auth = new authAPI();

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    FormsModule,
    RouterModule,
    NgScrollbarModule,
    TablerIconsModule,
    MaterialModule,
    BrandingComponent,
    IonicModule,
    NgFor,
    CommonModule,
    NgIf,
  ],
  templateUrl: './header.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit {
  constructor(public dialog: MatDialog, private routes: Router) {}
  @Input() showToggle = true;
  @Input() toggleChecked = false;
  @Output() toggleMobileNav = new EventEmitter<void>();
  @Output() toggleMobileFilterNav = new EventEmitter<void>();
  @Output() toggleCollapsed = new EventEmitter<void>();
  nameUser: string;
  emailUser: string;
  idUser: string;
  token:string;
  admin:boolean;
  async ngOnInit() {
    const client = new ClientAPI(this.routes);
    const id = <string>window.localStorage.getItem('iduser');
    try {
      const managerUser = await client.getById(id);
      this.nameUser = managerUser.data.name;
      this.emailUser = managerUser.data.email;
      this.token = managerUser.data.token;
      this.admin = managerUser.data.isAdmin;
      if(managerUser.data.isAdmin){
        this.routes.navigate(['/starter']);
      }else{
        this.routes.navigate(['/users-clavesol']);
      }
    } catch (error) {
      console.log(error);
      if (error === 401) {
        await auth.signout();
      } else {
        console.error('Error al obtener datos del usuario:', error);
      }
    }
  }

  async signOut() {
    await auth.signout();
  }
}
