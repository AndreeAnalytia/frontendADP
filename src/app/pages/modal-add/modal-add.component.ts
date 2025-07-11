import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import ClientAPI from 'src/app/services/client.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router,NavigationExtras } from '@angular/router';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-modal-add',
  templateUrl: './modal-add.component.html',
  styleUrls: ['./modal-add.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    MaterialModule,
    MatTableModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatSelectModule,
    MatInputModule,
    MatTooltipModule,
    CommonModule,
  ],
})
export class ModalAddComponent implements OnInit {
  client = new ClientAPI(this.routes);
  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ModalAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private routes: Router
  ) {}
  selected: string = '';
  errorMessageRuc: string;
  showErrorMessage: boolean;
  showErrorMessageRuc:boolean;
  selectedUpdate: string = '';
  isActiveUpdate: boolean;
  id: string;
  token: string;
  checkedCompra = false;
  checkedVenta = false;
  checkedNewQuery = false;
  checkedCompraUpdated: boolean;
  checkedVentaUpdated: boolean;
  checkedNewQueryUpdated: boolean;
  messageError: string;
  nameRazSocial:string='';
  checkedRh=false;
  checkedRhUpdated=false;

  async ngOnInit() {
    this.selectedUpdate = this.data?.status ? 'Activo' : 'Inactivo';
    this.id = this.data.id;
    this.selected = 'Activo';
    this.isActiveUpdate = this.data.status;
    this.token = this.data.token;
    this.checkedCompraUpdated = this.data.buy;
    this.checkedVentaUpdated = this.data.sale;
    this.checkedNewQueryUpdated = this.data.newquery;
    this.nameRazSocial = this.data?.name || '';
    this.checkedRhUpdated=this.data?.rh;
  }

  onCheckboxChangeCompra() {
    this.checkedCompra = !this.checkedCompra;
  }

  onCheckboxChangeVenta() {
    this.checkedVenta = !this.checkedVenta;
  }
  onCheckboxChangeNewQuery() {
    this.checkedNewQuery = !this.checkedNewQuery;
  }
  onCheckboxChangeRh() {
    this.checkedRh = !this.checkedRh;
  }
  onCheckboxChangeCompraUpdated() {
    this.checkedCompraUpdated = !this.checkedCompraUpdated;
  }
  onCheckboxChangeNewQueryUpdated() {
    this.checkedNewQueryUpdated = !this.checkedNewQueryUpdated;
  }
  onCheckboxChangeRhUpdated() {
    this.checkedRhUpdated = !this.checkedRhUpdated;
  }

  onCheckboxChangeVentaUpdated() {
    this.checkedVentaUpdated = !this.checkedVentaUpdated;
  }

  onSelection() {
    if (this.selectedUpdate === 'Activo') {
      this.isActiveUpdate = true;
    } else {
      this.isActiveUpdate = false;
    }
  }
  async createManager(
    name: string,
    username: string,
    password: string,
    ruc: string
  ) {
    const id =this.id?this.id: <string>window.localStorage.getItem('iduser');
    await this.client.userClaveSolCreate(
      name,
      username,
      password,
      ruc,
      id,
      this.checkedCompra,
      this.checkedVenta,
      this.checkedNewQuery,
      this.checkedRh
    );
    this.dialogRef.close();
    window.location.reload(); 
  }

  async selects(newItem: any) {
    this.selected = newItem.code;
  }

  async isRucUsernameValid(ruc: string, username:string) {
    const idUser=<string>window.localStorage.getItem('iduser');
    const user=await this.client.getById(idUser);
    const id=user.data.isAdmin?this.id:idUser;
    const data = await this.client.verifyRuc(id, ruc, username);
    if(data.data){
      this.showErrorMessage=true;
      this.messageError = 'El ruc y username ya existen en tus Usuarios Clave Sol';
    }else{
      this.showErrorMessage=false;
    }
  }

  async hideErrorRuc(ruc: string) {
    const numberPattern = /^(10|20)\d{9}$/;
    const test = numberPattern.test(ruc);
    if(!test){
      this.showErrorMessageRuc=true;
      this.errorMessageRuc = 'El ruc es inválido.';
    }else{
      this.showErrorMessageRuc=false;
      const data = await this.client.consultRuc(ruc);
      this.nameRazSocial= data.razSocial
    }
  }

  async modifyManager(
    name: string,
    username: string,
    password: string,
    ruc: string
  ) {
    try {
      await this.client.userClaveSolUpdate(
        this.id,
        name,
        username,
        this.isActiveUpdate,
        password,
        ruc,
        this.token,
        this.checkedCompraUpdated,
        this.checkedVentaUpdated,
        this.checkedNewQueryUpdated,
        this.checkedRhUpdated
      );
      this.dialogRef.close();
      window.location.reload();
    } catch (error: any) {
      console.error(error);
    }
  }

  async generateToken() {
    try {
      const token = await this.client.generateNewToken();
      this.token = token.data;
    } catch (error: any) {
      console.error(error);
    }
  }

  async deleteClient() {
    try {
      await this.client.userClaveSolDelete(this.id);
      this.dialogRef.close();
      window.location.reload();
    } catch (error: any) {
      console.error(error);
    }
  }

  close() {
    this.dialogRef.close();
    window.location.reload();
  }
}
