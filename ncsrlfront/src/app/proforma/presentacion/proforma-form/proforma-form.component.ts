import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService, SelectItem } from 'primeng/api';

import { ProformasService } from "@app/proforma/data/services/proformas.service";
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
import { Direcciones } from '@app/proveedores/data/models/direccion.model.ts';
import { Contacto } from '@app/clientes/data/models/contacto.model';
import { Proveedor } from '@app/proveedores/data/models/proveedor.model';
import { ProveedorService } from "@app/proveedores/data/services/proveedor.service";
import { Colaborador } from '@app/usuarios/data/models/colaborador.model';
import { ColaboradorService } from "@app/usuarios/data/services/colaborador.service";

import { ProformasDetalle } from '@app/proforma/data/models/proforma-detalle.model';
import { CotizacionesService } from '@app/cotizaciones-cli/data/services/cotizaciones.service';
import { CotizacionJSON } from '@app/cotizaciones-cli/data/models/cotizacion.model';
import { CotizacionDetalle } from '@app/cotizaciones-cli/data/models/cotizacion-detalle.model';

import { UniMedService } from '@app/tablas-referenciales/data/services/unimed.service';
import { UniMed } from '@app/tablas-referenciales/data/models/unimed.model';

import { Seccion } from '@app/tablas-referenciales/data/models/seccion.model';
import { SeccionService } from '@app/tablas-referenciales/data/services/seccion.service';
import { Proformas, ProformasJSON } from '@app/proforma/data/models/proforma.model';

@Component({
    selector: 'app-proforma-form',
    templateUrl: './proforma-form.component.html',
    styleUrls: ['./proforma-form.component.scss']
})

export class ProformaFormComponent implements OnInit {

    id_proforma: number;
    editform: boolean = false;

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

    //direcc: Direcciones[] = [];
    //selectedDirecc: Direcciones;

    contactos: Contacto[] = [];
    selectedContacto: Contacto;

    productos: Producto[] = [];
    selectedProducto: Producto;

    proveedores: Proveedor[] = [];
    selectedProveedor: Proveedor;

    seccion: Seccion[] = [];
    selectedSeccion: Seccion

    unimeds: UniMed[] = [];
    selectedUnimed: UniMed;

    colaboradores: Colaborador[] = [];

    servicio: string = "";

    cantidad: number = 0;
    cantidadServicio: number = 1;

    //stock: number = 0;
    //inicializacion de variables proforma detalle
    importeInicial: number = 0;
    condicionPago: string = "CREDITO 30 DIAS"
    interes: number = 0;
    cuota: number = 0;
    porcentajeUtilidad: number = 0;
    porcentajeDescuento: number = 0;

    validezProforma: string = "5";
    tiempoInstalacion: string = "3"
    tiempoEntrega: string = "0"
    observaciones: string;

    ////////////////////////////////////

    submitted: boolean = false;
    submittedPS: boolean = false;
    showbar: boolean = false;

    proformasDetalle: ProformasDetalle[] = [];


    displayModalDireccion: boolean = false;
    displayModalContacto: boolean = false;

    displayModalSeccion: boolean = false;   //////////////////////7

    submitDir: boolean = false;
    showBarDir: boolean = false;

    submitCon: boolean = false;
    showBarCon: boolean = false;

    submitSec: boolean = false;
    showBarSec: boolean = false

    //modal Seccion
    id_sec: number;
    des_sec: string = "";



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

    //TIPO CREDITO 
    selecCredito: SelectItem;
    credito: SelectItem[] = [];

    // TIPO MONEDA 
    selecMoneda: SelectItem;
    moneda: SelectItem[] = [];

    _readonly: boolean = false;
    solcli_id: number;

