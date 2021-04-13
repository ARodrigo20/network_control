import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService, SelectItem } from 'primeng/api';
import { CotizacionesService } from "@app/cotizaciones-cli/data/services/cotizaciones.service";
import { ClienteService } from "@app/clientes/data/services/cliente.service";
import { TipoDocService } from '@app/tablas-referenciales/data/services/tipodoc.service';
import { GeneralCollection } from '@app/_general/models/general-collection.model';
import { Cliente } from '@app/clientes/data/models/cliente.model';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralService } from '@app/_general/services/general.service';
import { Producto } from '@app/inventario/data/models/product.model';
import { ProductosService } from '@app/inventario/data/services/productos.service';
import { AuthService } from '@app/_general/services/auth.service';
import { Proyecto } from '@app/proyectos/data/models/proyect.model';
import { ProyectosService } from '@app/proyectos/data/services/proyect.service';
import { Direccion } from '@app/clientes/data/models/direccion.model';
import { Contacto } from '@app/clientes/data/models/contacto.model';
import { CotizacionDetalle } from '@app/cotizaciones-cli/data/models/cotizacion-detalle.model';
import { Cotizacion, CotizacionJSON } from '@app/cotizaciones-cli/data/models/cotizacion.model';
import { CotizacionesModule } from '@app/cotizaciones-cli/cotizaciones.module';

@Component({
    selector: 'app-cotizaciones-form',
    templateUrl: './cotizaciones-form.component.html',
    styleUrls: ['./cotizaciones-form.component.scss']
})

export class CotizacionesFormComponent implements OnInit {

    est_reg: string;
    solcli_id : number;
    editar: boolean = false;
    //cambio: boolean = true;

    fecha: Date = new Date();
    userName: string = "";

    proyectos: Proyecto[] = [];
    selectedProyecto: Proyecto;

    tiposDetalle: SelectItem[] = [];
    selectedTipoDetalle: SelectItem;

    clientes: Cliente[] = [];
    selectedCliente: Cliente;

    direcciones: Direccion[] = [];
    selectedDireccion: Direccion;

    contactos: Contacto[] = [];
    selectedContacto: Contacto;

    productos: Producto[] = [];
    selectedProducto: Producto;

    servicio: string = "";

    cantidad: number = 0;
    //stock: number = 0;

    submitted: boolean = false;
    submittedPS: boolean = false;
    showbar: boolean = false;

    cotizacionDetalle: CotizacionDetalle[] = [];

    displayModalDireccion: boolean = false;
    displayModalContacto: boolean = false;

    submitDir: boolean = false;
    showBarDir: boolean = false;

    submitCon: boolean = false;
    showBarCon: boolean = false;

    //modal direccion
    ciu_cli: string = "";
    dir_cli: string = "";
    tel_cli: string = "";
    ////////////////

    //modal contacto
    nom_cli_con: string = "";
    ema_cli_con: string = "";
    cel_cli_con: string = "";
    ane_cli_con: string = "";
    car_cli_con: string = "";
    ////////////////

    constructor(
            private messageService: MessageService,
            private confirmationService: ConfirmationService,
            private cotizacionesService: CotizacionesService,
            private clienteService: ClienteService,
            private tipodocService: TipoDocService,
            private proyectosService: ProyectosService,
            private authService: AuthService,
            private productosService: ProductosService,
            public activatedroute: ActivatedRoute, 
            public gS: GeneralService,
            private router: Router
        ) {
            var titles = this.activatedroute.snapshot.data['title'];
            this.gS.setTitle(titles.split('/'));
    }

