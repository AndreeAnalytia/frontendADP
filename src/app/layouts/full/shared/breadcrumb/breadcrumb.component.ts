import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ModalUserComponent } from 'src/app/pages/modal-user/modal-user.component';
import { ModalAddComponent } from 'src/app/pages/modal-add/modal-add.component';

import {
  NgApexchartsModule,
} from 'ng-apexcharts';
import { NgForOf, NgIf } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports:[
    NgApexchartsModule, 
    RouterModule, 
    NgIf, 
    NgForOf],
  templateUrl: './breadcrumb.component.html',
  styleUrls: [],
})
export class AppBreadcrumbComponent {
  @Input() text:string;
  @Input() isButtonUser:boolean;
  @Input() isButtonClaveSol:boolean;
  @Input() userId:string;

  constructor(
    public dialog: MatDialog,
  ) {
  }
  openDialogUser() {
   this.dialog.open(ModalUserComponent,{
      data:{
        code:'ADD'
      }
    });
  }
  openDialogClaveSol() {
    this.dialog.open(ModalAddComponent,{
       data:{
         code:'ADD',
         id:this.userId
       }
     });
   }
}
