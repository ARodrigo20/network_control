<?php

namespace App\Http\Controllers\Facturacion;

use App\Http\Controllers\Controller;
use App\Models\Almacen\Producto;
use App\Models\Facturacion\Factura;
use App\Models\Facturacion\FacturaDetalle;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

/**
 * @group Factura
 * APIs para crear factura o boleta internamente
 */

class FacturaController extends Controller
{

    /**
     * Crear Factura
     *
     * Crea una guia de remision de transporte
     *
     * @bodyParam tipoDoc string 1,
     * @bodyParam serie string F001,
     * @bodyParam solcli_id id id de solicitud de cotizacion cliente,
     * @bodyParam id_cli id id del cliente,
     * @bodyParam tipoMoneda string Codigo de moneda,
     * @bodyParam sumOtrosCargos float Monto en Otros cargos,
     * @bodyParam mtoOperGravadas float Monto en Operaciones Gravadas,
     * @bodyParam mtoOperInafecta  float Monto en Operaciones Inafectas,
     * @bodyParam mtoOperExoneradas float Monto en Operaciones Exoneradas,
     * @bodyParam mtoOperExportacion float Monto en Operaciones que va a Exportacion,
     * @bodyParam mtoIGV float Monto de igv,
     * @bodyParam mtoISC float 0,
     * @bodyParam mtoOtrosTributos float 0,
     * @bodyParam icbper float 0,
     * @bodyParam mtoImpVenta float Monto imponible,
     * @bodyParam id_legends null Deberia ser un id a otra tabla de legendas,
     * @bodyParam id_guias null Deberia ser un id a otra tabla,
     * @bodyParam id_relDocs null Deberia ser el id de tabla de documentos relacionados,
     * @bodyParam observacion string Observacion del usuario,
     * @bodyParam compra string Valor segun catalogo Sunat,
     * @bodyParam mtoBaseIsc float 0,
     * @bodyParam mtoBaseOth float 0,
     * @bodyParam totalImpuestos float 18,
     * @bodyParam tipoOperacion string Codigo segun sunat,
     * @bodyParam fecVencimiento date Fecha que vence la factura o boleta,
     * @bodyParam sumDsctoGlobal float Sumatoria de descuentos de todos detalley cabecera,
     * @bodyParam mtoDescuentos floar Suma Descuentos detalle,
     * @bodyParam mtoOperGratuitas float Monto de operaciones gratuitas,
     * @bodyParam totalAnticipos float Total en anticipos,
     * @bodyParam id_guiaEmbebida null ID,
     * @bodyParam id_seller null ID,
     * @bodyParam id_direccion_entrega null ID,
     * @bodyParam descuentos float 0,
     * @bodyParam id_cargo null Id,
     * @bodyParam mtoCargos float 0,
     * @bodyParam valorVenta float Valor final que el cliente pagara,
     * @bodyParam est_reg string estado de registro,
     * @bodyParam est_env string estado de envio,
     * @bodyParam detalle_factura array Ejemplo: [{
     *   "unidad": "NIU",
     *    "cantidad": 12,
     *    "codProducto": "string",
     *    "descripcion": "PRODUCTO 1",
     *    "mtoValorUnitario": 100,
     *    "igv": 18,
     *    "tipAfeIgv": "10",
     *    "mtoPrecioUnitario": 118,
     *    "mtoValorVenta": 100,
     *    "codProdSunat":"string",
     *    "codProdGS1": "string",
     *    "descuento": 0,
     *    "isc" : 0,
     *    "tipSisIsc" : "string",
     *    "totalImpuestos": 18,
     *    "mtoValorGratuito": 0,
     *    "mtoBaseIgv": 0,
     *    "porcentajeIgv":0,
     *    "mtoBaseIsc": 0,
     *    "porcentajeIsc": 0,
     *    "mtoBaseOth": 0,
     *    "porcentajeOth": 0,
     *    "otroTributo": 0,
     *    "icbper": 0,
     *    "factorIcbper":0,
     *    "id_prod": 1,
     *    "est_reg": "A"
     *  }
     *]
     * @response {
     *    "resp": "Factura creada"
     * }
     */
    public function create(Request $request)
    {
        DB::beginTransaction();
        $envio = null;

        try {

            $factura = Factura::create([

                'tipoDoc' => $request->input('tipoDoc'),
                'serie' => $request->input('serie'),
                'correlativo' => $this->next_cod(),
                'fechaEmision' => new DateTime(),
                'solcli_id' => $request->input('solcli_id'),
                'id_cli' => $request->input('id_cli'),
                'id_emp' => 1,
                'tipoMoneda' => $request->input('tipoMoneda'),
                'sumOtrosCargos' => $request->input('sumOtrosCargos'),
                'mtoOperGravadas' => $request->input('mtoOperGravadas'),
                'mtoOperInafectas' => $request->input('mtoOperInafectas'),
                'mtoOperExoneradas' => $request->input('mtoOperExoneradas'),
                'mtoOperExportacion' => $request->input('mtoOperExportacion'),
                'mtoIGV' => $request->input('mtoIGV'),
                'mtoISC' => $request->input('mtoISC'),
                'mtoOtrosTributos' => $request->input('mtoOtrosTributos'),
                'icbper' => $request->input('icbper'),
                'mtoImpVenta' => $request->input('mtoImpVenta'),
                //'id_legends'=> $request->input('tipoDoc'),
                'id_guias' => $request->input('id_guias'),
                'id_relDocs' => $request->input('id_relDocs'),
                'observacion' => $request->input('observacion'),
                'compra' => $request->input('compra'),
                'mtoBaseIsc' => $request->input('mtoBaseIsc'),
                'mtoBaseOth' => $request->input('mtoBaseOth'),
                'totalImpuestos' => $request->input('totalImpuestos'),
                'ublVersion' => 2.0,
                'tipoOperacion' => $request->input('tipoOperacion'),
                'fecVencimiento' => $request->input('fecVencimiento'),
                'sumDsctoGlobal' => $request->input('sumDsctoGlobal'),
                'mtoDescuentos' => $request->input('mtoDescuentos'),
                'mtoOperGratuitas' => $request->input('mtoOperGratuitas'),
                'totalAnticipos' => $request->input('totalAnticipos'),
                'id_guiaEmbebida' => $request->input('id_guiaEmbebida'),
                'id_seller' => null,
                'id_direccion_entrega' => null,
                'descuentos' => $request->input('descuentos'),
                'id_cargo' => null,
                'mtoCargos' => $request->input('mtoCargos'),
                'valorVenta' => $request->input('valorVenta'),
                // 'observaciones'=> $request->input('observaciones'),
                'est_reg' => $request->input('est_reg'),
                'est_env' => $request->input('est_env'),
            ]);

            $detalles_factura = $request->input('detalle_factura');

            if ($detalles_factura) {
                foreach ($detalles_factura as $detalle) {
                    $facturaDet = FacturaDetalle::create([
                        'id_factura' => $factura->id_factura,
                        'unidad' => $detalle['unidad'],
                        'cantidad' => $detalle['cantidad'],
                        'codProducto' => $detalle['codProducto'],
                        'codProdSunat' => $detalle['codProdSunat'],
                        'codProdGS1' => $detalle['codProdGS1'],
                        'descripcion' => $detalle['descripcion'],
                        'mtoValorUnitario' => $detalle['mtoValorUnitario'],
                        'descuento' => $detalle['descuento'],
                        'igv' => $detalle['igv'],
                        'tipAfeIgv' => $detalle['tipAfeIgv'],
                        'isc' => $detalle['isc'],
                        'tipSisIsc' => $detalle['tipSisIsc'],
                        'totalImpuestos' => $detalle['totalImpuestos'],
                        'mtoPrecioUnitario' => $detalle['mtoPrecioUnitario'],
                        'mtoValorVenta' => $detalle['mtoValorVenta'],
                        'mtoValorGratuito' => $detalle['mtoValorGratuito'],
                        'mtoBaseIgv' => $detalle['mtoBaseIgv'],
                        'porcentajeIgv' => $detalle['porcentajeIgv'],
                        'mtoBaseIsc' => $detalle['mtoBaseIsc'],
                        'porcentajeIsc' => $detalle['porcentajeIsc'],
                        'mtoBaseOth' => $detalle['mtoBaseOth'],
                        'porcentajeOth' => $detalle['porcentajeOth'],
                        'otroTributo' => $detalle['otroTributo'],
                        'icbper' => $detalle['icbper'],
                        'factorIcbper' => $detalle['factorIcbper'],
                        'id_prod' => $detalle['id_prod'],
                        'est_reg' => $detalle['est_reg'],

                    ]);
                }
            }

            DB::commit();

        } catch (Exception $e) {
            DB::rollBack();
            return response()->json([
                'error' => 'ocurrio un error en el servidor',
                'desc' => $e,
            ], 500);
        }

        return response()->json([
            'resp' => 'Factura creada',
        ], 200, [], JSON_NUMERIC_CHECK);
    }

