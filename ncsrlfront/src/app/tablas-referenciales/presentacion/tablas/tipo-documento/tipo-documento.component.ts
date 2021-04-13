import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { GeneralCollection } from '@app/_general/models/general-collection.model';
import { TipoDocService } from '@app/tablas-referenciales/data/services/tipodoc.service';
import { TipoDoc } from '@app/tablas-referenciales/data/models/tipodoc.model';

@Component({
    selector: 'app-tipo-documento',
    templateUrl: './tipo-documento.component.html',
    styleUrls: ['./tipo-documento.component.scss']
})
export class TipoDocumentoComponent implements OnInit {

    tipdoc: TipoDoc[] = [];
    selectedTipdoc: TipoDoc;
    totalRegistrosTipdoc: number;
    id_tipdoc: number = -1;
    cod_tipdoc: string = "";
    des_tipdoc: string = "";
    submittedTipdoc: boolean = false;
    displayFormTipdoc: boolean = false;
    titlePanelTipdoc: string = "Registrar Tipo documento"
    formModeTipdoc: boolean = true; //true = crear //false = editar
    submitLabeltipdoc: string = "Guardar";
    loading: boolean = false;
    showbar: boolean = false;

    constructor(
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private tipodocService: TipoDocService
    ) {
    }

    ngOnInit() {
      this.getTipDoc();
    }

    getTipDoc() {
      this.loading = true;
      this.tipodocService.getTipDoc(null).subscribe(
        (_tipodoc: GeneralCollection<TipoDoc>) => {
          this.tipdoc = _tipodoc['data'];
          this.totalRegistrosTipdoc = _tipodoc['size'];
          this.loading = false;
         },
         (error) => {
          this.loading = false;
         }
      );
    }
  
    resetFormTipDoc() {
      this.id_tipdoc = -1;
      this.cod_tipdoc = "";
      this.des_tipdoc = "";
      this.submittedTipdoc= false;
      this.titlePanelTipdoc = "Registrar Tipo Documento";
      this.submitLabeltipdoc = "Guardar";
    }
    setFormTipDoc(tipdoc: TipoDoc) {
      this.id_tipdoc = tipdoc.id_tipdoc;
      this.cod_tipdoc = tipdoc.cod_tipdoc;
      this.des_tipdoc = tipdoc.des_tipdoc;
    }
  
    submitTipDoc(){
      this.submittedTipdoc = true;
      this.showbar = true;
      if(!this.validTipDoc) {
          this.showMessage('warn', 'Advertencia', 'Campos incompletos');
          this.showbar = false;
          return;
      } else {
  
        let tipdoc = new TipoDoc();
        tipdoc.id_tipdoc = this.id_tipdoc;
        tipdoc.cod_tipdoc = this.cod_tipdoc;
        tipdoc.des_tipdoc = this.des_tipdoc;
        if(this.formModeTipdoc) {
          this.tipodocService.createTipDoc(tipdoc).subscribe(
            (_resp) => {
                this.showMessage('success', 'Exito¡', 'tipo documento registrado');
                this.getTipDoc();
                this.resetFormTipDoc();
                this.cancelTipDoc();
                this.showbar = false;
            },
            (error) => {
                this.showMessage('error', 'Error', 'Ocurrio un problema en el servidor');
                this.showbar = false;
          });  
        }else{
          this.tipodocService.updateTipDoc(tipdoc).subscribe(
            (_resp) => {
                this.showMessage('success', 'Exito¡', 'Tipo documento Actualizado');
                this.getTipDoc();
                this.resetFormTipDoc();
                this.cancelTipDoc();
                this.showbar = false;
            },
            (error) => {
                this.showMessage('error', 'Error', 'Ocurrio un problema en el servidor');
                this.showbar = false;
          }); 
        }
         
      }
    }
  
    newTipDoc() {
      this.resetFormTipDoc();
      this.displayFormTipdoc = true;
    }
  
    editTipDoc() {
      if (this.selectedTipdoc) {
        this.formModeTipdoc = false;
        this.setFormTipDoc(this.selectedTipdoc);
        this.titlePanelTipdoc = "Actualizar Tipo documento";
        this.submitLabeltipdoc = "Actualizar"
        this.displayFormTipdoc = true;
      } else {
        this.showMessage('info', 'Informacion', 'Seleccione una Tipo documento');
      }
    }
  
    deleteTipDoc() {
      if (this.selectedTipdoc) {
        this.confirmationService.confirm({
          message: 'Quieres eliminar este tipo documento',
          header: 'Confirmacion',
          icon: 'pi pi-info-circle',
          key: "deleteTipdoc",
          accept: () => {
            this.tipodocService.deleteTipDoc(this.selectedTipdoc.id_tipdoc).subscribe(
              (_resp) => {
  
                this.showMessage('success', 'Exito', 'Tipo documento Eliminada');
                this.getTipDoc();
                this.selectedTipdoc = null;
              },
              (error) => {
                this.showMessage('error', 'Error', 'Ocurrio un problema en el servidor');
              });
          },
          reject: () => {
  
          },
        });
      } else {
        this.showMessage('info', 'Informacion', 'Seleccione un Tipo documeto');
      }
    }
  
    cancelTipDoc() {
      this.submittedTipdoc = false;
      this.resetFormTipDoc();
      this.displayFormTipdoc = false;
    }


  //validadores Tipo Documento
  get validTipDoc(): boolean {
      return this.cod_tipdoc !== "";
  }
    
    //mensajes 
    showMessage(_severity: string, _summary: string, _detail: string) {
        this.messageService.add({ severity: _severity, summary: _summary, detail: _detail });
    }
}
