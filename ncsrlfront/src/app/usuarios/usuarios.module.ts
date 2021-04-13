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

import { ColaboradorComponent } from './presentation/colaborador/colaborador.component';

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
    declarations: [ColaboradorComponent],
    providers: [MessageService, ConfirmationService],
})
export class UsuariosModule {}
