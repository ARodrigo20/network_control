import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ColaboradorService } from "../../data/services/colaborador.service";
import { GeneralCollection } from '@app/_general/models/general-collection.model';
import { Colaborador } from '../../data/models/colaborador.model';
import { CargoService } from '@app/tablas-referenciales/data/services/cargo.service';
import { TipoDocService } from '@app/tablas-referenciales/data/services/tipodoc.service';
import { Cargo } from '@app/tablas-referenciales/data/models/cargo.model';
import { TipoDoc } from '@app/tablas-referenciales/data/models/tipodoc.model';
import { Dropdown } from 'primeng/dropdown/dropdown';
import { ActivatedRoute } from '@angular/router';
import { GeneralService } from '@app/_general/services/general.service';


@Component({
    selector: 'app-colaborador',
    templateUrl: './colaborador.component.html',
    styleUrls: ['./colaborador.component.scss']
})

export class ColaboradorComponent implements OnInit {

    //drops
    tipdoc: TipoDoc[] = [];
    selectedTipdoc: TipoDoc;
    cargo: Cargo[] = [];
    selectedCargo: Cargo;
    //fin drops

    //panel
    titlePanel: string = "Registrar Colaborador"
    cols: any[];
    //fin panel

    //formulario    
    id_col: number = -1;
    nom_col: string = "";
    ape_col: string = "";
    email: string = "";
    cod_col: string = "";
    cel_col: string = "";
    id_tipdoc: number = 0;
    num_doc_col: string = "";
    id_car: number = 0;

    /*//formulario    
    id_prod: number = -1;
    cod_prod: string = "";
    num_parte_prod: string = "";
    stk_prod: number = 0;
    des_prod: string = "";
    pre_com_prod: number = 0;
    pre_ven_prod: number = 0;
    id_mar: number = 0;
    id_mod: number = 0;
    id_unimed: number = 0;
    id_fab: number = 0;*/

    submitted: boolean = false;
    showbar: boolean = false;
    submitLabel: string = "Guardar";
    formMode: boolean = true; //true = crear //false = editar
    displayModal: boolean = false;
    //fin de formulario

    //tabla
    colaborador: Colaborador[];
    dropdown: Dropdown;
    selectedColaborador: Colaborador;
    totalRegistros: number;
    rowsNumber: number = 10;
    loading: boolean = false;

    //fin tabla

    constructor(
            private messageService: MessageService,
            private confirmationService: ConfirmationService,
            private colaboradorService: ColaboradorService,
            private tipodocService: TipoDocService,
            private cargoService: CargoService,
            public activatedroute: ActivatedRoute, 
            public gS: GeneralService,
        ) {
            var titles = this.activatedroute.snapshot.data['title'];
            this.gS.setTitle(titles.split('/'));
    }

    ngOnInit() {

        this.getColaborador();

        this.tipodocService.getTipDoc(null).subscribe(
            (_tipdoc: GeneralCollection<TipoDoc>) => {
                this.tipdoc = _tipdoc['data'];
                //this.getColaborador();
                console.log("DOCS:: ", _tipdoc)
            },
            (error) => {
                console.log("ocurrio un error");
            }
          
        );

        this.cargoService.getCargo(null).subscribe(
            (_cargo: GeneralCollection<Cargo>) => {
                this.cargo = _cargo['data'];
                
                console.log("cargos:: ", this.cargo)
            },
            (error) => {
                console.log("ocurrio un error");
            }
        );

        
        
    }

    getColaborador() {
        this.loading = true;
        this.colaboradorService.getColaborador(null).subscribe(
            (_colaborador: GeneralCollection<Colaborador>) => {
                this.colaborador = [];
                this.colaborador = _colaborador['data'];
                this.totalRegistros = _colaborador['size'];
                this.loading = false;
                console.log("cols::", this.colaborador)
            },
            (error) => {
                this.showMessage('error', 'Error', 'Ocurrio un problema en el servidor');
                this.loading = false;
            }
        );
    }

    resetForm() {
        this.id_col = -1;
        this.nom_col = "";
        this.ape_col = "";
        this.email = "";
        this.cod_col = "";
        this.cel_col = "";
        this.selectedTipdoc = null;
        this.num_doc_col = "";
        this.selectedCargo = null;
        
        this.submitted = false;
        this.submitLabel = "Guardar";
        this.titlePanel = "Registrar Colaborador"
        this.formMode = true;
    }

    setForm(p: Colaborador) {

        this.id_col = p.id_col;
        this.nom_col = p.nom_col;
        this.ape_col = p.ape_col;
        this.email = p.email;
        this.cod_col = p.cod_col;
        this.cel_col = p.cel_col;
        var s_tipdoc = this.tipdoc.filter( unit => unit.id_tipdoc === p.id_tipdoc );
        this.selectedTipdoc = (s_tipdoc.length > 0) ? s_tipdoc[0] : null;

        this.num_doc_col = p.num_doc_col;

        var s_car = this.cargo.filter( unit => unit.id_car === p.id_car );
        this.selectedCargo = (s_car.length > 0) ? s_car[0] : null;
    }

