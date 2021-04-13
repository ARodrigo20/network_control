import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GeneralCollection } from '@app/_general/models/general-collection.model';
import { environment } from "@environments/environment";
import { Seccion } from '../models/seccion.model';

@Injectable({
    providedIn: 'root'
})
export class SeccionService {

    constructor(private http: HttpClient) { }

    getSecciones(param: void): Observable<GeneralCollection<Seccion>> {
        return this.http.get<GeneralCollection<Seccion>>(`${environment.apiBase}` + 'seccion/get');
    }

    createSeccion(seccion: Seccion): any {
        return this.http.post<any>(`${environment.apiBase}` + 'seccion/create', seccion);
    }

    updateSeccion(seccion: Seccion): any {
        return this.http.post<any>(`${environment.apiBase}` + 'seccion/update/' + seccion.id_sec, seccion);
    }

    deleteSeccion(id: number):any {
        return this.http.get<any>(`${environment.apiBase}` + 'seccion/delete/' + id);
    }

}
