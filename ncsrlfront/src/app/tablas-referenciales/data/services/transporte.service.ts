import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GeneralCollection } from '@app/_general/models/general-collection.model';
import { environment } from "@environments/environment";
import { Transporte } from '../models/transporte.model';

@Injectable({
    providedIn: 'root'
})
export class TransporteService {

    constructor(private http: HttpClient) { }

    getTransporte(param: void): Observable<GeneralCollection<Transporte>> {
        return this.http.get<GeneralCollection<Transporte>>(`${environment.apiBase}` + 'transportista/get');
    }
    getTransportes(id: number): Observable<Transporte> {
        return this.http.get<Transporte>(`${environment.apiBase}` + '/transportista/get/' + id);
    }

    createTransporte(transp: Transporte): any {
        return this.http.post<any>(`${environment.apiBase}` + 'transportista/create', transp);
    }

    updateTransporte(transp: Transporte): any {
        return this.http.post<any>(`${environment.apiBase}` + 'transportista/update/' + transp.id_transportista, transp);
    }

    deleteTransporte(id: number):any {
        return this.http.get<any>(`${environment.apiBase}` + 'transportista/annul/' + id);
    }

}
