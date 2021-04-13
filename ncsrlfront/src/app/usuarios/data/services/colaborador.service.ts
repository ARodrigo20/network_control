import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GeneralCollection } from '@app/_general/models/general-collection.model';
import { Colaborador } from '../models/colaborador.model';
import { environment } from "@environments/environment";


@Injectable({
    providedIn: 'root'
})
export class ColaboradorService {

    constructor(private http: HttpClient) { }

    getColaborador(param: void): Observable<GeneralCollection<Colaborador>> {
        return this.http.get<GeneralCollection<Colaborador>>(`${environment.apiBase}` + 'usuarios/get');
    }
    
    createColaborador(colaborador: Colaborador): any {
        return this.http.post<any>(`${environment.apiBase}` + 'usuarios/create', colaborador);
    }

    updateColaborador(colaborador: Colaborador): any {
        return this.http.post<any>(`${environment.apiBase}` + 'usuarios/update/' + colaborador.id_col, colaborador);
    }

    deleteColaborador(id: number):any {
        return this.http.get<any>(`${environment.apiBase}` + 'usuarios/delete/' + id);
    }

    getFirma(id): any {
        return this.http.get<any>(`${environment.apiBase}` + 'usuarios/firma/' + id);
    }

    updateFirma(formData: FormData): Observable<any> {
        return this.http.post<any>(`${environment.apiBase}` + 'usuarios/update-firma', formData);
    }

}