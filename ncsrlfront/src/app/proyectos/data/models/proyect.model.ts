import { Cliente } from '@app/clientes/data/models/cliente.model';

export class Proyecto {
    id_proy: number;
    nom_proy: string;
    ser_proy: string;
    num_proy: string;
    id_cli: number;
    cliente: Cliente;
    est_reg: string;
    create_at: Date;
    update_at: Date;
}