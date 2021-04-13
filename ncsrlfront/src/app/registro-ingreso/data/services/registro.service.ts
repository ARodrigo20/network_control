import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GeneralCollection } from '@app/_general/models/general-collection.model';
import { Orden } from '@app/registro-ingreso/data/models/orden.model';
import { environment } from "@environments/environment";

@Injectable({
    providedIn: 'root'
})
export class RegistroService {

    constructor(private http: HttpClient) { }

    getOrdenesPendientes(param: void): Observable<GeneralCollection<Orden>> {
        return this.http.get<GeneralCollection<Orden>>(`${environment.apiBase}` + 'kardex/getpendiente');
    }
    getOrdenPendiente(id: number): Observable<Orden> {
        return this.http.get<Orden>(`${environment.apiBase}` + 'kardex/getpendiente/' + id);
    }
    getOrden(id: number): Observable<Orden> {
        return this.http.get<Orden>(`${environment.apiBase}` + 'orden-compra/get/' + id);
    }
}