    ngOnInit() {
        
         this.getProyectos();
         this.getClientes();
         this.getTiposDetalle();
         this.getProductos();
         this.userName = this.authService.getusuarioJson().nom_col;
        ///////////////////////

        try {
            let cod = this.activatedroute.snapshot.paramMap.get('codproyecto');
            console.log("codigo: ", cod)

            if(cod === "new"){
                console.log("crear," + cod.substring(4));
            }
            else if(cod.includes("mod")){
                //this.editar=false;
                console.log("modificarCotiza," + cod.substring(4));
                let codigoCotizacion = +cod.substring(4);
                this.cotizacionesService.getCotizacion(codigoCotizacion).subscribe(
                   
                    (_cotizacion: CotizacionJSON) => {
                        //console.log(_proforma);
                        this.editar = true;
                        this.setForm(_cotizacion);
                        
                    },
                    (error) => {
                        console.log("ocurrio un error");

                    }
                );
            }
            else{
                //console.log("modificando ," +cod.substring(4));
                    this.getClientes();
                    this.getTiposDetalle();
                    this.getProductos();
                    //this.getProyectos();
                    this.proyectosService.getProyectoProceso(null).subscribe(
                        (_proyectos: GeneralCollection<Proyecto>) => {
                            this.proyectos = _proyectos['data'];
                            this.selectedProyecto = this.proyectos.filter(unit => unit.id_proy === +cod)[0];
                        },
                        (error) => {
                        }
                    );
            }
            /* try {
            let cod = this.activatedroute.snapshot.paramMap.get('codproyecto');

            switch (cod) {
                case 'new':
                    //console.log("modificando ," +cod.substring(4));
                    this.getProyectos();
                    this.getClientes();
                    this.getTiposDetalle();
                    this.getProductos();
                    break;
                //case 'mod':
                    
                    //console.log("modificar");
                    //console.log("modificando ," +cod.substring(4));
                  //  break;    
                default:
                    console.log("modificando ," +cod.substring(4));
                    this.getClientes();
                    this.getTiposDetalle();
                    this.getProductos();
                    //this.getProyectos();
                    this.proyectosService.getProyectoProceso(null).subscribe(
                        (_proyectos: GeneralCollection<Proyecto>) => {
                            this.proyectos = _proyectos['data'];
                            this.selectedProyecto = this.proyectos.filter(unit => unit.id_proy === +cod)[0];
                        },
                        (error) => {
                        }
                    );

                     let codigo = +cod.substring(4);
                     this.cotizacionesService.getCotizacion(codigo).subscribe(
                         (c: Cotizacion ) => {
                             console.log(c);
                             this.setForm(c);
                         },
                         (error) => {
                             console.log("ocurrio un error");
                         }
                     );

                    break;
            }*/

        } catch (error) {
            this.router.navigate(['/cotizaciones-cli']);
        }
    }

    setForm(p: CotizacionJSON) {

        this.solcli_id = p.cotizacion.solcli_id;

        this.est_reg = p.cotizacion.est_reg;

        var s_proy = this.proyectos.filter( unit => unit.id_proy === p.cotizacion.id_proy );
        this.selectedProyecto = (s_proy.length > 0) ? s_proy[0] : null;

        var s_cli = this.clientes.filter( unit => unit.id_cli === p.cotizacion.id_cli );
        this.selectedCliente = (s_cli.length > 0) ? s_cli[0] : null;
        
        if(this.selectedCliente){
            this.direcciones = this.selectedCliente.direcciones;
            this.selectedDireccion = null;
            if(p.cotizacion){
                this.selectedDireccion = this.direcciones.find(unit => unit.id_cli_dir === p.cotizacion.solcli_cli_id_dir);
            }
            this.contactos = this.selectedCliente.contactos;
            this.selectedContacto = null;
            if(p.cotizacion){
                this.selectedContacto = this.contactos.find(unit => unit.id_cli_con === p.cotizacion.solcli_cli_id_con);
            }
        }

        p.cotizacion.cotizacion_detalle.map((cot : CotizacionDetalle) => {
                       
            if(cot.solclidet_prod_serv === 1 ) {
                
                let detalle = new CotizacionDetalle();
                //detalle.solclidet_id = (Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000) * -1;
                detalle.solclidet_id = cot.solclidet_id;

                //detalle.solcli_id = cot.solcli_id;
                detalle.solclidet_prod_serv = cot.solclidet_prod_serv;
                detalle.solclidet_prod_can = cot.solclidet_prod_can;
                detalle.solclidet_des = cot.solclidet_des;

                detalle.id_prod=cot.id_prod;    
                detalle.solclidet_prod_codint= cot.solclidet_prod_codint;
                detalle.solclidet_prod_numpar= cot.solclidet_prod_numpar;
                detalle.solclidet_prod_fabr= cot.solclidet_prod_fabr;
                detalle.solclidet_prod_marc = cot.solclidet_prod_marc;
                detalle.solclidet_prod_unimed = cot.solclidet_prod_unimed;
                detalle.solclidet_prod_stock = cot.solclidet_prod_stock;
                detalle.est_reg = cot.est_reg;
                if(detalle.est_reg==='A'){
                    this.cotizacionDetalle.push(detalle);
                }
                //this.cotizacionDetalle.push(detalle);
                //this.resetProductoServicio();
                                                       
                
            } else {
                let detalle = new CotizacionDetalle();
                //detalle.solclidet_id = (Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000) * -1;
                detalle.solclidet_id = cot.solclidet_id;
                detalle.id_prod=null;
                detalle.solclidet_prod_codint=null;
                //detalle.solclidet_id = cot.solclidet_id;
                detalle.solclidet_prod_numpar=null;
                detalle.solclidet_prod_fabr=null;
                detalle.solclidet_prod_marc = null;
                detalle.solclidet_prod_unimed =null;
                detalle.solclidet_prod_stock = null;
                //detalle.solcli_id = cot.solcli_id;
                detalle.solclidet_prod_serv = cot.solclidet_prod_serv;
                detalle.solclidet_prod_can = cot.solclidet_prod_can;
                detalle.solclidet_des = cot.solclidet_des;
                detalle.est_reg = cot.est_reg;
                if(detalle.est_reg==='A'){
                    this.cotizacionDetalle.push(detalle);
                }
                
                //this.cotizacionDetalle.push(detalle);                                       
            }
        });
    }

