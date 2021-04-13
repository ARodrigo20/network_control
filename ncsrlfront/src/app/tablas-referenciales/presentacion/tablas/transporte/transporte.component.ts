import { Component, OnInit } from '@angular/core';
//import { MessageService, ConfirmationService } from 'primeng/api';
import { GeneralCollection } from '@app/_general/models/general-collection.model';
import { MessageService, ConfirmationService, SelectItem } from 'primeng/api';
import { UniMed } from '@app/tablas-referenciales/data/models/unimed.model';
import { UniMedService } from '@app/tablas-referenciales/data/services/unimed.service';
import { Transporte } from '@app/tablas-referenciales/data/models/transporte.model';
import { TransporteService } from '@app/tablas-referenciales/data/services/transporte.service';

@Component({
    selector: 'app-transporte',
    templateUrl: './transporte.component.html',
    styleUrls: ['./transporte.component.scss']
})
export class TransporteComponent implements OnInit {

    //unimeds: UniMed[] = [];
    //selectedUnimed: UniMed;
    totalRegistrosTransporte: number;
    //id_unimed: number = -1;
    //nom_unimed: string = "";
    //des_unimed: string = "";
    //submittedUnimed: boolean = false;
    //displayFormUnimed: boolean = false;
    //titlePanelUnimed: string = "Registrar Unidad de Medida"
    //formModeUnimed: boolean = true; //true = crear //false = editar
    //submitLabelUnimed: string = "Guardar"
    //loading: boolean = false;
    //showbar: boolean = false;

    //////////////////////////////////
    submittedTransporte: boolean = false;
    displayFormTransporte: boolean = false;
    titlePanelTransporte: string = "Registrar Unidad de Medida"
    formModeTransporte: boolean = true; //true = crear //false = editar
    submitLabelTransporte: string = "Guardar"
    loading: boolean = false;
    showbar: boolean = false;

    transporte: Transporte[]=[];
    selectedTransporte: Transporte;
    id_transp: number = -1;
    num_doc: string = "requerido";
    raz_soc: string = "razon social";
    placa: string = "placa";
    chof_doc: string = "doc chofer"
    ////////////////////////////7
    selecTipoDocu: SelectItem;
    tipoDocu: SelectItem[] = [];

    selecTipoDocuCho: SelectItem;
    tipoDocuCho: SelectItem[] = [];

    constructor(
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        //private uniMedService: UniMedService,
        private transporteService: TransporteService
    ) {
    }

    ngOnInit() {
        this.getTransporte();
        this.getTipoDocu();
        this.getTipoDocuCho();
    }

    ///Unidades de Medida
    getTransporte() {
        this.loading = true;
        this.transporteService.getTransporte(null).subscribe(
            (_transporte: GeneralCollection<Transporte>) => {
                this.transporte = _transporte['data'];
                this.totalRegistrosTransporte = _transporte['size'];
                this.loading = false;
            },
            (error) => {
                this.loading = false;
            }
        );
    }

    resetFormTransporte() {
        //this.id_unimed = -1;
        //this.nom_unimed = "";
        //this.des_unimed = "";

        this.id_transp = -1;
        this.selecTipoDocu = null;
        this.num_doc = "";
        this.raz_soc = "";
        this.placa = "";
        this.selecTipoDocuCho = null;
        this.chof_doc = ""
        this.submittedTransporte = false;
        this.titlePanelTransporte = "Registrar Transporte";
        this.submitLabelTransporte = "Guardar";
    }
    setFormTransporte(transporte: Transporte) {
        //this.id_unimed = unimed.id_unimed;
        //this.nom_unimed = unimed.nom_unimed;
        //this.des_unimed = unimed.des_unimed;

        this.id_transp = transporte.id_transportista;
        var s_tipdoc = this.tipoDocu.filter( unit => unit.value === transporte.TipoDoc );
        this.selecTipoDocu = (s_tipdoc.length > 0) ? s_tipdoc[0] : null;
        this.num_doc = transporte.NumDoc;
        this.raz_soc = transporte.RznSocial;
        this.placa = transporte.Placa;
        var s_tipdocho = this.tipoDocuCho.filter( unit => unit.value === transporte.ChoferTipoDoc );
        this.selecTipoDocuCho = (s_tipdocho.length > 0) ? s_tipdocho[0] : null;
        this.chof_doc = transporte.ChoferDoc;
    }

