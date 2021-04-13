import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService, SelectItem } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralService } from '@app/_general/services/general.service';
import { ProductosService } from '@app/inventario/data/services/productos.service';
import { AuthService } from '@app/_general/services/auth.service';
import { Cliente } from '@app/clientes/data/models/cliente.model';
import { OrdenCompraCliService } from '@app/orden-compra-cli/data/services/orden-compra-cli.service';
import { OrdenCompraCli } from '@app/orden-compra-cli/data/models/orden-compra-cli.model';
import { GeneralCollection } from '@app/_general/models/general-collection.model';
import { Producto } from '@app/inventario/data/models/product.model';
import { BoletaFacturaDetalle } from '@app/boleta-factura/data/models/boleta-factura-detalle.model';
import { FacturaService } from '@app/boleta-factura/data/services/factura.service'

@Component({
    selector: 'app-boleta-factura-form',
    templateUrl: './boleta-factura-form.component.html',
    styleUrls: ['./boleta-factura-form.component.scss']
})

export class BoletaFacturaFormComponent implements OnInit {

    fechaEmision: Date = new Date();
    fechaVencimiento: Date = new Date();
    year_now: number;

    orden_compra: OrdenCompraCli;
    cliente: Cliente;

    monedas: SelectItem[] = [];
    selectedMoneda: SelectItem;

    observacion: string;

    submitted: boolean = false;
    showbar: boolean = false;

    //detalle
    tiposDetalle: SelectItem[] = [];
    selectedTipoDetalle: SelectItem;

    productos: Producto[] = [];
    selectedProducto: Producto;

    servicio: string = "";
    cantidad: number = 0;

    submittedPS: boolean = false;

    boleta_factura_detalle: BoletaFacturaDetalle[] = [];

    impuestos: SelectItem[] = [];


    //totales
    descuento: number = 0;
    descuentoTotal: number = 0;

    constructor(
            private messageService: MessageService,
            private confirmationService: ConfirmationService,
            private productosService: ProductosService,
            private ordenCompraClienteService: OrdenCompraCliService,
            public gS: GeneralService,
            private router: Router,
            public activatedroute: ActivatedRoute,
            private facturaService: FacturaService,

        ) {
            var titles = this.activatedroute.snapshot.data['title'];
            this.gS.setTitle(titles.split('/'));
    }

    ngOnInit() {
        this.year_now = new Date().getFullYear();
        this.getMonedas();
        this.getImpuestos();
        this.getTiposDetalle();
        this.getProductos();

        try {
            let cod = this.activatedroute.snapshot.paramMap.get('codigo');
            console.log("codigo: ", cod)

            this.ordenCompraClienteService.getOrden(+cod).subscribe(
                (_orden: OrdenCompraCli) => {
                    this.orden_compra = _orden;
                    console.log("orden: ", _orden);
                    if(_orden.cliente) {
                        this.cliente = _orden.cliente;
                    }
                    this.orden_compra.orden_detalle.forEach(_detalle => {
                        if(_detalle.ord_com_prod_serv === 1) {
                            let detalle = new BoletaFacturaDetalle();
                            detalle.id_det_fac = (Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000) * -1;
                            detalle.id_prod = _detalle.id_prod;
                            detalle.unidad = _detalle.ord_com_det_unimed;
                            detalle.fact_prod_serv = 1;
                            detalle.codProducto = (_detalle.producto) ? _detalle.producto.cod_prod : null;
                            detalle.cantidad = _detalle.ord_com_det_can;
                            detalle.mtoValorUnitario = _detalle.ord_com_det_preuni;
                            detalle.descuento = 0;
                            detalle.impuesto = this.impuestos[0];
                            detalle.descripcion = _detalle.ord_com_det_des;
                            this.boleta_factura_detalle.push(detalle);
                            this.resetProductoServicio();
                        }else{
                            let detalle = new BoletaFacturaDetalle();
                            detalle.id_det_fac = (Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000) * -1;
                            detalle.id_prod = null;
                            detalle.unidad = 'NIU';
                            detalle.fact_prod_serv = 2;
                            detalle.codProducto = null;
                            detalle.cantidad = _detalle.ord_com_det_can;
                            detalle.mtoValorUnitario = _detalle.ord_com_det_preuni;
                            detalle.descuento = null;
                            detalle.impuesto = this.impuestos[0];
                            detalle.descripcion = _detalle.ord_com_det_des;
                            this.boleta_factura_detalle.push(detalle);
                            this.resetProductoServicio();
                        }
                    });
                },
                (error) => {
                    console.log("ocurrio un error: ", error);
                    this.router.navigate(['/facturas']);
                }
            );

        } catch (error) {
            console.log("ocurrio un error: ", error);
            this.router.navigate(['/facturas']);
        }
    }
    
    getMonedas() {
        this.monedas = [
            { label: 'SOL', value: 1 },
            { label: 'DOLAR', value: 2 },
        ];
        this.selectedMoneda = this.monedas[0];
    }