    getTiposDetalle() {
        this.tiposDetalle = [
            {label: "Servicio", value: 2},
            {label: "Producto", value: 1},
        ];
        this.selectedTipoDetalle = this.tiposDetalle[0];
    }

    getProyectos() {
        this.proyectosService.getProyectoProceso(null).subscribe(
            (_proyectos: GeneralCollection<Proyecto>) => {
                this.proyectos = _proyectos['data'];
            },
            (error) => {
            }
        );
    }

    getClientes() {
        this.clienteService.getClientes(null).subscribe(
            (_clientes: GeneralCollection<Cliente>) => {
                this.clientes = _clientes['data'];

                console.log("cl9: ", this.clientes)
            },
            (error) => {
            }
        );
    }

    getProductos() {
        this.productosService.getProductos(null).subscribe(
            (_productos: GeneralCollection<Producto>) => {
                this.productos = _productos['data'];
            },
            (error) => {
                console.log(error)
            }
        );
    }

    onChangeCliente(event: any) {
        if(event.value) {
            this.direcciones = event.value.direcciones;
            this.selectedDireccion = null;
            this.contactos = event.value.contactos;
            this.selectedContacto = null;
        }else{
            this.direcciones = [];
            this.selectedDireccion = null;
            this.contactos = [];
            this.selectedContacto = null;
        }
    }

    addDetalle() {
        this.submittedPS = true;
        if(this.selectedTipoDetalle.value === 1) {
            if(this.validProducto && this.validCantidad) {
                let detalle = new CotizacionDetalle();
                detalle.solclidet_id = (Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000) * -1;
                detalle.id_prod = this.selectedProducto.id_prod;
                detalle.solclidet_prod_codint = this.selectedProducto.cod_prod;
                detalle.solclidet_prod_numpar = this.selectedProducto.num_parte_prod;
                detalle.solclidet_prod_fabr = (this.selectedProducto.fabricante) ? this.selectedProducto.fabricante.des_fab : null;
                detalle.solclidet_prod_marc = (this.selectedProducto.marca) ? this.selectedProducto.marca.des_mar : null;
                detalle.solclidet_prod_unimed = (this.selectedProducto.unidad_medida) ? this.selectedProducto.unidad_medida.nom_unimed : null;
                detalle.solclidet_prod_serv = this.selectedTipoDetalle.value;
                detalle.solclidet_prod_can = this.cantidad;
                detalle.solclidet_des = this.selectedProducto.des_prod;
                detalle.solclidet_prod_stock = null;
                this.cotizacionDetalle.push(detalle);
                this.resetProductoServicio();
            }
        } else {
            if(this.validServicio && !this.cotizacionDetalle.find(unit => unit.solclidet_des === this.servicio )) {
                let detalle = new CotizacionDetalle();
                detalle.solclidet_id = (Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000) * -1;
                detalle.id_prod = null;
                detalle.solclidet_prod_codint = null;
                detalle.solclidet_prod_numpar = null;
                detalle.solclidet_prod_fabr = null;
                detalle.solclidet_prod_marc = null;
                detalle.solclidet_prod_unimed = null;
                detalle.solclidet_prod_can = null;
                detalle.solclidet_prod_stock = null;
                detalle.solclidet_prod_serv = this.selectedTipoDetalle.value;
                detalle.solclidet_des = this.servicio;
                this.cotizacionDetalle.push(detalle);
                this.resetProductoServicio();
            }
        }

        // let detalle = new CotizacionDetalle();
        // detalle.solclidet_prod_serv = this.selectedTipoDetalle.value;
        // detalle.solclidet_des = "servicio 1"

        // this.cotizacionDetalle.push(detalle);
    }

