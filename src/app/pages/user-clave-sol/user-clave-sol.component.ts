import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import clientAPI from 'src/app/services/client.service';
import { AppBreadcrumbComponent } from 'src/app/layouts/full/shared/breadcrumb/breadcrumb.component';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { ModalAddComponent } from '../modal-add/modal-add.component';
import { Router, NavigationExtras } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-clavesol',
  templateUrl: './user-clave-sol.component.html',
  styleUrls: ['./user-clave-sol.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    AppBreadcrumbComponent,
    FormsModule,
  ],
})
export class ClaveSolComponent implements OnInit {
  client = new clientAPI(this.routes);
  num = 1;
  pagination: string;
  paginationTotal: number;
  input: string;
  receivedData: any;
  id:string
  @ViewChild('input') miInput: ElementRef;

  constructor(public dialog: MatDialog, private routes: Router) {
    const navigation = this.routes.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.receivedData = navigation.extras.state['data'];
      this.id=this.receivedData._id
    }
  }

  displayedColumns: string[] = [
    'name',
    'username',
    'password',
    'ruc',
    'token',
    'status',
    'compra',
    'venta',
    'nuevaconsulta',
    'rh',
    'accion'
  ];
  dataSource = new MatTableDataSource<any>();

  async ngOnInit() {
    const newListClients = await this.list(this.num);
    this.dataSource.data = newListClients;
  }

  async list(num: number) {
    const id= this.id?this.id:<string>window.localStorage.getItem('iduser');
    const listClients = <any>(
      await this.client.getUserClaveSol(id, num, this.input)
    );
    console.log(listClients)
    const newListClients = <any[]>listClients.data;
    const list = newListClients.map((q) => {
      const pass = this.maskPassword(q.password);
      if (q.status === true) {
        const statusName = 'Activo';
        return { ...q, statusName, pass };
      } else {
        const statusName = 'Inactivo';
        return { ...q, statusName, pass };
      }
    });
    const pagination = this.getPageRange(listClients.pagination);
    this.pagination = pagination;
    this.paginationTotal = listClients.pagination.totalCount;
    return list;
  }

  formatDate = (date: Date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  async next() {
    if (this.dataSource.data.length > 9) {
      const listClients = await this.list(this.num + 1);
      if (listClients.length > 0) {
        this.num = this.num + 1;
        this.dataSource.data = listClients;
      }
    }
  }

  maskPassword(password: string, visibleLength = 3) {
    if (password.length <= visibleLength) {
      return password;
    }
    const visiblePart = password.slice(0, visibleLength);
    const maskedPart = '*'.repeat(password.length - visibleLength);
    return visiblePart + maskedPart;
  }

  async previous() {
    if (this.num > 1) {
      const listClients = await this.list(this.num - 1);
      this.num = this.num - 1;
      this.dataSource.data = listClients;
    }
  }

  getPageRange = (pagination: any): string => {
    const { page, pageSize, pageCount, totalCount } = pagination;
    if (pageCount === 0) return '0 - 0';
    const maxRange = page === pageCount ? totalCount : pageSize * page;
    const minRange = pageSize * (page - 1) + 1;
    this.pagination = `${minRange} - ${maxRange}`;
    return this.pagination;
  };
  navigate(data: any) {
    const navigationExtras: NavigationExtras = {
      state: { data },
    };
    this.routes.navigate(['/list'], navigationExtras);
  }

  openDialogEdit(
    name: string,
    username: string,
    id: string,
    password: number,
    ruc: number,
    status: boolean,
    token: string,
    buy: boolean,
    sale: boolean,
    newquery:boolean,
    rh:boolean
  ) {
    this.dialog.open(ModalAddComponent, {
      data: {
        token,
        name,
        username,
        id,
        password,
        ruc,
        status,
        buy,
        sale,
        newquery,
        rh,
        code: 'EDIT',
      },
    });
  }

  openDialogDelete(name: string, id: string) {
    this.dialog.open(ModalAddComponent, {
      data: {
        name,
        id,
        code: 'DELETE',
      },
    });
  }

  async searchByInput(text: string) {
    this.input = text;
    const listClients = await this.list(this.num);
    this.dataSource.data = listClients;
  }
}
