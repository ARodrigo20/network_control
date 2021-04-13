import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { GeneralCollection } from '@app/_general/models/general-collection.model';
import { Fabricante } from '@app/tablas-referenciales/data/models/fabricante.model';
import { FabricanteService } from '@app/tablas-referenciales/data/services/fabricante.service';

@Component({
    selector: 'app-fabricante',
    templateUrl: './fabricante.component.html',
    styleUrls: ['./fabricante.component.scss']
})
export class FabricanteComponent implements OnInit {

    fabricantes: Fabricante[] = [];
    selectedFabricante: Fabricante;
    totalRegistrosFabricante: number;
    id_fab: number = -1;
    des_fab: string = "";
    submittedFabricante: boolean = false;
    displayFormFabricante: boolean = false;
    titlePanelFabricante: string = "Registrar Fabricante"
    formModeFabricante: boolean = true; //true = crear //false = editar
    submitLabelFabricante: string = "Guardar"
    loading: boolean = false;
    showbar: boolean = false;

    constructor(
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private fabricanteService: FabricanteService
    ) {
    }

    ngOnInit() {
        this.getFabricantes();
    }

  getFabricantes() {
    this.loading = true;
    this.fabricanteService.getFabricantes(null).subscribe(
      (_fabricantes: GeneralCollection<Fabricante>) => {
        this.fabricantes = _fabricantes['data'];
        this.totalRegistrosFabricante = _fabricantes['size'];
        this.loading = false;
       },
       (error) => {
        this.loading = false;
       }
    );
  }

  resetFormFabricante() {
    this.id_fab = -1;
    this.des_fab = "";
    this.submittedFabricante = false;
    this.titlePanelFabricante = "Registrar Fabricante";
    this.submitLabelFabricante = "Guardar";
  }
  setFormFabricante(fabricante: Fabricante) {
    this.id_fab = fabricante.id_fab;
    this.des_fab = fabricante.des_fab;
  }

  submitFabricante(){
    this.submittedFabricante = true;
    this.showbar = true;
    if(!this.validFabricante) {
        this.showMessage('warn', 'Advertencia', 'Campos incompletos');
        this.showbar = false;
        return;
    } else {

      let fabricante = new Fabricante();
      fabricante.id_fab = this.id_fab;
      fabricante.des_fab = this.des_fab;
      if(this.formModeFabricante) {
        this.fabricanteService.createFabricante(fabricante).subscribe(
          (_resp) => {
              this.showMessage('success', 'Exito¡', 'Fabricante registrado');
              this.getFabricantes();
              this.resetFormFabricante();
              this.cancelFabricante();
              this.showbar = false;
          },
          (error) => {
              this.showMessage('error', 'Error', 'Ocurrio un problema en el servidor');
              this.showbar = false;
        });  
      }else{
        this.fabricanteService.updateFabricante(fabricante).subscribe(
          (_resp) => {
              this.showMessage('success', 'Exito¡', 'Fabricante Actualizado');
              this.getFabricantes();
              this.resetFormFabricante();
              this.cancelFabricante();
              this.showbar = false;
          },
          (error) => {
              this.showMessage('error', 'Error', 'Ocurrio un problema en el servidor');
              this.showbar = false;
        }); 
      }
       
    }
  }

  newFabricante() {
    this.resetFormFabricante();
    this.displayFormFabricante = true;
  }

  editFabricante() {
    if (this.selectedFabricante) {
      this.formModeFabricante = false;
      this.setFormFabricante(this.selectedFabricante);
      this.titlePanelFabricante = "Actualizar Fabricante";
      this.submitLabelFabricante = "Actualizar"
      this.displayFormFabricante = true;
    } else {
      this.showMessage('info', 'Informacion', 'Seleccione un fabricante');
    }
  }

  deleteFabricante() {
    if (this.selectedFabricante) {
      this.confirmationService.confirm({
        message: 'Quieres eliminar este fabricante',
        header: 'Confirmacion',
        icon: 'pi pi-info-circle',
        key:"deleteFabricante",
        accept: () => {
          this.fabricanteService.deleteFabricante(this.selectedFabricante.id_fab).subscribe(
            (_resp) => {

              this.showMessage('success', 'Exito', 'Fabricante Eliminado');
              this.getFabricantes();
              this.selectedFabricante = null;
            },
            (error) => {
              this.showMessage('error', 'Error', 'Ocurrio un problema en el servidor');
            });
        },
        reject: () => {

        },
      });
    } else {
      this.showMessage('info', 'Informacion', 'Seleccione un FABRICANTE');
    }
  }

  cancelFabricante() {
    this.submittedFabricante = false;
    this.resetFormFabricante();
    this.displayFormFabricante = false;
  }
    
  //validadores 
  get validFabricante(): boolean {
    return this.des_fab !== "";
  }


    //mensajes 
    showMessage(_severity: string, _summary: string, _detail: string) {
        this.messageService.add({ severity: _severity, summary: _summary, detail: _detail });
    }
}
