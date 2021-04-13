import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { GeneralCollection } from '@app/_general/models/general-collection.model';
import { Modelo } from '@app/tablas-referenciales/data/models/modelo.model';
import { ModeloService } from '@app/tablas-referenciales/data/services/modelo.service';

@Component({
    selector: 'app-modelo',
    templateUrl: './modelo.component.html',
    styleUrls: ['./modelo.component.scss']
})
export class ModeloComponent implements OnInit {

    modelos: Modelo[] = [];
    selectedModelo: Modelo;
    totalRegistrosModelo: number;
    id_mod: number = -1;
    des_mod: string = "";
    submittedModelo: boolean = false;
    displayFormModelo: boolean = false;
    titlePanelModelo: string = "Registrar Modelo"
    formModeModelo: boolean = true; //true = crear //false = editar
    submitLabelModelo: string = "Guardar";
    loading: boolean = false;
    showbar: boolean = false;

    constructor(
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private modeloService: ModeloService
    ) {
    }

    ngOnInit() {
        this.getModelos();
    }

  getModelos() {
    this.loading = true;
    this.modeloService.getModelos(null).subscribe(
      (_modelos: GeneralCollection<Modelo>) => {
        this.modelos = _modelos['data'];
        this.totalRegistrosModelo = _modelos['size'];
        this.loading = false;
       },
       (error) => {
        this.loading = false;
       }
    );
  }

  resetFormModelo() {
    this.id_mod = -1;
    this.des_mod = "";
    this.submittedModelo = false;
    this.titlePanelModelo = "Registrar Modelo";
    this.submitLabelModelo = "Guardar";
  }
  setFormModelo(modelo: Modelo) {
    this.id_mod = modelo.id_mod;
    this.des_mod = modelo.des_mod;
  }

  submitModelo(){
    this.submittedModelo = true;
    this.showbar = true;
    if(!this.validModelo) {
        this.showMessage('warn', 'Advertencia', 'Campos incompletos');
        this.showbar = false;
        return;
    } else {

      let modelo = new Modelo();
      modelo.id_mod = this.id_mod;
      modelo.des_mod = this.des_mod;
      if(this.formModeModelo) {
        this.modeloService.createModelo(modelo).subscribe(
          (_resp) => {
              this.showMessage('success', 'Exito¡', 'Modelo registrado');
              this.getModelos();
              this.resetFormModelo();
              this.cancelModelo();
              this.showbar = false;
          },
          (error) => {
              this.showMessage('error', 'Error', 'Ocurrio un problema en el servidor');
              this.showbar = false;
        });  
      }else{
        this.modeloService.updateModelo(modelo).subscribe(
          (_resp) => {
              this.showMessage('success', 'Exito¡', 'Modelo Actualizado');
              this.getModelos();
              this.resetFormModelo();
              this.cancelModelo();
              this.showbar = false;
          },
          (error) => {
              this.showMessage('error', 'Error', 'Ocurrio un problema en el servidor');
              this.showbar = false;
        }); 
      }
       
    }
  }

  newModelo() {
    this.resetFormModelo();
    this.displayFormModelo = true;
  }

  editModelo() {
    if (this.selectedModelo) {
      this.formModeModelo = false;
      this.setFormModelo(this.selectedModelo);
      this.titlePanelModelo = "Actualizar Modelo";
      this.submitLabelModelo = "Actualizar"
      this.displayFormModelo = true;
    } else {
      this.showMessage('info', 'Informacion', 'Seleccione un modelo');
    }
  }

  deleteModelo() {
    if (this.selectedModelo) {
      this.confirmationService.confirm({
        message: 'Quieres eliminar este modelo',
        header: 'Confirmacion',
        icon: 'pi pi-info-circle',
        key: "deleteModelo",
        accept: () => {
          this.modeloService.deleteModelo(this.selectedModelo.id_mod).subscribe(
            (_resp) => {

              this.showMessage('success', 'Exito', 'Modelo Eliminado');
              this.getModelos();
              this.selectedModelo = null;
            },
            (error) => {
              this.showMessage('error', 'Error', 'Ocurrio un problema en el servidor');
            });
        },
        reject: () => {

        },
      });
    } else {
      this.showMessage('info', 'Informacion', 'Seleccione un modelo');
    }
  }

  cancelModelo() {
    this.submittedModelo = false;
    this.resetFormModelo();
    this.displayFormModelo = false;
  }

  //validadores modelo
  get validModelo(): boolean {
    return this.des_mod !== "";
  }
  ///
    //mensajes 
    showMessage(_severity: string, _summary: string, _detail: string) {
        this.messageService.add({ severity: _severity, summary: _summary, detail: _detail });
    }
}
