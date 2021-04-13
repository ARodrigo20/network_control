import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GeneralCollection } from '@app/_general/models/general-collection.model';
import { environment } from "@environments/environment";
import { Marca } from '../models/marca.model';

@Injectable({
    providedIn: 'root'
})
export class MarcaService {

    constructor(private http: HttpClient) { }

    getMarcas(param: void): Observable<GeneralCollection<Marca>> {
        return this.http.get<GeneralCollection<Marca>>(`${environment.apiBase}` + 'almacen/marcas/get');
    }

    createMarca(marca: Marca): any {
        return this.http.post<any>(`${environment.apiBase}` + 'almacen/marcas/create', marca);
    }

    updateMarca(marca: Marca): any {
        return this.http.post<any>(`${environment.apiBase}` + 'almacen/marcas/update/' + marca.id_mar, marca);
    }

    deleteMarca(id: number):any {
        return this.http.get<any>(`${environment.apiBase}` + 'almacen/marcas/delete/' + id);
    }

}
