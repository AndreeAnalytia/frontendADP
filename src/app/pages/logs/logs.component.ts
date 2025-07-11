import { Component, OnInit } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import clientAPI from 'src/app/services/client.service';
import { AppBreadcrumbComponent } from 'src/app/layouts/full/shared/breadcrumb/breadcrumb.component';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    AppBreadcrumbComponent,
  ],
})
export class LogsComponent implements OnInit {
  client = new clientAPI(this.routes);
  num = 1;
  pagination: string;
  paginationTotal: number;

  constructor(public dialog: MatDialog, private routes: Router) {}

  displayedColumns: string[] = ['cliente','number', 'tipo', 'fecha'];
  dataSource = new MatTableDataSource<any>();

  async ngOnInit() {
    const newListClients = await this.list(this.num);
    this.dataSource.data = newListClients;
  }

  async list(num: number) {
    const listLogs = <any>await this.client.logs(num);
    const listLogsData = <any[]>listLogs.data;
    const newListLogs = listLogsData.map((q) => {
      const creationDate = new Date(q.createdAt);
      const formatDate = this.formatDate(creationDate);
      return { ...q, date: formatDate };
    });
    const pagination = this.getPageRange(listLogs.pagination);
    this.pagination = pagination;
    this.paginationTotal = listLogs.pagination.totalCount;
    return newListLogs;
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

  // downloadJson(json:string, numberDoc:string) {
  //   const blob = new Blob([json], { type: 'application/json' });
  //   const url = window.URL.createObjectURL(blob);

  //   const a = document.createElement('a');
  //   a.href = url;
  //   a.download = `data-${numberDoc}.json`;
  //   document.body.appendChild(a);
  //   a.click();
  //   document.body.removeChild(a);
  //   window.URL.revokeObjectURL(url);
  // }
}