    constructor(
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private cotizacionesCliService: CotizacionesService,
        //private cotizacionesService: CotizacionesService,
        private proformasService: ProformasService,
        private clienteService: ClienteService,
        private proveedorService: ProveedorService,
        private unimedService: UniMedService,
        private seccionService: SeccionService,
        private colaboradorService: ColaboradorService,
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
        this.getProductos();
        this.getSeccion();
        this.getProveedores();

        this.getProyectos();
        this.getClientes();
        this.getTiposDetalle();
        this.getCredito();
        this.getMoneda();



        this.userName = this.authService.getusuarioJson().nom_col;
        try {
            let cod = this.activatedroute.snapshot.paramMap.get('codigo');
            console.log("codigo: ", cod)

            if (cod === "new") {
                console.log("crear," + cod.substring(4));
            }
            else if (cod.includes("mod")) {
                console.log("modificando ," + cod.substring(4));
                let codigoProforma = +cod.substring(4);
                
                this.clienteService.getClientes(null).subscribe(
                    (_clientes: GeneralCollection<Cliente>) => {
                        this.clientes = _clientes['data'];
                        this.proformasService.getProforma(codigoProforma).subscribe(
                            (_proforma: Proformas) => {
                                //console.log(_proforma);
                                this.editform = true;
                                this.setForm(_proforma);
        
                            },
                            (error) => {
                                console.log("ocurrio un error");
        
                            }
                        );
                    },
                    (error) => {
                    }
                );

                
            }
            else {
                this.cotizacionesCliService.getCotizacion(+cod).subscribe(
                    (_cotizacionJSON: CotizacionJSON) => {
                        if (_cotizacionJSON && _cotizacionJSON.cotizacion) {
                            this._readonly = true;
                            this.solcli_id = +cod;

                            this.selectedProyecto = this.proyectos.find(unit => unit.id_proy === _cotizacionJSON.cotizacion.id_proy);
                            this.selectedCliente = this.clientes.find(unit => unit.id_cli === _cotizacionJSON.cotizacion.id_cli);
                            //console.log("cliente seleccionado: ", this.selectedCliente)
                            if (this.selectedCliente && this.selectedCliente.direcciones) {
                                this.selectedDireccion = this.selectedCliente.direcciones.find(unit => unit.id_cli_dir === _cotizacionJSON.cotizacion.solcli_cli_id_dir);
                            }
                            if (this.selectedCliente && this.selectedCliente.contactos) {
                                this.selectedContacto = this.selectedCliente.contactos.find(unit => unit.id_cli_con === _cotizacionJSON.cotizacion.solcli_cli_id_con);
                            }

                            _cotizacionJSON.cotizacion.cotizacion_detalle.map((_cot_cli: CotizacionDetalle) => {
                                let produc = this.productos.find(unit => unit.id_prod === _cot_cli.id_prod);
                                let detalle = new ProformasDetalle();

                                if (_cot_cli.solclidet_prod_serv === 1) {
                                    //let produc = this.productos.find(unit => unit.id_prod === _cot_cli.id_prod);

                                    //let detalle = new ProformasDetalle();
                                    detalle.id_prof_det = (Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000) * -1;
                                    detalle.id_prod = _cot_cli.id_prod;
                                    detalle.prof_prod_serv = _cot_cli.solclidet_prod_serv;
                                    detalle.prof_des_prod = _cot_cli.solclidet_des;
                                    detalle.marca = produc.marca.des_mar;
                                    detalle.num_parte = produc.num_parte_prod;
                                    detalle.unidad_medida = produc.unidad_medida.nom_unimed;
                                    detalle.prof_det_can = _cot_cli.solclidet_prod_can;
                                    detalle.prof_det_cos = produc.pre_com_prod;
                                    detalle.prof_det_por_com = 0;
                                    detalle.prof_can_prod = produc.stk_prod;
                                    detalle.mensajeStock = true;
                                    detalle.prof_det_stock = '';
                                    detalle.id_sec = null;
                                    //detalle.id_sec = null;
                                    //detalle.prof_dir_prov = _cot_cli.;
                                    //detalle.prof_ema_prov = (this.selectedProveedor) ? this.selectedProveedor.ema_prov : null;



                                    this.proformasDetalle.push(detalle);

                                } else {

                                    let detalle = new ProformasDetalle();
                                    detalle.id_prof_det = (Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000) * -1;
                                    detalle.id_prod = null;
                                    detalle.prof_det_can = this.cantidadServicio;
                                    detalle.prof_det_pre_lis = null;
                                    detalle.prof_det_imp = null;
                                    detalle.prof_det_cos = 0;
                                    detalle.prof_det_por_com = 0;
                                    detalle.prof_det_tcos = null;
                                    detalle.prof_det_com = null;
                                    detalle.id_prov = null;
                                    detalle.prof_prod_serv = _cot_cli.solclidet_prod_serv;
                                    detalle.prof_des_prod = _cot_cli.solclidet_des;
                                    detalle.prof_can_prod = null;
                                    detalle.marca = "NTWC";
                                    detalle.prof_det_stock = '';
                                    detalle.id_sec = null;
                                    //detalle.id_sec = null;

                                    this.proformasDetalle.push(detalle);

                                }
                            });
                            //console.log("json : ", _cotizacionJSON.cotizacion.cotizacion_detalle)                                
                        }
                    },
                    (error) => {
                        console.log("ocurrio un error");

                    }
                );
            }




        } catch (error) {
            this.router.navigate(['/proforma']);
        }
    }

