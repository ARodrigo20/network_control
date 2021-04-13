import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GeneralCollection } from '@app/_general/models/general-collection.model';
import { environment } from "@environments/environment";
import { RegistroCambio } from '../models/registro-cambio.model';

@Injectable({
    providedIn: 'root'
})
export class LogsService {

    constructor(private http: HttpClient) { }

    getLogs(param: void): Observable<GeneralCollection<RegistroCambio>> {
        return this.http.get<GeneralCollection<RegistroCambio>>(`${environment.apiBase}` + 'logs/get');
    }
}
