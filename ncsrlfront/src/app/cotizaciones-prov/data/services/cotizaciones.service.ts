import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GeneralCollection } from '@app/_general/models/general-collection.model';
import { Cotizacion, CotizacionJSON } from '../models/cotizacion.model';
import { environment } from "@environments/environment";

@Injectable({
    providedIn: 'root'
})
export class CotizacionesProvService {

    constructor(private http: HttpClient) { }

    getCotizaciones(param: void): Observable<GeneralCollection<Cotizacion>> {
        return this.http.get<GeneralCollection<Cotizacion>>(`${environment.apiBase}` + 'cotizacion-proveedor/get');
    }
    getCotizacion(id: number): Observable<CotizacionJSON> {
        return this.http.get<CotizacionJSON>(`${environment.apiBase}` + 'cotizacion-proveedor/get/' + id);
    }  
    createCotizacion(cotizacion: any): any {
        return this.http.post<any>(`${environment.apiBase}` + 'cotizacion-proveedor/create', cotizacion);
    }
    anularCotizacion(id: number):any {
        return this.http.get<any>(`${environment.apiBase}` + 'cotizacion-proveedor/annul/' + id);
    }
    enviarCotizacion(id: number):any {
        return this.http.get<any>(`${environment.apiBase}` + 'cotizacion-proveedor/send/' + id);
    }
}
