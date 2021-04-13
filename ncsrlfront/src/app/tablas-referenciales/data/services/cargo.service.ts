import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GeneralCollection } from '@app/_general/models/general-collection.model';
import { environment } from "@environments/environment";
import { Cargo } from '../models/cargo.model';

@Injectable({
    providedIn: 'root'
})
export class CargoService {

    constructor(private http: HttpClient) { }

    getCargo(param: void): Observable<GeneralCollection<Cargo>> {
        return this.http.get<GeneralCollection<Cargo>>(`${environment.apiBase}` + 'usuarios/cargos/get');
    }

    createCargo(cargo: Cargo): any {
        return this.http.post<any>(`${environment.apiBase}` + 'usuarios/cargos/create', cargo);
    }

    updateCargo(cargo: Cargo): any {
        return this.http.post<any>(`${environment.apiBase}` + 'usuarios/cargos/update/' + cargo.id_car, cargo);
    }

    deleteCargo(id: number):any {
        return this.http.get<any>(`${environment.apiBase}` + 'usuarios/cargos/delete/' + id);
    }

}
