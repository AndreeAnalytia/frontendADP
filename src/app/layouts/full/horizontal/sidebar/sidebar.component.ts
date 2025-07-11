import {
  Component,
  OnInit,
  Input,
  ChangeDetectorRef,
  OnChanges,
} from '@angular/core';
import { navItems } from './sidebar-data';
import { Router } from '@angular/router';
import { NavService } from '../../../../services/nav.service';
import { MediaMatcher } from '@angular/cdk/layout';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';
import { CommonModule } from '@angular/common';
import { AppHorizontalNavItemComponent } from './nav-item/nav-item.component';
import { NavItem } from '../../vertical/sidebar/nav-item/nav-item';
import clientAPI from 'src/app/services/client.service';

@Component({
  selector: 'app-horizontal-sidebar',
  standalone: true,
  imports: [CommonModule, TablerIconsModule, MaterialModule, AppHorizontalNavItemComponent],
  templateUrl: './sidebar.component.html',
})
export class AppHorizontalSidebarComponent implements OnInit {
  navItems = navItems;
  parentActive = '';
  items:NavItem[];
  role:string;
  mobileQuery: MediaQueryList;
  client = new clientAPI(this.routes);
  private _mobileQueryListener: () => void;
 
  constructor(
    public navService: NavService,
    public router: Router,
    media: MediaMatcher,
    changeDetectorRef: ChangeDetectorRef,
    private routes: Router
  ) {
    this.mobileQuery = media.matchMedia('(min-width: 1100px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.router.events.subscribe(
      () => (this.parentActive = this.router.url.split('/')[1])
    );
  }

  async ngOnInit() {
    const id = <string>window.localStorage.getItem('iduser');
    const user=await this.client.getById(id);
    this.navItems=user.data.isAdmin? navItems.filter(q=>q.displayName!=='Gestión Usuarios ClaveSol' && q.displayName!=='Estadisticas'):navItems.filter(q=>q.displayName!=='Gestión de Usuarios' && q.displayName!=='Gestión de Logs' && q.displayName!=='Estadisticas Generales');
    this.items=this.navItems
  }
}
