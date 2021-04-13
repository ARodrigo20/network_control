import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { GeneralCollection } from '@app/_general/models/general-collection.model';
import { Marca } from '@app/tablas-referenciales/data/models/marca.model';
import { MarcaService } from '@app/tablas-referenciales/data/services/marca.service';

@Component({
    selector: 'app-marca',
    templateUrl: './marca.component.html',
    styleUrls: ['./marca.component.scss']
})
export class MarcaComponent implements OnInit {

    marcas: Marca[] = [];
    selectedMarca: Marca;
    totalRegistrosMarca: number;
    id_mar: number = -1;
    des_mar: string = "";
    submittedMarca: boolean = false;
    displayFormMarca: boolean = false;
    titlePanelMarca: string = "Registrar Marca"
    formModeMarca: boolean = true; //true = crear //false = editar
    submitLabelMarca: string = "Guardar"
    loading: boolean = false;
    showbar: boolean = false;

    constructor(
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private marcaService: MarcaService
    ) {
    }

    ngOnInit() {
        this.getMarcas();
    }

    getMarcas() {
        this.loading = true;
        this.marcaService.getMarcas(null).subscribe(
            (_marcas: GeneralCollection<Marca>) => {
                this.marcas = _marcas['data'];
                this.totalRegistrosMarca = _marcas['size'];
                this.loading = false;
            },
            (error) => {
                this.loading = false;
                console.log(error);
            }
        );
    }

    resetFormMarca() {
        this.id_mar = -1;
        this.des_mar = "";
        this.submittedMarca = false;
        this.titlePanelMarca = "Registrar Marca";
        this.submitLabelMarca = "Guardar";
    }
    setFormMarca(marca: Marca) {
        this.id_mar = marca.id_mar;
        this.des_mar = marca.des_mar;
    }

    submitMarca() {
        this.submittedMarca = true;
        this.showbar = true;
        if (!this.validMarca) {
            this.showMessage('warn', 'Advertencia', 'Campos incompletos');
            this.showbar = false;
            return;
        } else {

            let marca = new Marca();
            marca.id_mar = this.id_mar;
            marca.des_mar = this.des_mar;
            if (this.formModeMarca) {
                this.marcaService.createMarca(marca).subscribe(
                    (_resp) => {
                        this.showMessage('success', 'Exito¡', 'Marca registrada');
                        this.getMarcas();
                        this.resetFormMarca();
                        this.cancelMarca();
                        this.showbar = false;
                    },
                    (error) => {
                        this.showbar = false;
                        this.showMessage('error', 'Error', 'Ocurrio un problema en el servidor');
                    });
            } else {
                this.marcaService.updateMarca(marca).subscribe(
                    (_resp) => {
                        this.showMessage('success', 'Exito¡', 'Marca Actualizada');
                        this.getMarcas();
                        this.resetFormMarca();
                        this.cancelMarca();
                        this.showbar = false;
                    },
                    (error) => {
                        this.showbar = false;
                        this.showMessage('error', 'Error', 'Ocurrio un problema en el servidor');
                    });
            }

        }
    }

    newMarca() {
        this.resetFormMarca();
        this.displayFormMarca = true;
    }

    editMarca() {
        if (this.selectedMarca) {
            this.formModeMarca = false;
            this.setFormMarca(this.selectedMarca);
            this.titlePanelMarca = "Actualizar Marca";
            this.submitLabelMarca = "Actualizar"
            this.displayFormMarca = true;
        } else {
            this.showMessage('info', 'Informacion', 'Seleccione una marca');
        }
    }

    deleteMarca() {
        if (this.selectedMarca) {
            this.confirmationService.confirm({
                message: 'Quieres eliminar esta marca',
                header: 'Confirmacion',
                icon: 'pi pi-info-circle',
                key: "deleteMarca",
                accept: () => {
                    this.marcaService.deleteMarca(this.selectedMarca.id_mar).subscribe(
                        (_resp) => {

                            this.showMessage('success', 'Exito', 'Marca Eliminada');
                            this.getMarcas();
                            this.selectedMarca = null;
                        },
                        (error) => {
                            this.showMessage('error', 'Error', 'Ocurrio un problema en el servidor');
                        });
                },
                reject: () => {

                },
            });
        } else {
            this.showMessage('info', 'Informacion', 'Seleccione una marca');
        }
    }

    cancelMarca() {
        this.submittedMarca = false;
        this.resetFormMarca();
        this.displayFormMarca = false;
    }

    //validadores marca
    get validMarca(): boolean {
        return this.des_mar !== "";
    }
    //

    //mensajes 
    showMessage(_severity: string, _summary: string, _detail: string) {
        this.messageService.add({ severity: _severity, summary: _summary, detail: _detail });
    }
}
