import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GeneralCollection } from '@app/_general/models/general-collection.model';
import { Cliente } from '../models/cliente.model';
import { environment } from "@environments/environment";
import { Direccion } from '../models/direccion.model';
import { Contacto } from '../models/contacto.model';

@Injectable({
    providedIn: 'root'
})
export class ClienteService {

    constructor(private http: HttpClient) { }

    getClientes(param: void): Observable<GeneralCollection<Cliente>> {
        return this.http.get<GeneralCollection<Cliente>>(`${environment.apiBase}` + 'clientes/get');
        // return this.http.get<GeneralCollection<Producto>>('/api/productos/');
    }
    getCliente(id: number): Observable<Cliente> {
        return this.http.get<Cliente>(`${environment.apiBase}` + 'clientes/get/' + id);
    }
    createCliente(client: Cliente): any {
        return this.http.post<any>(`${environment.apiBase}` + 'clientes/create', client);
    }
    updateCliente(client: Cliente): any {
        return this.http.post<any>(`${environment.apiBase}` + 'clientes/update/' + client.id_cli, client);
    }
    adminCliente(client: Cliente): any {
        return this.http.post<any>(`${environment.apiBase}` + 'clientes/admconydir/' + client.id_cli, client);
    }
    deleteCliente(id: number):any {
        return this.http.get<any>(`${environment.apiBase}` + 'clientes/delete/' + id);
    }

    createDireccion(direccion: Direccion) {
        return this.http.post<any>(`${environment.apiBase}` + 'clientes/createDireccion', direccion);
    }
    createContacto(contacto: Contacto) {
        return this.http.post<any>(`${environment.apiBase}` + 'clientes/createContacto', contacto);
    }
}