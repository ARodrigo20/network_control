import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService, SelectItem } from 'primeng/api';
import { GeneralCollection } from '@app/_general/models/general-collection.model';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralService } from '@app/_general/services/general.service';
import { Producto } from '@app/inventario/data/models/product.model';
import { ProductosService } from '@app/inventario/data/services/productos.service';
import { AuthService } from '@app/_general/services/auth.service';
import { CotizacionJSON } from '@app/cotizaciones-prov/data/models/cotizacion.model';
import { OrdenCompraService } from '@app/orden-compra/data/services/orden_compra.service';

import { OrdenCompraDetalleCli } from '@app/orden-compra-cli/data/models/orden-compra-detalle-cli.model';
import { OrdenCompraCliService } from "@app/orden-compra-cli/data/services/orden-compra-cli.service";
import { OrdenCompraCli } from '@app/orden-compra-cli/data/models/orden-compra-cli.model';
import { GuiaRemisionDetalle } from '@app/guia-remision/data/models/guia-remision-detalle.model';
import { GuiaRemisionEnvio } from '@app/guia-remision/data/models/guia-remision-envio.model';
import { Transporte } from '@app/tablas-referenciales/data/models/transporte.model';
import { TransporteService } from '@app/tablas-referenciales/data/services/transporte.service';
import { GuiaRemisionService } from "@app/guia-remision/data/services/guia-remision.service";
//import { GuiaRemision } 


@Component({
    selector: 'app-guia-remision-form',
    templateUrl: './guia-remision-form.component.html',
    styleUrls: ['./guia-remision-form.component.scss']
})

export class GuiaRemisionFormComponent implements OnInit {

    fechaEmision: Date = new Date();
    
    userName: string = "";

    ///////////////DATOS GUIA REMISION/////////////////////////

    fecTraslado: Date;

    orden_cli_dir: string;
    id_ord_com: number; ///////////////////7

    placaTran: string;
    tipodocTran: string;
    numdocTran: string;

    id_cli: number;
    id_guia_remision: number;
    ubigeoPartida: string = "";
    ubigeoLlegada: string = "";
    undPesoTotal: string = "KGM";
    pesoTotal: number = 0;
    numBultos: number = 0;
    direccionPartida: string = "Urb. villa Eléctrica Mza. C Lote 17";
    direccionLlegada: string = "";
    observacion: string;
    serie: string = "T00";

    selecMotivo: SelectItem;
    motivo: SelectItem[] = [];
    selecMovilidad: SelectItem;
    movilidad: SelectItem[] = [];


    /////////////////////////////////////777777

    productos: Producto[] = [];
    selectedProducto: Producto;

    cantidad: number = 0;

    ////////////////////////////////////

    submitted: boolean = false;
    submittedPS: boolean = false;
    showbar: boolean = false;
   
    //ordenCompraDetalle: OrdenCompraDetalle[] = [];

    ////////////////// TRNASPORTE //////////////////
    transporte: Transporte[]=[];
    selectedTransporte: Transporte;

    guiaRemisionDetalle: GuiaRemisionDetalle[]=[];
    guiaRemisionEnvio: GuiaRemisionEnvio[]=[];

    displayModalTransporte: boolean = false;

    submitTransporte: boolean = false;
    showBarTransporte: boolean = false;
    
    id_transp: number;
    num_doc: string = "";
    raz_soc: string = "";
    placa: string = "";
    chof_doc: string = "";
    
    selecTipoDocu: SelectItem;
    tipoDocu: SelectItem[] = [];

    selecTipoDocuCho: SelectItem;
    tipoDocuCho: SelectItem[] = [];

    ////////////////////////////////////////////////

    _readonly: boolean = false;
    solcli_id: number;

    /////
    year_now: number;
    //estados: SelectItem[] = [];

    //terminos: string = "Credito 30 Dias"
    //medio_entrega: string;

    //
    //cotizacion_prov_id: number;
    //cotizacion_prov_id_prov: number;
    //cotizacion_prov_dir : string;
    //cotizacion_prov_con : string;
    //cotizacion_prov_ema : string;

