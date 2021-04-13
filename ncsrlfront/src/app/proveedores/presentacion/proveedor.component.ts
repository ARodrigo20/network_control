import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ProveedorService } from "../data/services/proveedor.service";
import { TipoDocService } from '@app/tablas-referenciales/data/services/tipodoc.service';
import { GeneralCollection } from '@app/_general/models/general-collection.model';
import { Proveedor } from '../data/models/proveedor.model';
import { Colaborador } from '../data/models/colaborador.model';
import { Direcciones } from '../data/models/direccion.model';
import { Banco } from '../data/models/banco.model';
import { TipoDoc } from '@app/tablas-referenciales/data/models/tipodoc.model';
import { Dropdown } from 'primeng/dropdown/dropdown';
import { ActivatedRoute } from '@angular/router';
import { GeneralService } from '@app/_general/services/general.service';
//import { SelectItem } from 'primeng/api';



@Component({
    selector: 'app-proveedor',
    templateUrl: './proveedor.component.html',
    styleUrls: ['./proveedor.component.scss']
})

export class ProveedorComponent implements OnInit {

    //drops
    tipdoc: TipoDoc[] = [];
    selectedTipdoc: TipoDoc;
    //fin drops

    //panel
    titlePanel: string = "Registrar Proveedor"
    titlePanelAdmin: string = "Administrar Proveedor"
    titlePanelDir: string = "Agregar Dirección"
    titlePanelCol: string = "Agregar Colaborador"
    titlePanelBan: string = "Agregar Banco"
    cols: any[];
    //fin panel

    //formulario    
    id_prov: number = -1;
    razsoc_prov: string = "";
    ema_prov: string = "";
    num_doc_prov: string = "";
    id_tipdoc: number = 0;
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
    displayModalCol: boolean = false;
    displayModalBan: boolean = false;
    //fin de formulario

    //tabla cliente
    proveedores: Proveedor[];
    dropdown: Dropdown;
    selectedProveedor: Proveedor;
    totalRegistros: number;
    rowsNumber: number = 10;
    loading: boolean = false;
    //fin tabla

    //Formulario adminmistrar
    submitCol: boolean = false;
    id_prov_col: number = -1;
    nom_prov_col: string = "";
    ema_prov_col: string = "";
    tel_prov_col: string = "";
    ane_prov_col: string = "";
    car_prov_col: string = "";
    est_reg_col: string = "";

    submitDir: boolean = false;
    id_prov_dir: number = -1;
    ciu_prov: string = "";
    dir_prov: string = "";
    tel_prov: string = "";
    est_reg_dir: string = "";

    submitBan: boolean = false;
    id_prov_ban: number = -1;
    tip_prov_ban: string = "";
    cue_prov_ban: string = "";
    ban_prov_ban: string = "";
    com_prov_ban: string = "";
    est_reg_ban: string = "";
    //fin de formulario

    //tabla contacto
    colaboradores: Colaborador[] = [];
    colaboradores2: Colaborador[] = [];
    selectedContacto: Colaborador;
    totalRegistrosColaborador: number;
    rowsNumberColaborador: number = 5;
    loadingContacto: boolean = false;
    //fin tabla

    //tabla dirección
    direcciones: Direcciones[] = [];
    direcciones2: Direcciones[] = [];
    selectedDireccion: Direcciones;
    totalRegistrosDireccion: number;
    rowsNumberDireccion: number = 5;
    loadingDireccion: boolean = false;
    //fin tabla

    //tabla Banco
    bancos: Banco[] = [];
    bancos2: Banco[] = [];
    selectedBanco: Banco;
    totalRegistrosBanco: number;
    rowsNumberBanco: number = 5;
    loadingBanco: boolean = false;
    //fin tabla
    
    constructor(
            private messageService: MessageService,
            private confirmationService: ConfirmationService,
            private proveedorService: ProveedorService,
            private tipodocService: TipoDocService,
            public activateroute: ActivatedRoute,
            public gS: GeneralService
        ){
            var titles = this.activateroute.snapshot.data['title'];
            this.gS.setTitle(titles.split('/'));
    }

