import {
  Component,
  Output,
  EventEmitter,
  Input,
  ViewEncapsulation,OnInit, HostListener, ElementRef
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { TablerIconsModule } from 'angular-tabler-icons';
import { FormsModule } from '@angular/forms';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { NgFor, NgIf } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ModalAddComponent } from 'src/app/pages/modal-add/modal-add.component';

@Component({
  selector: 'app-horizontal-header',
  standalone: true,
  imports: [
    FormsModule,
    RouterModule, 
    NgScrollbarModule, 
    TablerIconsModule, 
    MaterialModule, 
    IonicModule,
    NgFor, 
    CommonModule,
    NgIf ],
  templateUrl: './header.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class AppHorizontalHeaderComponent implements OnInit {
  @Input() showToggle = true;
  @Input() toggleChecked = false;
  @Output() toggleMobileNav = new EventEmitter<void>();
  @Output() toggleMobileFilterNav = new EventEmitter<void>();
  @Output() toggleCollapsed = new EventEmitter<void>();

  async ngOnInit(){

  }

  constructor(
    public dialog: MatDialog,
    private routes: Router 
  ) {
  }

}