    constructor(
            private messageService: MessageService,
            private ordenCompraService: OrdenCompraService,
            private ordenCompraCliService: OrdenCompraCliService,
            private guiaRemisionService: GuiaRemisionService,
            private transporteService: TransporteService,
            private authService: AuthService,
            private productosService: ProductosService,
            //private proveedorService: ProveedorService,
            public activatedroute: ActivatedRoute,
            //private cotizacionesService: CotizacionesProvService,
            public gS: GeneralService,
            private router: Router
        ) {
            var titles = this.activatedroute.snapshot.data['title'];
            this.gS.setTitle(titles.split('/'));
    }

    ngOnInit() {
        console.log("esta fecha", this.fechaEmision);
        this.year_now = new Date().getFullYear();

        //this.getEstados();
        this.getProductos();
        //this.getProveedores();
        this.getMotivo();
        this.getMovilidad();
        this.getTipoDocu();
        this.getTipoDocuCho();
        this.getTransporte();
        
        this.userName = this.authService.getusuarioJson().nom_col;
        try {
            let cod = this.activatedroute.snapshot.paramMap.get('codigo');
            console.log("codigo: ", cod)

            switch (cod) {
                case 'new':
                    break;
                default:                                     

                    this.ordenCompraCliService.getOrden(+cod).subscribe(
                        (_orden: OrdenCompraCli) => {

                            //if(_orden && _orden.)
                            this.id_cli = _orden.id_cli;
                            this.id_ord_com = _orden.id_ord_com;
                            this.orden_cli_dir = _orden.ord_com_prov_dir;

                            _orden.orden_detalle.map((ord_detalle: OrdenCompraDetalleCli) => {
                                if(ord_detalle.ord_com_prod_serv === 1){
                                    console.log("entrando a detalle");
                                    let detalle = new GuiaRemisionDetalle();
                                    detalle.id_guia_remision_det = (Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000) * -1;
                                    detalle.id_prod = ord_detalle.id_prod;
                                    detalle.codigo = ord_detalle.producto.cod_prod;
                                    detalle.descripcion = ord_detalle.ord_com_det_des;
                                    detalle.unidad = ord_detalle.ord_com_det_unimed;
                                    detalle.cantidad = ord_detalle.ord_com_det_can;
                                    detalle.codProdSunat = "";
                                    detalle.est_reg = "A";
                                    this.guiaRemisionDetalle.push(detalle);
                                    //detalle.guia_rem_cod_pro = ord_detalle.
                                }
                                /*else{
                                    console.log("no hay servicio")
                                    let detalle = new GuiaRemisionDetalle();
                                    detalle.id_guia_remision_det = (Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000) * -1;
                                    detalle.id_prod = null;
                                    detalle.codigo = null;
                                    detalle.descripcion = null;
                                    detalle.unidad = null;
                                    detalle.cantidad = null;
                                    detalle.codProdSunat = "";
                                    detalle.est_reg = "A";
                                    this.guiaRemisionDetalle.push(detalle);
                                }*/
                            });
                        },
                        (error) => {
                            console.log("ocurrio un error");
                        }
                    );                             

                    break;
            }

        } catch (error) {
            this.router.navigate(['/guia-remision']);
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

    onChangeTransporte(event: any) {
        console.log(event);

        if (event.value) {
            this.placaTran = event.value.Placa;
            this.tipodocTran = event.value.ChoferTipoDoc;
            this.numdocTran = event.value.ChoferDoc;
            
        } else {
            
            this.placaTran = null;
            this.tipodocTran = null;
            this.numdocTran = null;
        }
    }

    /*getProveedores() {
        this.proveedorService.getProveedor(null).subscribe(
            (_proveedores: GeneralCollection<Proveedor>) => {
                this.proveedores = _proveedores['data'];

                console.log("cl9: ", this.proveedores)
            },
            (error) => {
            }
        );
    }*/

    /*getEstados() {
        this.estados = [
            {label: 'Pendiente', value: 0},
            {label: 'Incompleto', value: 1},
            {label: 'Completo', value: 2},
        ];
    }*/

    /*addDetalle() {
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
    }*/

    /*deleteDetalle(detalle: OrdenCompraDetalle) {
        this.ordenCompraDetalle = this.ordenCompraDetalle.filter(unit => unit.id_ord_det !== detalle.id_ord_det);
    }*/
    deleteDetalle(detalle: GuiaRemisionDetalle) {
        this.guiaRemisionDetalle = this.guiaRemisionDetalle.filter(unit => unit.id_guia_remision_det !== detalle.id_guia_remision_det);
    }

    resetProductoServicio() {
        this.submittedPS = false;
        this.selectedProducto = undefined;
        this.cantidad = 0;
       
    }

    submit() {

        this.submitted = true;
        this.showbar = true;

        //let validRows = this.getValidRows();

        if(!this.validItems || !this.valitFechaTraslado || !this.validSelectTransporte || !this.validSelectMotivo || !this.validSelectMovilidad) {
            this.showbar = false
            this.showMessage('warn', 'Advertencia', 'Campos incompletos');
            return;
        }else {
            let envio = {
                
                codTraslado: (this.selecMotivo) ? this.selecMotivo.value : null,
                desTraslado: (this.selecMotivo) ? this.selecMotivo.label : null,
                indTransbordo: false,
                pesoTotal: this.pesoTotal,
                undPesoTotal: "KGM",
                numBultos: this.numBultos,
                modTraslado: (this.selecMovilidad) ? this.selecMovilidad.value: null,
                fecTraslado: (this.fecTraslado) ? this.fecTraslado: null,
                numContenedor: "",
                codPuerto: "",
                id_transportista : (this.selectedTransporte) ? this.selectedTransporte.id_transportista: null,
                ubigueoLlegada: this.ubigeoLlegada,
                direccionLlegada: this.orden_cli_dir,
                ubigueoSalida: this.ubigeoPartida,
                direccionSalida :  this.direccionPartida,
                est_reg: "A",
            }
            var listEnvio = []
            listEnvio.push(envio);
            let guia = {            
             
                //id_pro : null,
                //cotprov_id : this.cotizacion_prov_id,
                id_cli: (this.id_cli)? this.id_cli: null,
                id_ord_com : this.id_ord_com,
                //id_guia_remision : this.id_guia_remision,
                fechaEmision: this.fechaEmision,
                fecTraslado: this.fecTraslado,
                guia_rem_motiv: (this.selecMotivo) ? this.selecMotivo.value : null,
                modTraslado: (this.selecMovilidad) ? this.selecMovilidad.value: null,
                undPesoTotal: this.undPesoTotal,
                pesoTotal: this.pesoTotal,
                numBultos: this.numBultos,
                guia_rem_nomraz: null, ///
                tipo_doc: null, ////
                direccionLlegada: this.orden_cli_dir,
                ubigeoLlegada: this.ubigeoLlegada,
                ubigeoPartida: this.ubigeoPartida,
                direccionPartida: this.direccionPartida,
                id_transportista: (this.selectedTransporte) ? this.selectedTransporte.id_transportista: null,
                //est_reg: string;
                observacion: this.observacion,
                serie: this.serie,
                est_env: "P",
                est_reg: "A",
                envio: listEnvio,
                detalle_guia: this.guiaRemisionDetalle,                
            }
    
            console.log("guia:: ", guia);
            this.guiaRemisionService.createGuia(guia).subscribe(
                (_resp) => {
                    this.showbar = false;
                    this.showMessage('success', 'Exito', 'guia remision creada');
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

    cancel() {
        this.router.navigate(["/guia-remision"]);
    }

    ////////////////TRANSPORTE////////////////////
    
    getTransporte() {
        this.transporteService.getTransporte(null).subscribe(
            (_transporte: GeneralCollection<Transporte>) => {
                this.transporte = _transporte['data'];
            },
            (error) => {
            }
        );
    }

    nuevoTransporte() {
        this.resetFormTransporte();
        this.displayModalTransporte = true;
    }

    agregarTransporte() {

        this.submitTransporte = true;
        this.showBarTransporte = true;

        if (!this.validTransporte) {
            this.showBarTransporte = false;
            this.showMessage('warn', 'Advertencia', 'Campos incompletos');
            return;
        } else {
            let transporte = new Transporte();
                        
            transporte.id_transportista = this.id_transp;
            transporte.TipoDoc = (this.selecTipoDocu) ? this.selecTipoDocu.value : null;
            transporte.NumDoc = this.num_doc;
            transporte.RznSocial = this.raz_soc;
            transporte.Placa = this.placa;
            transporte.ChoferTipoDoc = (this.selecTipoDocuCho) ? this.selecTipoDocuCho.value : null;
            transporte.ChoferDoc = this.chof_doc;

            this.transporteService.createTransporte(transporte).subscribe(
                (_resp) => {
                    this.showMessage('success', 'Exito¡', 'transporte registrado');
                    this.transporteService.getTransporte(null).subscribe(
                        (_transporte: GeneralCollection<Transporte>) => {
                            this.transporte = _transporte['data'];
                            console.log("CLIEN:: ", _transporte)
                        },
                        (error) => {
                            console.log("ocurrio un error");
                        }
                    );
                    this.resetFormTransporte();
                    this.cancelTransporte();
                    this.showBarTransporte = false;
                },
                (error) => {
                    this.showBarTransporte = false;
                    this.showMessage('error', 'Error', 'Ocurrio un problema De cliente en el servidor');
                });
        }
    }

    cancelTransporte() {
        this.displayModalTransporte = false;
        this.resetFormTransporte();
    }

    resetFormTransporte() {

        this.submitTransporte = false;
        this.showBarTransporte = false;
        //this.des_sec = "";
        //this.id_transp ;
        this.num_doc = "";
        this.raz_soc = "";
        this.placa = "";
        this.chof_doc = "";

    }
    ////////////////////////////////7

    getMotivo() {
        this.motivo = [
            { label: 'VENTA', value: "01" },
            { label: 'COMPRA', value: "02" },
            { label: 'OTROS', value: "13" },
        ];

    }
    getMovilidad() {
        this.movilidad = [
            { label: 'Transporte publico', value: "01" },
            { label: 'Transporte privado', value: "02" },
        ];

    }

    getTipoDocu() {
        this.tipoDocu = [
            { label: 'DNI', value: 1 },
            { label: 'CARNET EXTRANJERIA', value: 4 },
            { label: 'RUC', value: 6 },
            { label: 'PASAPORTE', value: 7 },
        ];

    }

    getTipoDocuCho() {
        this.tipoDocuCho = [
            { label: 'DNI', value: 1 },
            { label: 'CARNET EXTRANJERIA', value: 4 },
            { label: 'RUC', value: 6 },
            { label: 'PASAPORTE', value: 7 },
        ];

    }

    
////////////////////////////////////////////////////////////7
    
    /*getValidRows(): Boolean {
        let resp = true;
        this.ordenCompraDetalle.forEach(unit => {
            if(unit.ord_com_det_can <= 0 || unit.ord_com_det_preuni <= 0) {
                resp = false;
            }
        });
        return resp;
    }*/

    //validadores
    get validItems(): boolean {
        return this.guiaRemisionDetalle.length > 0;
    }

    get validProducto(): boolean {
        return this.selectedProducto !== undefined && this.selectedProducto !== null;
    }

    get validCantidad(): boolean {
        return this.cantidad !== null && this.cantidad > 0;
    }
    ////////////////////////////////////
    get validPeso(): boolean {
        return this.pesoTotal !== null && this.pesoTotal >= 0;
    }
    get validBulto(): boolean {
        return this.numBultos !== null && this.numBultos >= 0;
    }
    get validTransporte(): boolean {
        return this.raz_soc !== null;
    }

    get valitFechaTraslado(): boolean {
        //return this.fecTraslado !== null;
        return this.fecTraslado !== undefined && this.fecTraslado !== null;
    }
    get validSelectTransporte(): boolean {
        //return this.fecTraslado !== null;
        return this.selectedTransporte !== undefined && this.selectedTransporte !== null;
    }
    get validSelectMotivo(): boolean {
        //return this.fecTraslado !== null;
        return this.selecMotivo !== undefined && this.selecMotivo !== null;
    }
    get validSelectMovilidad(): boolean {
        //return this.fecTraslado !== null;
        return this.selecMovilidad !== undefined && this.selecMovilidad !== null;
    }

    //mensajes 
    showMessage(_severity: string, _summary: string, _detail: string) {
        this.messageService.add({severity: _severity, summary: _summary, detail: _detail});
    }
    

}
