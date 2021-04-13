import { User } from '@app/_general/models/user.model';
//import { OrdenCompraDetalle } from './orden-compra-detalle.model';
import { OrdenCompraCli } from '@app/orden-compra-cli/data/models/orden-compra-cli.model'
import { GuiaRemisionDetalle } from './guia-remision-detalle.model';
import { Transporte } from '@app/tablas-referenciales/data/models/transporte.model';

export class GuiaRemisionEnvio {
    

    codTraslado: string;
    desTraslado: string;
    indTransbordo: boolean;
    pesoTotal: number;
    undPesoTotal: string;
    numBultos: number;
    modTraslado: string;
    fecTraslado: Date;
    numContenedor: string;
    codPuerto: string;
    id_transportista: number;
    ubigueoLlegada: string;
    direccionLlegada: string;
    ubigueoSalida: string;
    direccionSalida:string;
    est_reg: string;

    transportista : Transporte;
    llegada: Llegada;
    partida: Partida;
    
}

export class Llegada{
    ubigueo: string;
    direccion: string;
}
export class Partida{
    ubigueo: string;
    direccion: string;
}