    getImpuestos() {
        this.impuestos = [
            { label: 'Gravado - Operación Onerosa 18%', value: '10' },
            // { label: '[Gratuita] Gravado – Retiro por premio 0%', value: '11' },
            // { label: '[Gratuita] Gravado – Retiro por donación 0%', value: '12' },
            // { label: '[Gratuita] Gravado – Retiro 0%', value: '13' },
            // { label: '[Gratuita] Gravado – Retiro por publicidad 0%', value: '14' },
            // { label: '[Gratuita] Gravado – Bonificaciones 0%', value: '15' },
            // { label: '[Gratuita] Gravado – Retiro por entrega a trabajadores 0%', value: '16' },
            // { label: 'Gravado – IVAP 18%', value: '17' },
            { label: 'Exonerado - Operación Onerosa 0%', value: '20' },
            // { label: '[Gratuita] Exonerado – Transferencia Gratuita 0%', value: '21' },
            { label: 'Inafecto - Operación Onerosa 0%', value: '30' },
            // { label: '[Gratuita] Inafecto – Retiro por Bonificación 0%', value: '31' },
            // { label: '[Gratuita] Inafecto – Retiro 0%', value: '32' },
            // { label: '[Gratuita] Inafecto – Retiro por Muestras Médicas 0%', value: '33' },
            // { label: '[Gratuita] Inafecto - Retiro por Convenio Colectivo 0%', value: '34' },
            // { label: '[Gratuita] Inafecto – Retiro por premio 0%', value: '35' },
            // { label: '[Gratuita] Inafecto - Retiro por publicidad 0%', value: '36' }
        ];
    }

