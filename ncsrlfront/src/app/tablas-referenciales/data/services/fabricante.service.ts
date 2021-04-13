import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GeneralCollection } from '@app/_general/models/general-collection.model';
import { environment } from "@environments/environment";
import { Fabricante } from '../models/fabricante.model';

@Injectable({
    providedIn: 'root'
})
export class FabricanteService {

    constructor(private http: HttpClient) { }

    getFabricantes(param: void): Observable<GeneralCollection<Fabricante>> {
        return this.http.get<GeneralCollection<Fabricante>>(`${environment.apiBase}` + 'almacen/fabricantes/get');
    }

    createFabricante(fabricante: Fabricante): any {
        return this.http.post<any>(`${environment.apiBase}` + 'almacen/fabricantes/create', fabricante);
    }

    updateFabricante(fabricante: Fabricante): any {
        return this.http.post<any>(`${environment.apiBase}` + 'almacen/fabricantes/update/' + fabricante.id_fab, fabricante);
    }

    deleteFabricante(id: number):any {
        return this.http.get<any>(`${environment.apiBase}` + 'almacen/fabricantes/delete/' + id);
    }

}
