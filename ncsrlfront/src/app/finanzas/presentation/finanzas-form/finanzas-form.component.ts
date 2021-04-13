import { Component, OnInit } from '@angular/core';
import { MessageService, SelectItem } from 'primeng/api';
import { FinanzasService } from "@app/finanzas/data/services/gastos.service";
import { GeneralCollection } from '@app/_general/models/general-collection.model';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralService } from '@app/_general/services/general.service';
import { Gastos } from '@app/finanzas/data/models/gastos.model';
import { Proyecto } from '@app/proyectos/data/models/proyect.model';
import { ProyectosService } from '@app/proyectos/data/services/proyect.service';
import { Proveedor } from '@app/proveedores/data/models/proveedor.model';
import { ProveedorService } from '@app/proveedores/data/services/proveedor.service';
import { TipoDoc } from '@app/tablas-referenciales/data/models/tipodoc.model';
import { TipoDocService } from '@app/tablas-referenciales/data/services/tipodoc.service';
import { AuthService } from '@app/_general/services/auth.service';


import * as moment from 'moment';

@Component({
    selector: 'app-finanzas-form',
    templateUrl: './finanzas-form.component.html',
    styleUrls: ['./finanzas-form.component.scss']
})

export class FinanzasFormComponent implements OnInit {

    //    fecha: Date = new Date();
    userName: string = "";
    idProy: number = 0;
    idProv: number = 0;

    //Registros Activos
    registrosActivos: Gastos[] = [];
    selectedRegistroActivo: Gastos;

    //Registros Anulados
    registrosAnulados: Gastos[] = [];
    selectedRegistroAnulado: Gastos;

    //Drops
    proyectos: Proyecto[] = [];
    selectedProyecto: Proyecto;
    proveedores: Proveedor[] = [];
    selectedProveedor: Proveedor;

    tipdoc: TipoDoc[] = [];
    selectedTipdoc: TipoDoc;

    //Valores para el Gasto nuevo
    id_gas: number = -1;
    gas_fec: Date = new Date();
    serie: string = "";
    correl: number = null;
    gas_fac: string = "";
    gas_fac_ser: string = "";
    gas_subtot: number = 0;
    gas_igv: number = 0;
    gas_tot: number = 0;
    prov_razsoc: string = "";
    prov_ruc: number = 0;
    id_proy: number = 0;
    gas_mon: string = "";
    tipoCambio: boolean = false;
    gas_tipcam: number = null;
    ingreso: number = null;
    gas_totdol: number = 0;
    gas_desc: string = "";
    est_reg: string = "";

    monedas: SelectItem[] = [];
    selectedMoneda: SelectItem;

    formMode: boolean = true; //true = crear //false = editar

    //Nuevo Proveedor
    id_prov: number = -1;
    razsoc_prov: string = "";
    ema_prov: string = "";
    num_doc_prov: string = "";
    id_tipdoc: number = 0;
    blockSpace: RegExp = /[^\s]/;
    titlePanelProveedor: string = "Registrar Proveedor";
    displayModalProveedor: boolean = false;
    submittedProv: boolean = false;
    showbarProv: boolean = false;

    submitted: boolean = false;
    submittedPS: boolean = false;
    showbar: boolean = false;

    readOnlyFecha: boolean = false;

    constructor(
        private messageService: MessageService,
        private finanzasService: FinanzasService,
        private proveedorService: ProveedorService,
        private proyectosService: ProyectosService,
        private tipodocService: TipoDocService,
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

        ///////////////////////
        try {
            let cod = this.activatedroute.snapshot.paramMap.get('codfin');
            switch (cod) {
                case 'new':
                    this.getProyectos();
                    this.getProveedores();
                    this.getMonedas();
                    this.tipodocService.getTipDoc(null).subscribe(
                        (_tipdoc: GeneralCollection<TipoDoc>) => {
                            this.tipdoc = _tipdoc['data'];
                        },
                        (error) => {
                            console.log("ocurrio un error");
                        }
                      
                    );
                    break;
                default:
                    this.getMonedas();
                    this.getProyectos();
                    this.getProveedores();
                    this.formMode = false;
                    this.finanzasService.getGasto(+cod).subscribe(
                        (_registroActivo: Gastos) => {
                            this.selectedRegistroActivo = _registroActivo['Gasto'][0];
                            this.setForm(this.selectedRegistroActivo);
                            console.log("Gasto: ", this.selectedRegistroActivo)
                        },
                        (error) => {
                            console.log("error en getGasto");
                            this.cancel();
                        }
                    );
                    this.tipodocService.getTipDoc(null).subscribe(
                        (_tipdoc: GeneralCollection<TipoDoc>) => {
                            this.tipdoc = _tipdoc['data'];
                        },
                        (error) => {
                            console.log("ocurrio un error");
                        }
                      
                    );
                    break;
            }
        } catch (error) {
            console.log("error en switch", error);
            this.cancel();
        }
    }

