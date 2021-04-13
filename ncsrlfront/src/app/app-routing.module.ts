import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@app/_general/guards/auth.guard';

import { LayoutComponent } from './home/presentation/layout/layout.component';
import { DashboardComponent } from './dashboard/presentation/dashboard/dashboard.component';
import { LoginComponent } from './home/presentation/login/login.component';
import { SignupComponent } from './home/presentation/signup/signup.component';
import { ServerErrorComponent } from './home/presentation/server-error/server-error.component';
import { NotFoundComponent } from './home/presentation/not-found/not-found.component';
import { AccessDeniedComponent } from './home/presentation/access-denied/access-denied.component';
import { ProductosComponent } from './inventario/presentation/productos/productos.component';
import { RegistroIngresoComponent } from './registro-ingreso/presentation/registro-ingreso/registro-ingreso.component'
import { KardexComponent } from './kardex/presentacion/kardex.component'
import { RegistroIngresoFormComponent } from './registro-ingreso/presentation/registro-ingreso-form/registro-ingreso-form.component'
import { FacturacionComponent } from './facturacion/presentation/facturacion/facturacion.component';
import { ColaboradorComponent} from './usuarios/presentation/colaborador/colaborador.component';
import { ClienteComponent} from './clientes/presentacion/cliente.component';
import { ProveedorComponent} from './proveedores/presentacion/proveedor.component';
import { ProyectosComponent } from './proyectos/presentation/proyectos/proyectos.component';
import { LogsComponent } from './registro-cambios/presentacion/logs/logs.component';
import { TablasReferencialesComponent } from './tablas-referenciales/presentacion/tablas-referenciales/tablas-referenciales.component';
import { ChangePasswordComponent } from './home/presentation/change-password/change-password.component';
import { EmpresaComponent } from './empresa/presentation/empresa/empresa.component';
import { CotizacionesComponent } from './cotizaciones-cli/presentation/cotizaciones/cotizaciones.component';
import { CotizacionesFormComponent } from './cotizaciones-cli/presentation/cotizaciones-form/cotizaciones-form.component';
import { CotizacionesProvComponent } from './cotizaciones-prov/presentation/cotizaciones/cotizaciones.component';
import { CotizacionesProvFormComponent } from './cotizaciones-prov/presentation/cotizaciones-form/cotizaciones-form.component';
import { ProformaComponent } from './proforma/presentacion/proforma/proforma.component';
import { ProformaFormComponent } from './proforma/presentacion/proforma-form/proforma-form.component';
import { OrdenCompraFormComponent } from './orden-compra/presentacion/orden-compra-form/orden-compra-form.component';
import { OrdenCompraComponent } from './orden-compra/presentacion/orden-compra/orden-compra.component';
import { OrdenCompraCliComponent } from './orden-compra-cli/presentacion/orden-compra-cli/orden-compra-cli.component';
import { OrdenCompraCliFormComponent } from './orden-compra-cli/presentacion/orden-compra-cli-form/orden-compra-cli-form.component';
import { FinanzasComponent } from './finanzas/presentation/finanzas/finanzas.component'
import { FinanzasFormComponent } from './finanzas/presentation/finanzas-form/finanzas-form.component'
import { FirmaComponent } from './home/presentation/firma/firma.component';
import { GuiaRemisionComponent } from './guia-remision/presentacion/guia-remision/guia-remision.component';
import { GuiaRemisionFormComponent } from './guia-remision/presentacion/guia-remision-form/guia-remision-form.component';
import { BoletaFacturaFormComponent } from './boleta-factura/presentacion/boleta-factura-form/boleta-factura-form.component';
import { BoletaFacturaComponent } from './boleta-factura/presentacion/boleta-factura/boleta-factura.component';

//const routes: Routes = [];
// const routes: Routes = [
//   { path: '', loadChildren: './layout/layout.module#LayoutModule', canActivate: [AuthGuard] },
//   { path: 'login', loadChildren: './login/login.module#LoginModule' },
//   { path: 'signup', loadChildren: './signup/signup.module#SignupModule' },
//   { path: 'error', loadChildren: './server-error/server-error.module#ServerErrorModule' },
//   { path: 'access-denied', loadChildren: './access-denied/access-denied.module#AccessDeniedModule' },
//   { path: 'not-found', loadChildren: './not-found/not-found.module#NotFoundModule' },
//   { path: '**', redirectTo: 'not-found' }
// ];

const cotizacionesRoutes: Routes = [
  { path: '', component: CotizacionesComponent, data: { title: 'Cotizaciones/Cliente'} },
  { path: 'form/:codproyecto', component: CotizacionesFormComponent, data: { title: 'Cotizaciones/Nueva Cotizacion' } }
];

