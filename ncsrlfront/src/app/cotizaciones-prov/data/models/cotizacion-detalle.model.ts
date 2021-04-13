import { Producto } from '@app/inventario/data/models/product.model';

export class CotizacionProvDetalle {
    cotprovdet_id: number;
    cotprov_id: number;
    id_prod: number;
    cotprovdet_desc: string;
    cotprovdet_cant: number;
    cotprovdet_prod_codint: string;
    cotprovdet_prod_numpar: string;
    cotprovdet_prod_fabr: string;
    cotprovdet_prod_marc: string;
    cotprovdet_prod_unimed: string;
    producto: Producto;
}