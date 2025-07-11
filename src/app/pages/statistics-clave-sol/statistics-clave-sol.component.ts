import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import clientAPI from 'src/app/services/client.service';
import { AppBreadcrumbComponent } from 'src/app/layouts/full/shared/breadcrumb/breadcrumb.component';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics-clave-sol.component.html',
  styleUrls: ['./statistics-clave-sol.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    AppBreadcrumbComponent,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
  ],
})
export class StatisticsUserClaveSolComponent implements OnInit {
  client = new clientAPI(this.routes);
  num = 1;
  pagination: string;
  paginationTotal: number;
  input: string='';
  @ViewChild('input') miInput: ElementRef;

  months = [
    {
      name: 'All months',
      value: 0,
    },
    {
      name: 'Enero',
      value: 1,
    },
    {
      name: 'Febrero',
      value: 2,
    },
    {
      name: 'Marzo',
      value: 3,
    },
    {
      name: 'Abril',
      value: 4,
    },
    {
      name: 'Mayo',
      value: 5,
    },
    {
      name: 'Junio',
      value: 6,
    },
    {
      name: 'Julio',
      value: 7,
    },
    {
      name: 'Agosto',
      value: 8,
    },
    {
      name: 'Septiembre',
      value: 9,
    },
    {
      name: 'Octubre',
      value: 10,
    },
    {
      name: 'Noviembre',
      value: 11,
    },
    {
      name: 'Diciembre',
      value: 12,
    },
  ];

  selectedMonth: string = '';
  currentMonth: number;
  currentYear: number;
  receivedData: any;
  id:string;
  // input:string='';

  constructor(public dialog: MatDialog, private routes: Router) {
    const currentDate = new Date();
    this.currentMonth = currentDate.getMonth() + 1;
    this.currentYear = currentDate.getFullYear();
    const navigation = this.routes.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.receivedData = navigation.extras.state['data'];
      this.id=this.receivedData.userId
    }
  }
  displayedColumns: string[] = ['user', 'countBuy', 'countBuyFailed', 'countSale','countSaleFailed'];
  dataSource = new MatTableDataSource<any>();

  async ngOnInit() {
    const month =
      this.currentMonth >= 10
        ? this.currentMonth.toString()
        : '0' + this.currentMonth.toString();
    this.selectedMonth = this.currentYear.toString() + '-' + month;
    const newListClients = await this.list(this.num);
    this.dataSource.data = newListClients;
  }
  async onMonthChange() {
    const newListClients = await this.list(this.num);
    this.dataSource.data = newListClients;
  }

  async list(num: number) {
    const monthAndYear = this.selectedMonth.split('-');
    const month = Number(monthAndYear[1]);
    const year = Number(monthAndYear[0]);
    const idUser=<string>window.localStorage.getItem('iduser');
    const user=await this.client.getById(idUser);
    const id=user.data.isAdmin?this.id:idUser;
    const listClients = <any>(
      await this.client.logsStatisticsUserClaveSol(num, this.input, id, month, year)
    );
    const newListClients = <any[]>listClients.data;
    const pagination = this.getPageRange(listClients.pagination);
    this.pagination = pagination;
    this.paginationTotal = listClients.pagination.totalCount;
    return newListClients;
  }

  formatDate = (date: Date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  async next() {
    const listClients = await this.list(this.num + 1);
    if (listClients.length > 0) {
      this.num = this.num + 1;
      this.dataSource.data = listClients;
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

  async searchByInput(text: string) {
    this.input = text;
    const listClients = await this.list(this.num);
    this.dataSource.data = listClients;
  }

  async selectMonth() {
    const monthAndYear = this.selectedMonth.split('-');
    const month = Number(monthAndYear[1]);
    const year = Number(monthAndYear[0]);
    const idUser=<string>window.localStorage.getItem('iduser');
    const user=await this.client.getById(idUser);
    const id=user.data.isAdmin?this.id:idUser;
    const listClients = <any>(
      await this.client.logsStatisticsUserClaveSol(this.num, this.input,id, month, year)
    );
    this.dataSource.data = listClients.data;
  }
}
