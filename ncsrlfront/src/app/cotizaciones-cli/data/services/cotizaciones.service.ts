import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GeneralCollection } from '@app/_general/models/general-collection.model';
import { Cotizacion, CotizacionJSON } from '../models/cotizacion.model';
import { environment } from "@environments/environment";
import { CotizacionDetalle } from '../models/cotizacion-detalle.model';

@Injectable({
    providedIn: 'root'
})
export class CotizacionesService {

    constructor(private http: HttpClient) { }

    getCotizaciones(param: void): Observable<GeneralCollection<Cotizacion>> {
        return this.http.get<GeneralCollection<Cotizacion>>(`${environment.apiBase}` + 'cotizacion-cliente/get');
    }
    getCotizacion(id: number): Observable<CotizacionJSON> {
        return this.http.get<CotizacionJSON>(`${environment.apiBase}` + 'cotizacion-cliente/get/' + id);
    }
     
    createCotizacion(cotizacion: any): any {
        return this.http.post<any>(`${environment.apiBase}` + 'cotizacion-cliente/create', cotizacion);
    }
   
    updateCotizacion(cotizacion: any): any {
        return this.http.post<any>(`${environment.apiBase}` + 'cotizacion-cliente/update-complete/' + cotizacion.solcli_id, cotizacion);
    }

    anularCotizacion(id: number):any {
        return this.http.get<any>(`${environment.apiBase}` + 'cotizacion-cliente/annul/' + id);
    }

    updateCotizacionCab(cotizacion: any, id:number): any {
        return this.http.post<any>(`${environment.apiBase}` + 'cotizacion-cliente/update-header/' + id, cotizacion);
    }
    updateCotizacionDet(cotizacion: any, id:number): any {
        return this.http.post<any>(`${environment.apiBase}` + 'cotizacion-cliente/update-detail/' + id, cotizacion);
    }

}