    /*deleteDetalle(detalle: CotizacionDetalle) {
        this.cotizacionDetalle = this.cotizacionDetalle.filter(unit => unit.solclidet_id !== detalle.solclidet_id);
    }*/
    deleteDetalle(detalle: CotizacionDetalle) {
        console.log("eliminando", detalle.solclidet_id);
        if(detalle.solclidet_id > 0) {
            this.confirmationService.confirm({
                message: '¿Quieres eliminar este item?',
                header: 'Confirmacion',
                icon: 'pi pi-info-circle',
                key: 'deleteDetalle',
                accept: () => {
                    detalle.est_reg = 'E';
                },
                reject: () => {

                },
            });
        } else {
            this.cotizacionDetalle = this.cotizacionDetalle.filter(unit => unit.solclidet_id !== detalle.solclidet_id);
        }
    }

    resetProductoServicio() {
        this.submittedPS = false;
        this.servicio = "";
        this.selectedProducto = undefined;
        this.cantidad = 0;
        //this.stock = 0;
    }

    

    submittt(){
        this.submitted = true;
        this.showbar = true;

        if(!this.validCliente || !this.validItems) {
            this.showbar = false
            this.showMessage('warn', 'Advertencia', 'Campos incompletos');
            return;
        }else {
            let cotizacion = {
                solcli_id: this.solcli_id,
                id_proy: (this.selectedProyecto) ? this.selectedProyecto.id_proy : null,
                solcli_proy_nom: (this.selectedProyecto) ? this.selectedProyecto.nom_proy : null,
                solcli_proy_cod: (this.selectedProyecto) ? (this.selectedProyecto.ser_proy + this.selectedProyecto.num_proy) : null,
                id_cli: (this.selectedCliente) ? this.selectedCliente.id_cli : null,
                solcli_cli_nom: (this.selectedCliente) ? this.selectedCliente.razsoc_cli : null,
                solcli_cli_numdoc: (this.selectedCliente) ? this.selectedCliente.numdoc_cli : null,
                solcli_cli_tipdoc: (this.selectedCliente && this.selectedCliente.tipo_documento) ? this.selectedCliente.tipo_documento.des_tipdoc : null,
                solcli_cli_dir: (this.selectedDireccion) ? this.selectedDireccion.dir_cli : null,
                solcli_cli_id_dir: (this.selectedDireccion) ? this.selectedDireccion.id_cli_dir : null,
                solcli_cli_con: (this.selectedContacto) ? this.selectedContacto.nom_cli_con : null,
                solcli_cli_id_con: (this.selectedContacto) ? this.selectedContacto.id_cli_con : null,
                id_col: this.authService.getusuarioJson().id_col,
                solcli_col_nom: this.authService.getusuarioJson().nom_col +  this.authService.getusuarioJson().ape_col,
                est_reg: 'A',
                cotizacion_detalle: this.cotizacionDetalle,

                //cotizacion_detalle: this.getCotizacionDetalle()
            }


            if(!this.editar){
                //esto es para crear
                console.log("cotizacion:: ", cotizacion);
                this.cotizacionesService.createCotizacion(cotizacion).subscribe(
                    (_resp) => {
                        this.showbar = false;
                        this.showMessage('success', 'Exito', 'Cotizacion creada');
                        console.log(_resp);
                        console.log(cotizacion);
                        this.cancel();
                    },
                    (error) => {
                        this.showMessage('error', 'Error', 'Ocurrio un problema al crear');
                        console.log("error: ", error)
                        this.showbar = false;
                    });
            }
            else{
                //esto es para editar
                console.log("cotizacionEditar:: ", cotizacion);
                this.cotizacionesService.updateCotizacion(cotizacion).subscribe(
                    (_resp) => {
                        this.showbar = false;
                        this.showMessage('success', 'Exito', 'Cotizacion modificada');
                        console.log(_resp);
                        console.log(cotizacion);
                        this.cancel();
                    },
                    (error) => {
                        this.showMessage('error', 'Error', 'Ocurrio un problema al modificar');
                        console.log("error: ", error)
                        this.showbar = false;
                    });
            }
    
               
        }
    }
 /*   editDetalle(detalle: any){
        console.log(detalle);
        //this.editing = false
        this.cotizacionesService.updateCotizacionDet(detalle, detalle.solclidet_id).subscribe(
            (_resp) => {
                //this.cambio=false;
                this.showbar = false;
                this.showMessage('success', 'Exito', 'Detalle modificada');
                //console.log(_resp);
                //console.log(detalle);
                //this.cancel();
            },
            (error) => {
                this.showMessage('error', 'Error', 'Ocurrio un problema al modificar');
                console.log("error: ", error)
                this.showbar = false;
            });
    }*/


    
    

