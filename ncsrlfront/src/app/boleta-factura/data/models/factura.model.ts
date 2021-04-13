import { Cliente } from "@app/clientes/data/models/cliente.model";
import { BoletaFacturaDetalle } from "./boleta-factura-detalle.model";

export class Factura {
    id_factura: number;
    tipoDoc: string;
    serie: string;
    correlativo: string;
    solcli_id: number;
    id_cli: number;
    tipoMoneda: string;
    sumOtrosCargos: number;
    mtoOperGravadas: number;
    mtoOperInafectas: number;
    mtoOperExoneradas: number;
    mtoOperExportacion: number;
    mtoIGV: number;
    mtoISC: number;
    mtoOtrosTributos: number;
    icbper: number;
    mtoImpVenta: number;
    id_legends: number;
    id_guias: number;
    id_relDocs: number;
    observacion: string;
    compra: string;
    mtoBaseIsc: number;
    mtoBaseOth: number;
    totalImpuestos: number;
    tipoOperacion: string;
    fechaEmision: Date;
    fecVencimiento: Date;
    sumDsctoGlobal: number;
    mtoDescuentos: number;
    mtoOperGratuitas: number;
    totalAnticipos: number;
    id_guiaEmbebida: number;
    id_seller: number;
    id_direccion_entrega: number;
    descuentos: number;
    id_cargo: number;
    mtoCargos: number;
    valorVenta: number;
    est_reg: string;
    est_env: string;
    factura_det: BoletaFacturaDetalle[];

    cliente: Cliente;
}