    getMonedas() {
        this.monedas = [
            { label: "SOL", value: 1 },
            { label: "DOLAR", value: 2 }
        ];
    }

    getProyectos() {
        this.proyectosService.getProyectoProceso(null).subscribe(
            (_proyectos: GeneralCollection<Proyecto>) => {
                this.proyectos = _proyectos['data'];
                console.log("proy: ", this.proyectos);
            },
            (error) => {
                console.log("error: ", error);
            }
        );
    }

    getProveedores() {
        this.proveedorService.getProveedor(null).subscribe(
            (_proveedores: GeneralCollection<Proveedor>) => {
                this.proveedores = _proveedores['data'];
                console.log("prov: ", this.proveedores);
            },
            (error) => {
                console.log("error: ", error);
            }
        );
    }

    resetFormProv() {
        this.id_prov = -1;
        this.razsoc_prov = "";
        this.ema_prov = "";
        this.selectedTipdoc = null;
        this.num_doc_prov = "";

        this.submittedProv = false;
    }

    setForm(g: Gastos) {
        this.id_gas = g.id_gas;
        this.gas_fec = g.gas_fec;
        this.serie = g.gas_fac_ser;
        this.correl = +g.gas_fac;
        this.gas_tipcam = g.gas_tipcam;
        this.ingreso = (g.gas_totdol) ? g.gas_totdol : g.gas_tot;
        this.gas_desc = g.gas_desc

        var s_mon = this.monedas.filter(unit => unit.value === g.gas_mon);
        this.selectedMoneda = (s_mon.length > 0) ? s_mon[0] : null;
        var s_idProv = this.proveedores.filter(unit => unit.id_prov === g.id_prov);
        this.selectedProveedor = (s_idProv.length > 0) ? s_idProv[0] : null;
        var s_idProy = this.proyectos.filter(unit => unit.id_proy === g.id_proy);
        this.selectedProyecto = (s_idProy.length > 0) ? s_idProy[0] : null;

        this.onChangeMoneda();
    }

    submit() {
        this.submitted = true;
        this.showbar = true;
        if (this.validadorEntrada) {
            this.showbar = false;
            this.showMessage('warn', 'Advertencia', 'Campos incompletos');
            return;
        } else {
            //this.ordenDetalle = this.ordenCompraDetalle.find(unit => unit.ord_com_det_canent !== 0);
            let gastos = new Gastos();
            gastos.id_gas = this.id_gas;
            gastos.gas_fec = this.gas_fec;
            gastos.gas_fac_ser = this.serie;
            gastos.gas_fac = ((this.correl) ? this.correl.toString() : "");
            gastos.gas_igv = this.igv;
            gastos.gas_tot = this.total;
            gastos.gas_subtot = this.subTotal;
            gastos.id_prov = (this.selectedProveedor) ? this.selectedProveedor.id_prov : null;
            gastos.prov_razsoc = (this.selectedProveedor) ? this.selectedProveedor.razsoc_prov : null;
            gastos.prov_ruc = (this.selectedProveedor) ? +this.selectedProveedor.num_doc_prov : null;
            gastos.id_proy = (this.selectedProyecto) ? this.selectedProyecto.id_proy : null;
            gastos.gas_mon = (this.selectedMoneda) ? this.selectedMoneda.value : 1;
            gastos.gas_tipcam = +this.gas_tipcam;
            gastos.gas_totdol = (this.selectedMoneda.value = 2) ? +this.ingreso : 0;
            gastos.gas_desc = this.gas_desc;

            console.log("Gasto ingresado: ", gastos);

            if (this.formMode) {
                this.finanzasService.createGasto(gastos).subscribe(
                    (_resp) => {
                        this.showMessage('success', 'Exito¡', 'Registro de gasto creado');
                        this.showbar = false;
                        this.cancel();
                    },
                    (error) => {
                        this.showMessage('error', 'Error', 'Ocurrio un problema en el servidor');
                        this.showbar = false;
                        this.cancel();
                    });
            } else {
                this.finanzasService.updateGasto(gastos).subscribe(
                    (_resp) => {
                        this.showMessage('success', 'Exito', 'Producto actualizado');
                        this.showbar = false;
                        this.cancel();
                    },
                    (error) => {
                        this.showMessage('error', 'Error', 'Ocurrio un problema en el servidor');
                        this.showbar = false;
                    });
            }
        }
    }

