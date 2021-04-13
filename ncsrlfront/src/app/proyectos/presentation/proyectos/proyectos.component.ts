import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ProyectosService } from "../../data/services/proyect.service";
import { ClienteService } from "@app/clientes/data/services/cliente.service";
import { TipoDocService } from '@app/tablas-referenciales/data/services/tipodoc.service';
import { GeneralCollection } from '@app/_general/models/general-collection.model';
import { Proyecto } from '../../data/models/proyect.model';
import { Cliente } from '@app/clientes/data/models/cliente.model';
import { TipoDoc } from '@app/tablas-referenciales/data/models/tipodoc.model';
import { Dropdown } from 'primeng/dropdown/dropdown';
import { ActivatedRoute } from '@angular/router';
import { GeneralService } from '@app/_general/services/general.service';


@Component({
    selector: 'app-proyectos',
    templateUrl: './proyectos.component.html',
    styleUrls: ['./proyectos.component.scss']
})

export class ProyectosComponent implements OnInit {

    //drops
    clientes: Cliente[] = [];
    selectedCliente: Cliente;
    tipdoc: TipoDoc[] = [];
    selectedTipdoc: TipoDoc;
    //fin drops

    //panel
    titlePanel: string = "Registrar Proyecto"
    cols: any[];
    //fin panel

    //formulario    
    id_proy: number = -1;
    nom_proy: string = "";    
    ser_proy: string = "";
    num_proy: string = "";
    id_cli: number = 0;

    blockSpace: RegExp = /[^\s]/;

    submitted: boolean = false;
    showbar: boolean = false;
    submitLabel: string = "Guardar";
    formMode: boolean = true; //true = crear //false = editar
    displayModal: boolean = false;
    //fin de formulario

    //formulario cliente
    razsoc_cli: string = "";
    id_tipdoc: number = 0;
    numdoc_cli: string = "";
    ema_cli: string = "";
    submittedCliente: boolean = false;
    displayFormCliente: boolean = false;
    titlePanelCliente: string = "Registrar Cliente"
    formModeCliente: boolean = true; //true = crear //false = editar
    submitLabelCliente: string = "Guardar"

    displayModalCliente: boolean = false;
    //fin cliente

    //tabla
    proyectosEnProceso: Proyecto[];
    proyectosTerminados: Proyecto[];
    dropdown: Dropdown;
    selectedProyecto: Proyecto;
    totalEnProceso: number;
    totalTerminados: number;
    rowsNumber: number = 10;
    loading: boolean = false;
    //fin tabla

    constructor(
            private messageService: MessageService,
            private confirmationService: ConfirmationService,
            private proyectosService: ProyectosService,
            private clienteService: ClienteService,
            private tipodocService: TipoDocService,

            public activatedroute: ActivatedRoute, 
            public gS: GeneralService
        ) {
            var titles = this.activatedroute.snapshot.data['title'];
            this.gS.setTitle(titles.split('/'));
    }

    ngOnInit() {

        this.getProyectosProceso();
        this.getProyectosTerminados();

        this.clienteService.getClientes(null).subscribe(
            (_clientes: GeneralCollection<Cliente>) => {
                this.clientes = _clientes['data'];
                console.log("CLIEN:: ", _clientes)
            },
            (error) => {
                console.log("ocurrio un error");
            }
        );
    }

    //métodos Cliente

    newCliente() {
        this.tipodocService.getTipDoc(null).subscribe(
            (_tipdoc: GeneralCollection<TipoDoc>) => {
                this.tipdoc = _tipdoc['data'];
                console.log("DOCS:: ", _tipdoc)
            },
            (error) => {
                console.log("ocurrio un error");
            }
        );

        this.resetFormCliente();
        this.displayFormCliente = true;
    }
    
    resetFormCliente() {
        this.id_cli = -1;
        this.razsoc_cli = "";
        this.selectedTipdoc = null;
        this.numdoc_cli = "";
        this.ema_cli = "";
        this.submittedCliente = false;
    }

    submitCliente() {
        this.submittedCliente = true;
        this.showbar = true;
        this.id_tipdoc = (this.selectedTipdoc) ? this.selectedTipdoc.id_tipdoc : null;
        if (!this.validRazSoc || !this.validTipDoc || !this.validNumDoc) {
            this.showMessage('warn', 'Advertencia', 'Campos incompletos');
            this.showbar = false;
            return;
        } else {
            let cliente = new Cliente();
            cliente.id_cli = this.id_cli;
            cliente.razsoc_cli = this.razsoc_cli;
            cliente.numdoc_cli = this.numdoc_cli;
            cliente.ema_cli = this.ema_cli;
            cliente.id_tipdoc = this.id_tipdoc;
            console.log("cliente::_", cliente)
            this.clienteService.createCliente(cliente).subscribe(
                (_resp) => {
                    this.showMessage('success', 'Exito¡', 'cliente registrado');
                    this.clienteService.getClientes(null).subscribe(
                        (_clientes: GeneralCollection<Cliente>) => {
                            this.clientes = _clientes['data'];
                            console.log("CLIEN:: ", _clientes)
                        },
                        (error) => {
                            console.log("ocurrio un error");
                        }
                    );
                    this.resetFormCliente();
                    this.cancelCliente();
                    this.showbar = false;
                },
                (error) => {
                    this.showbar = false;
                    this.showMessage('error', 'Error', 'Ocurrio un problema De cliente en el servidor');
                });
        }
    }

