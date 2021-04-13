import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {PanelModule} from 'primeng/panel';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {TableModule} from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';

import { FacturacionComponent } from './presentation/facturacion/facturacion.component';

@NgModule({
  declarations: [
    FacturacionComponent
    ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PanelModule,
    ButtonModule,
    InputTextModule,
    TableModule,
    DropdownModule
  ]
})
export class FacturacionModule { }