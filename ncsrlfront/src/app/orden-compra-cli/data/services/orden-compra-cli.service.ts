import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GeneralCollection } from '@app/_general/models/general-collection.model';
import { environment } from "@environments/environment";
import { OrdenCompraCli } from '../models/orden-compra-cli.model';

@Injectable({
    providedIn: 'root'
})
export class OrdenCompraCliService {

    constructor(private http: HttpClient) { }
    
    getOrdenes(param: void): Observable<GeneralCollection<OrdenCompraCli>> {
        return this.http.get<GeneralCollection<OrdenCompraCli>>(`${environment.apiBase}` + 'orden-compra-cliente/get');
    }

    getOrden(id: number): Observable<OrdenCompraCli> {
        return this.http.get<OrdenCompraCli>(`${environment.apiBase}` + 'orden-compra-cliente/get/' + id);
    }

    createOrdenCompra(orden: any): any {
        return this.http.post<any>(`${environment.apiBase}` + 'orden-compra-cliente/create', orden);
    }

    anularOrdenCompra(id: number):any {
        return this.http.get<any>(`${environment.apiBase}` + 'orden-compra-cliente/annul/' + id);
    }
    

}
