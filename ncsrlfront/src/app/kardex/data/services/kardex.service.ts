import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GeneralCollection } from '@app/_general/models/general-collection.model';
import { environment } from "@environments/environment";
import { Kardex, KardexJSON } from '@app/kardex/data/models/kardex.model';

@Injectable({
    providedIn: 'root'
})
export class KardexService {

    constructor(private http: HttpClient) { }

    createKardex(kardexJSON: KardexJSON): any {
        return this.http.post<any>(`${environment.apiBase}` + 'kardex/create', kardexJSON);
    }
    getKardex(param: void): Observable<GeneralCollection<Kardex>> {
        return this.http.get<GeneralCollection<Kardex>>(`${environment.apiBase}` + 'kardex/get');
    }
    getKardexJSON(param: void): Observable<KardexJSON> {
        return this.http.get<KardexJSON>(`${environment.apiBase}` + 'kardex/get');
    }
    getExcelKardex(param: void): Observable<KardexJSON> {
        return this.http.get<KardexJSON>(`${environment.apiBase}` + 'kardex/getexcel');
    }
}
