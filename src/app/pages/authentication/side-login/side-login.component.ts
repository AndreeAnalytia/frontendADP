import { Component } from '@angular/core';
import { CoreService } from 'src/app/services/core.service';
import { Router } from '@angular/router';
import { LoginService } from '../../../login.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
@Component({
  selector: 'app-side-login',
  templateUrl: './side-login.component.html',
  providers: [LoginService,MatInputModule,
    MatFormFieldModule,],
})
export class AppSideLoginComponent {
  options = this.settings.getOptions();
  msg = '';
  user: any;
  role:string='';
  constructor(
    private settings: CoreService,
    private service: LoginService,
    private routes: Router
  ) {}

  async check(uname: string, p: string) {
    const output = <any>await this.service.checkusernameandpassword(uname, p);
    window.localStorage.setItem('iduser',<string>output.user?.user.id);
    if (output.status === true ) {
      this.routes.navigate(['/starter'])

       } else {
      this.msg = <string>output.message;
    }
  }
}
