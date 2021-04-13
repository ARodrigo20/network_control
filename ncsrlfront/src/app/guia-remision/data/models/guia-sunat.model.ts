import { GuiaRemisionDetalle } from './guia-remision-detalle.model';
import { GuiaRemisionEnvio } from './guia-remision-envio.model';

export class GuiaSunat{

    tipoDoc: string;
    serie: string;
    correlativo: string;
    observacion: string;
    fechaEmision: Date;

    company: any;
    destinatario: Destinatario;

    envio : GuiaRemisionEnvio;
    details : GuiaRemisionDetalle[];
}

export class Company{
    ruc: string;
    razonSocial: string;
    nombreComercial: string;
    address: Address;
}
export class Address{
    ubigueo: string;
    codigoPais: string;
    departamento: string;
    provincia: string;
    distrito: string;
    urbanizacion: string;
    direccion: string;
}
export class Destinatario{
    tipoDoc: string;
    numDoc: string;
    rznSocial: string;
}

export class Details{
    codigo: string;
    descripcion: string;
    unidad: string;
    codProdSunat: string;
}


