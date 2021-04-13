import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GeneralCollection } from '@app/_general/models/general-collection.model';
import { environment } from "@environments/environment";
import { Factura } from "@app/boleta-factura/data/models/factura.model"

@Injectable({
    providedIn: 'root'
})
export class FacturaService {

    constructor(private http: HttpClient) { }

    sendInvoice(factura: any): any {
        return this.http.post<any>(`${environment.apiFacturacion}` + 'invoice/send?token=123456', factura);
    }

    getPdfInvoice(factura: any): any {
   
        return this.http.post<any>(`${environment.apiFacturacion}` + 'invoice/pdf?token=123456', factura, {
            responseType: "blob" as "json"
        });
    }
    // getGUiaInvoice(guia: any): any {
   
    //     return this.http.post<any>(`${environment.apiFacturacion}` + 'despatch/pdf?token=123456', guia, {
    //         responseType: "blob" as "json"
    //     });
    // }

    crearFactura(factura: any): any {
        return this.http.post<any>(`${environment.apiBase}` + 'factura/create', factura);
    }

    getFacturas(param: void): Observable<GeneralCollection<Factura>> {
        return this.http.get<GeneralCollection<Factura>>(`${environment.apiBase}` + 'factura/get');
    }

    updateEstadoEnvio(id: number, body: any) {
        return this.http.post<any>(`${environment.apiBase}` + 'factura/update-estado/'+ id, body);
    }
}
