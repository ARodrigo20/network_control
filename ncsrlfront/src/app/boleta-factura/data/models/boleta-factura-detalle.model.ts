import { SelectItem } from "primeng/api";

export class BoletaFacturaDetalle {

    id_det_fac: number;
    unidad: string;
    cantidad: number;
    codProducto: string;
    codProdSunat: string;
    codProdGS1: string;
    descripcion: string;
    mtoValorUnitario: number;
    descuento: number;
    igv: number;
    tipAfeIgv: string;
    isc: number;
    tipSisIsc: string;
    totalImpuestos: number;
    mtoPrecioUnitario: number;
    mtoValorVenta: number;
    mtoValorGratuito: number;
    mtoBaseIgv: number;
    porcentajeIgv: number;
    mtoBaseIsc: number;
    porcentajeIsc: number;
    mtoBaseOth: number;
    porcentajeOth: number;
    otroTributo: number;
    icbper: number;
    factorIcbper: number;
    est_reg: string;
    id_factura: number;
    id_prod: number;

    fact_prod_serv: number;

    constructor() {
        this.id_det_fac= null;
        this.unidad= null;
        this.cantidad= null;
        this.codProducto= null;
        this.codProdSunat= null;
        this.codProdGS1= null;
        this.descripcion= null;
        this.mtoValorUnitario= null;
        this.descuento= null;
        this.igv= null;
        this.tipAfeIgv= null;
        this.isc= null;
        this.tipSisIsc= null;
        this.totalImpuestos= null;
        this.mtoPrecioUnitario= null;
        this.mtoValorVenta= null;
        this.mtoValorGratuito= null;
        this.mtoBaseIgv= null;
        this.porcentajeIgv= null;
        this.mtoBaseIsc= null;
        this.porcentajeIsc= null;
        this.mtoBaseOth= null;
        this.porcentajeOth= null;
        this.otroTributo= null;
        this.icbper= null;
        this.factorIcbper= null;
        this.est_reg= null;
        this.id_factura= null;
        this.id_prod= null;

        this.fact_prod_serv= null;
    }

    // solclidet_id: number;
    // solcli_id: number;
    // solclidet_prod_serv: number;
    // solclidet_des: string;
    // id_prod: number;
    // solclidet_prod_can: number;
    // solclidet_pre_uni: number;
    // solclidet_prod_codint: string;
    // solclidet_prod_numpar: string;
    // solclidet_prod_fabr: string;
    // solclidet_prod_marc: string;
    // solclidet_prod_unimed: string;
    // solclidet_prod_stock: number;
    // est_reg: string;

    // descuento: number;
    impuesto: SelectItem;

    getSubTotal() : number {
        return (this.cantidad * this.mtoValorUnitario)
    }

    getTotal() : number {

        return ( (this.impuesto.value === '10' || this.impuesto.value === '17') ? (this.cantidad * this.mtoValorUnitario)*(1.18) : (this.cantidad * this.mtoValorUnitario))
    }
}