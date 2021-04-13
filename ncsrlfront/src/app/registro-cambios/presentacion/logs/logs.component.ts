import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { GeneralCollection } from '@app/_general/models/general-collection.model';
import { RegistroCambio } from '@app/registro-cambios/data/models/registro-cambio.model';
import { LogsService } from '@app/registro-cambios/data/services/logs.service';
import { ActivatedRoute } from '@angular/router';
import { GeneralService } from '@app/_general/services/general.service';


@Component({
    selector: 'app-logs',
    templateUrl: './logs.component.html',
    styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit {

    //tabla
    logs: RegistroCambio[] = [];
    totalRegistros: number;
    rowsNumber: number = 15;
    loading: boolean = false;

    //fin tabla

    constructor(
            private messageService: MessageService,
            public activatedroute: ActivatedRoute, 
            public gS: GeneralService,
            private logsService: LogsService
        ) {
            var titles = this.activatedroute.snapshot.data['title'];
            this.gS.setTitle(titles.split('/'));
    }

    ngOnInit() {

        this.getLogs();
    }

    getLogs() {
        this.loading = true;
        this.logsService.getLogs(null).subscribe(
            (_logs: GeneralCollection<RegistroCambio>) => {
                this.logs = _logs['data'];
                this.totalRegistros = _logs['size'];
                this.loading = false;
            },
            (error) => {
                this.showMessage('error', 'Error', 'Ocurrio un problema en el servidor');
                console.log(error);
                this.loading = false;
            }
        );
    }

    //mensajes 
    showMessage(_severity: string, _summary: string, _detail: string) {
        this.messageService.add({severity: _severity, summary: _summary, detail: _detail});
    }
}