    submitTransporte() {
        this.submittedTransporte = true;
        this.showbar = true;
        if (!this.validPlacaTransporte) {
            this.showMessage('warn', 'Advertencia', 'Campos incompletos');
            this.showbar = false;
            return;
        } else {

            let transporte = new Transporte();
            transporte.id_transportista = this.id_transp;
            transporte.TipoDoc = (this.selecTipoDocu) ? this.selecTipoDocu.value : null;
            transporte.NumDoc = this.num_doc;
            transporte.RznSocial = this.raz_soc;
            transporte.Placa = this.placa;
            transporte.ChoferTipoDoc = (this.selecTipoDocuCho) ? this.selecTipoDocuCho.value : null;
            transporte.ChoferDoc = this.chof_doc;
            if (this.formModeTransporte) {
                this.transporteService.createTransporte(transporte).subscribe(
                    (_resp) => {
                        this.showMessage('success', 'Exito¡', 'Transporte Registrado');
                        this.getTransporte();
                        this.resetFormTransporte();
                        this.cancelTransporte();
                        this.showbar = false;
                    },
                    (error) => {
                        this.showMessage('error', 'Error', 'Ocurrio un problema en el servidor');
                        this.showbar = false;
                    });
            } else {
                this.transporteService.updateTransporte(transporte).subscribe(
                    (_resp) => {
                        this.showMessage('success', 'Exito¡', 'Transporte Actualizada');
                        this.getTransporte();
                        this.resetFormTransporte();
                        this.cancelTransporte();
                        this.showbar = false;
                    },
                    (error) => {
                        this.showMessage('error', 'Error', 'Ocurrio un problema en el servidor');
                        this.showbar = false;
                    });
            }

        }
    }

    newTransporte() {
        //this.resetFormTransporte();
        this.displayFormTransporte = true;
    }

    editTransporte() {
        if (this.selectedTransporte) {
            this.formModeTransporte = false;
            this.setFormTransporte(this.selectedTransporte);
            this.titlePanelTransporte = "Actualizar Unidad de Medida";
            this.submitLabelTransporte = "Actualizar"
            this.displayFormTransporte = true;
        } else {
            this.showMessage('info', 'Informacion', 'Seleccione uns tranporte');
        }
    }

    deleteTransporte() {
        if (this.selectedTransporte) {
            this.confirmationService.confirm({
                message: 'Quieres eliminar esta unidad',
                header: 'Confirmacion',
                icon: 'pi pi-info-circle',
                key: "deleteUnimed",
                accept: () => {
                    this.transporteService.deleteTransporte(this.selectedTransporte.id_transportista).subscribe(
                        (_resp) => {

                            this.showMessage('success', 'Exito', 'Transporte EliminadO');
                            this.getTransporte();
                            this.selectedTransporte = null;
                        },
                        (error) => {
                            this.showMessage('error', 'Error', 'Ocurrio un problema en el servidor');
                        });
                },
                reject: () => {

                },
            });
        } else {
            this.showMessage('info', 'Informacion', 'Seleccione una unidad');
        }
    }

    cancelTransporte() {
        this.submittedTransporte = false;
        this.resetFormTransporte();
        this.displayFormTransporte = false;
    }

    //////////////////////////////
    getTipoDocu() {
        this.tipoDocu = [
            { label: 'DNI', value: 1 },
            { label: 'CARNET EXTRANJERIA', value: 4 },
            { label: 'RUC', value: 6 },
            { label: 'PASAPORTE', value: 7 },
        ];

    }

    getTipoDocuCho() {
        this.tipoDocuCho = [
            { label: 'DNI', value: 1 },
            { label: 'CARNET EXTRANJERIA', value: 4 },
            { label: 'RUC', value: 6 },
            { label: 'PASAPORTE', value: 7 },
        ];

    }
    //////////////



    //validadores unidad de medida
    get validPlacaTransporte(): boolean {
        return this.placa !== "";
    }
    ///

    //mensajes 
    showMessage(_severity: string, _summary: string, _detail: string) {
        this.messageService.add({ severity: _severity, summary: _summary, detail: _detail });
    }
}