    cancelCliente() {
        this.submittedCliente = false;
        this.resetFormCliente();
        this.displayFormCliente = false;
    }
    //fin métodos Cliente

    getProyectosProceso(){
        this.loading = true;
        this.proyectosService.getProyectoProceso(null).subscribe(
            (_proyectosP: GeneralCollection<Proyecto>) => {
                this.proyectosEnProceso = [];
                this.proyectosEnProceso = _proyectosP['data'];
                this.totalEnProceso = _proyectosP['size'];
                this.loading = false;
                console.log("cols::", this.proyectosEnProceso)
            },
            (error) => {
                this.showMessage('error', 'Error', 'Ocurrio un problema con getProyectos');
                this.loading = false;
            }
        );
    }

    getProyectosTerminados(){
        this.loading = true;
        this.proyectosService.getProyectoTerminado(null).subscribe(
            (_proyectosT: GeneralCollection<Proyecto>) => {
                this.proyectosTerminados = [];
                this.proyectosTerminados = _proyectosT['data'];
                this.totalTerminados = _proyectosT['size'];
                this.loading = false;
                console.log("cols::", this.proyectosTerminados)
            },
            (error) => {
                this.showMessage('error', 'Error', 'Ocurrio un problema con getProyectos');
                this.loading = false;
            }
        );
    }

    resetForm() {
        this.id_proy = -1;
        this.nom_proy = "";
        //this.ser_proy = "";     ////////////////////////////
        //this.num_proy= "";      ////////////////////////////
        
        this.selectedCliente = null;
        
        this.submitted = false;
        this.submitLabel = "Guardar";
        this.titlePanel = "Registrar Proyecto"
        this.formMode = true;
    }

    setForm(p: Proyecto) {

        this.id_proy = p.id_proy;
        this.nom_proy = p.nom_proy;
        var s_cli = this.clientes.filter( unit => unit.id_cli === p.id_cli );
        this.selectedCliente = (s_cli.length > 0) ? s_cli[0] : null;
    }

    submit() {
        this.submitted = true;
        this.showbar = true;
        this.id_cli = (this.selectedCliente) ? this.selectedCliente.id_cli : null;

        if(!this.validNombreProy || !this.validCliente) {
            this.showbar = false
            this.showMessage('warn', 'Advertencia', 'Campos incompletos');
            return;
        }else {
            let proyect = new Proyecto();
            proyect.id_proy = this.id_proy;
            proyect.nom_proy = this.nom_proy;
            proyect.id_cli = this.id_cli;
            proyect.est_reg = "A";
            
            if(this.formMode) {
                console.log("viendo proyecto", proyect);
                this.proyectosService.createProyecto(proyect).subscribe(
                    (_resp) => {
                        this.showMessage('success', 'Exito', 'Proyecto registrado');
                        console.log(_resp);
                        this.getProyectosProceso();
                        this.getProyectosTerminados();
                        this.resetForm();
                        this.showbar = false;
                        this.displayModal = false;
                        this.selectedProyecto = null;
                    },
                    (error) => {
                        this.showMessage('error', 'Error', 'Ocurrio un problema al crear');
                        console.log("error: ", error)
                        this.showbar = false;
                });    
            } else {
                console.log("proyecto:::", proyect)  ///////////////////////////////////7
                this.proyectosService.updateProyecto(proyect).subscribe(
                    (_resp) => {
                        this.showMessage('success', 'Exito', 'Proyecto actualizado');
                        this.getProyectosProceso();
                        this.getProyectosTerminados();
                        this.resetForm();
                        this.showbar = false;
                        this.displayModal = false;
                        this.selectedProyecto = null;
                    },
                    (error) => {
                        this.showMessage('error', 'Error', 'Ocurrio un problema al modificar');
                        this.showbar = false;
                });
            }
        }
    }

    newProyect() {
        this.resetForm();
        this.displayModal = true;
    }

    editProyect() {
        if(this.selectedProyecto) {
            this.formMode = false;
            this.setForm(this.selectedProyecto);
            this.titlePanel = "Actualizar Proyecto";
            this.submitLabel = "Actualizar"
            this.displayModal = true;
        } else {
            this.showMessage('info', 'Informacion', 'Seleccione un proyecto');
        }
    }

