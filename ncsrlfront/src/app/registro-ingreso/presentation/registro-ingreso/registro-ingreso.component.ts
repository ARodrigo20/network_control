import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { RegistroService } from "@app/registro-ingreso/data/services/registro.service"
import { GeneralCollection } from '@app/_general/models/general-collection.model';
import { OrdenCompra } from '@app/orden-compra/data/models/orden-compra.model';
import { Orden } from '@app/registro-ingreso/data/models/orden.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@app/_general/services/auth.service';
import { GeneralService } from '@app/_general/services/general.service';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

//declare let pdfMake: any ;
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
    selector: 'app-registro-ingreso',
    templateUrl: './registro-ingreso.component.html',
    styleUrls: ['./registro-ingreso.component.scss']
})

export class RegistroIngresoComponent implements OnInit {

    //Ordenes pendientes
    ordenesPendiente: Orden[] = [];
    selectedOrdenPendiente: Orden;
    totalPendiente: number;
    loadingPendiente: boolean = false;
    
    //Ordenes Completas (Pendiente de implementación)
    ordenesCompletas: OrdenCompra[] = [];
    selectedOrdenCompleta: OrdenCompra;
    totalCompletas: number;
    loadingCompletas: boolean = false;

    showbar: boolean = false;
    rowsNumber: number = 10;

    userName: string = "";

    constructor(
        private messageService: MessageService,
        private registroService: RegistroService,
        private router: Router,
        private authService: AuthService,
        public activatedroute: ActivatedRoute,
        public gS: GeneralService
    ) {
        var titles = this.activatedroute.snapshot.data['title'];
        this.gS.setTitle(titles.split('/'));
    }

    ngOnInit() {
        this.userName = this.authService.getusuarioJson().nom_col;
        this.getOrdenesPendientes();
    }

    //Ordenes Pendientes
    getOrdenesPendientes() {
        this.loadingPendiente = true;
        this.registroService.getOrdenesPendientes(null).subscribe(
            (_ordenesPendientes: GeneralCollection<Orden>) => {
                //this.separarOrdenesCompra(_ordenesCompra['data']);
                this.loadingPendiente = false;
                this.ordenesPendiente = [];
                this.ordenesPendiente = _ordenesPendientes['data'];
                this.totalPendiente = _ordenesPendientes['size'];
                console.log("DOCS:: ", _ordenesPendientes)
            },
            (error) => {
                this.loadingPendiente = false;
                console.log("ocurrio un error");
            }
        );
    }

    registrarIngreso() {
        if (this.selectedOrdenPendiente) {
            this.showbar = true;
            this.router.navigate(["/registro-ingreso/form/" + this.selectedOrdenPendiente.id_ord_com]);
        } else {
            this.showMessage('info', 'Informacion', 'Seleccione una orden');
        }
    }
    
    //mensajes 
    showMessage(_severity: string, _summary: string, _detail: string) {
        this.messageService.add({ severity: _severity, summary: _summary, detail: _detail });
    }

}