    setForm(p: Proformas) {
        
        this.id_proforma = p.id_pro;
        this.fecha = p.prof_fec;
        this.userName = (p.usuario) ? p.usuario.nom_col : null;
        var s_cli = this.clientes.filter(unit => unit.id_cli === p.id_cli);
        this.selectedCliente = (s_cli.length > 0) ? s_cli[0] : null;
        if (this.selectedCliente) {
            this.direcciones = this.selectedCliente.direcciones;
            this.selectedDireccion = null;
            if (p.cliente_direccion) {
                this.selectedDireccion = this.direcciones.find(unit => unit.id_cli_dir === p.cliente_direccion.id_cli_dir);
            }
            this.contactos = this.selectedCliente.contactos;
            this.selectedContacto = null;
            if (p.cliente_contacto) {
                this.selectedContacto = this.contactos.find(unit => unit.id_cli_con === p.cliente_contacto.id_cli_con);
            }
        }

        // var s_cont = this.contactos.filter( unit => unit.id_cli_con === p.cliente_contacto.id_cli_con );
        // this.selectedContacto = (s_cont.length > 0) ? s_cont[0] : null;

        var s_proy = this.proyectos.filter(unit => unit.id_proy === p.id_proy);
        this.selectedProyecto = (s_proy.length > 0) ? s_proy[0] : null;

        var s_mon = this.moneda.filter(unit => unit.value === p.prof_mon);
        this.selecMoneda = (s_mon.length > 0) ? s_mon[0] : null;

        this.condicionPago = p.prof_con_pag;
        this.importeInicial = p.prof_imp_ini;
        this.interes = p.prof_int;
        this.cuota = p.prof_cuo;

        this.validezProforma = p.prof_val;
        this.tiempoInstalacion = p.prof_tie_ins;
        this.tiempoEntrega = p.prof_tie_ent;
        //this.factor=p.prof_fac;
        //this.financiacion=p.prof_finan;
        this.porcentajeUtilidad = p.prof_uti;
        this.porcentajeDescuento = p.prof_desc;
        this.observaciones = p.prof_obs;

        console.log(p);

        p.proforma_detalle.map((pd: ProformasDetalle) => {

            if (pd.prof_prod_serv === 1) {
                console.log("ad", this.productos)
                let detalle = new ProformasDetalle();

                detalle.id_prof_det = pd.id_prof_det;
                detalle.prof_prod_serv = pd.prof_prod_serv;
                detalle.seccion = this.seccion.find(unit => unit.id_sec === pd.id_sec);
                detalle.id_prod = pd.id_prod;
                detalle.marca = (pd.producto && pd.producto.marca) ? pd.producto.marca.des_mar : null;
                detalle.num_parte = (pd.producto) ? pd.producto.num_parte_prod : null;
                detalle.unidad_medida = (pd.producto && pd.producto.unidad_medida) ? pd.producto.unidad_medida.nom_unimed : null;
                detalle.prof_det_por_com = pd.prof_det_por_com;
                detalle.prof_can_prod = (pd.producto) ? pd.producto.stk_prod : null;

                detalle.prof_des_prod = pd.prof_des_prod;
                detalle.prof_det_can = pd.prof_det_can;
                detalle.prof_det_cos = pd.prof_det_cos;
                detalle.prof_det_stock = null;
                detalle.est_reg = pd.est_reg;

                detalle.proveedor = this.proveedores.find(unit => unit.id_prov === pd.id_prov)
                if (detalle.proveedor) {
                    detalle.direcciones = detalle.proveedor.direcciones;
                    detalle.selectedDirecc = detalle.direcciones.find(unit => unit.id_prov_dir === pd.id_prov_dir);
                }

                this.proformasDetalle.push(detalle);

            } else {

                let detalle = new ProformasDetalle();

                detalle.id_prof_det = pd.id_prof_det;
                detalle.prof_prod_serv = pd.prof_prod_serv;
                detalle.seccion = this.seccion.find(unit => unit.id_sec === pd.id_sec);
                detalle.marca = 'NTWC';
                detalle.id_prod = pd.id_prod;
                detalle.num_parte = null;
                detalle.unidad_medida = null;
                detalle.prof_det_por_com = pd.prof_det_por_com;
                detalle.prof_can_prod = null;
                detalle.prof_det_can = this.cantidadServicio;
                detalle.prof_des_prod = pd.prof_des_prod;
                detalle.prof_det_cos = pd.prof_det_cos;
                detalle.prof_det_stock = null;
                detalle.est_reg = pd.est_reg;

                this.proformasDetalle.push(detalle);
            }
        });
    }



