import { Component, OnInit } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { AppBreadcrumbComponent } from 'src/app/layouts/full/shared/breadcrumb/breadcrumb.component';
import { CommonModule } from '@angular/common';
import ClientAPI from 'src/app/services/client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-url-services',
  templateUrl: './url-services.component.html',
  styleUrls: ['./url-services.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    AppBreadcrumbComponent,
  ],
})
export class UrlServicesComponent implements OnInit {
  linkConsult: string;
  linkCreate: string;
  bodyConsult:string;
  bodyCreate:string;
  linkDoc:string;

  constructor(private routes: Router) {}

  async ngOnInit() {
    this.linkConsult = `https://server-datafact.analytia.pe/api/consult/`;
    this.bodyConsult= `{"serie":"E001","number":"11","rucEmisor":"20138645941","token":"EJEMPLO"}`
    this.linkCreate = `https://server-datafact.analytia.pe/api/create-userclavesol-public/`;
    this.bodyCreate= `{"name":"TEST","username":"TEST", "password":"test123", "token":"EJEMPLO","ruc":"12345678919","sale":true,"buy":true,"newquery":true}`
    this.linkDoc='https://documenter.getpostman.com/view/19411714/2sAXjSy8tT'
  }
}
