import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GeneralCollection } from '@app/_general/models/general-collection.model';
import { environment } from "@environments/environment";
import { UniMed } from '../models/unimed.model';

@Injectable({
    providedIn: 'root'
})
export class UniMedService {

    constructor(private http: HttpClient) { }

    getUniMeds(param: void): Observable<GeneralCollection<UniMed>> {
        return this.http.get<GeneralCollection<UniMed>>(`${environment.apiBase}` + 'almacen/unidadesmedida/get');
    }

    createUnimed(unimed: UniMed): any {
        return this.http.post<any>(`${environment.apiBase}` + 'almacen/unidadesmedida/create', unimed);
    }

    updateUnimed(unimed: UniMed): any {
        return this.http.post<any>(`${environment.apiBase}` + 'almacen/unidadesmedida/update/' + unimed.id_unimed, unimed);
    }

    deleteUnimed(id: number):any {
        return this.http.get<any>(`${environment.apiBase}` + 'almacen/unidadesmedida/delete/' + id);
    }

}
