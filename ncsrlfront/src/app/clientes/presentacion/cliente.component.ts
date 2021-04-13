import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ClienteService } from "../data/services/cliente.service";
import { TipoDocService } from '@app/tablas-referenciales/data/services/tipodoc.service';
import { GeneralCollection } from '@app/_general/models/general-collection.model';
import { Cliente } from '../data/models/cliente.model';
import { Contacto } from '../data/models/contacto.model';
import { Direccion } from '../data/models/direccion.model';
import { TipoDoc } from '@app/tablas-referenciales/data/models/tipodoc.model';
import { Dropdown } from 'primeng/dropdown/dropdown';
import { ActivatedRoute } from '@angular/router';
import { GeneralService } from '@app/_general/services/general.service';
//import { SelectItem } from 'primeng/api';



@Component({
    selector: 'app-cliente',
    templateUrl: './cliente.component.html',
    styleUrls: ['./cliente.component.scss']
})

export class ClienteComponent implements OnInit {

    //drops
    tipdoc: TipoDoc[] = [];
    selectedTipdoc: TipoDoc;
    //fin drops

    //panel
    titlePanel: string = "Registrar Cliente"
    titlePanelAdmin: string = "Administrar Cliente"
    titlePanelDir: string = "Agregar Dirección"
    titlePanelCon: string = "Agregar Contacto"
    cols: any[];
    //fin panel

    //formulario    
    id_cli: number = -1;
    razsoc_cli: string = "";
    id_tipdoc: number = 0;
    numdoc_cli: string = "";
    ema_cli: string = "";
    blockSpace: RegExp = /[^\s]/;

    submitted: boolean = false;
    showbar: boolean = false;
    submitLabel: string = "Guardar";
    formMode: boolean = true; //true = crear //false = editar
    displayModal: boolean = false;

    submitValid: boolean = false;
    addLabelAdmin: string = "Añadir";
    displayModalAdmin: boolean = false;
    displayModalDir: boolean = false;
    displayModalCon: boolean = false;
    //fin de formulario

    //tabla cliente
    clientes: Cliente[];
    dropdown: Dropdown;
    selectedCliente: Cliente;
    totalRegistros: number;
    rowsNumber: number = 10;
    loading: boolean = false;
    //fin tabla

    //Formulario adminmistrar
    submitCon: boolean = false;
    id_cli_con: number = -1;
    nom_cli_con: string = "";
    ema_cli_con: string = "";
    cel_cli_con: string = "";
    ane_cli_con: string = "";
    car_cli_con: string = "";
    est_reg_con: string = "";

    submitDir: boolean = false;
    id_cli_dir: number = -1;
    ciu_cli: string = "";
    dir_cli: string = "";
    tel_cli: string = "";
    est_reg_dir: string = "";
    //fin de formulario

    //tabla contacto
    contactos: Contacto[] = [];
    contactos2: Contacto[] = [];
    selectedContacto: Contacto;
    totalRegistrosContacto: number;
    rowsNumberContacto: number = 5;
    loadingContacto: boolean = false;
    //fin tabla

    //tabla dirección
    direcciones: Direccion[] = [];
    direcciones2: Direccion[] = [];
    selectedDireccion: Direccion;
    totalRegistrosDireccion: number;
    rowsNumberDireccion: number = 5;
    loadingDireccion: boolean = false;
    //fin tabla
    
    constructor(
            private messageService: MessageService,
            private confirmationService: ConfirmationService,
            private clienteService: ClienteService,
            private tipodocService: TipoDocService,
            public activateroute: ActivatedRoute,
            public gS: GeneralService
        ){
            var titles = this.activateroute.snapshot.data['title'];
            this.gS.setTitle(titles.split('/'));
    }

    ngOnInit() {

        this.getCliente();

        // this.contactos2 = this.contactos;
        // this.direcciones2 = this.direcciones;

        this.tipodocService.getTipDoc(null).subscribe(
            (_tipdoc: GeneralCollection<TipoDoc>) => {
                this.tipdoc = _tipdoc['data'];
                console.log("DOCS:: ", _tipdoc)
            },
            (error) => {
                console.log("ocurrio un error");
            }
          
        ); 
    }

