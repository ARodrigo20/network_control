import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { PanelModule } from 'primeng/panel';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';
import { CodeHighlighterModule } from 'primeng/codehighlighter';
import { MessageModule } from 'primeng/message';
import { TooltipModule } from 'primeng/tooltip';
import { FocusTrapModule } from 'primeng/focustrap';
import { ToastModule } from 'primeng/toast';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { DialogModule } from 'primeng/dialog';
import { CheckboxModule } from 'primeng/checkbox';
import { TreeModule } from 'primeng/tree';
import { ContextMenuModule } from 'primeng/contextmenu';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ProgressBarModule } from 'primeng/progressbar';
import { TabMenuModule } from 'primeng/tabmenu';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart'
import { MessageService } from 'primeng/api';
import {ConfirmationService} from 'primeng/api';
import {AccordionModule} from 'primeng/accordion';
import {OrderListModule} from 'primeng/orderlist';
import {ListboxModule} from 'primeng/listbox';

import { TablasReferencialesComponent } from './presentacion/tablas-referenciales/tablas-referenciales.component';
import { MarcaComponent } from './presentacion/tablas/marca/marca.component';
import { ModeloComponent } from './presentacion/tablas/modelo/modelo.component';
import { FabricanteComponent } from './presentacion/tablas/fabricante/fabricante.component';
import { UnidadMedidaComponent } from './presentacion/tablas/unidad-medida/unidad-medida.component';
import { CargoComponent } from './presentacion/tablas/cargo/cargo.component';
import { TipoDocumentoComponent } from './presentacion/tablas/tipo-documento/tipo-documento.component';
import { SeccionComponent } from './presentacion/tablas/seccion/seccion.component';
import { TransporteComponent } from './presentacion/tablas/transporte/transporte.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        DropdownModule,
        TableModule,
        CalendarModule,
        PanelModule,
        InputTextModule,
        InputTextareaModule,
        ButtonModule,
        TabViewModule,
        CodeHighlighterModule,
        MessageModule,
        TooltipModule,
        FocusTrapModule,
        ToastModule,
        ToggleButtonModule,
        DialogModule,
        CheckboxModule,
        TreeModule,
        ContextMenuModule,  
        ScrollPanelModule,
        ProgressBarModule,
        TabMenuModule,
        ConfirmDialogModule,
        CardModule,
        ChartModule,
        AccordionModule,
        OrderListModule,
        ListboxModule
    ],
    declarations: [TablasReferencialesComponent,
        MarcaComponent,
        ModeloComponent,
        FabricanteComponent,
        UnidadMedidaComponent,
        CargoComponent,
        SeccionComponent,
        TransporteComponent,
        TipoDocumentoComponent
    ],
    providers: [MessageService, ConfirmationService],
})
export class TablasReferencialesModule {}
