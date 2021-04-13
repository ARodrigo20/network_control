import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GeneralCollection } from '@app/_general/models/general-collection.model';
import { environment } from "@environments/environment";
import { TipoDoc } from '../models/tipodoc.model';

@Injectable({
    providedIn: 'root'
})
export class TipoDocService {

    constructor(private http: HttpClient) { }

    getTipDoc(param: void): Observable<GeneralCollection<TipoDoc>> {
        return this.http.get<GeneralCollection<TipoDoc>>(`${environment.apiBase}` + 'usuarios/tiposdoc/get');
    }

    createTipDoc(tipdoc: TipoDoc): any {
        return this.http.post<any>(`${environment.apiBase}` + 'usuarios/tiposdoc/create', tipdoc);
    }

    updateTipDoc(tipdoc: TipoDoc): any {
        return this.http.post<any>(`${environment.apiBase}` + 'usuarios/tiposdoc/update/' + tipdoc.id_tipdoc, tipdoc);
    }

    deleteTipDoc(id: number):any {
        return this.http.get<any>(`${environment.apiBase}` + 'usuarios/tiposdoc/delete/' + id);
    }

}