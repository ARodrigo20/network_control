import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GeneralCollection } from '@app/_general/models/general-collection.model';
import { environment } from "@environments/environment";
import { Modelo } from '../models/modelo.model';

@Injectable({
    providedIn: 'root'
})
export class ModeloService {

    constructor(private http: HttpClient) { }

    getModelos(param: void): Observable<GeneralCollection<Modelo>> {
        return this.http.get<GeneralCollection<Modelo>>(`${environment.apiBase}` + 'almacen/modelos/get');
    }

    createModelo(modelo: Modelo): any {
        return this.http.post<any>(`${environment.apiBase}` + 'almacen/modelos/create', modelo);
    }

    updateModelo(modelo: Modelo): any {
        return this.http.post<any>(`${environment.apiBase}` + 'almacen/modelos/update/' + modelo.id_mod, modelo);
    }

    deleteModelo(id: number):any {
        return this.http.get<any>(`${environment.apiBase}` + 'almacen/modelos/delete/' + id);
    }

}
