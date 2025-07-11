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
import { Router } from '@angular/router';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { getMatIconFailedToSanitizeUrlError } from '@angular/material/icon';

@Component({
  selector: 'app-modal-user',
  templateUrl: './modal-user.component.html',
  styleUrls: ['./modal-user.component.scss'],
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
export class ModalUserComponent implements OnInit {
  client = new ClientAPI(this.routes);
  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ModalUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private routes: Router
  ) {}
  selected: string = '';
  showErrorMessage: boolean;
  selectedUpdate: string = '';
  isActiveUpdate: boolean;
  id: string;
  token: string;
  messageError: string;

  async ngOnInit() {
    this.selectedUpdate = this.data?.status ? 'Activo' : 'Inactivo';
    this.id = this.data.id;
    this.selected = 'Activo';
    this.isActiveUpdate = this.data.status;
    this.token = this.data.token;
  }

  onSelection() {
    if (this.selectedUpdate === 'Activo') {
      this.isActiveUpdate = true;
    } else {
      this.isActiveUpdate = false;
    }
  }
  async createUser(
    name: string,
    email: string,
    password: string,
  ) {
    await this.client.userCreate(
      name,
      email,
      password
    );
    this.dialogRef.close();
    window.location.reload();
  }

  async modifyManager(
    name: string,
    email: string,
    password: string
  ) {
    try {
      await this.client.userUpdate(
        this.id,
        email,
        name,
        this.isActiveUpdate,
        password,
        this.token
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
      await this.client.userDelete(this.id);
      this.dialogRef.close();
      window.location.reload();
    } catch (error: any) {
      console.error(error);
    }
  }

 async isEmailValid(email: string) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const test = emailPattern.test(email);
    if (test) {
      const data = await this.client.verifyEmailUserRegister(email);
      if (data.data) {
        this.showErrorMessage=true
        this.messageError = 'El email ya existe en otra cuenta.';
      } else {
        this.messageError = '';
        this.showErrorMessage=false
      }
    } else {
      this.messageError = 'Email inválido.';
      this.showErrorMessage=true
    
    }
  }

  close() {
    this.dialogRef.close();
    window.location.reload();
  }
}
