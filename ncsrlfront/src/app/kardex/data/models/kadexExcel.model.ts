export class KardexExcel {
    Fecha: Date;
    Codigo: string;
    Factura: string;
    Boleta: string;
    Tipo: string;
    Usuario: string;
}

export class KardexExcelJSON {
    regKardex: KardexExcel[];
    logo: any;
    extension: any;
}