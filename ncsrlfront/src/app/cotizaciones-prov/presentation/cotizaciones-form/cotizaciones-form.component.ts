import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService, SelectItem } from 'primeng/api';
import { CotizacionesProvService } from "@app/cotizaciones-prov/data/services/cotizaciones.service";
import { CotizacionesService } from "@app/cotizaciones-cli/data/services/cotizaciones.service";
import { ProveedorService } from "@app/proveedores/data/services/proveedor.service";
import { TipoDocService } from '@app/tablas-referenciales/data/services/tipodoc.service';
import { GeneralCollection } from '@app/_general/models/general-collection.model';
import { Proveedor } from '@app/proveedores/data/models/proveedor.model';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralService } from '@app/_general/services/general.service';
import { Producto } from '@app/inventario/data/models/product.model';
import { ProductosService } from '@app/inventario/data/services/productos.service';
import { AuthService } from '@app/_general/services/auth.service';
import { Proyecto } from '@app/proyectos/data/models/proyect.model';
import { ProyectosService } from '@app/proyectos/data/services/proyect.service';
import { Direcciones } from '@app/proveedores/data/models/direccion.model';
import { Colaborador } from '@app/proveedores/data/models/colaborador.model';
import { CotizacionProvDetalle } from '@app/cotizaciones-prov/data/models/cotizacion-detalle.model';
import { CotizacionJSON } from '@app/cotizaciones-cli/data/models/cotizacion.model';
import { CotizacionDetalle } from '@app/cotizaciones-cli/data/models/cotizacion-detalle.model';

@Component({
    selector: 'app-cotizaciones-form',
    templateUrl: './cotizaciones-form.component.html',
    styleUrls: ['./cotizaciones-form.component.scss']
})

export class CotizacionesProvFormComponent implements OnInit {

    fecha: Date = new Date();
    userName: string = "";

    proyectos: Proyecto[] = [];
    selectedProyecto: Proyecto;

    /* tiposDetalle: SelectItem[] = [];
    selectedTipoDetalle: SelectItem; */

    proveedores: Proveedor[] = [];
    selectedProveedor: Proveedor;

    direcciones: Direcciones[] = [];
    selectedDireccion: Direcciones;

    colaboradores: Colaborador[] = [];
    selectedColaborador: Colaborador;

    productos: Producto[] = [];
    selectedProducto: Producto;

    servicio: string = "";

    cantidad: number = 0;
    solCli: string = "";
    //stock: number = 0;

    submitted: boolean = false;
    submittedPS: boolean = false;
    showbar: boolean = false;

    cotizacionProvDetalle: CotizacionProvDetalle[] = [];

    displayModalDireccion: boolean = false;
    displayModalContacto: boolean = false;

    submitDir: boolean = false;
    showBarDir: boolean = false;

    submitCon: boolean = false;
    showBarCon: boolean = false;

    //modal direccion
    ciu_prov: string = "";
    dir_prov: string = "";
    tel_prov: string = "";
    ////////////////

    //modal contacto
    nom_prov_con: string = "";
    ema_prov_con: string = "";
    //cel_cli_con: string = "";
    ane_prov_con: string = "";
    car_prov_con: string = "";
    ////////////////

    readOnlyProyecto: boolean = false;

    constructor(
            private messageService: MessageService,
            private confirmationService: ConfirmationService,
            private cotizacionesProvService: CotizacionesProvService,
            private cotizacionesCliService: CotizacionesService,
            private cotizacionesService: CotizacionesProvService,
            private proveedorService: ProveedorService,
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
        this.userName = this.authService.getusuarioJson().nom_col;
        this.getProyectos();
        this.getProveedor();
        //this.getTiposDetalle();
        this.getProductos();

        ///////////////////////
        try {
            let cod = this.activatedroute.snapshot.paramMap.get('codigo');
            let valores = this.activatedroute.snapshot.params;
            this.solCli = valores.solCli;

            switch (cod) {
                case 'new':
                    break;
                case 'new-cli':
                    this.cotizacionesCliService.getCotizacion(+this.solCli).subscribe(
                        (_cotizacionJSON: CotizacionJSON) => {
                            if (_cotizacionJSON && _cotizacionJSON.cotizacion) {
                                this.readOnlyProyecto = true;
                                this.selectedProyecto = this.proyectos.find(unit => unit.id_proy === _cotizacionJSON.cotizacion.id_proy);


                                _cotizacionJSON.cotizacion.cotizacion_detalle.map((_cot_cli: CotizacionDetalle) => {
                                    let detalle = new CotizacionProvDetalle();
                                    detalle.cotprovdet_id = (Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000) * -1;
                                    detalle.id_prod = _cot_cli.id_prod;
                                    detalle.cotprovdet_prod_codint = _cot_cli.solclidet_prod_codint;
                                    detalle.cotprovdet_prod_numpar = _cot_cli.solclidet_prod_numpar;
                                    detalle.cotprovdet_prod_fabr =_cot_cli.solclidet_prod_fabr;
                                    detalle.cotprovdet_prod_marc = _cot_cli.solclidet_prod_marc;
                                    detalle.cotprovdet_prod_unimed = _cot_cli.solclidet_prod_unimed;
                                    detalle.cotprovdet_cant = _cot_cli.solclidet_prod_can;
                                    detalle.cotprovdet_desc = _cot_cli.solclidet_des;
                                    this.cotizacionProvDetalle.push(detalle);
                                });
                                // console.log("json : ", _cotizacionJSON.cotizacion.cotizacion_detalle)
                            }
                        },
                        (error) => {
                            console.log("ocurrio un error");

                        }
                    );
                    break;
                default:

                    break;
            }


            this.solCli = this.activatedroute.snapshot.paramMap.get('solCli');

        } catch (error) {
            this.router.navigate(['/cotizaciones-prov']);
        }
    }

