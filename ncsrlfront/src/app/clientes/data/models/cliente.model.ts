import { Contacto } from './contacto.model';
import { Direccion } from './direccion.model';
import { TipoDoc } from '@app/tablas-referenciales/data/models/tipodoc.model';

export class Cliente {
    id_cli: number;
    razsoc_cli: string;
    id_tipdoc: number;
    numdoc_cli: string;
    contactos: Contacto[];
    direcciones: Direccion[];
    ema_cli: string;
    est_reg: string;
    create_at: Date;
    update_at: Date;
    tipo_documento: TipoDoc;
}
