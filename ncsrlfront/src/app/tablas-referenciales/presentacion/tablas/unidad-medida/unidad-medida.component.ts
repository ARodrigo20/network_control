import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { GeneralCollection } from '@app/_general/models/general-collection.model';
import { UniMed } from '@app/tablas-referenciales/data/models/unimed.model';
import { UniMedService } from '@app/tablas-referenciales/data/services/unimed.service';

@Component({
    selector: 'app-unidad-medida',
    templateUrl: './unidad-medida.component.html',
    styleUrls: ['./unidad-medida.component.scss']
})
export class UnidadMedidaComponent implements OnInit {

    unimeds: UniMed[] = [];
    selectedUnimed: UniMed;
    totalRegistrosUnimed: number;
    id_unimed: number = -1;
    nom_unimed: string = "";
    des_unimed: string = "";
    submittedUnimed: boolean = false;
    displayFormUnimed: boolean = false;
    titlePanelUnimed: string = "Registrar Unidad de Medida"
    formModeUnimed: boolean = true; //true = crear //false = editar
    submitLabelUnimed: string = "Guardar"
    loading: boolean = false;
    showbar: boolean = false;

    constructor(
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private uniMedService: UniMedService
    ) {
    }

    ngOnInit() {
        this.getUnimeds();
    }

    ///Unidades de Medida
    getUnimeds() {
        this.loading = true;
        this.uniMedService.getUniMeds(null).subscribe(
            (_unimeds: GeneralCollection<UniMed>) => {
                this.unimeds = _unimeds['data'];
                this.totalRegistrosUnimed = _unimeds['size'];
                this.loading = false;
            },
            (error) => {
                this.loading = false;
            }
        );
    }

    resetFormUnimed() {
        this.id_unimed = -1;
        this.nom_unimed = "";
        this.des_unimed = "";
        this.submittedUnimed = false;
        this.titlePanelUnimed = "Registrar Unidad de Medida";
        this.submitLabelUnimed = "Guardar";
    }
    setFormUnimed(unimed: UniMed) {
        this.id_unimed = unimed.id_unimed;
        this.nom_unimed = unimed.nom_unimed;
        this.des_unimed = unimed.des_unimed;
    }

    submitUnimed() {
        this.submittedUnimed = true;
        this.showbar = true;
        if (!this.validNomUnimed) {
            this.showMessage('warn', 'Advertencia', 'Campos incompletos');
            this.showbar = false;
            return;
        } else {

            let unimed = new UniMed();
            unimed.id_unimed = this.id_unimed;
            unimed.nom_unimed = this.nom_unimed;
            unimed.des_unimed = this.des_unimed;
            if (this.formModeUnimed) {
                this.uniMedService.createUnimed(unimed).subscribe(
                    (_resp) => {
                        this.showMessage('success', 'Exito¡', 'Unidad de Medida Registrada');
                        this.getUnimeds();
                        this.resetFormUnimed();
                        this.cancelUnimed();
                        this.showbar = false;
                    },
                    (error) => {
                        this.showMessage('error', 'Error', 'Ocurrio un problema en el servidor');
                        this.showbar = false;
                    });
            } else {
                this.uniMedService.updateUnimed(unimed).subscribe(
                    (_resp) => {
                        this.showMessage('success', 'Exito¡', 'Unidad de Medida Actualizada');
                        this.getUnimeds();
                        this.resetFormUnimed();
                        this.cancelUnimed();
                        this.showbar = false;
                    },
                    (error) => {
                        this.showMessage('error', 'Error', 'Ocurrio un problema en el servidor');
                        this.showbar = false;
                    });
            }

        }
    }

    newUnimed() {
        this.resetFormUnimed();
        this.displayFormUnimed = true;
    }

    editUnimed() {
        if (this.selectedUnimed) {
            this.formModeUnimed = false;
            this.setFormUnimed(this.selectedUnimed);
            this.titlePanelUnimed = "Actualizar Unidad de Medida";
            this.submitLabelUnimed = "Actualizar"
            this.displayFormUnimed = true;
        } else {
            this.showMessage('info', 'Informacion', 'Seleccione una unidad');
        }
    }

    deleteUnimed() {
        if (this.selectedUnimed) {
            this.confirmationService.confirm({
                message: 'Quieres eliminar esta unidad',
                header: 'Confirmacion',
                icon: 'pi pi-info-circle',
                key: "deleteUnimed",
                accept: () => {
                    this.uniMedService.deleteUnimed(this.selectedUnimed.id_unimed).subscribe(
                        (_resp) => {

                            this.showMessage('success', 'Exito', 'Unidad Eliminada');
                            this.getUnimeds();
                            this.selectedUnimed = null;
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

    cancelUnimed() {
        this.submittedUnimed = false;
        this.resetFormUnimed();
        this.displayFormUnimed = false;
    }
    //////////////





    //validadores unidad de medida
    get validNomUnimed(): boolean {
        return this.nom_unimed !== "";
    }
    ///

    //mensajes 
    showMessage(_severity: string, _summary: string, _detail: string) {
        this.messageService.add({ severity: _severity, summary: _summary, detail: _detail });
    }
}
