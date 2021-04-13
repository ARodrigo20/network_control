import { OrdenCompraDetalle } from '@app/orden-compra/data/models/orden-compra-detalle.model';

export class Gastos {
    id_gas: number;
    gas_fec: Date;
    gas_fac: string;
    gas_fac_ser: string;
    gas_subtot: number;
    gas_igv: number;
    gas_tot: number;
    id_prov: number;
    prov_razsoc: string;
    prov_ruc: number;
    id_proy: number;
    nom_proy: string;
    gas_mon: string;
    gas_tipcam: number;
    gas_totdol: number;
    gas_desc: string;
    est_reg: string;
}

export class GastosJSON {
    regGastos: Gastos[];
    logo: any;
    extension: any;
}