    /**
     * Retornar  facturas
     *
     * Retorna todas las factura sin ningun filtro adicional
     *
     *
     * @response {
     *  "data": [
     *  {
     *       "id_factura": 2,
     *       "tipoDoc": 1,
     *       "serie": "F001",
     *       "correlativo": 1,
     *       "fechaEmision": "2020-12-11 23:59:12",
     *       "solcli_id": null,
     *       "id_cli": 1,
     *       "id_emp": 1,
     *       "tipoMoneda": "PEN",
     *       "sumOtrosCargos": 0,
     *       "mtoOperGravadas": 100,
     *       "mtoOperInafectas": 0,
     *       "mtoOperExoneradas": 0,
     *       "mtoOperExportacion": 0,
     *       "mtoIGV": 18,
     *       "mtoISC": 0,
     *       "mtoOtrosTributos": 0,
     *       "icbper": 0,
     *       "mtoImpVenta": 118,
     *       "id_det_fac": null,
     *       "id_legends": null,
     *       "id_guias": null,
     *       "id_relDocs": null,
     *       "observacion": "my observacion :)",
     *       "compra": null,
     *       "mtoBaseIsc": 0,
     *       "mtoBaseOth": 0,
     *       "totalImpuestos": 18,
     *       "ublVersion": 2,
     *       "tipoOperacion": 1,
     *       "fecVencimiento": "2021-01-20",
     *       "sumDsctoGlobal": 0,
     *       "mtoDescuentos": 0,
     *       "mtoOperGratuitas": 0,
     *       "totalAnticipos": 0,
     *       "id_guiaEmbebida": null,
     *       "id_seller": null,
     *       "id_direccion_entrega": null,
     *       "descuentos": 0,
     *       "id_cargo": null,
     *       "mtoCargos": 0,
     *       "valorVenta": 118,
     *       "observaciones": null,
     *       "est_reg": "A",
     *       "est_env": "P",
     *       "cliente": {
     *           "id_cli": 1,
     *           "razsoc_cli": "LA PRUEBA CLEITNE SAC",
     *           "numdoc_cli": 9842255555,
     *           "ema_cli": "prueba@cliente.com",
     *           "id_tipdoc": 1,
     *           "est_reg": "A",
     *           "tipo_documento": {},
     *           "contactos": {},
     *           "direcciones": {},
     *           "proyectos": {},
     *           "ordenes_compras": {}
     *       },
     *       "factura_det": [
     *           {
     *               "id_det_fac": 1,
     *               "unidad": "NIU",
     *               "cantidad": 12,
     *               "codProducto": "string",
     *               "codProdSunat": "string",
     *               "codProdGS1": "string",
     *               "descripcion": "PRODUCTO 1",
     *               "mtoValorUnitario": 100,
     *               "descuento": 0,
     *               "igv": 18,
     *               "tipAfeIgv": 10,
     *               "isc": 0,
     *               "tipSisIsc": "string",
     *               "totalImpuestos": 18,
     *               "mtoPrecioUnitario": 118,
     *               "mtoValorVenta": 100,
     *               "mtoValorGratuito": 0,
     *               "mtoBaseIgv": 0,
     *               "porcentajeIgv": 0,
     *               "mtoBaseIsc": 0,
     *               "porcentajeIsc": 0,
     *               "mtoBaseOth": 0,
     *               "porcentajeOth": 0,
     *               "otroTributo": 0,
     *               "icbper": 0,
     *               "factorIcbper": 0,
     *               "est_reg": "A",
     *               "id_factura": 2,
     *               "id_prod": 1,
     *               "producto": {
     *                   "id_prod": 1,
     *                   "cod_prod": 2121312,
     *                   "num_parte_prod": 1,
     *                   "stk_prod": 0,
     *                   "des_prod": "desarmador 3 pulgadas",
     *                   "pre_com_prod": 125,
     *                   "mon_prod": null,
     *                   "id_unimed": null,
     *                   "id_mar": null,
     *                   "id_mod": null,
     *                   "id_fab": null,
     *                   "est_reg": "A",
     *                   "marca": null,
     *                   "modelo": {},
     *                   "fabricante": {},
     *                   "unidad_medida": null
     *               }
     *           }
     *       ]
     *   }
     * ],
     * "size":0
     * }
     */