    getCliente() {
        this.loading = true;
        this.clienteService.getClientes(null).subscribe(
            (_clientes: GeneralCollection<Cliente>) => {
                this.clientes = [];
                this.clientes = _clientes['data'];
                this.totalRegistros = _clientes['size'];
                this.loading = false;
                console.log("cols::", this.clientes)
            },
            (error) => {
                this.showMessage('error', 'Error', 'Ocurrio un problema en el servidor');
                this.loading = false;
                console.log("error::", error)
            }
        );
    }

    resetForm() {
        this.id_cli = -1;
        this.razsoc_cli = "";
        this.ema_cli = "";
        this.selectedTipdoc = null;
        this.numdoc_cli = "";

        this.contactos = [];
        this.direcciones = [];
        
        this.submitted = false;
        this.submitLabel = "Guardar";
        this.titlePanel = "Registrar Cliente"
        this.formMode = true;
    }

    setForm(c: Cliente) {
        this.id_cli = c.id_cli;
        this.razsoc_cli = c.razsoc_cli;
        this.ema_cli = c.ema_cli;
        this.numdoc_cli = c.numdoc_cli;
        var s_tipdoc = this.tipdoc.filter( unit => unit.id_tipdoc === c.id_tipdoc );
        this.selectedTipdoc = (s_tipdoc.length > 0) ? s_tipdoc[0] : null;

        this.contactos = c.contactos;
        this.direcciones = c.direcciones;
    }
    
    setFormAdmin(c: Cliente){
        this.direcciones = [];
        c.direcciones.map((direccion: Direccion) => {
            let _direccion = Object.assign({}, direccion);
            this.direcciones.push(_direccion);
        });

        this.contactos = [];
        c.contactos.map((contacto: Contacto) => {
            let _contacto = Object.assign({}, contacto);
            this.contactos.push(_contacto);
        });

        this.submitValid = false;
        //this.direcciones = Object.assign([], c.direcciones);
        // this.contactos = c.contactos;
        //this.direcciones = c.direcciones;
    }

    submit() {
        this.submitted = true;
        this.showbar = true;
        this.id_tipdoc = (this.selectedTipdoc) ? this.selectedTipdoc.id_tipdoc : null;
        if(!this.validTipDoc||!this.validRazSoc||!this.validNumDoc) {
            this.showbar = false
            this.showMessage('warn', 'Advertencia', 'Campos incompletos');
            return;
        } else {
            let clien = new Cliente();
            clien.id_cli = this.id_cli;
            clien.razsoc_cli = this.razsoc_cli;
            clien.ema_cli = this.ema_cli;
            clien.numdoc_cli = this.numdoc_cli;
            clien.id_tipdoc = this.id_tipdoc;
            clien.contactos = this.contactos;
            clien.direcciones = this.direcciones;
            
            if(this.formMode) {
                console.log("viendo cliente", clien);
                this.clienteService.createCliente(clien).subscribe(
                    (_resp) => {
                        this.showMessage('success', 'Exito¡', 'Cliente registrado');
                        console.log(_resp);
                        this.getCliente();
                        this.resetForm();
                        this.showbar = false;
                        this.displayModal = false;
                        this.selectedCliente = null;
                    },
                    (error) => {
                        this.showMessage('error', 'Error', 'Ocurrio un problema en el servidor');
                        //this.resetForm();
                        console.log("error: ", error)
                        this.showbar = false;
                });    
            } else {
                this.clienteService.updateCliente(clien).subscribe(
                    (_resp) => {
                        this.showMessage('success', 'Exito', 'Cliente actualizado');
                        //console.log("Guardado correctamente");
                        this.getCliente();
                        this.resetForm();
                        this.showbar = false;
                        this.displayModal = false;
                        this.selectedCliente = null;
                    },
                    (error) => {
                        this.showMessage('error', 'Error', 'Ocurrio un problema en el servidor');
                        //this.resetForm();
                        this.showbar = false;
                });
            }
        }
    }