    cancel() {
        this.router.navigate(["/finanzas"]);
    }

    newProveedor() {
        this.resetFormProv();
        this.displayModalProveedor = true;
    }

    submitProv() {
        this.submittedProv = true;
        this.showbar = true;
        this.id_tipdoc = (this.selectedTipdoc) ? this.selectedTipdoc.id_tipdoc : null;
        if (!this.validTipDoc || !this.validRazSoc || !this.validNumDoc) {
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

            console.log("viendo proveedor", prov);
            this.proveedorService.createProveedor(prov).subscribe(
                (_resp) => {
                    this.showMessage('success', 'Exito¡', 'Proveedor registrado');
                    console.log(_resp);
                    this.getProveedores();
                    this.resetFormProv();
                    this.showbar = false;
                    this.displayModalProveedor = false;
                    this.selectedProveedor = null;
                },
                (error) => {
                    this.showMessage('error', 'Error', 'Ocurrio un problema en el servidor');
                    //this.resetForm();
                    console.log("error: ", error)
                    this.showbar = false;
            });
        }
    }

    cancelProv() {
		this.submittedProv = false;
		this.resetFormProv();
		this.displayModalProveedor = false;
    }

    onChangeMoneda() {
        if (this.selectedMoneda && this.selectedMoneda.value == 2) {
            this.tipoCambio = true;
        } else {
            this.tipoCambio = false;
            this.gas_tipcam = null;
        }
    }

    //validadores de entrada
    get validadorEntrada(): boolean {
        return !this.validCorrelativo || !this.selectedMoneda || !this.validIngreso || !this.validTipCam || !this.validProveedor || !this.validDescripcion;
    }

    /* get validSerieFac(): boolean {
        return (this.serie.length != 0);
    }
    get validFactura(): boolean {
        return (this.validSerieFac && this.validCorrelativo && this.serie != "");
    } */
    get validDocs(): boolean {
        return this.validCorrelativo && this.serie !== "";
    }
    get validCorrelativo(): boolean {
        return this.correl > 0 && this.correl != null;
    }
    get validIngreso(): boolean {
        return this.ingreso > 0 && this.ingreso != null;
    }
    get validTipCam(): boolean {
        if (this.selectedMoneda.value == 2) {
            return this.gas_tipcam > 0 && this.gas_tipcam != null;
        }
        return true;
    }
    get validProveedor(): boolean {
        return this.selectedProveedor != null;
    }
    /* get validProyecto(): boolean {
        return this.selectedProyecto != null;
    } */
    get validDescripcion(): boolean {
        return this.gas_desc != "";
    }

    //Calculo de gasto e impuestos
    get total(): number {
        if (this.gas_tipcam == 0 || this.gas_tipcam == null) {
            this.gas_tot = +this.ingreso;
            return this.gas_tot;
        } else {
            return this.gas_tot = +this.ingreso * this.gas_tipcam;
        }
    }
    get igv(): number {
        return this.subTotal * 0.18;
    }
    get subTotal(): number {
        return this.total / 1.18;
    }

    //Validadores Proveedor
    get validRazSoc(): boolean {
        return this.razsoc_prov !== "";
    }
    get validTipDoc(): boolean {
        return this.selectedTipdoc !== null;
    }
    get validNumDoc(): boolean {
        return this.num_doc_prov !== "";
    }

    get validFactura(): boolean {
        return true;
    }

    //mensajes 
    showMessage(_severity: string, _summary: string, _detail: string) {
        this.messageService.add({ severity: _severity, summary: _summary, detail: _detail });
    }
}