    public function get()
    {
        try {
            $factura = Factura::with(['factura_det', 'cliente'])->orderBy('id_factura', 'desc')->get();
        } catch (Exception $e) {
            return response()->json([
                'error' => 'Ocurrio un error en el servidor',
                'desc' => $e,
            ], 500);
        }
        return response()->json([
            'data' => $factura,
            'size' => count($factura),
        ], 200, [], JSON_NUMERIC_CHECK);
    }

    /**
     * Retornar una factura
     *
     * Retorna una factura por medio de su Id
     *
     * @urlParam  id required El ID de la factura cabecera
     *
     * @response {
     *  "data": [
     *  {
     *       "id_factura": 2,
     *       "tipoDoc": 1,
     *       "serie": "F001",
     *       "correlativo": 1,
     *       "fechaEmision": "2020-12-11 23:59:12",
     *       "solcli_id": null,
     *       "id_cli": 1,
     *       "id_emp": 1,
     *       "tipoMoneda": "PEN",
     *       "sumOtrosCargos": 0,
     *       "mtoOperGravadas": 100,
     *       "mtoOperInafectas": 0,
     *       "mtoOperExoneradas": 0,
     *       "mtoOperExportacion": 0,
     *       "mtoIGV": 18,
     *       "mtoISC": 0,
     *       "mtoOtrosTributos": 0,
     *       "icbper": 0,
     *       "mtoImpVenta": 118,
     *       "id_det_fac": null,
     *       "id_legends": null,
     *       "id_guias": null,
     *       "id_relDocs": null,
     *       "observacion": "my observacion :)",
     *       "compra": null,
     *       "mtoBaseIsc": 0,
     *       "mtoBaseOth": 0,
     *       "totalImpuestos": 18,
     *       "ublVersion": 2,
     *       "tipoOperacion": 1,
     *       "fecVencimiento": "2021-01-20",
     *       "sumDsctoGlobal": 0,
     *       "mtoDescuentos": 0,
     *       "mtoOperGratuitas": 0,
     *       "totalAnticipos": 0,
     *       "id_guiaEmbebida": null,
     *       "id_seller": null,
     *       "id_direccion_entrega": null,
     *       "descuentos": 0,
     *       "id_cargo": null,
     *       "mtoCargos": 0,
     *       "valorVenta": 118,
     *       "observaciones": null,
     *       "est_reg": "A",
     *       "est_env": "P",
     *       "cliente": {
     *           "id_cli": 1,
     *           "razsoc_cli": "LA PRUEBA CLEITNE SAC",
     *           "numdoc_cli": 9842255555,
     *           "ema_cli": "prueba@cliente.com",
     *           "id_tipdoc": 1,
     *           "est_reg": "A",
     *           "tipo_documento": {},
     *           "contactos": {},
     *           "direcciones": {},
     *           "proyectos": {},
     *           "ordenes_compras": {}
     *       },
     *       "factura_det": [
     *           {
     *               "id_det_fac": 1,
     *               "unidad": "NIU",
     *               "cantidad": 12,
     *               "codProducto": "string",
     *               "codProdSunat": "string",
     *               "codProdGS1": "string",
     *               "descripcion": "PRODUCTO 1",
     *               "mtoValorUnitario": 100,
     *               "descuento": 0,
     *               "igv": 18,
     *               "tipAfeIgv": 10,
     *               "isc": 0,
     *               "tipSisIsc": "string",
     *               "totalImpuestos": 18,
     *               "mtoPrecioUnitario": 118,
     *               "mtoValorVenta": 100,
     *               "mtoValorGratuito": 0,
     *               "mtoBaseIgv": 0,
     *               "porcentajeIgv": 0,
     *               "mtoBaseIsc": 0,
     *               "porcentajeIsc": 0,
     *               "mtoBaseOth": 0,
     *               "porcentajeOth": 0,
     *               "otroTributo": 0,
     *               "icbper": 0,
     *               "factorIcbper": 0,
     *               "est_reg": "A",
     *               "id_factura": 2,
     *               "id_prod": 1,
     *               "producto": {
     *                   "id_prod": 1,
     *                   "cod_prod": 2121312,
     *                   "num_parte_prod": 1,
     *                   "stk_prod": 0,
     *                   "des_prod": "desarmador 3 pulgadas",
     *                   "pre_com_prod": 125,
     *                   "mon_prod": null,
     *                   "id_unimed": null,
     *                   "id_mar": null,
     *                   "id_mod": null,
     *                   "id_fab": null,
     *                   "est_reg": "A",
     *                   "marca": null,
     *                   "modelo": {},
     *                   "fabricante": {},
     *                   "unidad_medida": null
     *               }
     *           }
     *       ]
     *   }
     * ],
     * }
     */
    public function getById($id)
    {
        try {
            $factura = Factura::with(['factura_det', 'cliente'])->find($id);
        } catch (Exception $e) {
            return response()->json([
                'error' => 'ocurrio un error en el servidor',
                'desc' => $e,
            ], 500);
        }

        if ($factura) {
            return response()->json($factura, 200, [], JSON_NUMERIC_CHECK);
        } else {
            return response()->json([
                'resp' => 'No se encontro ninguna guia que coincida',
            ], 500);
        }
    }


