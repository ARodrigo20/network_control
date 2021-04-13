import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GeneralCollection } from '@app/_general/models/general-collection.model';
import { Producto } from '../models/product.model';
import { environment } from "@environments/environment";

@Injectable({
    providedIn: 'root'
})
export class ProductosService {

    constructor(private http: HttpClient) { }

    getProductos(param: void): Observable<GeneralCollection<Producto>> {
        return this.http.get<GeneralCollection<Producto>>(`${environment.apiBase}` + 'almacen/productos/get');
        // return this.http.get<GeneralCollection<Producto>>('/api/productos/');
    }
    
    createProducto(product: Producto): any {
        return this.http.post<any>(`${environment.apiBase}` + 'almacen/productos/create', product);
    }

    updateProducto(product: Producto): any {
        return this.http.post<any>(`${environment.apiBase}` + 'almacen/productos/update/' + product.id_prod, product);
    }

    deleteProducto(id: number):any {
        return this.http.get<any>(`${environment.apiBase}` + 'almacen/productos/delete/' + id);
    }

}
