import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { GeneralCollection } from '@app/_general/models/general-collection.model';
import { CargoService } from '@app/tablas-referenciales/data/services/cargo.service';
import { Cargo } from '@app/tablas-referenciales/data/models/cargo.model';

@Component({
    selector: 'app-cargo',
    templateUrl: './cargo.component.html',
    styleUrls: ['./cargo.component.scss']
})
export class CargoComponent implements OnInit {

    cargo: Cargo[] = [];
    selectedCargo: Cargo;
    totalRegistrosCargo: number;
    id_car: number = -1;
    des_car: string = "";
    submittedCargo: boolean = false;
    displayFormCargo: boolean = false;
    titlePanelCargo: string = "Registrar Cargo"
    formModeCargo: boolean = true; //true = crear //false = editar
    submitLabelCargo: string = "Guardar"
    loading: boolean = false;
    showbar: boolean = false;

    constructor(
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private cargoService: CargoService
    ) {
    }

    ngOnInit() {
        this.getCargo();
    }

    getCargo() {
      this.loading = true;
        this.cargoService.getCargo(null).subscribe(
          (_cargo: GeneralCollection<Cargo>) => {
            this.cargo = _cargo['data'];
            this.totalRegistrosCargo = _cargo['size'];
            this.loading = false;
           },
           (error) => {
            this.loading = false;
           }
        );
      }
    
      resetFormCargo() {
        this.id_car = -1;
        this.des_car = "";
        this.submittedCargo= false;
        this.titlePanelCargo = "Registrar Cargo";
        this.submitLabelCargo = "Guardar";
      }
      setFormCargo(cargo: Cargo) {
        this.id_car = cargo.id_car;
        this.des_car = cargo.des_car;
      }
    
      submitCargo(){
        this.submittedCargo = true;
        this.showbar = true;
        if(!this.validCargo) {
            this.showMessage('warn', 'Advertencia', 'Campos incompletos');
            this.showbar = false;
            return;
        } else {
    
          let cargo = new Cargo();
          cargo.id_car = this.id_car;
          cargo.des_car = this.des_car;
          if(this.formModeCargo) {
            this.cargoService.createCargo(cargo).subscribe(
              (_resp) => {
                  this.showMessage('success', 'Exito¡', 'Cargo registrado');
                  this.getCargo();
                  this.resetFormCargo();
                  this.cancelCargo();
                  this.showbar = false;
              },
              (error) => {
                  this.showMessage('error', 'Error', 'Ocurrio un problema en el servidor');
                  this.showbar = false;
            });  
          }else{
            this.cargoService.updateCargo(cargo).subscribe(
              (_resp) => {
                  this.showMessage('success', 'Exito¡', 'Cargo Actualizado');
                  this.getCargo();
                  this.resetFormCargo();
                  this.cancelCargo();
                  this.showbar = false;
              },
              (error) => {
                  this.showMessage('error', 'Error', 'Ocurrio un problema en el servidor');
                  this.showbar = false;
            }); 
          }
           
        }
      }
    
      newCargo() {
        this.resetFormCargo();
        this.displayFormCargo = true;
      }
    
      editCargo() {
        if (this.selectedCargo) {
          this.formModeCargo = false;
          this.setFormCargo(this.selectedCargo);
          this.titlePanelCargo = "Actualizar Cargo";
          this.submitLabelCargo = "Actualizar"
          this.displayFormCargo = true;
        } else {
          this.showMessage('info', 'Informacion', 'Seleccione un cargo');
        }
      }
    
      deleteCargo() {
        if (this.selectedCargo) {
          this.confirmationService.confirm({
            message: 'Quieres eliminar este cargo',
            header: 'Confirmacion',
            icon: 'pi pi-info-circle',
            key: "deleteCargo",
            accept: () => {
              this.cargoService.deleteCargo(this.selectedCargo.id_car).subscribe(
                (_resp) => {
    
                  this.showMessage('success', 'Exito', 'Cargo Eliminada');
                  this.getCargo();
                  this.selectedCargo = null;
                },
                (error) => {
                  this.showMessage('error', 'Error', 'Ocurrio un problema en el servidor');
                });
            },
            reject: () => {
    
            },
          });
        } else {
          this.showMessage('info', 'Informacion', 'Seleccione un cargo');
        }
      }
    
      cancelCargo() {
        this.submittedCargo = false;
        this.resetFormCargo();
        this.displayFormCargo = false;
      }

    //validadores cargo
    get validCargo(): boolean {
        return this.des_car !== "";
    }

    //mensajes 
    showMessage(_severity: string, _summary: string, _detail: string) {
        this.messageService.add({ severity: _severity, summary: _summary, detail: _detail });
    }
}
