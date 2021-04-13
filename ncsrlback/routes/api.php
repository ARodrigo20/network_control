<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });



//Autenticacion
Route::post('register', 'AuthController@register');
Route::post('login', 'AuthController@authenticate');
Route::get('empresa/logo','EmpresaController@getLogo')->name('getLogo');

Route::group(['middleware' => ['jwt.verify']], function() {

    //Logs
    Route::get('logs/get','LogsController@get')->name('getLogs');

    //Almacen

    //Productos
    Route::get('almacen/productos/get','Almacen\ProductoController@get')->name('getProductos');
    Route::get('almacen/productos/get/{id}','Almacen\ProductoController@getById')->name('getProducto');
    Route::post('almacen/productos/create','Almacen\ProductoController@create')->name('createProducto');
    Route::post('almacen/productos/update/{id}','Almacen\ProductoController@update')->name('updateProducto');
    Route::get('almacen/productos/delete/{id}','Almacen\ProductoController@delete')->name('deleteProducto');
    //Marcas
    Route::get('almacen/marcas/get','Almacen\MarcaController@get')->name('getMarcas');
    Route::get('almacen/marcas/get/{id}','Almacen\MarcaController@getById')->name('getMarca');
    Route::post('almacen/marcas/create','Almacen\MarcaController@create')->name('createMarca');
    Route::post('almacen/marcas/update/{id}','Almacen\MarcaController@update')->name('updateMarca');
    Route::get('almacen/marcas/delete/{id}','Almacen\MarcaController@delete')->name('deleteMarca');
    //Modelos
    Route::get('almacen/modelos/get','Almacen\ModeloController@get')->name('getModelos');
    Route::get('almacen/modelos/get/{id}','Almacen\ModeloController@getById')->name('getModelo');
    Route::post('almacen/modelos/create','Almacen\ModeloController@create')->name('createModelo');
    Route::post('almacen/modelos/update/{id}','Almacen\ModeloController@update')->name('updateModelo');
    Route::get('almacen/modelos/delete/{id}','Almacen\ModeloController@delete')->name('deleteModelo');
    //Fabricantes
    Route::get('almacen/fabricantes/get','Almacen\FabricanteController@get')->name('getFabricantes');
    Route::get('almacen/fabricantes/get/{id}','Almacen\FabricanteController@getById')->name('getFabricante');
    Route::post('almacen/fabricantes/create','Almacen\FabricanteController@create')->name('createFabricante');
    Route::post('almacen/fabricantes/update/{id}','Almacen\FabricanteController@update')->name('updateFabricante');
    Route::get('almacen/fabricantes/delete/{id}','Almacen\FabricanteController@delete')->name('deleteFabricante');
    //Unidades de Medida
    Route::get('almacen/unidadesmedida/get','Almacen\UnidadMedidaController@get')->name('getUnidadesMedida');
    Route::get('almacen/unidadesmedida/get/{id}','Almacen\UnidadMedidaController@getById')->name('getUnidadMedida');
    Route::post('almacen/unidadesmedida/create','Almacen\UnidadMedidaController@create')->name('createUnidadMedida');
    Route::post('almacen/unidadesmedida/update/{id}','Almacen\UnidadMedidaController@update')->name('updateUnidadMedida');
    Route::get('almacen/unidadesmedida/delete/{id}','Almacen\UnidadMedidaController@delete')->name('deleteUnidadMedida');


    ///Usuarios
    //Tipos de Documento
    Route::get('usuarios/tiposdoc/get','Usuarios\TipoDocumentoController@get')->name('getTiposDocumento');
    Route::get('usuarios/tiposdoc/get/{id}','Usuarios\TipoDocumentoController@getById')->name('getTipoDocumento');
    Route::post('usuarios/tiposdoc/create','Usuarios\TipoDocumentoController@create')->name('createTipoDocumento');
    Route::post('usuarios/tiposdoc/update/{id}','Usuarios\TipoDocumentoController@update')->name('updateTipoDocumento');
    Route::get('usuarios/tiposdoc/delete/{id}','Usuarios\TipoDocumentoController@delete')->name('deleteTipoDocumento');

    //Cargos
    Route::get('usuarios/cargos/get','Usuarios\CargoController@get')->name('getCargos');
    Route::get('usuarios/cargos/get/{id}','Usuarios\CargoController@getById')->name('getCargo');
    Route::post('usuarios/cargos/create','Usuarios\CargoController@create')->name('createCargo');
    Route::post('usuarios/cargos/update/{id}','Usuarios\CargoController@update')->name('updateCargo');
    Route::get('usuarios/cargos/delete/{id}','Usuarios\CargoController@delete')->name('deleteCargo');

    //Usuarios
    Route::get('usuarios/get','Usuarios\UserController@get')->name('getUsers');
    Route::get('usuarios/get/{id}','Usuarios\UserController@getById')->name('getUser');
    Route::post('usuarios/create','Usuarios\UserController@create')->name('createUser');
    Route::post('usuarios/update/{id}','Usuarios\UserController@update')->name('updateUser');
    Route::get('usuarios/delete/{id}','Usuarios\UserController@delete')->name('deleteUser');
    Route::post('usuarios/update/password/{id}','Usuarios\UserController@updatePassword')->name('updatePassword');
    Route::get('usuarios/firma/{id}','Usuarios\UserController@getFirma')->name('getFirma');
    Route::post('usuarios/update-firma','Usuarios\UserController@updateFirma')->name('updateFirma');

    //Clientes
    Route::get('clientes/get','Clientes\ClienteController@get')->name('getClientes');
    Route::get('clientes/get/{id}','Clientes\ClienteController@getById')->name('getCliente');
    Route::post('clientes/create','Clientes\ClienteController@create')->name('createCliente');
    Route::post('clientes/update/{id}','Clientes\ClienteController@update')->name('updateCliente');
    Route::get('clientes/delete/{id}','Clientes\ClienteController@delete')->name('deleteCliente');
    Route::post('clientes/admconydir/{id}','Clientes\ClienteController@admContactosYdirecciones')->name('admContYdirecsCliente');
    Route::post('clientes/createContacto','Clientes\ClienteController@createContacto')->name('createContacto');
    Route::post('clientes/createDireccion','Clientes\ClienteController@createDireccion')->name('createDireccion');

    //Proveedores
    Route::get('proveedores/get','Proveedores\ProveedorController@get')->name('getProveedores');
    Route::get('proveedores/get/{id}','Proveedores\ProveedorController@getById')->name('getProveedor');
    Route::post('proveedores/create','Proveedores\ProveedorController@create')->name('createProveedor');
    Route::post('proveedores/update/{id}','Proveedores\ProveedorController@update')->name('updateProveedor');
    Route::get('proveedores/delete/{id}','Proveedores\ProveedorController@delete')->name('deleteProveedor');
    Route::post('proveedores/admbancolydir/{id}','Proveedores\ProveedorController@admBancosColaboradoresYdirecciones')->name('admBanColYdirecsProveedor');


    //Proveedores-Direcciones

    Route::get('proveedores-direccion/get','Proveedores\ProveedorDireccionController@get')->name('getProveedoresDireccion');
    Route::get('proveedores-direccion/get/{id}','Proveedores\ProveedorDireccionController@getById')->name('getProveedorDireccion');
    Route::post('proveedores-direccion/update/{id}','Proveedores\ProveedorDireccionController@update')->name('updateProveedorDireccion');
    Route::post('proveedores-direccion/create','Proveedores\ProveedorDireccionController@create')->name('createProveedorDireccion');
    Route::get('proveedores-direccion/delete/{id}','Proveedores\ProveedorDireccionController@delete')->name('deleteProveedorDireccion');

    //Proveedores-Colaborador
    Route::get('proveedores-colaborador/get','Proveedores\ProveedorColaboradorController@get')->name('getProveedoresColaborador');
    Route::get('proveedores-colaborador/get/{id}','Proveedores\ProveedorColaboradorController@getById')->name('getProveedorColaborador');
    Route::post('proveedores-colaborador/create','Proveedores\ProveedorColaboradorController@create')->name('createProveedorColaborador');
    Route::post('proveedores-colaborador/update/{id}','Proveedores\ProveedorColaboradorController@update')->name('updateProveedorColaborador');
    Route::get('proveedores-colaborador/delete/{id}','Proveedores\ProveedorColaboradorController@delete')->name('deleteProveedorColaborador');

    //Proveedores-Banco
    Route::get('proveedores-banco/get','Proveedores\ProveedorBancoController@get')->name('getProveedoresBanco');
    Route::get('proveedores-banco/get/{id}','Proveedores\ProveedorBancoController@getById')->name('getProveedorBanco');
    Route::post('proveedores-banco/create','Proveedores\ProveedorBancoController@create')->name('createProveedorBanco');
    Route::post('proveedores-banco/update/{id}','Proveedores\ProveedorBancoController@update')->name('updateProveedorBanco');
    Route::get('proveedores-banco/delete/{id}','Proveedores\ProveedorBancoController@delete')->name('deleteProveedorBanco');



    //Proyecto
    Route::get('proyecto/get','ProyectoController@get')->name('getProyectos');
    Route::get('proyecto/getTerminados','ProyectoController@getTerminados')->name('getProyectosTerminados');
    Route::get('proyecto/getProceso','ProyectoController@getProceso')->name('getProyectosProceso');
    Route::get('proyecto/get/{id}','ProyectoController@getById')->name('getProyecto');
    Route::post('proyecto/create','ProyectoController@create')->name('createProyecto');
    Route::post('proyecto/update/{id}','ProyectoController@update')->name('updateProyecto');
    Route::get('proyecto/delete/{id}','ProyectoController@delete')->name('deleteProyecto');

    //Empresa
    Route::post('empresa/update','EmpresaController@update')->name('updateEmpresa');
    Route::get('empresa/get','EmpresaController@get')->name('getEmpresa');

    //Cotizacion cliente
    Route::get('cotizacion-cliente/get','CotizacionCliente\CotizacionClienteController@get')->name('getCotizacionesCliente');
    Route::get('cotizacion-cliente/get/{id}','CotizacionCliente\CotizacionClienteController@getById')->name('getCotizacionCliente');
    Route::post('cotizacion-cliente/create','CotizacionCliente\CotizacionClienteController@create')->name('createCotizacionCliente');
    Route::get('cotizacion-cliente/annul/{id}','CotizacionCliente\CotizacionClienteController@annul')->name('annulCotizacionCliente');
    Route::post('cotizacion-cliente/update-header/{id}','CotizacionCliente\CotizacionClienteController@updateHeaderCotizacionCliente')->name('updateHeaderCotizacionCliente');
    Route::post('cotizacion-cliente/update-detail/{id}','CotizacionCliente\CotizacionClienteController@updateDetailCotizacionCliente')->name('updateDetailCotizacionCliente');
    Route::post('cotizacion-cliente/update-complete/{id}','CotizacionCliente\CotizacionClienteController@updateComplete')->name('updateCompleteCotizacionCliente');

    //Proforma cliente
    Route::get('proforma-cliente/get','ProformaCliente\ProformaClienteController@get')->name('getProformasCliente');
    Route::get('proforma-cliente/get/{id}','ProformaCliente\ProformaClienteController@getById')->name('getProformaCliente');
    Route::post('proforma-cliente/create','ProformaCliente\ProformaClienteController@create')->name('createProformaliente');
    Route::get('proforma-cliente/annul/{id}','ProformaCliente\ProformaClienteController@annul')->name('annulProformaCliente');
    Route::post('proforma-cliente/update-header/{id}','ProformaCliente\ProformaClienteController@updateHeaderProforma')->name('updateHeaderProforma');
    Route::post('proforma-cliente/update-detail/{id}','ProformaCliente\ProformaClienteController@updateDetailProforma')->name('updateDetailProforma');
    Route::post('proforma-cliente/update/{id}','ProformaCliente\ProformaClienteController@update')->name('updateProforma');

    //Cotizacion proveedor
    Route::get('cotizacion-proveedor/get','CotizacionProveedor\CotizacionProveedorController@get')->name('getCotizacionesProveedor');
    Route::get('cotizacion-proveedor/get/{id}','CotizacionProveedor\CotizacionProveedorController@getById')->name('getCotizacionProveedor');
    Route::post('cotizacion-proveedor/create','CotizacionProveedor\CotizacionProveedorController@create')->name('createCotizacionProveedor');
    Route::get('cotizacion-proveedor/annul/{id}','CotizacionProveedor\CotizacionProveedorController@annul')->name('annulCotizacionProveedor');
    Route::post('cotizacion-proveedor/send/{id}','CotizacionProveedor\CotizacionProveedorController@sendTo')->name('sendCotizacionProveedor');

    //Orden de Compra
    Route::get('orden-compra/get','OrdenCompra\OrdenCompraController@get')->name('getOrdenesDeCompra');
    Route::get('orden-compra/get/{id}','OrdenCompra\OrdenCompraController@getById')->name('getOrdenCompra');
    Route::post('orden-compra/create','OrdenCompra\OrdenCompraController@create')->name('createOrdenCompra');
    Route::get('orden-compra/annul/{id}','OrdenCompra\OrdenCompraController@annul')->name('annulOrdenCompra');

    Route::post('email/send-email','Email\EmailController@sendEmail')->name('sendEmail');

    //Kardex
    Route::get('kardex/get','Kardex\KardexController@get')->name('getKardex');
    Route::get('kardex/getpendiente','Kardex\KardexController@getPendientes')->name('getStatusKardex');
    Route::get('kardex/getpendiente/{id}','Kardex\KardexController@getPendiente')->name('getPendientes');
    Route::get('kardex/getcompleto','Kardex\KardexController@getCompleto')->name('getOrdenCompleto');
    Route::post('kardex/create','Kardex\KardexController@create')->name('createKardex');
    Route::get('kardex/getexcel','Kardex\KardexController@getExcel')->name('getKardexExcel');

    //Seccion para el pdf
    Route::get('seccion/get','Seccion\SeccionController@get')->name('getSecciones');
    Route::get('seccion/get/{id}','Seccion\SeccionController@getById')->name('getSeccion');
    Route::post('seccion/create','Seccion\SeccionController@create')->name('createSeccion');
    Route::post('seccion/update/{id}','Seccion\SeccionController@update')->name('updateSeccion');
    Route::get('seccion/delete/{id}','Seccion\SeccionController@delete')->name('deleteSeccion');

    //gasto
    Route::get('gasto/get','Gasto\GastoController@get')->name('getGastos');
    Route::post('gasto/create','Gasto\GastoController@create')->name('createGasto');
    Route::get('gasto/annul/{id}','Gasto\GastoController@annul')->name('annulGasto');
    Route::get('gasto/get/{id}','Gasto\GastoController@getById')->name('getGasto');
    Route::post('gasto/update/{id}','Gasto\GastoController@update')->name('updateGasto');
    Route::get('gasto/getexcel','Gasto\GastoController@getExcel')->name('getGastosExcel');
    
    //orden compra cliente
    Route::get('orden-compra-cliente/get','OrdenCompra\OrdenCompraClienteController@get')->name('getOrdenesDeCompraCliente');
    Route::get('orden-compra-cliente/get/{id}','OrdenCompra\OrdenCompraClienteController@getById')->name('getOrdenCompraCliente');
    Route::post('orden-compra-cliente/create','OrdenCompra\OrdenCompraClienteController@create')->name('createOrdenCompraCliente');
    Route::get('orden-compra-cliente/annul/{id}','OrdenCompra\OrdenCompraClienteController@annul')->name('annulOrdenCompraCliente');

    // Transportista

    Route::get('transportista/get','Facturacion\TransportistaController@get')->name('getTransportistas');
    Route::get('transportista/get/{id}','Facturacion\TransportistaController@getById')->name('getTransportista');
    Route::post('transportista/create','Facturacion\TransportistaController@create')->name('createTransportista');
    Route::get('transportista/annul/{id}','Facturacion\TransportistaController@annul')->name('annulTransportista');
    Route::post('transportista/update/{id}','Facturacion\TransportistaController@update')->name('updateTransportista');

    // Guia de remision de transporte
    Route::get('guia-remision/get','Facturacion\GuiaRemisionController@get')->name('getGuias');
    Route::get('guia-remision/get/{id}','Facturacion\GuiaRemisionController@getById')->name('getGuia');
    Route::get('guia-remision/changeStateEnvio/{id}','Facturacion\GuiaRemisionController@changeStateEnvio')->name('changeState');
    Route::post('guia-remision/create','Facturacion\GuiaRemisionController@create')->name('createGuia');
    Route::get('guia-remision/annul/{id}','Facturacion\GuiaRemisionController@annul')->name('annulGuia');

   
    // Factura
    Route::get('factura/get','Facturacion\FacturaController@get')->name('getFacturas');
    Route::get('factura/get/{id}','Facturacion\FacturaController@getById')->name('getFactura');
    Route::post('factura/create','Facturacion\FacturaController@create')->name('createFactura');
    Route::get('factura/annul/{id}','Facturacion\FacturaController@annul')->name('annulFactura');
    Route::post('factura/update-estado/{id}','Facturacion\FacturaController@updateEstadoEnvio')->name('updateEstadoFactura');
   
    // Pago
    Route::get('pago/get','Facturacion\PagoController@get')->name('getPagos');
    Route::get('pago/get/{id}','Facturacion\PagoController@getById')->name('getPago');
    Route::post('pago/create','Facturacion\PagoController@create')->name('createPago');
    Route::get('pago/annul/{id}','Facturacion\PagoController@annul')->name('annulPago');
});