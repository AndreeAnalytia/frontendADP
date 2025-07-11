import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import clientAPI from 'src/app/services/client.service';
import { AppBreadcrumbComponent } from 'src/app/layouts/full/shared/breadcrumb/breadcrumb.component';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { ModalUserComponent } from '../modal-user/modal-user.component';
import { Router, NavigationExtras } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-starter',
  templateUrl: './starter.component.html',
  styleUrls: ['./starter.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    AppBreadcrumbComponent,
    FormsModule,
  ],
})
export class StarterComponent implements OnInit {
  client = new clientAPI(this.routes);
  num = 1;
  pagination: string;
  paginationTotal: number;
  input: string;
  @ViewChild('input') miInput: ElementRef;

  constructor(public dialog: MatDialog, private routes: Router) {}

  displayedColumns: string[] = [
    'name',
    'email',
    'token',
    'status',
    'accion',
    'lista'
  ];
  dataSource = new MatTableDataSource<any>();

  async ngOnInit() {
    const newListClients = await this.list(this.num);
    this.dataSource.data = newListClients;
  }

  async list(num: number) {
    const listClients = <any>(
      await this.client.getUsers(num, this.input)
    );
    const newListClients = <any[]>listClients.data;
    const list = newListClients.map((q) => {
      if (q.status === true) {
        const statusName = 'Activo';
        return { ...q, statusName };
      } else {
        const statusName = 'Inactivo';
        return { ...q, statusName };
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
    email: string,
    id: string,
    password: number,
    status: boolean,
    token: string
  ) {
    this.dialog.open(ModalUserComponent, {
      data: {
        token,
        name,
        email,
        id,
        password,
        status,
        code: 'EDIT',
      },
    });
  }

  openDialogDelete(name: string, id: string) {
    this.dialog.open(ModalUserComponent, {
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
