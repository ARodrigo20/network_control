import { Cotizacion } from '@app/cotizaciones-prov/data/models/cotizacion.model';
import { Proveedor } from '@app/proveedores/data/models/proveedor.model';
import { User } from '@app/_general/models/user.model';
import { OrdenCompraDetalle } from './orden-compra-detalle.model';

export class OrdenCompra {
    id_ord_com: number;
    ord_com_cod: string;
    cotprov_id: number;
    ord_com_prov_id: number;
    ord_com_prov_dir: string;
    ord_com_prov_con: string;
    ord_com_prov_ema: string;
    ord_com_term: string;
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
    ord_med_ent: string;

    orden_detalle: OrdenCompraDetalle[];

    usuario : User;
    cotizacion_proveedor: Cotizacion;
    proveedor: Proveedor;
}