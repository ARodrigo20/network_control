import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService, SelectItem } from 'primeng/api';

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
import { OrdenCompraDetalleCli } from '@app/orden-compra-cli/data/models/orden-compra-detalle-cli.model';
import { OrdenCompraCliService } from "@app/orden-compra-cli/data/services/orden-compra-cli.service";
import { OrdenCompraCli } from '@app/orden-compra-cli/data/models/orden-compra-cli.model';

@Component({
    selector: 'app-orden-compra-cli-form',
    templateUrl: './orden-compra-cli-form.component.html',
    styleUrls: ['./orden-compra-cli-form.component.scss']
})

export class OrdenCompraCliFormComponent implements OnInit {

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

    //cotizacionDetalle: CotizacionDetalle[] = [];

    ordenCompraDetalleCli: OrdenCompraDetalleCli[] = [];

    year_now: number;
    estados: SelectItem[] = [];

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

    //variables para servicio
    cantidadServicio: number = 1;

    cotizacion_prov_id: number;
    cotizacion_prov_id_prov: number;
    cotizacion_prov_dir : string;
    cotizacion_prov_con : string;
    cotizacion_prov_ema : string;

    constructor(
            private messageService: MessageService,
            private confirmationService: ConfirmationService,
            //private cotizacionesService: CotizacionesService,
            private ordenCompraCliService: OrdenCompraCliService,
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
        

        this.getEstados();
        //this.getClientes();
        this.getProyectos();
        this.getTiposDetalle();
        this.getProductos();
        this.year_now = new Date().getFullYear();
        this.userName = this.authService.getusuarioJson().nom_col;

        ///////////////////////
        try {
            let cod = this.activatedroute.snapshot.paramMap.get('codigo');

            console.log("codigo: ", cod)

            if(cod === 'new'){
                console.log("crear," + cod.substring(4));
                this.getClientes();
            }
            else if(cod.includes('mod')){
                console.log("modificarOrdenCli," + cod.substring(4));
                let codigoOrden = +cod.substring(4);

                this.clienteService.getClientes(null).subscribe(
                    (_clientes: GeneralCollection<Cliente>) => {
                        this.clientes = _clientes['data'];
        
                        this.ordenCompraCliService.getOrden(codigoOrden).subscribe(
                            (_orden: OrdenCompraCli) => {
                                //console.log(_orden);
                                this.setForm(_orden);
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
            else{

                console.log("otra entrada," + cod.substring(4));
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

        } catch (error) {
            this.router.navigate(['/cotizaciones-cli']);
        }
    }

    setForm(or: OrdenCompraCli){

        var s_cli = this.clientes.filter( unit => unit.id_cli === or.id_cli);
        this.selectedCliente = (s_cli.length > 0) ? s_cli[0] : null;

        
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

                console.log("cl9c: ", this.clientes)
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

    getEstados() {
        this.estados = [
            {label: 'Pendiente', value: 0},
            {label: 'Incompleto', value: 1},
            {label: 'Completo', value: 2},
        ];
    }

    addDetalle() {

        
        this.submittedPS = true;
        if(this.selectedTipoDetalle.value === 1) {
           
            if(this.validProducto && this.validCantidad ) {
                let detalle = new OrdenCompraDetalleCli();
                detalle.id_ord_det = (Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000) * -1;
                detalle.id_prod = this.selectedProducto.id_prod;
                detalle.ord_com_det_numpar = this.selectedProducto.num_parte_prod;
                detalle.ord_com_det_fab = (this.selectedProducto.fabricante) ? this.selectedProducto.fabricante.des_fab : null;
                detalle.ord_com_det_des = this.selectedProducto.des_prod;
                detalle.ord_com_det_unimed = (this.selectedProducto.unidad_medida) ? this.selectedProducto.unidad_medida.nom_unimed : null;
                detalle.ord_com_det_can = this.cantidad;
                detalle.ord_com_det_preuni = this.selectedProducto.pre_com_prod;

                detalle.ord_com_prod_serv = this.selectedTipoDetalle.value;
                //detalle.estado_det = this.estados[0];
                detalle.cod_ntwc = this.selectedProducto.cod_prod;
                
                this.ordenCompraDetalleCli.push(detalle);
                this.resetProductoServicio();
            }
        } else {
            if(this.validServicio && !this.ordenCompraDetalleCli.find(unit => unit.ord_com_det_des === this.servicio )) {
                let detalle = new OrdenCompraDetalleCli();
                detalle.id_ord_det = (Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000) * -1;
                detalle.id_prod = null;
                detalle.ord_com_det_numpar = null;
                detalle.ord_com_det_fab = null;                
                detalle.ord_com_det_unimed = null;
                detalle.ord_com_det_can = this.cantidadServicio;
                detalle.ord_com_det_preuni = 0;
                //detalle.estado_det = this.estados[0];
                detalle.ord_com_prod_serv = this.selectedTipoDetalle.value;
                detalle.ord_com_det_des = this.servicio;

                detalle.cod_ntwc = "NTWC";
                
                this.ordenCompraDetalleCli.push(detalle);
                this.resetProductoServicio();
               
            }
        }

        
    }

    deleteDetalle(detalle: OrdenCompraDetalleCli) {
        this.ordenCompraDetalleCli = this.ordenCompraDetalleCli.filter(unit => unit.id_ord_det !== detalle.id_ord_det);
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

        let validRows = this.getValidRows();

        if(!this.validItems || !validRows) {
            this.showbar = false
            this.showMessage('warn', 'Advertencia', 'Campos incompletos');
            return;
        }else {
            let orden = {            
             
                               
                id_cli : (this.selectedCliente.id_cli) ? this.selectedCliente.id_cli : null,
                ord_com_prov_dir: (this.selectedDireccion) ? this.selectedDireccion.dir_cli : null,
               
                ord_com_prov_con: (this.selectedContacto) ? this.selectedContacto.nom_cli_con : null,
                
                ord_com_prov_ema: (this.selectedCliente) ? this.selectedCliente.ema_cli : null,
               
                id_col : this.authService.getusuarioJson().id_col,
                ord_com_bas_imp : this.baseImponible,
                ord_com_igv : this.igv,
                ord_com_tot : this.total,
                id_pro : null,
                orden_detalle : this.getOrdenDetalle(),
                //orden_detalle: this.ordenCompraDetalleCli,
            }
    
            console.log("generando orden:: ", orden);
            this.ordenCompraCliService.createOrdenCompra(orden).subscribe(
                (_resp) => {
                    this.showbar = false;
                    this.showMessage('success', 'Exito', 'Orden de compra creada');
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
    getOrdenDetalle(): OrdenCompraDetalleCli[] {
        //let orden_detalle : OrdenCompraDetalle[] = [];
        this.ordenCompraDetalleCli.forEach(unit => {
            
            unit.ord_com_det_est = "0";
            unit.ord_com_det_feclleg = null;
            unit.ord_com_det_canent = 0;
            //unit.ord_com_det_canfal = unit.getCanFaltante();
            unit.ord_com_det_canfal = (unit.ord_com_prod_serv) ? unit.getCanFaltante() : null;
        });
        return this.ordenCompraDetalleCli;
    }

    

    cancel() {
        this.router.navigate(["/ordenCompraCli"]);
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

    ////////// FUNCIONES //////////////////

    get baseImponible(): number {
        let base = 0;
        this.ordenCompraDetalleCli.forEach(detalle => {
            base += detalle.getTotal();
        });
        return base;
    }

    get igv(): number {
        return this.baseImponible * 18/100;
    }

    get total() :number {
        return this.baseImponible + this.igv;
    }

///////////////////////////////////////////////////////
    getValidRows(): Boolean {
        let resp = true;
        this.ordenCompraDetalleCli.forEach(unit => {
            if(unit.ord_com_det_can < 0 || unit.ord_com_det_preuni < 0) {
                resp = false;
            }
        });
        return resp;
    }

    //validadores

    get validCliente(): boolean {
        return this.selectedCliente !== undefined && this.selectedCliente !== null ;
    }

    get validItems(): boolean {
        return this.ordenCompraDetalleCli.length > 0;
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
