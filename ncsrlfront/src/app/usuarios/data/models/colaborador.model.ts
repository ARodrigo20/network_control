import { TipoDoc } from '@app/tablas-referenciales/data/models/tipodoc.model';
import { Cargo } from '@app/tablas-referenciales/data/models/cargo.model';

export class Colaborador {
    id_col: number;
    nom_col: string;
    ape_col: string;
    email: string;
    num_doc_col: string;
    id_tipdoc: number;
    cod_col: string;
    cel_col: string;
    id_car: number;
    est_reg: string;
    create_at: Date;
    update_at: Date;
    tipo_documento: TipoDoc;
    cargo: Cargo;
}