    ngOnInit() {

        this.getProveedor();

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

    getProveedor() {
        this.loading = true;
        this.proveedorService.getProveedor(null).subscribe(
            (_proveedores: GeneralCollection<Proveedor>) => {
                this.proveedores = [];
                this.proveedores = _proveedores['data'];
                this.totalRegistros = _proveedores['size'];
                this.loading = false;
                console.log("cols::", this.proveedores)
            },
            (error) => {
                this.showMessage('error', 'Error', 'Ocurrio un problema en el servidor');
                this.loading = false;
            }
        );
    }

    resetForm() {
        this.id_prov = -1;
        this.razsoc_prov = "";
        this.ema_prov = "";
        this.selectedTipdoc = null;
        this.num_doc_prov = "";

        this.colaboradores = [];
        this.direcciones = [];
        this.bancos = [];
        
        this.submitted = false;
        this.submitLabel = "Guardar";
        this.titlePanel = "Registrar Proveedor"
        this.formMode = true;
    }

    setForm(c: Proveedor) {
        this.id_prov = c.id_prov;
        this.razsoc_prov = c.razsoc_prov;
        this.ema_prov = c.ema_prov;
        this.num_doc_prov = c.num_doc_prov;
        var s_tipdoc = this.tipdoc.filter( unit => unit.id_tipdoc === c.id_tipdoc );
        this.selectedTipdoc = (s_tipdoc.length > 0) ? s_tipdoc[0] : null;

        this.colaboradores = c.colaboradores;
        this.direcciones = c.direcciones;
        this.bancos = c.bancos;
    }
    
    setFormAdmin(p: Proveedor){
        this.direcciones = [];
        p.direcciones.map((direccion: Direcciones) => {
            let _direccion = Object.assign({}, direccion);
            this.direcciones.push(_direccion);
        });

        this.colaboradores = [];
        p.colaboradores.map((colaborador: Colaborador) => {
            let _colaborador = Object.assign({}, colaborador);
            this.colaboradores.push(_colaborador);
        });

        this.bancos = [];
        p.bancos.map((banco: Banco) => {
            let _banco = Object.assign({}, banco);
            this.bancos.push(_banco);
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
            let prov = new Proveedor();
            prov.id_prov = this.id_prov;
            prov.razsoc_prov = this.razsoc_prov;
            prov.ema_prov = this.ema_prov;
            prov.num_doc_prov = this.num_doc_prov;
            prov.id_tipdoc = this.id_tipdoc;
            prov.colaboradores = this.colaboradores;
            prov.direcciones = this.direcciones;
            prov.bancos = this.bancos;
            
            if(this.formMode) {
                console.log("viendo proveedor", prov);
                this.proveedorService.createProveedor(prov).subscribe(
                    (_resp) => {
                        this.showMessage('success', 'Exito¡', 'Proveedor registrado');
                        console.log(_resp);
                        this.getProveedor();
                        this.resetForm();
                        this.showbar = false;
                        this.displayModal = false;
                        this.selectedProveedor = null;
                    },
                    (error) => {
                        this.showMessage('error', 'Error', 'Ocurrio un problema en el servidor');
                        //this.resetForm();
                        console.log("error: ", error)
                        this.showbar = false;
                });
            } else {
                this.proveedorService.updateProveedor(prov).subscribe(
                    (_resp) => {
                        this.showMessage('success', 'Exito', 'Proveedor actualizado');
                        //console.log("Guardado correctamente");
                        this.getProveedor();
                        this.resetForm();
                        this.showbar = false;
                        this.displayModal = false;
                        this.selectedProveedor = null;
                    },
                    (error) => {
                        this.showMessage('error', 'Error', 'Ocurrio un problema en el servidor');
                        //this.resetForm();
                        this.showbar = false;
                });
            }
        }
    }

    newProveedor() {
        this.resetForm();
        this.displayModal = true;
    }

    editProveedor() {
        if(this.selectedProveedor) {
            this.formMode = false;
            this.setForm(this.selectedProveedor);
            this.titlePanel = "Actualizar Proveedor";
            this.submitLabel = "Actualizar"
            this.displayModal = true;
        } else {
            this.showMessage('info', 'Informacion', 'Seleccione un proveedor');
        }
    }

    deleteProveedor() {
        if(this.selectedProveedor) {
            this.confirmationService.confirm({
                message: '¿Quieres eliminar este proveedor?',
                header: 'Confirmacion',
                icon: 'pi pi-info-circle',
                key: 'deleteProveedor',
                accept: () => {
                    //this.showbar = true;
                    this.proveedorService.deleteProveedor(this.selectedProveedor.id_prov).subscribe(
                        (_resp) => {
                            this.showMessage('success', 'Exito', 'Proveedor eliminado');
                            this.getProveedor();
                            this.selectedProveedor = null;
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
            this.showMessage('info', 'Informacion', 'Seleccione un proveedor');
        }
    }
    cancel() {
		this.submitted = false;
		this.resetForm();
		this.displayModal = false;
    }

    administrarProveedor() {
        this.resetForm();
        if(this.selectedProveedor) {
            //this.setForm(this.selectedCliente);
            this.setFormAdmin(this.selectedProveedor);
            this.id_prov = this.selectedProveedor.id_prov;
            this.displayModalAdmin = true;
            this.submitValid = false;
        } else {
            this.showMessage('info', 'Informacion', 'Seleccione un proveedor');
        }
    }

    submitAdmin() {
        let prov = new Proveedor();
        prov.id_prov = this.id_prov;
        prov.razsoc_prov = this.razsoc_prov;
        prov.ema_prov = this.ema_prov;
        prov.num_doc_prov = this.num_doc_prov;
        prov.id_tipdoc = this.id_tipdoc;
        prov.colaboradores = this.colaboradores;
        prov.direcciones = this.direcciones;
        prov.bancos = this.bancos;
        
            //código extraido sin validadores
        this.proveedorService.adminProveedor(prov).subscribe(
            (_resp) => {
                this.showMessage('success', 'Exito', 'Proveedor actualizado');
                    //console.log("Guardado correctamente");
                console.log("viendo proveedor enviado", prov);
                this.getProveedor();
                this.resetForm();
                this.showbar = false;
                this.displayModalAdmin = false;
                this.selectedProveedor = null;
            },
            (error) => {
                this.showMessage('error', 'Error', 'Ocurrio un problema Al guardar');
                console.log("viendo proveedor error", prov);
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

    newColaborador(){
        this.resetColaborador();
        this.displayModalCol = true;
    }

    newDireccion(){
        this.resetDireccion();
        this.displayModalDir = true;
    }

    newBanco(){
        this.resetBanco();
        this.displayModalBan = true;
    }

    resetColaborador(){
        this.id_prov_col = -1;
        this.nom_prov_col = "";
        this.ema_prov_col= "";
        this.tel_prov_col = "";
        this.ane_prov_col = "";
        this.car_prov_col = "";
        this.est_reg_col = "";
        this.submitCol = false;
    }

    resetDireccion() {
        this.id_prov_dir = -1;
        this.ciu_prov = "";
        this.dir_prov = "";
        this.tel_prov = "";
        this.est_reg_dir = "";  
        this.submitDir = false;
    }

    resetBanco() {
        this.id_prov_ban = -1;
        this.tip_prov_ban = "";
        this.cue_prov_ban = "";
        this.ban_prov_ban = "";
        this.com_prov_ban = "";
        this.est_reg_ban = "";  
        this.submitBan = false;
    }

    agregarColaborador() {
        this.submitCol = true;
        this.showbar = true;
        if(!this.validNombre) {
            this.showbar = false;
            this.showMessage('warn', 'Advertencia', 'Campos incompletos');
            return;
        } else {
            let colab = new Colaborador();
            colab.id_prov_col = (Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000) * -1;
            colab.id_prov = this.id_prov;
            colab.nom_prov_col = this.nom_prov_col;
            colab.ema_prov_col = this.ema_prov_col;
            colab.tel_prov_col = this.tel_prov_col;
            colab.ane_prov_col = this.ane_prov_col;
            colab.car_prov_col = this.car_prov_col;
            colab.est_reg = "A";

            this.colaboradores.push(colab);
            this.showMessage('success', 'Exito!', 'Colaborador Agregado');
            this.showbar = false;
            this.displayModalCol = false;
            this.submitValid = true;
            this.resetColaborador();
        }
    }

    deleteColaborador(c: Colaborador) {
        this.confirmationService.confirm({
            message: '¿Quieres eliminar este colaborador?',
            header: 'Confirmacion',
            icon: 'pi pi-info-circle',
            key: 'deleteColaborador',
            accept: () => {
                if (c.id_prov_col < 0) {
                    this.colaboradores = this.colaboradores.filter( unit => unit.id_prov_col !== c.id_prov_col);
                } else {
                    c.est_reg = "E";
                    this.est_reg_col = c.est_reg;
                }
                this.resetColaborador();
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
            let direc = new Direcciones();
            direc.id_prov_dir = (Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000) * -1;
            direc.id_prov = this.id_prov;
            direc.ciu_prov = this.ciu_prov;
            direc.dir_prov = this.dir_prov;
            direc.tel_prov = this.tel_prov;
            direc.est_reg = "A";

            this.direcciones.push(direc);
            this.showMessage('success', 'Exito!', 'Dirección agregada');
            this.showbar = false;
            this.displayModalDir = false;
            this.submitValid = true;
            this.resetDireccion();
        }
    }
    deleteDireccion(d: Direcciones) {
        this.confirmationService.confirm({
            message: '¿Quieres eliminar esta direccion?',
            header: 'Confirmacion',
            icon: 'pi pi-info-circle',
            key: 'deleteDireccion',
            accept: () => {
                if (d.id_prov_dir < 0) {
                    this.direcciones = this.direcciones.filter( unit => unit.id_prov_dir !== d.id_prov_dir);
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

    agregarBanco() {
        this.submitBan = true;
        this.showbar = true;
        if(!this.validTipoBanco||!this.validCuentaBanco) {
            this.showbar = false;
            this.showMessage('warn', 'Advertencia', 'Campos incompletos');
            return;
        } else {
            let ban = new Banco();
            ban.id_prov_ban = (Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000) * -1;
            ban.id_prov = this.id_prov;
            ban.tip_prov_ban = this.tip_prov_ban;
            ban.cue_prov_ban = this.cue_prov_ban;
            ban.ban_prov_ban = this.ban_prov_ban;
            ban.com_prov_ban = this.com_prov_ban;
            ban.est_reg = "A";

            this.bancos.push(ban);
            this.showMessage('success', 'Exito!', 'Cuenta agregada');
            this.showbar = false;
            this.displayModalBan = false;
            this.submitValid = true;
            this.resetBanco();
        }
    }
    deleteBanco(b: Banco) {
        this.confirmationService.confirm({
            message: '¿Quieres eliminar esta cuenta?',
            header: 'Confirmacion',
            icon: 'pi pi-info-circle',
            key: 'deleteBanco',
            accept: () => {
                //this.clonedBanc[b.id_prov_ban] = {...b}
                if (b.id_prov_ban < 0) {
                    this.bancos = this.bancos.filter( unit => unit.id_prov_ban !== b.id_prov_ban);
                } else {
                    b.est_reg = "E";
                    this.est_reg_ban = b.est_reg;
                }
                this.resetBanco();
            },
            reject: () => {

            },
        });
    }

    cancelAdmin() {
		this.submitted = false;
        this.displayModalAdmin = false;
        this.colaboradores = [];
        this.direcciones = [];
        this.resetForm();
    }

    cancelCol() {
        this.displayModalCol = false;
        this.resetColaborador();
    }
    cancelDir() {
        this.displayModalDir = false;
        this.resetDireccion();
    }
    cancelBan() {
        this.displayModalBan = false;
        this.resetBanco();
    }

    //validadores
    get validRazSoc(): boolean {
        return this.razsoc_prov !== "";
    }

    get validTipDoc(): boolean {
        return this.selectedTipdoc !== null;
    }

    get validNumDoc(): boolean {
        return this.num_doc_prov !== "";
    }

    get validNombre(): boolean {
        return this.nom_prov_col !== "";
    }
    get validCiudad(): boolean {
        return this.ciu_prov !== "";
    }
    get validDireccion(): boolean {
        return this.dir_prov !== "";
    }

    get validTipoBanco(): boolean {
        return this.tip_prov_ban !== "";
    }
    get validCuentaBanco(): boolean {
        return this.cue_prov_ban !== "";
    }

    //end validadores

    //Botones editar

    clonedColabo: { [s: string]: Colaborador; } = {};

    clonedDirecc: { [s: string]: Direcciones; } = {};

    clonedBanc: { [s: string]: Banco; } = {};
    //Fin botones

    //mensajes 
    showMessage(_severity: string, _summary: string, _detail: string) {
        this.messageService.add({severity: _severity, summary: _summary, detail: _detail});
    }
}