    /* getTiposDetalle() {
        this.tiposDetalle = [
            {label: "Servicio", value: 2},
            {label: "Producto", value: 1},
        ];
        this.selectedTipoDetalle = this.tiposDetalle[0];
    } */

    getProyectos() {
        this.proyectosService.getProyectoProceso(null).subscribe(
            (_proyectos: GeneralCollection<Proyecto>) => {
                this.proyectos = _proyectos['data'];
            },
            (error) => {
            }
        );
    }

    getProveedor() {
        this.proveedorService.getProveedor(null).subscribe(
            (_proveedores: GeneralCollection<Proveedor>) => {
                this.proveedores = _proveedores['data'];
                //console.log("cl9: ", this.proveedores)
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

    onChangeProveedor(event: any) {
        if(event.value) {
            this.direcciones = event.value.direcciones;
            //console.log("dirs:", this.direcciones)
            this.selectedDireccion = null;
            this.colaboradores = event.value.colaboradores;
            //console.log("cols:", this.colaboradores)
            this.selectedColaborador = null;
        }else{
            this.direcciones = [];
            this.selectedDireccion = null;
            this.colaboradores = [];
            this.selectedColaborador = null;
        }
    }

    addDetalle() {
        this.submittedPS = true;
        if(this.validProducto && this.validCantidad) {
            let detalle = new CotizacionProvDetalle();
            detalle.cotprovdet_id = (Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000) * -1;
            detalle.id_prod = this.selectedProducto.id_prod;
            detalle.cotprovdet_prod_codint = this.selectedProducto.cod_prod;
            detalle.cotprovdet_prod_numpar = this.selectedProducto.num_parte_prod;
            detalle.cotprovdet_prod_fabr = (this.selectedProducto.fabricante) ? this.selectedProducto.fabricante.des_fab : "Sin fabricante";
            detalle.cotprovdet_prod_marc = (this.selectedProducto.marca) ? this.selectedProducto.marca.des_mar : "Sin marca";
            detalle.cotprovdet_prod_unimed = (this.selectedProducto.unidad_medida) ? this.selectedProducto.unidad_medida.nom_unimed : "Sin unidad de medida";
            /* detalle.cotprovdet_prod_serv = this.selectedTipoDetalle.value; */
            detalle.cotprovdet_cant = this.cantidad;
            detalle.cotprovdet_desc = this.selectedProducto.des_prod;
            this.cotizacionProvDetalle.push(detalle);
            this.resetProductoServicio();
        }

        // let detalle = new CotizacionDetalle();
        // detalle.solclidet_prod_serv = this.selectedTipoDetalle.value;
        // detalle.solclidet_des = "servicio 1"

        // this.cotizacionDetalle.push(detalle);
    }

    deleteDetalle(detalle: CotizacionProvDetalle) {
        this.cotizacionProvDetalle = this.cotizacionProvDetalle.filter(unit => unit.cotprovdet_id !== detalle.cotprovdet_id);
    }

    resetProductoServicio() {
        this.submittedPS = false;
        this.servicio = "";
        this.selectedProducto = undefined;
        this.cantidad = 0;
        //this.stock = 0;
    }

    submit() {

        this.submitted = true;
        this.showbar = true;

        if(!this.validProveedor || !this.validItems) {
            this.showbar = false
            this.showMessage('warn', 'Advertencia', 'Campos incompletos');
            return;
        }else {
            let cotizacion = {
                id_proy: (this.selectedProyecto) ? this.selectedProyecto.id_proy : null,
                cotprov_proy_cod: (this.selectedProyecto) ? (this.selectedProyecto.ser_proy + this.selectedProyecto.num_proy) : null,
                cotprov_proy_nom: (this.selectedProyecto) ? this.selectedProyecto.nom_proy : null,
                id_prov: (this.selectedProveedor) ? this.selectedProveedor.id_prov : null,
                cotprov_razsoc: (this.selectedProveedor) ? this.selectedProveedor.razsoc_prov : null,
                cotprov_ruc: (this.selectedProveedor) ? this.selectedProveedor.num_doc_prov : null,
                cotprov_tipdoc: (this.selectedProveedor && this.selectedProveedor.tipo_documento) ? this.selectedProveedor.tipo_documento.des_tipdoc : null,
                cotprov_dir: (this.selectedDireccion) ? this.selectedDireccion.dir_prov : null,
                cotprov_con: (this.selectedColaborador) ? this.selectedColaborador.nom_prov_col : null,
                cotprov_ema: (this.selectedColaborador) ? this.selectedColaborador.ema_prov_col : null,
                id_col: this.authService.getusuarioJson().id_col,
                cotprov_col_nom: this.authService.getusuarioJson().nom_col + this.authService.getusuarioJson().ape_col,
                cotprov_col_usu: this.authService.getusuarioJson().email,
                cotizacion_detalle: this.cotizacionProvDetalle
            }
    
            //console.log("cotizacion:: ", cotizacion);
            this.cotizacionesProvService.createCotizacion(cotizacion).subscribe(
                (_resp) => {
                    this.showbar = false;
                    this.showMessage('success', 'Exito', 'Cotizacion creada');
                    console.log(_resp);
                    this.cancel();
                },
                (error) => {
                    this.showMessage('error', 'Error', 'Ocurrio un problema al crear');
                    console.log("error: ", error)
                    this.showbar = false;
            });   
        }
    }

    getCotizacion(){
        this.cotizacionesProvService.getCotizacion(+this.solCli).subscribe()
    }

    cancel() {
        this.router.navigate(["/cotizaciones-prov"]);
    }

    nuevaDireccion() {
        if(this.selectedProveedor) {
            this.resetFormDireccion();
            this.displayModalDireccion = true;
        } else {
            this.showMessage('info', 'Informacion', 'Seleccione un Proveedor');
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
            let direc = new Direcciones();
            direc.id_prov = this.selectedProveedor.id_prov;
            direc.ciu_prov = this.ciu_prov;
            direc.dir_prov = this.dir_prov;
            direc.tel_prov = this.tel_prov;

            this.proveedorService.createDireccion(direc).subscribe(
                (_resp) => {
                    this.showBarDir = false;
                    this.showMessage('success', 'Exito', 'Direccion creada');
                    //console.log(_resp);
                    this.proveedorService.getProveed(this.selectedProveedor.id_prov).subscribe(
                        (_proveedor: Proveedor) => {
                            //console.log("cliente::", _cliente);
                            var proveedor = this.proveedores.find(item => item.id_prov === this.selectedProveedor.id_prov);
                            proveedor.direcciones = _proveedor.direcciones;
                            this.selectedDireccion = null;
                            this.direcciones = _proveedor.direcciones;
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
        this.ciu_prov = "";
        this.dir_prov = "";
        this.tel_prov = "";
    }

    nuevoContacto() {
        if(this.selectedProveedor) {
            this.resetFormContacto();
            this.displayModalContacto = true;
        } else {
            this.showMessage('info', 'Informacion', 'Seleccione un Proveedor');
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
            let contac = new Colaborador();
            contac.id_prov_col = 0;
            contac.id_prov = this.selectedProveedor.id_prov;
            contac.nom_prov_col = this.nom_prov_con;
            contac.ema_prov_col = this.ema_prov_con;
            /* contac.cel_prov_col = this.cel_cli_con; */
            contac.ane_prov_col = this.ane_prov_con;
            contac.car_prov_col = this.car_prov_con;

            this.proveedorService.createContacto(contac).subscribe(
                (_resp) => {
                    this.showBarCon = false;
                    this.showMessage('success', 'Exito', 'Contacto creado');
                    //console.log(_resp);
                    this.proveedorService.getProveed(this.selectedProveedor.id_prov).subscribe(
                        (_proveedor: Proveedor) => {
                            //console.log("cliente::", _cliente);
                            var proveedor = this.proveedores.find(item => item.id_prov === this.selectedProveedor.id_prov);
                            proveedor.colaboradores = _proveedor.colaboradores;
                            this.selectedColaborador = null;
                            this.colaboradores = _proveedor.colaboradores;
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
        this.nom_prov_con = "";
        this.ema_prov_con = "";
        //this.cel_prov_con = "";
        this.ane_prov_con = "";
        this.car_prov_con = "";
    }

    //validadores

    get validProveedor(): boolean {
        return this.selectedProveedor !== undefined && this.selectedProveedor !== null ;
    }

    get validItems(): boolean {
        return this.cotizacionProvDetalle.length > 0;
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
        return this.nom_prov_con !== "";
    }
    get validCiudad(): boolean {
        return this.ciu_prov !== "";
    }
    get validDireccion(): boolean {
        return this.dir_prov !== "";
    }

    //mensajes 
    showMessage(_severity: string, _summary: string, _detail: string) {
        this.messageService.add({severity: _severity, summary: _summary, detail: _detail});
    }

}
