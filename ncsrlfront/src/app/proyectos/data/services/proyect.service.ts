import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GeneralCollection } from '@app/_general/models/general-collection.model';
import { Proyecto } from '../models/proyect.model';
import { environment } from "@environments/environment";

@Injectable({
    providedIn: 'root'
})
export class ProyectosService {

    constructor(private http: HttpClient) { }

    getProyecto(param: void): Observable<GeneralCollection<Proyecto>> {
        return this.http.get<GeneralCollection<Proyecto>>(`${environment.apiBase}` + 'proyecto/get');
    }
    getProyectoTerminado(param: void): Observable<GeneralCollection<Proyecto>> {
        return this.http.get<GeneralCollection<Proyecto>>(`${environment.apiBase}` + 'proyecto/getTerminados');
    }
    getProyectoProceso(param: void): Observable<GeneralCollection<Proyecto>> {
        return this.http.get<GeneralCollection<Proyecto>>(`${environment.apiBase}` + 'proyecto/getProceso');
    }    
    createProyecto(proyect: Proyecto): any {
        return this.http.post<any>(`${environment.apiBase}` + 'proyecto/create', proyect);
    }
    updateProyecto(proyect: Proyecto): any {
        return this.http.post<any>(`${environment.apiBase}` + 'proyecto/update/' + proyect.id_proy, proyect);
    }
    deleteProyecto(id: number):any {
        return this.http.get<any>(`${environment.apiBase}` + 'proyecto/delete/' + id);
    }
}
