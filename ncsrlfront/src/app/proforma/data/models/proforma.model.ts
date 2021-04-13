import { Cliente } from '@app/clientes/data/models/cliente.model';
import { Contacto } from '@app/clientes/data/models/contacto.model';
import { Direccion } from '@app/clientes/data/models/direccion.model';
import { Proyecto } from '@app/proyectos/data/models/proyect.model';
import { User } from '@app/_general/models/user.model';
import { ProformasDetalle } from './proforma-detalle.model';

export class Proformas {
    
    id_pro: number;
    id_cli: number;//
    prof_fec: Date;
    prof_mon: string;
    id_proy: number;//
    id_col: number;//
    solcli_id: number;//
    prof_cre: number;
    prof_imp_ini: number;
    prof_int: number;
    prof_cuo: number;
    prof_val: string;
    prof_tie_ent: string;
    prof_cos_dir: number;
    prof_gas_ind: number;
    prof_uti: number;
    prof_bas_imp: number;
    prof_igv: number;
    prof_neto: number;
    est_reg: string;
    est_env: string;
    prof_fac: number;
    prof_finan: number;
    prof_val_cuo: number;
    prof_cli_id_dir: number;
    prof_cli_id_con: number;
    prof_obs: string;
    prof_desc: number;
    prof_cli_ciu: string;
    prof_tie_ins: string;
    prof_cod: string;
    prof_con_pag: string;
        
    usuario : User;

    proforma_detalle: ProformasDetalle[];
    cliente: Cliente;
    proyecto: Proyecto;
    cliente_contacto: Contacto;
    cliente_direccion: Direccion;
}

export class ProformasJSON {
    proformas: Proformas;
    logo: any;
    extension: any;
}