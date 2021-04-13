import { Fabricante } from '@app/tablas-referenciales/data/models/fabricante.model';
import { Marca } from '@app/tablas-referenciales/data/models/marca.model';
import { Modelo } from '@app/tablas-referenciales/data/models/modelo.model';
import { UniMed } from '@app/tablas-referenciales/data/models/unimed.model';

export class Producto {
    id_prod: number;
    cod_prod: string;
    num_parte_prod: string;
    stk_prod: number;
    des_prod: string;
    pre_com_prod: number;
    mon_prod: number;
    id_unimed: number;
    id_mod: number;
    id_mar: number;
    id_fab: number;
    est_reg: string;
    create_at: Date;
    update_at: Date;
    fabricante: Fabricante;
    marca: Marca;
    modelo: Modelo;
    unidad_medida: UniMed;
}