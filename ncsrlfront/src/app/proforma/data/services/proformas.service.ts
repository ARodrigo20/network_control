import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GeneralCollection } from '@app/_general/models/general-collection.model';
import { Proformas, ProformasJSON } from '../models/proforma.model';
import { environment } from "@environments/environment";

@Injectable({
    providedIn: 'root'
})
export class ProformasService {

    constructor(private http: HttpClient) { }

    getProformas(param: void): Observable<GeneralCollection<Proformas>> {
        return this.http.get<GeneralCollection<Proformas>>(`${environment.apiBase}` + 'proforma-cliente/get');
    }
    getProforma(id: number): Observable<Proformas> {
        return this.http.get<Proformas>(`${environment.apiBase}` + 'proforma-cliente/get/' + id);
    }
   
    createProforma(proforma: any): any {
        return this.http.post<any>(`${environment.apiBase}` + 'proforma-cliente/create', proforma);
    }

    updateProforma(proforma: any): any {
        return this.http.post<any>(`${environment.apiBase}` + 'proforma-cliente/update/' + proforma.id_pro, proforma);
    }
        
    anularProforma(id: number):any {
        return this.http.get<any>(`${environment.apiBase}` + 'proforma-cliente/annul/' + id);
    }
    updateProformaCab(proform: Proformas): any {
        return this.http.post<any>(`${environment.apiBase}` + 'proforma-cliente/update-header/' + proform.id_pro, proform);
    }
    updateProformaDet(proform: Proformas): any {
        return this.http.post<any>(`${environment.apiBase}` + 'proforma-cliente/update-detail/' + proform.proforma_detalle, proform);
    }
}
