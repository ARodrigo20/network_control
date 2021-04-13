import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GeneralCollection } from '@app/_general/models/general-collection.model';
import { environment } from "@environments/environment";
import { OrdenCompra } from '../models/orden-compra.model';

@Injectable({
    providedIn: 'root'
})
export class OrdenCompraService {

    constructor(private http: HttpClient) { }
    
    getOrdenes(param: void): Observable<GeneralCollection<OrdenCompra>> {
        return this.http.get<GeneralCollection<OrdenCompra>>(`${environment.apiBase}` + 'orden-compra/get');
    }

    getOrden(id: number): Observable<OrdenCompra> {
        return this.http.get<OrdenCompra>(`${environment.apiBase}` + 'orden-compra/get/' + id);
    }

    createOrdenCompra(orden: any): any {
        return this.http.post<any>(`${environment.apiBase}` + 'orden-compra/create', orden);
    }

    anularOrdenCompra(id: number):any {
        return this.http.get<any>(`${environment.apiBase}` + 'orden-compra/annul/' + id);
    }
    

}
