import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import ClientAPI from 'src/app/services/client.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppBreadcrumbComponent } from 'src/app/layouts/full/shared/breadcrumb/breadcrumb.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-side-reset',
  templateUrl: './side-reset.component.html',
  styleUrls: ['./side-reset.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule,
    FormsModule,
  ],
})
export class SideResetComponent implements OnInit {
  password: string = '';
  confirmPassword: string = '';
  token: string | null = null;
  showErrorMessage: boolean = false;
  messageError: string = '';
  client = new ClientAPI(this.routes);
  constructor(
    private routes: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  async ngOnInit() {
    this.token = this.route.snapshot.paramMap.get('token');
  }

  handleSubmit(event: Event) {
    event.preventDefault();
    this.resetPassword(this.password, this.confirmPassword);
  }

  async resetPassword(pass1: string, pass2: string) {
    if (!this.token) {
      this.showErrorMessage = true;
      this.messageError = 'Token inválido.';
      this.showAlert('Error', this.messageError, 'error');
      return;
    }

    if (pass1 !== pass2) {
      this.showErrorMessage = true;
      this.messageError = 'Las contraseñas no coinciden.';
    } else {
      this.showErrorMessage = false;
      this.messageError = '';
      try {

        await this.client.resetPassword(this.token, pass1);

        this.showAlert('Éxito', 'La contraseña ha sido restablecida exitosamente.', 'success');
        this.routes.navigate(['/authentication/side-login']);
      } catch (error) {
        this.messageError = 'Hubo un error al restablecer la contraseña.';
        this.showErrorMessage = true;
        this.showAlert('Error', this.messageError, 'error');
      }
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
