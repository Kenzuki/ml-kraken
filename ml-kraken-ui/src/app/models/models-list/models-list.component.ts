import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { TableConfig } from '../../shared/crud-table/table-config.model';
import { DataService } from 'src/app/shared/data-service.service';
import { FormDialogComponent } from 'src/app/shared/form-dialog/form-dialog.component';
import { CrudTableComponent } from 'src/app/shared/crud-table/crud-table.component';
import { FormConfig } from 'src/app/shared/form-dialog/form-config.model';

@Component({
  selector: 'app-models-list',
  templateUrl: './models-list.component.html',
  styleUrls: ['./models-list.component.css']
})
export class ModelsListComponent implements OnInit, AfterViewInit {
  constructor(private dataService: DataService) {}

  @ViewChild('table', { static: false }) table: CrudTableComponent;
  @ViewChild('dialog', { static: false }) dialog: FormDialogComponent;
  tableConfig: TableConfig = {} as any;
  dialogConfig: FormConfig;
  dialogData: any;
  itemId = '';

  ngOnInit() {
    this.createTableConfig();
    this.createDialogConfig();
  }

  ngAfterViewInit() {
    this.loadModels();
    this.dataService.selectedData.subscribe(item => {
      this.dialog.setData(item);
      this.itemId = item.id;
    });
  }

  createTableConfig() {
    this.tableConfig = {
      header: 'Models',
      cols: [
        {
          field: 'name',
          header: 'Name',
          type: 'string',
          withFilter: false,
          sortable: true,
          icon: undefined
        },
        {
          field: 'ver',
          header: 'Version',
          type: 'string',
          withFilter: false,
          sortable: true,
          icon: undefined
        },
        {
          field: 'uri',
          header: 'URI',
          type: 'string',
          withFilter: false,
          sortable: true,
          icon: undefined
        },
        {
          field: 'user',
          header: 'Created by',
          type: 'string',
          withFilter: false,
          sortable: true,
          icon: undefined
        },
        {
          field: 'createdAt',
          header: 'Date of creation',
          type: 'unix',
          withFilter: false,
          sortable: true,
          icon: undefined
        },
        {
          field: 'updatedAt',
          header: 'Date of update',
          type: 'unix',
          withFilter: false,
          sortable: true,
          icon: undefined
        },
        {
          field: '',
          header: 'Status',
          type: 'status',
          withFilter: false,
          sortable: false,
          icon: {
            class: 'fas fa-circle',
            style: { color: 'red' },
            text: '- stopped',
            clickable: false
          }
        },
        {
          field: '',
          header: '',
          type: 'button',
          withFilter: false,
          sortable: false,
          icon: {
            class: 'fas fa-play',
            style: { color: 'green' },
            text: '',
            clickable: true
          }
        }
      ],
      buttons: [
        {
          label: '',
          class: '',
          callback: () => {
            this.dialogConfig.operation = 'new';
            this.dataService.selectedData.next(null);
            this.table.selectedRow = [];
            this.table.deleteDisabled = true;
            this.table.editDisabled = true;
            this.dialog.showDialog();
          },
          icon: 'fas fa-plus',
          disabled: false
        },
        {
          label: '',
          class: '',
          callback: () => {
            if (this.dialogConfig.operation === '' || this.dialogConfig.operation === 'new') {
              this.dialogConfig.operation = 'edit';
              this.table.rowSelected();
            } else {
              this.dialogConfig.operation = 'edit';
            }
            this.dialog.showDialog();
          },
          icon: 'fas fa-edit',
          disabled: false
        },
        {
          label: '',
          class: '',
          callback: () => {
            this.dataService.delete('https://0yctop0h6b.execute-api.eu-west-1.amazonaws.com/dev/api/v1/model-meta'
              + '/' + this.itemId).subscribe(resp => {
                this.loadModels();
              });
          },
          icon: 'fas fa-trash',
          disabled: false
        }
      ],
      errors: {
        load: ''
      },
      withGlobalFilter: true,
      paging: true,
      emptyMessage: 'No models',
      subscriber: null,
      globalFF: ['name', 'ver', 'uri', 'user']
    };
  }

  createDialogConfig() {
    this.dialogConfig = {
      header: 'New model',
      fields: [
        { label: 'Name', type: 'text', endpoint: 'name' },
        { label: 'Version', type: 'text', endpoint: 'ver' },
        { label: 'URI', type: 'text', endpoint: 'uri' },
        { label: 'User', type: 'text', endpoint: 'user' }
      ],
      width: '400px',
      height: '200px',
      operation: '',
      postURL:
        'https://0yctop0h6b.execute-api.eu-west-1.amazonaws.com/dev/api/v1/model-meta'
    };
  }

  loadModels() {
    this.table.config.subscriber = this.dataService.get(
      'https://0yctop0h6b.execute-api.eu-west-1.amazonaws.com/dev/api/v1/model-meta'
    );
    this.table.loadData();
    this.table.deleteDisabled = true;
    this.table.editDisabled = true;
  }
}
