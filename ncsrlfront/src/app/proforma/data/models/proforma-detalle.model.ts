import { Producto } from '@app/inventario/data/models/product.model';
import { Direcciones } from '@app/proveedores/data/models/direccion.model';
import { Proveedor } from '@app/proveedores/data/models/proveedor.model';
import { Seccion } from '@app/tablas-referenciales/data/models/seccion.model';

export class ProformasDetalle {
    id_prof_det: number;
    id_pro: number;
    id_prod: number;
    prof_det_can: number;
    prof_det_pre_lis: number;
    prof_det_imp: number;
    prof_det_cos: number;
    prof_det_tcos: number;
    prof_det_por_com: number;
    prof_det_com: number;
    id_prov: number;
    prof_prod_serv: number;
    prof_des_prod: string;
    prof_can_prod: number;
    prof_det_stock: string;
    id_sec : number;
    sec_des : string;
    id_prov_dir: number;
    est_reg: string;

    producto: Producto;
    
    
    unidad_medida: string;
    mensajeStock: boolean;////////////
    marca: string;
    num_parte: string;
 
    proveedor: Proveedor;

    prof_dir_prov: string;
    prof_ema_prov: string;

    selectedDirecc: Direcciones;
    direcciones : Direcciones [] = [];
        
    seccion : Seccion;

    
    getTCosto() : number {
        return this.prof_det_can * this.prof_det_cos
    }
    
    getComision() : number {
        return ( this.prof_det_cos * (this.prof_det_por_com/100))
    }

    getPrecioLista() : number {
        return (this.prof_det_cos + ( this.prof_det_cos * (this.prof_det_por_com/100)))
    }

    getImporte() : number {
        return ( this.prof_det_can * (this.prof_det_cos + ( this.prof_det_cos * (this.prof_det_por_com/100))))
    }

    get cantidad_valida() : boolean {
        return this.prof_det_can >= 0;
    }


    onChangeProveedor(event: any) {
        if(event.value) {
            this.direcciones = event.value.direcciones;
            this.selectedDirecc = null;
            //console.log("se guarda prov", event.value);
        }else{
           this.direcciones = [];
           this.selectedDirecc = null;
        }
        //console.log("viendo direcc prov", this.selectedDirecc);
    }

        
        
}