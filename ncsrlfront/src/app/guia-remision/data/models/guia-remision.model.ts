import { Cotizacion } from '@app/cotizaciones-prov/data/models/cotizacion.model';
import { Proveedor } from '@app/proveedores/data/models/proveedor.model';
import { User } from '@app/_general/models/user.model';
//import { OrdenCompraDetalle } from './orden-compra-detalle.model';
import { OrdenCompraCli } from '@app/orden-compra-cli/data/models/orden-compra-cli.model'
import { GuiaRemisionDetalle } from './guia-remision-detalle.model';
import { GuiaRemisionEnvio } from './guia-remision-envio.model';
import { Transporte } from '@app/tablas-referenciales/data/models/transporte.model';
import { Cliente } from '@app/clientes/data/models/cliente.model';

export class GuiaRemision {
   
    id_guia_remision: number;
    id_ord_com: number;
    id_emp: number;
    id_cli: number;
    serie: string; ////
    //correlativo: string;   ////
    fechaEmision: Date;
    fecTraslado: Date;
    guia_rem_motiv: string;
    modTraslado: string;
    undPesoTotal: string;
    pesoTotal: number;
    numBultos: number;
    guia_rem_nomraz: string;////
    tipo_doc: number; ////
    direccionLlegada: string;
    ubigeoLlegada: string;
    ubigeoPartida: string;
    direccionPartida: string;
    id_transportista: number;
    est_reg: string;
    observacion: string;
    est_env: number;
    correlativo: string;



    ordenCli: OrdenCompraCli;

    detalle_guia: GuiaRemisionDetalle[];
    envio: GuiaRemisionEnvio;
    transportista: Transporte;
    cliente: Cliente;

    usuario : User;
    //cotizacion_proveedor: Cotizacion;
    //proveedor: Proveedor;

     /*id_ord_com: number;
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
    ord_med_ent: string;*/
}