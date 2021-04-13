import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GeneralCollection } from '@app/_general/models/general-collection.model';
import { Gastos } from '@app/finanzas/data/models/gastos.model';
import { environment } from "@environments/environment";
import { GastosExcel } from '../models/gastosExcel.model';

@Injectable({
    providedIn: 'root'
})
export class FinanzasService {

    constructor(private http: HttpClient) { }

    getGastos(param: void): Observable<GeneralCollection<Gastos>> {
        return this.http.get<GeneralCollection<Gastos>>(`${environment.apiBase}` + 'gasto/get');
    }

    getGasto(id: number): Observable<Gastos> {
        return this.http.get<Gastos>(`${environment.apiBase}` + 'gasto/get/' + id);
    }

    createGasto(gasto: Gastos): any {
        return this.http.post<any>(`${environment.apiBase}` + 'gasto/create', gasto);
    }

    updateGasto(gasto: Gastos): any {
        return this.http.post<any>(`${environment.apiBase}` + 'gasto/update/' + gasto.id_gas, gasto);
    }

    anularGasto(id: number):any {
        return this.http.get<any>(`${environment.apiBase}` + 'gasto/annul/' + id);
    }
    getGastosExcel(param: void): Observable<GeneralCollection<GastosExcel>> {
        return this.http.get<GeneralCollection<GastosExcel>>(`${environment.apiBase}` + 'gasto/getexcel');
    }
}
