import { OrdenCompraDetalle } from '@app/orden-compra/data/models/orden-compra-detalle.model';

export class GastosExcel {
    Fecha: Date;
    Factura: string;
    gas_subtot: number;
    Proveedor: string;
    RUC: number;
    Proyecto: string;
    Descripcion: string;
}

export class GastosExcelJSON {
    regGastos: GastosExcel[];
    logo: any;
    extension: any;
}