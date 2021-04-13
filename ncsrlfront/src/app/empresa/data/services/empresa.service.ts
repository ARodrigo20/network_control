import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { GeneralCollection } from '@app/_general/models/general-collection.model';
// import { Cliente } from '../models/cliente.model';
import { environment } from "@environments/environment";
import { EmpresaFile } from '../models/empresa-file.model';

@Injectable({
    providedIn: 'root'
})
export class EmpresaService {

    constructor(private http: HttpClient) { }

    getEmpresa(param: void): Observable<EmpresaFile> {
        return this.http.get<EmpresaFile>(`${environment.apiBase}` + 'empresa/get');
    }

    updateEmpresa(formData: FormData): Observable<any> {
        return this.http.post<any>(`${environment.apiBase}` + 'empresa/update', formData);
    }

    getLogoEmpresa(): any{
        return this.http.get<any>(`${environment.apiBase}` + 'empresa/logo');
    }
}