    /*anadirDetalleCab(detalle: any, idCab:number){
        console.log(detalle);
        this.cotizacionesService.updateCotizacionDet(detalle, idCab).subscribe(
            (_resp) => {
                this.showbar = false;
                this.showMessage('success', 'Exito', 'Detalle modificada');
                //console.log(_resp);
                //console.log(detalle);
                //this.cancel();
            },
            (error) => {
                this.showMessage('error', 'Error', 'Ocurrio un problema al modificar');
                console.log("error: ", error)
                this.showbar = false;
            });
    }

    submit() {

        this.submitted = true;
        this.showbar = true;

        if(!this.validCliente || !this.validItems) {
            this.showbar = false
            this.showMessage('warn', 'Advertencia', 'Campos incompletos');
            return;
        }else {
            let cotizacion = {
                id_proy: (this.selectedProyecto) ? this.selectedProyecto.id_proy : null,
                solcli_proy_nom: (this.selectedProyecto) ? this.selectedProyecto.nom_proy : null,
                solcli_proy_cod: (this.selectedProyecto) ? (this.selectedProyecto.ser_proy + this.selectedProyecto.num_proy) : null,
                id_cli: (this.selectedCliente) ? this.selectedCliente.id_cli : null,
                solcli_cli_nom: (this.selectedCliente) ? this.selectedCliente.razsoc_cli : null,
                solcli_cli_numdoc: (this.selectedCliente) ? this.selectedCliente.numdoc_cli : null,
                solcli_cli_tipdoc: (this.selectedCliente && this.selectedCliente.tipo_documento) ? this.selectedCliente.tipo_documento.des_tipdoc : null,
                solcli_cli_dir: (this.selectedDireccion) ? this.selectedDireccion.dir_cli : null,
                solcli_cli_id_dir: (this.selectedDireccion) ? this.selectedDireccion.id_cli_dir : null,
                solcli_cli_con: (this.selectedContacto) ? this.selectedContacto.nom_cli_con : null,
                solcli_cli_id_con: (this.selectedContacto) ? this.selectedContacto.id_cli_con : null,
                id_col: this.authService.getusuarioJson().id_col,
                solcli_col_nom: this.authService.getusuarioJson().nom_col +  this.authService.getusuarioJson().ape_col,
                cotizacion_detalle: this.cotizacionDetalle
            }
    
            console.log("cotizacion:: ", cotizacion);
            this.cotizacionesService.createCotizacion(cotizacion).subscribe(
                (_resp) => {
                    this.showbar = false;
                    this.showMessage('success', 'Exito', 'Cotizacion creada');
                    console.log(_resp);
                    console.log(cotizacion);
                    this.cancel();
                },
                (error) => {
                    this.showMessage('error', 'Error', 'Ocurrio un problema al crear');
                    console.log("error: ", error)
                    this.showbar = false;
            });   
        }
    }*/

    cancel() {
        this.router.navigate(["/cotizaciones-cli"]);
    }

    nuevaDireccion() {
        if(this.selectedCliente) {
            this.resetFormDireccion();
            this.displayModalDireccion = true;
        } else {
            this.showMessage('info', 'Informacion', 'Seleccione un cliente');
        }
    }

