import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule, Router } from '@angular/router';
import Swal from 'sweetalert2';
import ClientAPI from 'src/app/services/client.service';

@Component({
  selector: 'app-side-recovery',
  templateUrl: './side-recovery.component.html',
  styleUrls: ['./side-recovery.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule,
  ],
})
export class SideRecoveryComponent {
  email: string = '';

  constructor(private router: Router) {}
  client = new ClientAPI(this.router);

  async sendEmail(email: string) {
    try {
      const response = await this.client.forgotPassword(email);
      if (!response.findUser) {
        this.showAlert('Error', 'No existe un usuario con ese correo electrónico.', 'error');
      } else {
        this.showAlert('Éxito', 'El correo electrónico de recuperación ha sido enviado.', 'success');
        this.router.navigate(['/authentication/side-login']);
      }
    } catch (error) {
      this.showAlert('Error', 'Hubo un problema al enviar el correo electrónico.', 'error');
    }
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
