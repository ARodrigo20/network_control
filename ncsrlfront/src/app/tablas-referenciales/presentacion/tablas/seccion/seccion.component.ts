import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { GeneralCollection } from '@app/_general/models/general-collection.model';
import { Seccion } from '@app/tablas-referenciales/data/models/seccion.model';
import { SeccionService } from '@app/tablas-referenciales/data/services/seccion.service';

@Component({
    selector: 'app-seccion',
    templateUrl: './seccion.component.html',
    styleUrls: ['./seccion.component.scss']
})
export class SeccionComponent implements OnInit {

    secciones: Seccion [] = [];
    selectedSeccion: Seccion;
    totalRegistrosSeccion: number;
    id_sec: number = -1;
    des_sec: string = "";
    submittedSeccion: boolean = false;
    displayFormSeccion: boolean = false;
    titlePanelSeccion: string = "Registrar Seccion"
    formModeSeccion: boolean = true; //true = crear //false = editar
    submitLabelSeccion: string = "Guardar"
    loading: boolean = false;
    showbar: boolean = false;

    constructor(
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private seccionService: SeccionService
    ) {
    }

    ngOnInit() {
        this.getSecciones();
    }

  getSecciones() {
    this.loading = true;
    this.seccionService.getSecciones(null).subscribe(
      (_secciones: GeneralCollection<Seccion>) => {
        this.secciones = _secciones['data'];
        this.totalRegistrosSeccion = _secciones['size'];
        this.loading = false;
       },
       (error) => {
        this.loading = false;
       }
    );
  }

  resetFormSeccion() {
    this.id_sec = -1;
    this.des_sec = "";
    this.submittedSeccion = false;
    this.titlePanelSeccion = "Registrar Seccion";
    this.submitLabelSeccion = "Guardar";
  }
  setFormSeccion(seccion: Seccion) {
    this.id_sec = seccion.id_sec;
    this.des_sec = seccion.des_sec;
  }

  submitSeccion(){
    this.submittedSeccion = true;
    this.showbar = true;
    if(!this.validSeccion) {
        this.showMessage('warn', 'Advertencia', 'Campos incompletos');
        this.showbar = false;
        return;
    } else {

      let seccion = new Seccion();
      seccion.id_sec = this.id_sec;
      seccion.des_sec = this.des_sec;
      if(this.formModeSeccion) {
        this.seccionService.createSeccion(seccion).subscribe(
          (_resp) => {
              this.showMessage('success', 'Exito¡', 'Seccion registrado');
              this.getSecciones();
              this.resetFormSeccion();
              this.cancelSeccion();
              this.showbar = false;
          },
          (error) => {
              this.showMessage('error', 'Error', 'Ocurrio un problema en el servidor');
              this.showbar = false;
        });  
      }else{
        this.seccionService.updateSeccion(seccion).subscribe(
          (_resp) => {
              this.showMessage('success', 'Exito¡', 'Seccion Actualizado');
              this.getSecciones();
              this.resetFormSeccion();
              this.cancelSeccion();
              this.showbar = false;
          },
          (error) => {
              this.showMessage('error', 'Error', 'Ocurrio un problema en el servidor');
              this.showbar = false;
        }); 
      }
       
    }
  }

  newSeccion() {
    this.resetFormSeccion();
    this.displayFormSeccion = true;
  }

  editSeccion() {
    if (this.selectedSeccion) {
      this.formModeSeccion = false;
      this.setFormSeccion(this.selectedSeccion);
      this.titlePanelSeccion = "Actualizar Seccion";
      this.submitLabelSeccion = "Actualizar"
      this.displayFormSeccion = true;
    } else {
      this.showMessage('info', 'Informacion', 'Seleccione una Seccion');
    }
  }

  deleteSeccion() {
    if (this.selectedSeccion) {
      this.confirmationService.confirm({
        message: 'Quieres eliminar esta seccion',
        header: 'Confirmacion',
        icon: 'pi pi-info-circle',
        key:"deleteSeccion",
        accept: () => {
          this.seccionService.deleteSeccion(this.selectedSeccion.id_sec).subscribe(
            (_resp) => {

              this.showMessage('success', 'Exito', 'Seccion Eliminado');
              this.getSecciones();
              this.selectedSeccion = null;
            },
            (error) => {
              this.showMessage('error', 'Error', 'Ocurrio un problema en el servidor');
            });
        },
        reject: () => {

        },
      });
    } else {
      this.showMessage('info', 'Informacion', 'Seleccione una SECCION');
    }
  }

  cancelSeccion() {
    this.submittedSeccion = false;
    this.resetFormSeccion();
    this.displayFormSeccion = false;
  }
    
  //validadores 
  get validSeccion(): boolean {
    return this.des_sec !== "";
  }


    //mensajes 
    showMessage(_severity: string, _summary: string, _detail: string) {
        this.messageService.add({ severity: _severity, summary: _summary, detail: _detail });
    }
}