    newCliente() {
        this.resetForm();
        this.displayModal = true;
    }

    editCliente() {
        if(this.selectedCliente) {
            this.formMode = false;
            this.setForm(this.selectedCliente);
            this.titlePanel = "Actualizar Cliente";
            this.submitLabel = "Actualizar"
            this.displayModal = true;
        } else {
            this.showMessage('info', 'Informacion', 'Seleccione un cliente');
        }
    }

    deleteCliente() {
        if(this.selectedCliente) {
            this.confirmationService.confirm({
                message: '¿Quieres eliminar este cliente?',
                header: 'Confirmacion',
                icon: 'pi pi-info-circle',
                key: 'deleteCliente',
                accept: () => {
                    //this.showbar = true;
                    this.clienteService.deleteCliente(this.selectedCliente.id_cli).subscribe(
                        (_resp) => {
                            this.showMessage('success', 'Exito', 'Cliente eliminado');
                            this.getCliente();
                            this.selectedCliente = null;
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
            this.showMessage('info', 'Informacion', 'Seleccione un cliente');
        }
    }
    cancel() {
		this.submitted = false;
		this.resetForm();
		this.displayModal = false;
    }

    administrarCliente() {
        this.resetForm();
        if(this.selectedCliente) {
            //this.setForm(this.selectedCliente);
            this.setFormAdmin(this.selectedCliente);
            this.id_cli = this.selectedCliente.id_cli;
            this.displayModalAdmin = true;
            this.submitValid = false;
        } else {
            this.showMessage('info', 'Informacion', 'Seleccione un cliente');
        }
    }

    submitAdmin() {
        let clien = new Cliente();
        clien.id_cli = this.id_cli;
        clien.razsoc_cli = this.razsoc_cli;
        clien.ema_cli = this.ema_cli;
        clien.numdoc_cli = this.numdoc_cli;
        clien.id_tipdoc = this.id_tipdoc;
        clien.contactos = this.contactos;
        clien.direcciones = this.direcciones;
            
            //código extraido sin validadores
        this.clienteService.adminCliente(clien).subscribe(
            (_resp) => {
                this.showMessage('success', 'Exito', 'Cliente actualizado');
                    //console.log("Guardado correctamente");
                    console.log("viendo cliente enviado", clien);
                this.getCliente();
                this.resetForm();
                this.showbar = false;
                this.displayModalAdmin = false;
                this.selectedCliente = null;
            },
            (error) => {
                this.showMessage('error', 'Error', 'Ocurrio un problema Al guardar');
                console.log("viendo cliente enviado", clien);
                    //this.resetForm();
                this.showbar = false;
        });
/* 
        if(!this.validTipDoc||!this.validRazSoc||!this.validNumDoc) {
            this.showbar = false
            this.showMessage('warn', 'Advertencia', 'Campos incompletos');
            return;
                    
        } else {
            Extraido de aquí
        }
*/
    }

    newContacto(){
        this.resetContacto();
        this.displayModalCon = true;
    }

    newDireccion(){
        this.resetDireccion();
        this.displayModalDir = true;
    }
    resetContacto(){
        this.id_cli_con = -1;
        this.nom_cli_con = "";
        this.ema_cli_con = "";
        this.cel_cli_con = "";
        this.ane_cli_con = "";
        this.car_cli_con = "";
        this.est_reg_con = "";
        this.submitCon = false;
    }

    resetDireccion() {
        this.id_cli_dir = -1;
        this.ciu_cli = "";
        this.dir_cli = "";
        this.tel_cli = "";
        this.est_reg_dir = "";  
        this.submitDir = false;
    }

    agregarContacto() {
        this.submitCon = true;
        this.showbar = true;
        if(!this.validNombre) {
            this.showbar = false;
            this.showMessage('warn', 'Advertencia', 'Campos incompletos');
            return;
        } else {
            let contac = new Contacto();
            contac.id_cli_con = (Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000) * -1;
            contac.id_cli = this.id_cli;
            contac.nom_cli_con = this.nom_cli_con;
            contac.ema_cli_con = this.ema_cli_con;
            contac.cel_cli_con = this.cel_cli_con;
            contac.ane_cli_con = this.ane_cli_con;
            contac.car_cli_con = this.car_cli_con;
            contac.est_reg = "A";

            this.contactos.push(contac);
            this.showMessage('success', 'Exito!', 'Contacto Agregado');
            this.showbar = false;
            this.displayModalCon = false;
            this.submitValid = true;
            this.resetContacto();
        }
    }

    deleteContacto(c: Contacto) {
        this.confirmationService.confirm({
            message: '¿Quieres eliminar este contacto?',
            header: 'Confirmacion',
            icon: 'pi pi-info-circle',
            key: 'deleteContacto',
            accept: () => {
                if (c.id_cli_con < 0) {
                    this.contactos = this.contactos.filter( unit => unit.id_cli_con !== c.id_cli_con);
                } else {
                    c.est_reg = "E";
                    this.est_reg_con = c.est_reg;
                }
                this.resetContacto();
            },
            reject: () => {

            },
        });
    }
    
    agregarDireccion() {
        this.submitDir = true;
        this.showbar = true;
        if(!this.validCiudad||!this.validDireccion) {
            this.showbar = false;
            this.showMessage('warn', 'Advertencia', 'Campos incompletos');
            return;
        } else {
            let direc = new Direccion();
            direc.id_cli_dir = (Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000) * -1;
            direc.id_cli = this.id_cli;
            direc.ciu_cli = this.ciu_cli;
            direc.dir_cli = this.dir_cli;
            direc.tel_cli = this.tel_cli;
            direc.est_reg = "A";

            this.direcciones.push(direc);
            this.showMessage('success', 'Exito!', 'Dirección agregada');
            this.showbar = false;
            this.displayModalDir = false;
            this.submitValid = true;
            this.resetDireccion();
        }
    }
    deleteDireccion(d: Direccion) {
        this.confirmationService.confirm({
            message: '¿Quieres eliminar esta direccion?',
            header: 'Confirmacion',
            icon: 'pi pi-info-circle',
            key: 'deleteDireccion',
            accept: () => {
                this.clonedDirecc[d.id_cli_dir] = {...d}
                if (d.id_cli_dir < 0) {
                    this.direcciones = this.direcciones.filter( unit => unit.id_cli_dir !== d.id_cli_dir);
                } else {
                    d.est_reg = "E";
                    this.est_reg_dir = d.est_reg;
                }
                this.submitValid = true;
            },
            reject: () => {

            },
        });
    }

    cancelAdmin() {
		this.submitted = false;
        this.displayModalAdmin = false;
        this.contactos = [];
        this.direcciones = [];
        this.resetForm();
    }

    cancelCon() {
        this.displayModalCon = false;
        this.resetContacto();
    }
    cancelDir() {
        this.displayModalDir = false;
        this.resetDireccion();
    }

    //validadores
    get validRazSoc(): boolean {
        return this.razsoc_cli !== "";
    }
    get validTipDoc(): boolean {
        return this.selectedTipdoc !== null;
    }

    get validNumDoc(): boolean {
        return this.numdoc_cli !== "";
    }

    get validNombre(): boolean {
        return this.nom_cli_con !== "";
    }
    get validCiudad(): boolean {
        return this.ciu_cli !== "";
    }
    get validDireccion(): boolean {
        return this.dir_cli !== "";
    }

    //end validadores

    //Botones editar

    clonedContact: { [s: string]: Contacto; } = {};

    clonedDirecc: { [s: string]: Direccion; } = {};
    //Fin botones

    //mensajes 
    showMessage(_severity: string, _summary: string, _detail: string) {
        this.messageService.add({severity: _severity, summary: _summary, detail: _detail});
    }

}
