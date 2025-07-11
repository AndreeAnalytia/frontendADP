import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import ClientAPI from 'src/app/services/client.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-side-register',
  templateUrl: './side-register.component.html',
  styleUrls: ['./side-register.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule,
    FormsModule,
  ],
})
export class SideRegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  showErrorMessage: boolean = false;
  messageError: string = '';

  constructor(private router: Router) {}
  client = new ClientAPI(this.router);

  async registerUser(name: string, email: string, pass: string) {
    try {
      await this.client.userCreate(name, email, pass);
      this.showAlert('Éxito', 'La cuenta ha sido creada exitosamente.', 'success');
      this.router.navigate(['/authentication/side-login']);
    } catch (error) {
      this.showAlert('Error', 'Hubo un problema al crear la cuenta.', 'error');
    }
  }

  async isEmailValid(email: string): Promise<boolean> {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const test = emailPattern.test(email);
    if (test) {
      const data = await this.client.verifyEmailUserRegister(email);
      if (data.data) {
        this.messageError = 'El email ya existe en otra cuenta.';
        return false;
      } else {
        this.messageError = '';
        return true;
      }
    } else {
      this.messageError = 'Email inválido.';
      return false;
    }
  }

  async hideError(email: string) {
    this.showErrorMessage = !(await this.isEmailValid(email));
  }

  showAlert(title: string, text: string, icon: 'success' | 'error') {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
      confirmButtonText: 'Aceptar'
    });
  }
}