    /**
     * Anular factura
     *
     * Anula una factura cabecera solo en nuestro sistema solo deve hacerse antes de ser enviada a la SUNAT sino GG
     *
     * @urlParam  id required El ID de la factura es requerido
     *
     * @response {
     *    "resp": "Factura anulada"
     * }
     */

    public function annul($id)
    {
        try {
            $factura = Factura::find($id);
            $factura->fill(array('est_reg' => 'AN'))->save();
        } catch (Exception $e) {
            return response()->json([
                'error' => 'ocurrio un error en el servidor',
                'desc' => $e,
            ], 500);
        }
       
        return response()->json([
            'resp' => 'Factura Anulada',
        ], 200, [], JSON_NUMERIC_CHECK);
    }

    public function updateEstadoEnvio(Request $request, $id)
    {
        try {
            $factura = Factura::find($id);
            $factura->fill(array('est_env' => $request->input('estado')))->save();
        } catch (Exception $e) {
            return response()->json([
                'error' => 'ocurrio un error en el servidor',
                'desc' => $e,
            ], 500);
        }
       
        return response()->json([
            'resp' => 'Factura Actualizada',
        ], 200, [], JSON_NUMERIC_CHECK);
    }

    public function next_cod()
    {
        $cod_correlativo_max = DB::table('facturas')->max('correlativo');
        if ($cod_correlativo_max == null) {
            $cod_correlativo_max = "1";
        } else {
            $max = intval($cod_correlativo_max) + 1;
            $cod_correlativo_max = $max;
        }
        if (strlen($cod_correlativo_max) == 1) {
            $cod_correlativo_max = "00" . $cod_correlativo_max;
        }
        if (strlen($cod_correlativo_max) == 2) {
            $cod_correlativo_max = "0" . $cod_correlativo_max;
        }

        return $cod_correlativo_max;
    }

}