    getTiposDetalle() {
        this.tiposDetalle = [
            { label: "Servicio", value: 2 },
            { label: "Producto", value: 1 },
            // {label: "Gastos Indirectos", value: 3},
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

    getProveedores() {
        this.proveedorService.getProveedor(null).subscribe(
            (_proveedores: GeneralCollection<Proveedor>) => {
                this.proveedores = _proveedores['data'];

                console.log("cl9: ", this.proveedores)
            },
            (error) => {
            }
        );
    }

    getUniMed() {
        this.unimedService.getUniMeds(null).subscribe(
            (_unimeds: GeneralCollection<UniMed>) => {
                this.unimeds = _unimeds['data'];
            },
            (error) => {

            }
        );
    }

    getSeccion() {
        this.seccionService.getSecciones(null).subscribe(
            (_secciones: GeneralCollection<Seccion>) => {
                this.seccion = _secciones['data'];
            },
            (error) => {
            }
        );
    }

    getColaboradores() {
        this.colaboradorService.getColaborador(null).subscribe(
            (_colaboradores: GeneralCollection<Colaborador>) => {
                this.colaboradores = _colaboradores['data'];

                console.log("cl9: ", this.colaboradores)
            },
            (error) => {
            }
        );
    }

    getProductos() {
        this.productosService.getProductos(null).subscribe(
            (_productos: GeneralCollection<Producto>) => {
                this.productos = _productos['data'];
                console.log("prods")
            },
            (error) => {
                console.log(error)
            }
        );
    }

    //TIPO CREDITO
    getCredito() {
        this.credito = [
            { label: 'CREDITO', value: 1 },
            { label: 'CONTADO', value: 2 },
            { label: 'TRANSACCION', value: 3 },
        ];

    }

    //TIPO MONEDA
    getMoneda() {
        this.moneda = [
            { label: 'SOL', value: 1 },
            { label: 'DOLAR', value: 2 },
        ];

    }


    onChangeCliente(event: any) {
        if (event.value) {
            this.direcciones = event.value.direcciones;
            this.selectedDireccion = null;
            this.contactos = event.value.contactos;
            this.selectedContacto = null;
            //this.direcc = event.value.direcc;
            //this.selectedDirecc = null;
        } else {
            this.direcciones = [];
            this.selectedDireccion = null;
            this.contactos = [];
            this.selectedContacto = null;
            //this.direcc = [];
            //this.selectedDirecc = null;
        }
    }

    addDetalle() {
        this.submittedPS = true;
        if (this.selectedTipoDetalle.value === 1) {

            if (this.validProducto && this.validCantidad) {

                let detalle = new ProformasDetalle();
                //let prov = new Proveedor();

                detalle.id_prof_det = (Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000) * -1;
                detalle.id_pro = null;
                detalle.id_prod = this.selectedProducto.id_prod;
                detalle.prof_det_can = this.cantidad;
                detalle.prof_det_cos = this.selectedProducto.pre_com_prod;
                detalle.prof_det_por_com = 0;
                detalle.prof_det_pre_lis = null;
                detalle.prof_det_imp = null;
                detalle.prof_det_tcos = null;
                detalle.prof_det_com = null;
                detalle.id_prov = undefined;
                detalle.prof_prod_serv = this.selectedTipoDetalle.value;
                detalle.prof_des_prod = this.selectedProducto.des_prod;
                detalle.marca = this.selectedProducto.marca.des_mar;
                detalle.num_parte = this.selectedProducto.num_parte_prod;
                detalle.prof_can_prod = this.selectedProducto.stk_prod;
                detalle.mensajeStock = true;
                detalle.prof_det_stock = '';
                detalle.id_sec = null;

                detalle.unidad_medida = this.selectedProducto.unidad_medida.nom_unimed;

                this.proformasDetalle.push(detalle);
                this.resetProductoServicio();
            }
        } else if (this.selectedTipoDetalle.value === 2) {

            if (this.validServicio && !this.proformasDetalle.find(unit => unit.prof_des_prod === this.servicio)) {
                let detalle = new ProformasDetalle();
                detalle.id_prof_det = (Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000) * -1;
                detalle.id_prod = null;
                detalle.prof_det_can = this.cantidadServicio;
                detalle.prof_det_cos = 0;
                detalle.prof_det_por_com = 0;
                detalle.prof_det_pre_lis = null;
                detalle.prof_det_imp = null;
                detalle.prof_det_tcos = null;
                detalle.prof_det_com = null;
                detalle.id_prov = null;
                detalle.prof_prod_serv = this.selectedTipoDetalle.value;
                detalle.prof_des_prod = this.servicio;
                detalle.prof_can_prod = null;
                detalle.prof_det_stock = '';
                detalle.marca = "NTWC";
                detalle.id_sec = null;
                //detalle.id_sec = this.selectedSeccion.id_sec;
                //detalle.sec_des = this.selectedSeccion.des_sec;

                //detalle.prof_dir_prov = null;
                //detalle.prof_ema_prov = null;

                this.proformasDetalle.push(detalle);
                this.resetProductoServicio();
            }
        } else {
            if (this.validServicio && !this.proformasDetalle.find(unit => unit.prof_des_prod === this.servicio)) {
                let detalle = new ProformasDetalle();
                detalle.id_prof_det = (Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000) * -1;
                detalle.id_prod = null;
                detalle.prof_det_can = this.cantidadServicio;
                detalle.prof_det_cos = 0;
                detalle.prof_det_por_com = 0;
                detalle.prof_det_pre_lis = null;
                detalle.prof_det_imp = null;
                detalle.prof_det_tcos = null;
                detalle.prof_det_com = null;
                detalle.id_prov = null;
                detalle.prof_prod_serv = this.selectedTipoDetalle.value;
                detalle.prof_des_prod = this.servicio;
                detalle.prof_can_prod = null;
                detalle.prof_det_stock = '';
                detalle.marca = "NTWC";
                detalle.id_sec = null;
                //detalle.id_sec = this.selectedSeccion.id_sec;
                //detalle.sec_des = this.selectedSeccion.des_sec;

                //detalle.prof_dir_prov = null;
                //detalle.prof_ema_prov = null;

                this.proformasDetalle.push(detalle);
                this.resetProductoServicio();
            }
        }


    }

    deleteDetalle(detalle: ProformasDetalle) {
        if(detalle.id_prof_det > 0) {
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
            this.proformasDetalle = this.proformasDetalle.filter(unit => unit.id_prof_det !== detalle.id_prof_det);
        }
    }

    resetProductoServicio() {
        this.submittedPS = false;
        this.servicio = "";
        this.selectedProducto = undefined;
        this.cantidad = 0;
        //this.selectedSeccion = undefined;

    }

    submit() {

        this.submitted = true;
        this.showbar = true;

        if (!this.validCliente || !this.validItems) {
            this.showbar = false
            this.showMessage('warn', 'Advertencia', 'Campos incompletos');
            return;
        } else {

            let proforma = {

                id_pro: this.id_proforma,
                id_cli: (this.selectedCliente.id_cli) ? this.selectedCliente.id_cli : null,
                prof_fec: this.fecha,////////
                prof_mon: (this.selecMoneda) ? this.selecMoneda.value : null,
                id_proy: (this.selectedProyecto) ? this.selectedProyecto.id_proy : null,
                id_col: this.authService.getusuarioJson().id_col,
                solcli_id: (this.solcli_id) ? this.solcli_id : null,
                prof_cre: (this.selecCredito) ? this.selecCredito.value : null,
                prof_imp_ini: this.importeInicial,
                prof_int: this.interes,
                prof_cuo: this.cuota,
                prof_val: this.validezProforma,
                prof_tie_ent: this.tiempoEntrega,
                prof_tie_ins: this.tiempoInstalacion,
                prof_cos_dir: this.costoDirecto,
                prof_gas_ind: this.gastosIndirectos,
                prof_uti: this.porcentajeUtilidad,
                prof_bas_imp: this.baseImponible,
                prof_igv: this.igv,
                prof_neto: this.netoPagar,
                prof_fac: this.factor,
                prof_finan: this.financiacion,
                prof_val_cuo: this.valorCuota,
                prof_cli_id_dir: (this.selectedDireccion) ? this.selectedDireccion.id_cli_dir : null,
                prof_cli_id_con: (this.selectedContacto) ? this.selectedContacto.id_cli_con : null,
                prof_obs: this.observaciones,
                prof_desc: this.porcentajeDescuento,
                prof_con_pag: this.condicionPago,

                //prof_cli_ciu : this.selectedDireccion.ciu_cli,

                proforma_detalle: this.getProformaDetalle()
            }

            console.log("proforma:: ", proforma);
            console.log("proformajson:: ", JSON.stringify(proforma));
            if (!this.editform) {

                this.proformasService.createProforma(proforma).subscribe(
                    (_resp) => {
                        this.showbar = false;
                        this.showMessage('success', 'Exito', 'Proforma creada');
                        console.log(_resp);
                        this.cancel();
                    },
                    (error) => {
                        this.showMessage('error', 'Error', 'Ocurrio un problema al crear');
                        console.log("error: ", error)
                        this.showbar = false;
                    });
            } else {
                this.proformasService.updateProforma(proforma).subscribe(
                    (_resp) => {
                        this.showbar = false;
                        this.showMessage('success', 'Exito', 'Proforma actualizada');
                        console.log(_resp);
                        this.cancel();
                    },
                    (error) => {
                        this.showMessage('error', 'Error', 'Ocurrio un problema al actualizar');
                        console.log("error: ", error)
                        this.showbar = false;
                    });
            }


        }



    }

    getProformaDetalle(): ProformasDetalle[] {
        this.proformasDetalle.forEach(unit => {
            unit.id_prov = (unit.proveedor) ? unit.proveedor.id_prov : null;
            unit.prof_det_tcos = (unit.prof_prod_serv) ? unit.getTCosto() : null;
            unit.prof_det_com = (unit.prof_prod_serv) ? unit.getComision() : null;
            unit.prof_det_pre_lis = (unit.prof_prod_serv) ? unit.getPrecioLista() : null;
            unit.prof_det_imp = (unit.prof_prod_serv) ? unit.getImporte() : null;
            unit.prof_dir_prov = (unit.selectedDirecc) ? unit.selectedDirecc.dir_prov : null;
            unit.id_prov_dir = (unit.selectedDirecc) ? unit.selectedDirecc.id_prov_dir : null;
            unit.prof_ema_prov = (unit.proveedor) ? unit.proveedor.ema_prov : null;
            unit.id_sec = (unit.seccion) ? unit.seccion.id_sec : null;
        });
        return this.proformasDetalle;
    }

    cancel() {
        this.router.navigate(["/proforma"]);
    }

    nuevaDireccion() {
        if (this.selectedCliente) {
            this.resetFormDireccion();
            this.displayModalDireccion = true;
        } else {
            this.showMessage('info', 'Informacion', 'Seleccione un cliente');
        }
    }

    agregarDireccion() {
        this.submitDir = true;
        this.showBarDir = true;
        if (!this.validCiudad || !this.validDireccion) {
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
        if (this.selectedCliente) {
            this.resetFormContacto();
            this.displayModalContacto = true;
        } else {
            this.showMessage('info', 'Informacion', 'Seleccione un cliente');
        }
    }

    agregarContacto() {
        this.submitCon = true;
        this.showBarCon = true;
        if (!this.validNombre) {
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

    //--------- GENERAR SECCION -------------------------------
    nuevaSeccion() {
        this.resetFormSeccion();
        this.displayModalSeccion = true;
    }

    agregarSeccion() {

        this.submitSec = true;
        this.showBarSec = true;

        if (!this.validSeccion) {
            this.showBarSec = false;
            this.showMessage('warn', 'Advertencia', 'Campos incompletos');
            return;
        } else {
            let sec = new Seccion();
            sec.id_sec = this.id_sec;
            sec.des_sec = this.des_sec;

            this.seccionService.createSeccion(sec).subscribe(
                (_resp) => {
                    this.showMessage('success', 'Exito¡', 'seccion registrado');
                    this.seccionService.getSecciones(null).subscribe(
                        (_secciones: GeneralCollection<Seccion>) => {
                            this.seccion = _secciones['data'];
                            console.log("CLIEN:: ", _secciones)
                        },
                        (error) => {
                            console.log("ocurrio un error");
                        }
                    );
                    this.resetFormSeccion();
                    this.cancelSeccion();
                    this.showBarSec = false;
                },
                (error) => {
                    this.showBarSec = false;
                    this.showMessage('error', 'Error', 'Ocurrio un problema De cliente en el servidor');
                });
        }
    }

    cancelSeccion() {
        this.displayModalSeccion = false;
        this.resetFormSeccion();
    }

    resetFormSeccion() {

        this.submitSec = false;
        this.showBarSec = false;
        this.des_sec = "";

    }


    // Operaciones de proforma detalle

    get costoDirecto(): number {
        let costo = 0;
        this.proformasDetalle.forEach(detalle => {
            if(detalle.est_reg !== 'E') {
                costo += detalle.getImporte();
            }
        });
        return costo;
    }

    get gastosIndirectos(): number {
        let costo = 0;
        this.proformasDetalle.forEach(detalle => {
            if (detalle.seccion && detalle.seccion.id_sec === 14 && detalle.est_reg !== 'E') {
                costo += detalle.getImporte();
            }
        });
        return costo;
        //return this.costoDirecto * 0.03;
    }

    get utilidad(): number {
        return this.costoDirecto * (this.porcentajeUtilidad / 100);
    }

    get descuentoTotal(): number {
        return this.costoDirecto * (this.porcentajeDescuento / 100);
    }

    get costoEspecial(): number {
        return this.costoDirecto - this.descuentoTotal;
    }

    get baseImponible(): number {
        return this.costoDirecto + this.utilidad;
    }

    get igv(): number {
        if (this.descuentoTotal === 0) {
            //return this.netoPagar - this.baseImponible;
            return this.baseImponible * 0.18;
        }
        else {
            return this.costoEspecial * 0.18;
        }
        //return this.netoPagar - this.baseImponible;
    }

    get netoPagar(): number {
        if (this.descuentoTotal === 0) {
            //return this.baseImponible * 1.18;
            return this.baseImponible + this.igv;
        }
        else {
            return this.costoEspecial + this.igv;
        }
        //return this.baseImponible * 1.18;
    }

    get factor(): number {
        return this.cuota * this.interes;
    }

    get financiacion(): number {
        //return this.gastosIndirectos*this.factor;
        return this.costoDirecto * 0.03 * this.factor;
    }

    get valorCuota(): number {
        return this.financiacion / this.cuota;
    }



    ////////////////////////////////////////////////////////////7

    //validadores

    get validCliente(): boolean {
        return this.selectedCliente !== undefined && this.selectedCliente !== null;
    }

    /*get validItems(): boolean {
        return this.cotizacionDetalle.length > 0;
    }*/

    get validItems(): boolean {
        return this.proformasDetalle.length > 0;
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

    /////////// MODIFICANDO //////////////
    get validImporteIni(): boolean {
        return this.importeInicial !== null && this.importeInicial >= 0;
    }

    get validInteres(): boolean {
        return this.interes !== null && this.interes >= 0;
    }

    get validCuota(): boolean {
        return this.cuota !== null && this.cuota >= 0;
    }

    get validFactor(): boolean {
        //return this.factor !== null && this.factor > 0;
        return true;
    }

    get validPorcentajeUti(): boolean {
        return this.porcentajeUtilidad !== null && this.porcentajeUtilidad >= 0;
    }

    get validPorcentajeDes(): boolean {
        return this.porcentajeDescuento !== null && this.porcentajeDescuento >= 0;
    }


    //validadores
    get validNombre(): boolean {
        return this.nom_cli_con !== "";
    }
    get validCiudad(): boolean {
        return this.ciu_cli !== "";
    }
    get validDireccion(): boolean {
        return this.dir_cli !== "";
    }

    get validSeccion(): boolean {
        return this.des_sec !== null;
    }

    /* get validSecc(): boolean {
         return this.selectedSeccion !== undefined && this.selectedSeccion !== null;
     }*/

    //mensajes 
    showMessage(_severity: string, _summary: string, _detail: string) {
        this.messageService.add({ severity: _severity, summary: _summary, detail: _detail });
    }


}
