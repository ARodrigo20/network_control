import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService, SelectItem } from 'primeng/api';
import { GeneralCollection } from '@app/_general/models/general-collection.model';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralService } from '@app/_general/services/general.service';
import { Producto } from '@app/inventario/data/models/product.model';
import { ProductosService } from '@app/inventario/data/services/productos.service';
import { AuthService } from '@app/_general/services/auth.service';
import { Proveedor } from '@app/proveedores/data/models/proveedor.model';
import { CotizacionProvDetalle } from '@app/cotizaciones-prov/data/models/cotizacion-detalle.model';
import { OrdenCompraDetalle } from '@app/orden-compra/data/models/orden-compra-detalle.model';
import { CotizacionesProvService } from '@app/cotizaciones-prov/data/services/cotizaciones.service';
import { CotizacionJSON } from '@app/cotizaciones-prov/data/models/cotizacion.model';
import { OrdenCompraService } from '@app/orden-compra/data/services/orden_compra.service';
import { ProveedorService } from '@app/proveedores/data/services/proveedor.service';

@Component({
    selector: 'app-orden-compra-form',
    templateUrl: './orden-compra-form.component.html',
    styleUrls: ['./orden-compra-form.component.scss']
})

export class OrdenCompraFormComponent implements OnInit {

    fecha: Date = new Date();
    userName: string = "";

    productos: Producto[] = [];
    selectedProducto: Producto;

    proveedores: Proveedor[] = [];
    selectedProveedor: Proveedor;
    dir_prov: string;
    contacto_prov: string;

    cantidad: number = 0;

    ////////////////////////////////////

    submitted: boolean = false;
    submittedPS: boolean = false;
    showbar: boolean = false;
   
    ordenCompraDetalle: OrdenCompraDetalle[] = [];

    _readonly: boolean = false;
    solcli_id: number;

    /////
    year_now: number;
    estados: SelectItem[] = [];

    terminos: string = "Credito 30 Dias"
    medio_entrega: string;

    //
    cotizacion_prov_id: number;
    cotizacion_prov_id_prov: number;
    cotizacion_prov_dir : string;
    cotizacion_prov_con : string;
    cotizacion_prov_ema : string;

    constructor(
            private messageService: MessageService,
            private ordenCompraService: OrdenCompraService,
            private authService: AuthService,
            private productosService: ProductosService,
            private proveedorService: ProveedorService,
            public activatedroute: ActivatedRoute,
            private cotizacionesService: CotizacionesProvService,
            public gS: GeneralService,
            private router: Router
        ) {
            var titles = this.activatedroute.snapshot.data['title'];
            this.gS.setTitle(titles.split('/'));
    }