    submit() {
        this.submitted = true;
        this.showbar = true;
        this.id_tipdoc = (this.selectedTipdoc) ? this.selectedTipdoc.id_tipdoc : null;
        this.id_car = (this.selectedCargo) ? this.selectedCargo.id_car : null;
        //this.id_unimed = (this.selectedUnimed) ? +this.selectedUnimed.id_unimed : null;
        //if(!this.validMarca||!this.validModelo||!this.validUndMed||!this.validFabricante||!this.validDescripcion||!this.validNumPart) {
        //if(!this.validCargo||!this.validTipDoc||!this.validNomCol||!this.validApeCol||!this.validEmail||!this.validNumDoc) {
        if(!this.validNomCol||!this.validApeCol||!this.validCodCol) {
            this.showbar = false
            this.showMessage('warn', 'Advertencia', 'Campos incompletos');
            return;
        } /*else if(!this.validPreCom||!this.validPreVen||!this.validStock) {
            this.showbar = false
            this.showMessage('warn', 'Advertencia', 'Campos incompletos');
            return;
        }*/
        else {
            let colabora = new Colaborador();
            colabora.id_col = this.id_col;
            colabora.nom_col = this.nom_col;
            colabora.ape_col = this.ape_col;
            colabora.email = this.email;
            colabora.cod_col = this.cod_col;
            colabora.cel_col = this.cel_col;
            colabora.id_tipdoc = this.id_tipdoc;
            colabora.num_doc_col = this.num_doc_col;
            colabora.id_car = this.id_car;
            
            if(this.formMode) {
                console.log("viendo colaborador", colabora);
                this.colaboradorService.createColaborador(colabora).subscribe(
                    (_resp) => {
                        this.showMessage('success', 'Exito¡', 'Colaborador registrado');
                        console.log(_resp);
                        this.getColaborador();
                        this.resetForm();
                        this.showbar = false;
                        this.displayModal = false;
                        this.selectedColaborador = null;
                    },
                    (error) => {
                        this.showMessage('error', 'Error', 'Ocurrio un problema en el servidor');
                        //this.resetForm();
                        console.log("error: ", error)
                        this.showbar = false;
                });    
            } else {
                console.log("colaboradoe:::", colabora)
                this.colaboradorService.updateColaborador(colabora).subscribe(
                    (_resp) => {
                        this.showMessage('success', 'Exito', 'Colaborador actualizado');
                        //console.log("Guardado correctamente");
                        this.getColaborador();
                        this.resetForm();
                        this.showbar = false;
                        this.displayModal = false;
                        this.selectedColaborador = null;
                    },
                    (error) => {
                        this.showMessage('error', 'Error', 'Ocurrio un problema en el servidor');
                        console.log(error)
                        //this.resetForm();
                        this.showbar = false;
                });
            }
        }
    }

    // update(producto: Producto) {
    //     this.formMode = false;
    //     this.setForm(producto);
    //     this.titlePanel = "Actualizar Producto";
    //     this.submitLabel = "Actualizar"
    // }
    
    // delete(producto: Producto) {
        
        
    // }

    newColaborador() {
        this.resetForm();
        this.displayModal = true;
    }

    editColaborador() {
        if(this.selectedColaborador) {
            this.formMode = false;
            this.setForm(this.selectedColaborador);
            this.titlePanel = "Actualizar Colaborador";
            this.submitLabel = "Actualizar"
            this.displayModal = true;
        } else {
            this.showMessage('info', 'Informacion', 'Seleccione un colaborador');
        }
    }

    deleteColaborador() {
        if(this.selectedColaborador) {
            this.confirmationService.confirm({
                message: 'Quieres eliminar este colaborador',
                header: 'Confirmacion',
                icon: 'pi pi-info-circle',
                accept: () => {
                    //this.showbar = true;
                    this.colaboradorService.deleteColaborador(this.selectedColaborador.id_col).subscribe(
                        (_resp) => {
                            
                            this.showMessage('success', 'Exito', 'Colaborador eliminado');
                            this.getColaborador();
                            this.selectedColaborador = null;
                            //this.resetForm();
                            //this.showbar = false;
                        },
                        (error) => {
                            this.showMessage('error', 'Error', 'Ocurrio un problema en el servidor');
                            //this.resetForm();
                            //this.showbar = false;
                    });
                    // this.productos = this.productos.filter(unit => unit.codigo !== producto.codigo);
                    // this.showMessage('success', 'producto eliminado', '');
                },
                reject: () => {
                    
                },
            });
        } else {
            this.showMessage('info', 'Informacion', 'Seleccione un colaborador');
        }
    }

    cancel() {
		this.submitted = false;
		this.resetForm();
		this.displayModal = false;
    }

    //validadores

    get validNomCol(): boolean {
        return this.nom_col !== "";
    }

    get validApeCol(): boolean {
        return this.ape_col !== "";
    }

    get validEmail(): boolean {
        return this.email !== null;
    }

    get validCodCol(): boolean {
        return this.cod_col !== null;
    }

    get validCelCol(): boolean {
        return this.cel_col !== null;
    }

    get validTipDoc(): boolean {
        return this.selectedTipdoc !== null;
    }

    get validNumDoc(): boolean {
        return this.num_doc_col !== null;
    }

    get validCargo(): boolean {
        return this.selectedCargo !== null;
    }



    //end validadores

    //mensajes 
    showMessage(_severity: string, _summary: string, _detail: string) {
        this.messageService.add({severity: _severity, summary: _summary, detail: _detail});
    }
    
}
