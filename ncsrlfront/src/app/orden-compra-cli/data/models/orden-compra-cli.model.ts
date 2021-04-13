import { Cliente } from '@app/clientes/data/models/cliente.model';
import { Cotizacion } from '@app/cotizaciones-prov/data/models/cotizacion.model';
import { Proveedor } from '@app/proveedores/data/models/proveedor.model';
import { Contacto } from '@app/clientes/data/models/contacto.model';
import { Direccion } from '@app/clientes/data/models/direccion.model';
import { User } from '@app/_general/models/user.model';
import { OrdenCompraDetalleCli } from './orden-compra-detalle-cli.model';

export class OrdenCompraCli {
    id_ord_com: number;
    ord_com_cod: string;
    id_cli:number;

    //cotprov_id: number;
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
    ord_com_tip: number;
    ord_com_est: number;
    est_env: number;
    est_reg: string;
    orden_detalle: OrdenCompraDetalleCli[];

    usuario : User;
  /*  cotizacion_proveedor: Cotizacion;
    proveedor: Proveedor;*/
    
    cliente: Cliente;
    cliente_contacto: Contacto;
    cliente_direccion: Direccion;

    ord_com_cli_id_dir: number;
    ord_com_cli_id_con: number;
    ord_com_cli_ema: number;

}
export class OrdenCompraCliJSON {
    ordenCompraCli: OrdenCompraCli;
    logo: any;
    extension: any;
}