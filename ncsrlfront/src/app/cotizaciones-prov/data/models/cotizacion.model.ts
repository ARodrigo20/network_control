import { CotizacionProvDetalle } from './cotizacion-detalle.model';
import { Proyecto } from '@app/proyectos/data/models/proyect.model'

export class Cotizacion {
    cotprov_id: number;
    solcli_id: number;
    cotprov_cod: string;
    cotprov_fec: Date;
    cotprov_proy_nom: string;
    cotprov_razsoc: number;
    cotprov_dir: string;
    cotprov_con: string;
    cotprov_ema: string;
    cotprov_ruc: string;
    cotprov_tipdoc: string;
    cotprov_col_nom: string;
    cotprov_col_usu: string;
    id_proy: string;
    id_prov: number;
    est_reg: string;
    est_env: string;
    cotizacion_detalle: CotizacionProvDetalle[];
    proyecto: Proyecto;
}

export class CotizacionJSON {
    cotizacion: Cotizacion;
    logo: any;
    extension: any;
}