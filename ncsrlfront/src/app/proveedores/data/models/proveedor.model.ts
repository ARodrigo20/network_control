import { Banco } from './banco.model';
import { Colaborador } from './colaborador.model';
import { Direcciones } from './direccion.model';
import { TipoDoc } from '@app/tablas-referenciales/data/models/tipodoc.model';

export class Proveedor {
    id_prov: number;
    razsoc_prov: string;
    ema_prov: string;
    id_tipdoc: number;
    num_doc_prov: string;
    bancos: Banco[];
    colaboradores: Colaborador[];
    direcciones: Direcciones[];
    est_reg: string;
    create_at: Date;
    update_at: Date;
    tipo_documento: TipoDoc;
}
