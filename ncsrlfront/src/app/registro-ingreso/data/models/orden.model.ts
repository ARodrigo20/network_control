import { OrdenCompraDetalle } from '@app/orden-compra/data/models/orden-compra-detalle.model';

export class Orden {
    id_ord_com: number;
    ord_com_cod: string;
    cotprov_id: number;
    id_emp: number;
    ord_com_fec: Date;
    id_col: number;
    ord_com_bas_imp: number;
    ord_com_igv: number;
    ord_com_tot: number;
    id_pro: number;
    ord_com_est: number;
    est_env: number;
    est_reg: string;
    prov_razsoc: string;
    usu_ema: string;
    orden_detalle: OrdenCompraDetalle[];
}