    getTiposDetalle() {
        this.tiposDetalle = [
            {label: "Producto", value: 1},
            {label: "Servicio", value: 2},
        ];
        this.selectedTipoDetalle = this.tiposDetalle[0];
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

    addDetalle() {
        this.submittedPS = true;
        if(this.selectedTipoDetalle.value === 1) {
            if(this.validProducto && this.validCantidad) {
                let detalle = new BoletaFacturaDetalle();
                detalle.id_det_fac = (Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000) * -1;
                detalle.id_prod = this.selectedProducto.id_prod;
                detalle.unidad = (this.selectedProducto.unidad_medida) ? this.selectedProducto.unidad_medida.nom_unimed : null;
                detalle.fact_prod_serv = this.selectedTipoDetalle.value;
                detalle.codProducto = this.selectedProducto.cod_prod;
                detalle.cantidad = this.cantidad;
                detalle.mtoValorUnitario = this.selectedProducto.pre_com_prod;
                detalle.descuento = 0;
                detalle.impuesto = this.impuestos[0];
                detalle.descripcion = this.selectedProducto.des_prod;
                this.boleta_factura_detalle.push(detalle);
                this.resetProductoServicio();
            }
        } else {
            if(this.validServicio && !this.boleta_factura_detalle.find(unit => unit.descripcion === this.servicio )) {
                let detalle = new BoletaFacturaDetalle();
                detalle.id_det_fac = (Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000) * -1;
                detalle.id_prod = null;
                detalle.unidad = 'NIU';
                detalle.fact_prod_serv = this.selectedTipoDetalle.value;
                detalle.codProducto = null;
                detalle.cantidad = 1;
                detalle.mtoValorUnitario = 0;
                detalle.descuento = null;
                detalle.impuesto = this.impuestos[0];
                detalle.descripcion = this.servicio;
                this.boleta_factura_detalle.push(detalle);
                this.resetProductoServicio();
            }
        }
    }

    resetProductoServicio() {
        this.submittedPS = false;
        this.servicio = "";
        this.selectedProducto = undefined;
        this.cantidad = 0;
    }

    submit() {
        this.submitted = true;
        this.showbar = true;

        if(!this.validItems || !this.validCliente) {
            this.showbar = false
            this.showMessage('warn', 'Advertencia', 'Campos incompletos');
            return;
        }else {
            let factura = {
                tipoDoc: "01", //factura
                serie: "F001",
                correlativo: null,
                //echaEmision: this.fechaEmision,
                solcli_id: null,
                id_cli: this.cliente.id_cli,//
                tipoMoneda: (this.selectedMoneda.value === 1) ? "PEN" : "USD",
                sumOtrosCargos: 0,
                mtoOperGravadas: this.gravada,
                mtoOperInafectas: this.inafecta,
                mtoOperExoneradas: this.exonerada,
                mtoOperExportacion: 0,
                mtoIGV: this.igv,
                mtoISC: 0,
                mtoOtrosTributos: 0,
                icbper: null,
                mtoImpVenta: this.total,
                id_guias: null,
                id_relDocs: null,
                observacion: this.observacion,
                compra: null,
                mtoBaseIsc: null,
                mtoBaseOth: null,
                totalImpuestos: null,
                tipoOperacion: '01',
                fecVencimiento: this.fechaVencimiento,
                sumDsctoGlobal: null,
                mtoDescuentos: this._descuentoTotal,
                mtoOperGratuitas: this.gratuitas,
                totalAnticipos: null,
                id_guiaEmbebida: null,
                //id_seller: null,
                //id_direccion_entrega: null,
                descuentos: null,
                mtoCargos: null,
                valorVenta: null,
                est_reg: 'A',
                est_env: '2',
                detalle_factura: this.getDetalles()
            }

            console.log("factura :", factura)
            this.facturaService.crearFactura(factura).subscribe(
                (_resp) => {
                    this.showbar = false;
                    this.showMessage('success', 'Exito', 'Factura Generada');
                    console.log(_resp);
                    // console.log(cotizacion);
                    this.cancel();
                },
                (error) => {
                    this.showMessage('error', 'Error', 'Ocurrio un problema al Generar');
                    console.log("error: ", error)
                    this.showbar = false;
            });   
        }
    }

    getDetalles(): BoletaFacturaDetalle[] {
        this.boleta_factura_detalle.forEach((unit) => {
            unit.tipAfeIgv = unit.impuesto.value;
            unit.igv = (unit.impuesto.value === '10' || unit.impuesto.value === '17') ? 18 : 0;
            unit.mtoValorVenta = unit.getSubTotal();
            unit.mtoPrecioUnitario = unit.getTotal();
            unit.est_reg = 'A';
        })
        return this.boleta_factura_detalle;
    }

    deleteDetalle(detalle: BoletaFacturaDetalle) {
        this.boleta_factura_detalle = this.boleta_factura_detalle.filter(unit => unit.id_det_fac !== detalle.id_det_fac);
    }

    cancel() {
        this.router.navigate(["/facturas"]);
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

    get validItems(): boolean {
        return this.boleta_factura_detalle.length > 0;
    }

    get validCliente(): boolean {
        return this.cliente !== null && this.cliente !== undefined;
    }

    //mensajes 
    showMessage(_severity: string, _summary: string, _detail: string) {
        this.messageService.add({severity: _severity, summary: _summary, detail: _detail});
    }

    get exonerada() :number {
        let exonerada = 0;
        this.boleta_factura_detalle.forEach(unit => {
            if(unit.impuesto.value === '20') {
                exonerada = exonerada + (unit.mtoValorUnitario)*(unit.cantidad);
            }
        })
        //return (this.descuento === 0) ? exonerada : exonerada*((100-this.descuento)/100);
        return exonerada*((100-this.descuento)/100);
    }

    get inafecta() :number {
        let inafecta = 0;
        this.boleta_factura_detalle.forEach(unit => {
            if(unit.impuesto.value === '30') {
                inafecta = inafecta + (unit.mtoValorUnitario)*(unit.cantidad);
            }
        })
        return inafecta*((100-this.descuento)/100);
    }

    get gravada() :number {
        let gravada = 0;
        this.boleta_factura_detalle.forEach(unit => {
            if(unit.impuesto.value === '10' || unit.impuesto.value === '17') {
                gravada = gravada + (unit.mtoValorUnitario)*(unit.cantidad);
            }
        })
        return gravada*((100-this.descuento)/100);
    }

    get igv() :number {
        let igv = 0;
        this.boleta_factura_detalle.forEach(unit => {
            if(unit.impuesto.value === '10' || unit.impuesto.value === '17') {
                igv = igv + (unit.mtoValorUnitario)*(unit.cantidad)*0.18;
            }
        })
        return igv*((100-this.descuento)/100);
    }

    get gratuitas(): number {
        let gratuitas = 0;
        this.boleta_factura_detalle.forEach(unit => {
            if(unit.impuesto.value === '11' || unit.impuesto.value === '12' || unit.impuesto.value === '13' || unit.impuesto.value === '14' || unit.impuesto.value === '15' || unit.impuesto.value === '16' || unit.impuesto.value === '21' || unit.impuesto.value === '31' || unit.impuesto.value === '32' || unit.impuesto.value === '33' || unit.impuesto.value === '34' || unit.impuesto.value === '35' || unit.impuesto.value === '36') {
                gratuitas = gratuitas + (unit.mtoValorUnitario)*(unit.cantidad);
            }
        })
        return gratuitas;
    }

    get subTotal(): number {
        let subTotal = 0;
        this.boleta_factura_detalle.forEach(unit => {
            if(unit.impuesto.value === '10' || unit.impuesto.value === '17' || unit.impuesto.value === '20' || unit.impuesto.value === '30') {
                subTotal = subTotal + unit.getSubTotal();
            }
        })
        return subTotal;
    }

    get _descuentoTotal(): number {
        return this.subTotal * (this.descuento/100);
    }

    get total() :number {
        let total = 0;
        this.boleta_factura_detalle.forEach(unit => {
            if(unit.impuesto.value === '10' || unit.impuesto.value === '17' || unit.impuesto.value === '20' || unit.impuesto.value === '30') {
                total = total + unit.getTotal();
            }
        })
        return total*((100-this.descuento)/100);
    }
}
