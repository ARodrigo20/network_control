import { CotizacionDetalle } from './cotizacion-detalle.model';

export class Cotizacion {
    solcli_id: number;
    solcli_cod: string;
    solcli_fec: Date;
    id_proy: number;
    solcli_proy_nom: string;
    solcli_cli_nom: number;
    solcli_cli_dir: string;
    solcli_cli_id_dir: number;
    solcli_cli_con: string;
    solcli_cli_id_con: number;
    solcli_cli_numdoc: string;
    solcli_cli_tipdoc: string;
    solcli_col_nom: string;
    solcli_proy_cod: string;
    est_reg: string;
    id_cli: number; 
    cotizacion_detalle: CotizacionDetalle[];
}

export class CotizacionJSON {
    cotizacion: Cotizacion;
    logo: any;
    extension: any;
}