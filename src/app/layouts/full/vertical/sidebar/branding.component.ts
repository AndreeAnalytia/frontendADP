import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CoreService } from 'src/app/services/core.service';
@Component({
  selector: 'app-branding',
  standalone: true,
  imports: [RouterModule],
  template: `
    <!-- <div class="branding d-none d-lg-flex align-items-center">
      <a [routerLink]="['/']" class="d-flex"> -->
        <!-- <img
          src="./assets/images/logos/log_analytia.svg"
          class="align-middle m-2"
          alt="logo"
        /> -->
      <!-- </a>
    </div> -->
  `,
})
export class BrandingComponent implements OnInit {
  options = this.settings.getOptions();

  constructor(private settings: CoreService) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}
