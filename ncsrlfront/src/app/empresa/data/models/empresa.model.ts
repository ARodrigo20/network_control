import { TipoDoc } from '@app/tablas-referenciales/data/models/tipodoc.model';

export class Empresa {
    id_emp: number;
    nom_emp: string;
    numdoc_emp: string;
    dir_emp: string;
    dis_emp: string;
    ciu_emp: string;
    tel_emp: string;
    cel_emp: string;
    codciu_emp: string;
    id_tipdoc: number;
    img_emp: string;
    imgext_emp: string;
    tipo_documento: TipoDoc;
}