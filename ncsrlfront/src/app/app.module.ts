//Librerías
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LanguageTranslationModule } from './shared/modules/language-translation/language-translation.module'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared';
import { MessageService } from "primeng/api";
import { ToastModule } from 'primeng/toast';

//Modulos
import { HomeModule } from "./home/home.module";
import { DashboardModule } from "./dashboard/dashboard.module";
import { InventarioModule } from "./inventario/inventario.module";
import { FacturacionModule } from "./facturacion/facturacion.module";
import { UsuariosModule } from "./usuarios/usuarios.module";
import { ClientesModule } from "./clientes/clientes.module";
import { ProveedoresModule } from "./proveedores/proveedores.module";
import { ProyectosModule } from "./proyectos/proyectos.module";
import { RegistroCambiosModule } from "./registro-cambios/registro-cambios.module"
import { EmpresaModule } from "./empresa/empresa.module";

import { CotizacionesModule } from "./cotizaciones-cli/cotizaciones.module"
import { CotizacionesProvModule } from "./cotizaciones-prov/cotizaciones.module"
import { ProformaModule } from "./proforma/proforma.module"
import { OrdenCompraModule } from './orden-compra/orden-compra.module';
import { OrdenCompraCliModule } from './orden-compra-cli/presentacion/orden-compra-cli.module';
import { RegistroIngresoModule } from "./registro-ingreso/registro-ingreso.module"
import { KardexModule } from "./kardex/kardex.module";
import { FinanzasModule } from "./finanzas/finanzas.module";
import { GuiaRemisionModule } from './guia-remision/presentacion/guia-remision.module';
import { BoletaFacturaModule } from './boleta-factura/boleta-factura.module';

import { AuthService } from './_general/services/auth.service';
import { JwtInterceptor } from './_general/interceptors/jwt.interceptor';
import { ErrorInterceptor } from './_general/interceptors/error.interceptor';
import { TablasReferencialesModule } from './tablas-referenciales/tablas-referenciales.module';
import { TableComponent } from './components/table/table.component';


@NgModule({
  declarations: [
    AppComponent,
    TableComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LanguageTranslationModule,
    AppRoutingModule,
    ToastModule,
    HomeModule,
    DashboardModule,
    InventarioModule,
    FacturacionModule,
    UsuariosModule,
    ClientesModule,
    ProveedoresModule,
    ProyectosModule,
    RegistroCambiosModule,
    TablasReferencialesModule,
    EmpresaModule,
    CotizacionesModule,
    CotizacionesProvModule,
    ProformaModule,
    OrdenCompraModule,
    OrdenCompraCliModule,
    RegistroIngresoModule,
    KardexModule,
    FinanzasModule,
    GuiaRemisionModule,
    BoletaFacturaModule,
  ],
  providers: [
    AuthGuard,
    MessageService,
    AuthService,
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