    endProyect(){
        //this.submitted = true;
        //this.id_cli = (this.selectedCliente) ? this.selectedCliente.id_cli : null;

        if(this.selectedProyecto){
            this.setForm(this.selectedProyecto);
            this.confirmationService.confirm({
                message: '¿Quieres Terminar este proyecto?',
                header: 'Confirmacion',
                icon: 'pi pi-info-circle',
                key: 'terminarProyecto',
                accept: () => {
                    this.showbar = true;
                    let proyect = new Proyecto();
                    proyect.id_proy = this.id_proy;
                    proyect.nom_proy = this.nom_proy;
                    proyect.id_cli = this.selectedCliente.id_cli;
                    proyect.est_reg = "T";
                    console.log("proyecto terminado: ", proyect)
                    this.proyectosService.updateProyecto(proyect).subscribe(
                        (_resp) => {
                            this.showMessage('success', 'Exito', 'Proyecto terminado');
                            this.getProyectosProceso();
                            this.getProyectosTerminados();
                            //this.resetForm();
                            this.showbar = false;
                            this.displayModal = false;
                            this.selectedProyecto = null;
                        },
                        (error) => {
                            this.showMessage('error', 'Error', 'Ocurrio un problema en el servidor');
                            this.showbar = false;
                    });
                },
                reject: () => {

                },
            });    
        } else{
            this.showMessage('info', 'Informacion', 'Seleccione un proyecto');
        }
    }

    activeProyect(){
        //this.submitted = true;
        //this.id_cli = (this.selectedCliente) ? this.selectedCliente.id_cli : null;

        if(this.selectedProyecto){
            this.setForm(this.selectedProyecto);
            this.confirmationService.confirm({
                message: '¿Quieres Reactivar este proyecto?',
                header: 'Confirmacion',
                icon: 'pi pi-info-circle',
                key: 'activarProyecto',
                accept: () => {
                    this.showbar = true;
                    let proyect = new Proyecto();
                    proyect.id_proy = this.id_proy;
                    proyect.nom_proy = this.nom_proy;
                    proyect.id_cli = this.selectedCliente.id_cli
                    proyect.est_reg = "A";

                    this.proyectosService.updateProyecto(proyect).subscribe(
                        (_resp) => {
                            this.showMessage('success', 'Exito', 'Proyecto terminado');
                            this.getProyectosProceso();
                            this.getProyectosTerminados();
                            //this.resetForm();
                            this.showbar = false;
                            this.displayModal = false;
                            this.selectedProyecto = null;
                        },
                        (error) => {
                            this.showMessage('error', 'Error', 'Ocurrio un problema en el servidor');
                            this.showbar = false;
                    });
                },
                reject: () => {

                },
            });    
        } else{
            this.showMessage('info', 'Informacion', 'Seleccione un proyecto');
        }
    }

    deleteProyect() {
        if(this.selectedProyecto) {
            this.confirmationService.confirm({
                message: '¿Quieres eliminar este proyecto?',
                header: 'Confirmacion',
                icon: 'pi pi-info-circle',
                key: 'deleteProyecto',
                accept: () => {
                    this.showbar = true;
                    this.proyectosService.deleteProyecto(this.selectedProyecto.id_proy).subscribe(
                        (_resp) => {
                            this.showMessage('success', 'Exito', 'Proyecto eliminado');
                            this.getProyectosProceso();
                            this.getProyectosTerminados();
                            this.selectedProyecto = null;
                            this.showbar = false;
                        },
                        (error) => {
                            this.showMessage('error', 'Error', 'Ocurrio un problema al eliminar');
                            this.showbar = false;
                    });
                },
                reject: () => {

                },
            });
        } else {
            this.showMessage('info', 'Informacion', 'Seleccione un proyecto');
        }
    }

    cancel() {
		this.submitted = false;
		this.resetForm();
		this.displayModal = false;
    }

    //Validadores Proyecto
    get validNombreProy(): boolean {
        return this.nom_proy !== "";
    }
    get validCliente(): boolean {
        return this.selectedCliente !== null;
    }
    //end validadores Proyecto

    // Validadores Cliente
    get validRazSoc(): boolean {
        return this.razsoc_cli !== "";
    }
    get validTipDoc(): boolean {
        return this.selectedTipdoc !== null;
    }
    get validNumDoc(): boolean {
        return this.numdoc_cli !== "";
    }
    //end validadores Cliente

    //mensajes 
    showMessage(_severity: string, _summary: string, _detail: string) {
        this.messageService.add({severity: _severity, summary: _summary, detail: _detail});
    }

    getCliente(razSoc: number) {
        let lista: Cliente[];
        lista = this.clientes.filter(unit => unit.id_cli === razSoc)
        if(lista.length > 0) {
            return lista[0].razsoc_cli;
        } else {
            return "SIN DESCRIPCION"
        }
    }
}
