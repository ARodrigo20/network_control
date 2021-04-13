import { Component, OnInit } from '@angular/core';
import { MessageService, SelectItem } from 'primeng/api';
import { RegistroService } from "@app/registro-ingreso/data/services/registro.service";
import { GeneralCollection } from '@app/_general/models/general-collection.model';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralService } from '@app/_general/services/general.service';
import { Orden } from '@app/registro-ingreso/data/models/orden.model';
import { OrdenCompraDetalle } from '@app/orden-compra/data/models/orden-compra-detalle.model';
import { AuthService } from '@app/_general/services/auth.service';
import { Kardex, KardexJSON } from '@app/kardex/data/models/kardex.model';
import { KardexService } from '@app/kardex/data/services/kardex.service';


import * as moment from 'moment';

@Component({
    selector: 'app-registro-ingreso-form',
    templateUrl: './registro-ingreso-form.component.html',
    styleUrls: ['./registro-ingreso-form.component.scss']
})

export class RegistroIngresoFormComponent implements OnInit {

    //    fecha: Date = new Date();
    userName: string = "";
    //kardex
    kardexIngreso: Kardex[] = [];
    kardexJSON: KardexJSON = new KardexJSON;
    selectedKardex: Kardex;

    //Ordenes Pendientes
    ordenesPendientes: Orden[];
    ordenPendiente: Orden;
    ordenCompraDetalle: OrdenCompraDetalle[] = [];
    ordenDetalle: OrdenCompraDetalle;

    //Valores para el kardex nuevo
    id_col: number = 0;
    ord_com_cod: string = "";
    codigo: string = "";
    proveedor: string = "";
    seriefac: string = "";
    seriebol: string = "";
    seriegui: string = "";
    boleta: string = "";
    factura: string = "";
    guiaRem: string = "";
    cantIngreso: number = 0;
    cantFalta: number = 0;
    estado: string = "";
    fechaLleg: Date = new Date();
    cant_ingreso: number = null;
    cant_faltante: number = null;

    //Estados
    year_now: number;
    estados: SelectItem[] = [];
    selectedEstado: SelectItem;

    submitted: boolean = false;
    submittedPS: boolean = false;
    showbar: boolean = false;

    readOnlyFecha: boolean = false;

    constructor(
        private messageService: MessageService,
        private registroService: RegistroService,
        private kardexService: KardexService,
        private authService: AuthService,        
        public activatedroute: ActivatedRoute,
        public gS: GeneralService,
        private router: Router
    ) {
        var titles = this.activatedroute.snapshot.data['title'];
        this.gS.setTitle(titles.split('/'));
    }

    ngOnInit() {
        this.userName = this.authService.getusuarioJson().nom_col;
        this.getOrdenesPendientes();
        this.setEstados();

        ///////////////////////
        try {
            let cod = this.activatedroute.snapshot.paramMap.get('codreg');
            switch (cod) {
                case 'new':
                    break;
                default:
                    //Es necesario cambiar el servicio de registroService al servicio ordenCompraServece
                    //Para realizar este cambio, se debe de utilizar también el modelo orden-compra.model
                    //Actualmente se usa un modelo alternativo orden.model
                    this.registroService.getOrden(+cod).subscribe(
                        (_orden: Orden) => {
                            //Caprtura de la cabecera de la orden de compra
                            if (this.ordenesPendientes) {
                                this.ordenPendiente = this.ordenesPendientes.find(unit => unit.id_ord_com === +cod);
                                this.codigo = this.ordenPendiente.ord_com_cod;
                                this.proveedor = this.ordenPendiente.prov_razsoc;
                                this.id_col = this.ordenPendiente.id_col;
                            } else {
                                this.cancel();
                            }
                            console.log("ord detalle", _orden.orden_detalle);
                            //Captura del detalle de la orden de compra
                            if (_orden) {
                                _orden.orden_detalle.map((ord_detalle: OrdenCompraDetalle) => {
                                    ord_detalle.estado_det = this.estados.find(unit => unit.value === ord_detalle.ord_com_det_est);
                                    //console.log("estado: ", ord_detalle.ord_com_det_est)
                                    this.estado = ord_detalle.estado_det.value;
                                    if (this.validEstado && ord_detalle.estado_det) {
                                        let detalle = new OrdenCompraDetalle();
                                        detalle.id_ord_com = ord_detalle.id_ord_com;
                                        detalle.id_ord_det = ord_detalle.id_ord_det;
                                        detalle.ord_com_det_des = ord_detalle.ord_com_det_des;
                                        detalle.ord_com_det_numpar = ord_detalle.ord_com_det_numpar;
                                        detalle.ord_com_det_unimed = ord_detalle.ord_com_det_unimed;
                                        detalle.ord_com_det_can = ord_detalle.ord_com_det_can;
                                        detalle.ord_com_det_est = ord_detalle.ord_com_det_est;
                                        detalle.ord_com_det_canent = 0;
                                        detalle.ord_com_det_canfal = (ord_detalle.ord_com_det_canfal) ? ord_detalle.ord_com_det_canfal : 0;
                                        this.ordenCompraDetalle.push(detalle);
                                        //console.log("detalle: ", detalle);
                                    }
                                });
                            }
                        },
                        (error) => {
                            console.log("ocurrio un error");
                            this.cancel();
                        }
                    );
                    break;
            }
        } catch (error) {
            console.log("ocurrio un error");
            this.cancel();
        }
    }