    agregarDireccion() {
        this.submitDir = true;
        this.showBarDir = true;
        if(!this.validCiudad||!this.validDireccion) {
            this.showBarDir = false;
            this.showMessage('warn', 'Advertencia', 'Campos incompletos');
            return;
        } else {
            let direc = new Direccion();
            direc.id_cli = this.selectedCliente.id_cli;
            direc.ciu_cli = this.ciu_cli;
            direc.dir_cli = this.dir_cli;
            direc.tel_cli = this.tel_cli;

            this.clienteService.createDireccion(direc).subscribe(
                (_resp) => {
                    this.showBarDir = false;
                    this.showMessage('success', 'Exito', 'Direccion creada');
                    //console.log(_resp);
                    this.clienteService.getCliente(this.selectedCliente.id_cli).subscribe(
                        (_cliente: Cliente) => {
                            //console.log("cliente::", _cliente);
                            var cliente = this.clientes.find(item => item.id_cli === this.selectedCliente.id_cli);
                            cliente.direcciones = _cliente.direcciones;
                            this.selectedDireccion = null;
                            this.direcciones = _cliente.direcciones;
                        },
                        (error) => {
                            console.log("error: ", error)
                    }); 
                    this.cancelDireccion();
                },
                (error) => {
                    this.showMessage('error', 'Error', 'Ocurrio un problema al crear');
                    console.log("error: ", error)
                    this.showBarDir = false;
            }); 

            //console.log("nueva direccion: ", direc)
        }
    }

    cancelDireccion() {
        this.displayModalDireccion = false;
        this.resetFormDireccion();
    }

    resetFormDireccion() {
        this.submitDir = false;
        this.showBarDir = false;
        this.ciu_cli = "";
        this.dir_cli = "";
        this.tel_cli = "";
    }

    nuevoContacto() {
        if(this.selectedCliente) {
            this.resetFormContacto();
            this.displayModalContacto = true;
        } else {
            this.showMessage('info', 'Informacion', 'Seleccione un cliente');
        }
    }

    agregarContacto() {
        this.submitCon = true;
        this.showBarCon = true;
        if(!this.validNombre) {
            this.showBarCon = false;
            this.showMessage('warn', 'Advertencia', 'Campos incompletos');
            return;
        } else {
            let contac = new Contacto();
            contac.id_cli_con = 0;
            contac.id_cli = this.selectedCliente.id_cli;
            contac.nom_cli_con = this.nom_cli_con;
            contac.ema_cli_con = this.ema_cli_con;
            contac.cel_cli_con = this.cel_cli_con;
            contac.ane_cli_con = this.ane_cli_con;
            contac.car_cli_con = this.car_cli_con;

            this.clienteService.createContacto(contac).subscribe(
                (_resp) => {
                    this.showBarCon = false;
                    this.showMessage('success', 'Exito', 'Contacto creado');
                    //console.log(_resp);
                    this.clienteService.getCliente(this.selectedCliente.id_cli).subscribe(
                        (_cliente: Cliente) => {
                            //console.log("cliente::", _cliente);
                            var cliente = this.clientes.find(item => item.id_cli === this.selectedCliente.id_cli);
                            cliente.contactos = _cliente.contactos;
                            this.selectedContacto = null;
                            this.contactos = _cliente.contactos;
                        },
                        (error) => {
                            console.log("error: ", error)
                    }); 
                    this.cancelContacto();
                },
                (error) => {
                    this.showMessage('error', 'Error', 'Ocurrio un problema al crear');
                    console.log("error: ", error)
                    this.showBarCon = false;
            }); 
        }
    }

    cancelContacto() {
        this.displayModalContacto = false;
        this.resetFormContacto();
    }

    resetFormContacto() {
        this.submitCon = false;
        this.showBarCon = false;
        this.nom_cli_con = "";
        this.ema_cli_con = "";
        this.cel_cli_con = "";
        this.ane_cli_con = "";
        this.car_cli_con = "";
    }

    //validadores

    get validCliente(): boolean {
        return this.selectedCliente !== undefined && this.selectedCliente !== null ;
    }

    get validItems(): boolean {
        return this.cotizacionDetalle.length > 0;
    }

    get validServicio(): boolean {
        return this.servicio !== "";
    }

    get validProducto(): boolean {
        return this.selectedProducto !== undefined && this.selectedProducto !== null;
    }

    get validCantidad(): boolean {
        return this.cantidad !== null && this.cantidad > 0;
    }

    // get validStock(): boolean {
    //     return this.stock !== null && this.stock > 0;
    // }

    //modals
    get validNombre(): boolean {
        return this.nom_cli_con !== "";
    }
    get validCiudad(): boolean {
        return this.ciu_cli !== "";
    }
    get validDireccion(): boolean {
        return this.dir_cli !== "";
    }

    //mensajes 
    showMessage(_severity: string, _summary: string, _detail: string) {
        this.messageService.add({severity: _severity, summary: _summary, detail: _detail});
    }

}
