import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GeneralCollection } from '@app/_general/models/general-collection.model';
import { environment } from "@environments/environment";
import { GuiaRemision } from '../models/guia-remision.model';

@Injectable({
    providedIn: 'root'
})
export class GuiaRemisionService {

    constructor(private http: HttpClient) { }
    
    getGuias(param: void): Observable<GeneralCollection<GuiaRemision>> {
        return this.http.get<GeneralCollection<GuiaRemision>>(`${environment.apiBase}` + 'guia-remision/get');
    }

    getGuia(id: number): Observable<GuiaRemision> {
        return this.http.get<GuiaRemision>(`${environment.apiBase}` + 'guia-remision/get/' + id);
    }

    createGuia(guia: any): any {
        return this.http.post<any>(`${environment.apiBase}` + 'guia-remision/create', guia);
    }

    anularGuia(id: number):any {
        return this.http.get<any>(`${environment.apiBase}` + 'guia-remision/annul/' + id);
    }

    enviarGuia(guia: any): any {
        return this.http.post<any>(`${environment.apiFacturacion}` + 'despatch/send?token=123456', guia);
    }

    getGuiaInvoice(guia: any): any{
        return this.http.post<any>(`${environment.apiFacturacion}` + 'despatch/pdf?token=123456', guia, {
            responseType: "blob" as "json"
        });
    }

    cambiarEstado(id: number):any {
        return this.http.get<any>(`${environment.apiBase}` + 'guia-remision/changeStateEnvio/' + id);
    }
    
}