    getOrdenesPendientes() {
        this.registroService.getOrdenesPendientes(null).subscribe(
            (_ordenesPendientes: GeneralCollection<Orden>) => {
                //this.separarOrdenesCompra(_ordenesCompra['data']);
                this.ordenesPendientes = [];
                this.ordenesPendientes = _ordenesPendientes['data'];                
            },
            (error) => {
                console.log("ocurrio un error");
            }
        );
    }

    setEstados() {
        this.estados = [
            { label: 'Pendiente', value: 0 },
            { label: 'Incompleto', value: 1 },
            { label: 'Completo', value: 2 },
        ];
    }

    getEstado(ord_det: OrdenCompraDetalle){
        if(ord_det.ord_com_det_canfal - ord_det.ord_com_det_canent == 0){
            return 2;
        }else if(ord_det.ord_com_det_canfal - ord_det.ord_com_det_canent > 0 && ord_det.ord_com_det_canfal > 0){
            return 1;
        }else{
            return 0;
        }
    }

    submit() {
        this.submitted = true;
        this.showbar = true;    
        if (!this.validDocs) {
            this.showbar = false
            this.showMessage('warn', 'Advertencia', 'Campos incompletos');
            return;
        } else {
            //this.ordenDetalle = this.ordenCompraDetalle.find(unit => unit.ord_com_det_canent !== 0);
            this.ordenCompraDetalle.map((ord_det: OrdenCompraDetalle) => {
                if (ord_det.ord_com_det_canent != 0) {
                    let kardex = new Kardex();
                    kardex.cod_kar = this.codigo;
                    kardex.prod_cant = ord_det.ord_com_det_canent;
                    kardex.prov_razsoc = this.proveedor;
                    kardex.fac_kar = this.seriefac + "-" + ((this.factura) ? this.factura : "");
                    kardex.guirem_kar = this.seriegui + "-" + ((this.guiaRem) ? this.guiaRem : "");
                    kardex.bol_kar = this.seriebol + "-" + ((this.boleta) ? this.boleta : "");
                    kardex.tip_kar = "1";
                    kardex.id_col = this.id_col;
                    kardex.col_usu = this.userName;
                    kardex.ord_com_det_est = (ord_det.estado_det) ? ord_det.estado_det.value : this.getEstado(ord_det);
                    kardex.ord_com_det_feclleg = moment(ord_det.ord_com_det_feclleg).format("YYYY-MM-DD");
                    kardex.ord_com_det_canent = ord_det.ord_com_det_canent;
                    kardex.ord_com_det_canfal = ord_det.ord_com_det_canfal - kardex.ord_com_det_canent;
                    kardex.id_ord_det = ord_det.id_ord_det;
                    kardex.id_ord_com = ord_det.id_ord_com;
                    kardex.prod_desc = ord_det.ord_com_det_des;
                    kardex.prod_numpar = ord_det.ord_com_det_numpar;
                    kardex.prod_unimed = ord_det.ord_com_det_unimed;
                    this.kardexIngreso.push(kardex);
                    if(kardex.ord_com_det_canfal < 0 || kardex.ord_com_det_canent < 0 || kardex.ord_com_det_canent == null){
                        this.kardexIngreso = [];
                    }
                }
            });
            this.kardexJSON.kardex_ingreso = this.kardexIngreso;
            console.log("kardexIng: ", this.kardexJSON);
            if(this.kardexIngreso && this.kardexIngreso.length > 0){
                this.kardexService.createKardex(this.kardexJSON).subscribe(
                    (_resp) => {
                        this.showbar = false;
                        this.showMessage('success', 'Exito', 'Kardex creado');
                        console.log("_resp", _resp);
                        this.cancel();
                    },
                    (error) => {
                        this.showMessage('error', 'Error', 'Ocurrio un problema al crear');
                        console.log("error: ", error)
                        this.showbar = false;
                    });
            }else {
                this.showMessage('warn', 'Advertencia', 'Cantidad de ingreso inválido');
                this.showbar = false;
            }
        }
    }

    cancel() {
        this.router.navigate(["/registro-ingreso"]);
    }
    //validadores
    get validDocs(): boolean {
        return this.validBoleta || this.validFactura || this.validGuia;
    }
    get validSerie(): boolean {
        return this.seriefac !== "" || this.seriebol !== "" || this.seriegui !== "" ;
    }
    get validEstado(): boolean {
        return this.estado == "1" || this.estado == "0";
    }

    get validFac(): boolean {
        if (this.factura == "" && this.seriefac == ""){
            return true;
        }
        return this.factura !== "" && this.seriefac !== "";
    }
    get validBol(): boolean {
        if (this.boleta == "" && this.seriebol == ""){
            return true;
        }
        return (this.boleta !== "" && this.seriebol !== "");
    }
    get validGui(): boolean {
        if (this.guiaRem == "" && this.seriegui == ""){
            return true;
        }
        return (this.guiaRem !== "" && this.seriegui !== "");
    }

    get validFactura(): boolean {
        return (this.factura !== "" && this.seriefac != "");
    }
    get validBoleta(): boolean {
        return (this.boleta !== "" && this.seriebol != "");
    }
    get validGuia(): boolean {
        return (this.guiaRem !== "" && this.seriegui != "");
    }
    //mensajes 
    showMessage(_severity: string, _summary: string, _detail: string) {
        this.messageService.add({ severity: _severity, summary: _summary, detail: _detail });
    }

}