    ngOnInit() {
        this.year_now = new Date().getFullYear();

        this.getEstados();
        this.getProductos();
        this.getProveedores();
        
        this.userName = this.authService.getusuarioJson().nom_col;
        try {
            let cod = this.activatedroute.snapshot.paramMap.get('codigo');
            console.log("codigo: ", cod)

            switch (cod) {
                case 'new':
                    break;
                default:
                    this.cotizacionesService.getCotizacion(+cod).subscribe(
                        (_cotizacionJSON: CotizacionJSON) => {
                            //----------------
                            if(_cotizacionJSON && _cotizacionJSON.cotizacion){
                                this.cotizacion_prov_id = _cotizacionJSON.cotizacion.cotprov_id;
                                this.cotizacion_prov_id_prov = _cotizacionJSON.cotizacion.id_prov;
                                this.cotizacion_prov_dir = _cotizacionJSON.cotizacion.cotprov_dir;
                                this.cotizacion_prov_con = _cotizacionJSON.cotizacion.cotprov_con;
                                this.cotizacion_prov_ema = _cotizacionJSON.cotizacion.cotprov_ema;
                                this.selectedProveedor = this.proveedores.find( unit => unit.id_prov === _cotizacionJSON.cotizacion.id_prov);
                                this.dir_prov = _cotizacionJSON.cotizacion.cotprov_dir;
                                this.contacto_prov = _cotizacionJSON.cotizacion.cotprov_con;


                                console.log("cotizacion de prov: ", _cotizacionJSON.cotizacion)
                                _cotizacionJSON.cotizacion.cotizacion_detalle.map((cot_detalle: CotizacionProvDetalle) => {
                                    if(cot_detalle.id_prod){
                                        let detalle = new OrdenCompraDetalle();
                                        detalle.id_ord_det = (Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000) * -1;
                                        detalle.id_prod = cot_detalle.producto.id_prod;
                                        detalle.ord_com_det_numpar = cot_detalle.producto.num_parte_prod;
                                        detalle.ord_com_det_fab = (cot_detalle.producto.fabricante) ? cot_detalle.producto.fabricante.des_fab : null;
                                        detalle.ord_com_det_des = cot_detalle.cotprovdet_desc;
                                        detalle.ord_com_det_unimed = (cot_detalle.producto.unidad_medida) ? cot_detalle.producto.unidad_medida.nom_unimed : null;
                                        detalle.ord_com_det_can = cot_detalle.cotprovdet_cant;
                                        detalle.ord_com_det_preuni = cot_detalle.producto.pre_com_prod;
                                        //detalle.estado_det = this.estados[0];
                                        detalle.cod_ntwc = cot_detalle.producto.cod_prod;
                                        this.ordenCompraDetalle.push(detalle);
                                    }
                                });
                            }
                        },
                        (error) => {
                            console.log("ocurrio un error");
                        }
                    );                 

                    break;
            }

        } catch (error) {
            this.router.navigate(['/orden']);
        }
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

    getEstados() {
        this.estados = [
            {label: 'Pendiente', value: 0},
            {label: 'Incompleto', value: 1},
            {label: 'Completo', value: 2},
        ];
    }

    addDetalle() {
        this.submittedPS = true;
        if(this.validProducto && this.validCantidad ) {
            let detalle = new OrdenCompraDetalle();
            detalle.id_ord_det = (Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000) * -1;
            detalle.id_prod = this.selectedProducto.id_prod;
            detalle.ord_com_det_numpar = this.selectedProducto.num_parte_prod;
            detalle.ord_com_det_fab = (this.selectedProducto.fabricante) ? this.selectedProducto.fabricante.des_fab : null;
            detalle.ord_com_det_des = this.selectedProducto.des_prod;
            detalle.ord_com_det_unimed = (this.selectedProducto.unidad_medida) ? this.selectedProducto.unidad_medida.nom_unimed : null;
            detalle.ord_com_det_can = this.cantidad;
            detalle.ord_com_det_preuni = this.selectedProducto.pre_com_prod;
            //detalle.estado_det = this.estados[0];
            detalle.cod_ntwc = this.selectedProducto.cod_prod;
            this.ordenCompraDetalle.push(detalle);
            this.resetProductoServicio();
        }        
    }

    deleteDetalle(detalle: OrdenCompraDetalle) {
        this.ordenCompraDetalle = this.ordenCompraDetalle.filter(unit => unit.id_ord_det !== detalle.id_ord_det);
    }

    resetProductoServicio() {
        this.submittedPS = false;
        this.selectedProducto = undefined;
        this.cantidad = 0;
       
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
             
                //id_pro : null,
                cotprov_id : this.cotizacion_prov_id,
                ord_com_prov_id: this.cotizacion_prov_id_prov,
                ord_com_prov_dir: this.cotizacion_prov_dir,
                ord_com_prov_con: this.cotizacion_prov_con,
                ord_com_prov_ema: this.cotizacion_prov_ema,
                ord_com_term: this.terminos,
                id_col : this.authService.getusuarioJson().id_col,
                ord_com_bas_imp : this.baseImponible,
                ord_com_igv : this.igv,
                ord_com_tot : this.total,
                id_pro : null,
                ord_med_ent: this.medio_entrega,
                orden_detalle : this.getOrdenDetalle()
            }
    
            console.log("orden:: ", orden);
            this.ordenCompraService.createOrdenCompra(orden).subscribe(
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

    getOrdenDetalle(): OrdenCompraDetalle[] {
        //let orden_detalle : OrdenCompraDetalle[] = [];
        this.ordenCompraDetalle.forEach(unit => {
            //unit.ord_com_det_est = (unit.estado_det) ? unit.estado_det.value : null;
            //unit.ord_com_det_feclleg = (unit.ord_com_det_feclleg) ? unit.ord_com_det_feclleg : null;
            unit.ord_com_det_est = "0";
            unit.ord_com_det_feclleg = null;
            unit.ord_com_det_canent = 0;
            unit.ord_com_det_canfal = unit.getCanFaltante();
            unit.ord_com_prod_serv = "1"
        });
        return this.ordenCompraDetalle;
    }

    cancel() {
        this.router.navigate(["/orden"]);
    }

    // Operaciones de proforma detalle
    get baseImponible(): number {
        let base = 0;
        this.ordenCompraDetalle.forEach(detalle => {
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
////////////////////////////////////////////////////////////7
    
    getValidRows(): Boolean {
        let resp = true;
        this.ordenCompraDetalle.forEach(unit => {
            if(unit.ord_com_det_can <= 0 || unit.ord_com_det_preuni <= 0) {
                resp = false;
            }
        });
        return resp;
    }

    //validadores
    get validItems(): boolean {
        return this.ordenCompraDetalle.length > 0;
    }

    get validProducto(): boolean {
        return this.selectedProducto !== undefined && this.selectedProducto !== null;
    }

    get validCantidad(): boolean {
        return this.cantidad !== null && this.cantidad > 0;
    }

    //mensajes 
    showMessage(_severity: string, _summary: string, _detail: string) {
        this.messageService.add({severity: _severity, summary: _summary, detail: _detail});
    }
    

}