const cotizacionesProvRoutes: Routes = [
  { path: '', component: CotizacionesProvComponent, data: { title: 'Cotizaciones/Proveedor'} },
  { path: 'form/:codigo', component: CotizacionesProvFormComponent, data: { title: 'Cotizaciones/Proveedor/Nueva Cotizacion'} }
];

const proformaRoute: Routes = [
  { path: '', component: ProformaComponent, data: { title: 'Cotizaciones/Proforma'} },
  { path: 'form/:codigo', component: ProformaFormComponent, data: { title: 'Cotizaciones/Proforma/Nueva Proforma'} }
];

const ordenesCompraRoutes: Routes = [
  { path: '', component: OrdenCompraComponent, data: { title: 'Ordenes de Compra'} },
  { path: 'form/:codigo', component: OrdenCompraFormComponent, data: { title: 'Orden de Compra'} }
];

const ordenCompraCliRoutes: Routes = [
  { path: '', component: OrdenCompraCliComponent, data: { title: 'Orden de Compra'} },
  { path: 'form/:codigo', component: OrdenCompraCliFormComponent, data: { title: 'Orden de Compra/Nueva Orden de Compra'} }
];

const registroIngresoRoutes: Routes = [
  { path: '', component: RegistroIngresoComponent, data: { title: 'Inventario/Registro Ingreso'} },
  { path: 'form/:codreg', component: RegistroIngresoFormComponent, data: { title: 'Inventario/Registro de Ingreso/Nuevo Registro'} }
];

const finanzasRoutes: Routes = [
  { path: '', component: FinanzasComponent, data: { title: 'Finanzas'} },
  { path: 'form/:codfin', component: FinanzasFormComponent, data: { title: 'Finanzas/Registro de Gasto'} }
];

const guiaRemisionRoutes: Routes = [
  { path: '', component: GuiaRemisionComponent, data: { title: 'Guia de Remision'} },
  { path: 'form/:codigo', component: GuiaRemisionFormComponent, data: { title: 'Guia de Remision'} }
];

const facturasRoutes: Routes = [
  { path: '', component: BoletaFacturaComponent, data: { title: 'Facturas'} },
  { path: 'form/:codigo', component: BoletaFacturaFormComponent, data: { title: 'Facturas/Crear Factura'} }
];

const routes: Routes = [
	{
    path: "", redirectTo: "dashboard", pathMatch: "full"
  },
  { 
    path: 'login',
    component: LoginComponent
  },
  { 
    path: 'signup',
    component: SignupComponent
  },
  { 
    path: 'access-denied',
    component: AccessDeniedComponent
  },
  { 
    path: 'error',
    component: ServerErrorComponent
  },
  { 
    path: 'not-found',
    component: NotFoundComponent
  },
  {
		path: "",
    component: LayoutComponent,
    canActivate: [AuthGuard],
    data: {title: "Home"},
    children: [
      {path: "dashboard", component: DashboardComponent, data: {title: "Inicio"}},
      {path: "productos", component: ProductosComponent, data: {title: "Inventario/Productos"}},
      {path: "kardex", component: KardexComponent, data: {title: "Inventario/Kardex"}},
      {path: "facturacion", component: FacturacionComponent, data: {title: "Facturacion"}},
      {path: "colaborador", component: ColaboradorComponent, data: {title: "Usuarios/Colaborador"}},
      {path: "clientes", component: ClienteComponent, data: {title: "Clientes"}},
      {path: "proveedores", component: ProveedorComponent, data: {title: "Proveedores"}},
      {path: "proyectos", component: ProyectosComponent, data: {title: "Proyectos"}},
      {path: "cotizaciones-cli", children: cotizacionesRoutes},
      {path: "cotizaciones-prov", children: cotizacionesProvRoutes},

      {path: "proforma", children: proformaRoute},
      {path: "orden", children: ordenesCompraRoutes},
      {path: "ordenCompraCli", children: ordenCompraCliRoutes},
      {path: "guia-remision", children: guiaRemisionRoutes},
      {path: "registro-ingreso", children: registroIngresoRoutes},
      {path: "finanzas", children: finanzasRoutes},
      {path: "tablas-referenciales", component: TablasReferencialesComponent, data: {title: "Tablas Referenciales"}},
      {path: "logs", component: LogsComponent, data: {title: "Registro de Cambios del Sistema"}},
      {path: "change-password", component: ChangePasswordComponent, data: {title: "Cambio de contraseña"}},
      {path: "firma", component: FirmaComponent, data: {title: "Gestionar firma"}},
      {path: "empresa", component: EmpresaComponent, data: {title: "Datos Empresa"}},
      
      {path: "facturas", children: facturasRoutes},
      
      //{path: "proforma", component: ProformaComponent, data: {title: "Proforma"}},

    ]
  },
  { 
    path: '**', 
    redirectTo: 'not-found' 
  },
]


@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
