import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GeneralCollection } from '@app/_general/models/general-collection.model';
import { Proveedor } from '../models/proveedor.model';
import { environment } from "@environments/environment";
import { Direcciones } from '../models/direccion.model';
import { Colaborador } from '../models/colaborador.model';

@Injectable({
    providedIn: 'root'
})
export class ProveedorService {

    constructor(private http: HttpClient) { }

    getProveedor(param: void): Observable<GeneralCollection<Proveedor>> {
        return this.http.get<GeneralCollection<Proveedor>>(`${environment.apiBase}` + 'proveedores/get');
        // return this.http.get<GeneralCollection<Producto>>('/api/productos/');
    }
    getProveed(id: number): Observable<Proveedor> {
        return this.http.get<Proveedor>(`${environment.apiBase}` + 'proveedores/get/' + id);
    }
    createProveedor(proveed: Proveedor): any {
        return this.http.post<any>(`${environment.apiBase}` + 'proveedores/create', proveed);
    }
    updateProveedor(proveed: Proveedor): any {
        return this.http.post<any>(`${environment.apiBase}` + 'proveedores/update/' + proveed.id_prov, proveed);
    }
    adminProveedor(proveed: Proveedor): any {
        return this.http.post<any>(`${environment.apiBase}` + 'proveedores/admbancolydir/' + proveed.id_prov, proveed);
    }
    deleteProveedor(id: number):any {
        return this.http.get<any>(`${environment.apiBase}` + 'proveedores/delete/' + id);
    }
    createDireccion(direccion: Direcciones) {
        return this.http.post<any>(`${environment.apiBase}` + 'proveedores-direccion/create', direccion);
    }
    createContacto(contacto: Colaborador) {
        return this.http.post<any>(`${environment.apiBase}` + 'proveedores-colaborador/create', contacto);
    }
}