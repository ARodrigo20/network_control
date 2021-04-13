import { Producto } from '@app/inventario/data/models/product.model';
import { SelectItem } from 'primeng/api';

export class OrdenCompraDetalle {
    id_ord_det: number;
    id_ord_com: number;
    id_prod: number;
    ord_com_det_numpar: string;
    ord_com_det_fab: string;
    ord_com_det_des: string;
    ord_com_det_can: number;
    ord_com_det_unimed: string;
    ord_com_det_preuni: number;
    ord_com_det_est: string;
    ord_com_det_feclleg: Date;
    ord_com_det_canent: number = 0;
    ord_com_det_canfal: number;
    ord_com_prod_serv: string;
    cod_ntwc: string;

    producto: Producto;

    estado_det: SelectItem;
    
    getTotal() : number {
        return ( this.ord_com_det_can * this.ord_com_det_preuni)
    }

    getCanFaltante() : number {
        return ( this.ord_com_det_can - this.ord_com_det_canent)
    }
}