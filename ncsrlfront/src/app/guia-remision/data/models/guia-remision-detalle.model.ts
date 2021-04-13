import { Producto } from '@app/inventario/data/models/product.model';
import { SelectItem } from 'primeng/api';

export class GuiaRemisionDetalle {
    

    id_guia_remision_det: number;
    id_guia_remision: number;
    codigo: string;
    descripcion: String;
    unidad: string;
    cantidad: number;
    codProdSunat: string;
    id_prod: number;
    est_reg: string;



    producto: Producto;

    estado_det: SelectItem;
    
    getTotal() : number {
        return null//( this.ord_com_det_can * this.ord_com_det_preuni)
    }

    getCanFaltante() : number {
        return null//( this.ord_com_det_can - this.ord_com_det_canent)
    }
}