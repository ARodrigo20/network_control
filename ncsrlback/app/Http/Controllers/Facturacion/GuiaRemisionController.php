<?php

namespace App\Http\Controllers\Facturacion;

use Illuminate\Http\Request;
use App\Models\Facturacion\GuiaRemision;
use App\Models\Facturacion\GuiaRemisionDet;
use App\Models\Facturacion\Transportista;
use App\Models\Facturacion\Envio;
use App\Models\Almacen\Producto;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use DateTime;


/**
 * @group Guia de remision
 * APIs para Guia de remision de transporte
 */
class GuiaRemisionController extends Controller
{
    /**
     * Retornar todas las guias 
     *
     * Retorna todas las guias sin ningun filtro adicional
     *
     *
     * @response {
     *      "data" : [
     *          {
     *      "id_guia_remision": 1,
     *       "tipoDoc": 1,
     *       "serie": "T001",
     *      "correlativo": 1,
     *       "observacion": "observacion xd",
     *      "fechaEmision": "2020-12-11 00:40:01",
     *      "id_emp": 1,
     *      "id_cli": 1,
     *      "id_envio": 4,
     *      "observaciones": null,
     *      "solcli_id": null,
     *      "est_reg": "",
     *      "est_env": "A",
     *      "cliente": {
     *          "id_cli": 1,
     *           "razsoc_cli": "LA PRUEBA CLEITNE SAC",
     *          "numdoc_cli": 9842255555,
     *           "ema_cli": "prueba@cliente.com",
     *          "id_tipdoc": 1,
     *           "est_reg": "A",
     *          "tipo_documento": {},
     *           "contactos": {},
     *          "direcciones": {},
     *           "proyectos": {},
     *          "ordenes_compras": {}
     *      },
     *   "guia_remision_det": [
     *          {
     *               "id_guia_remision_det": 1,
     *              "id_guia_remision": 1,
     *               "codigo": "PROD1",
     *              "descripcion": "PRODUCTO 1",
     *               "unidad": "ZZ",
     *               "cantidad": 2,
     *               "codProdSunat": "P001",
     *               "id_prod": null,
     *               "est_reg": "A",
     *               "producto": null
     *          }
     *      ],
     *       "envio": {
     *          "id_envio": 4,
     *           "codTraslado": 1,
     *           "desTraslado": "VENTA",
     *           "indTransbordo": 0,
     *           "pesoTotal": 10,
     *          "undPesoTotal": "KGM",
     *           "numBultos": 2,
     *          "modTraslado": 1,
     *           "fecTraslado": "2019-09-14 23:21:12",
     *          "numContenedor": "XD-2232",
     *           "codPuerto": 123,
     *          "id_transportista": 1,
     *           "ubigueoLlegada": 4255565,
     *          "direccionLlegada": "Calle los alamos de la molina 3125555",
     *           "ubigueoSalida": 415855,
     *          "direccionSalida": "Via evitamiento KM 42",
     *           "est_reg": "A",
     *           "transportista": {
     *               "id_transportista": 1,
     *               "TipoDoc": 1,
     *               "NumDoc": 72585555865,
     *               "RznSocial": "Mega centro SAC",
     *               "Placa": "vi-412",
     *               "ChoferTipoDoc": 2,
     *               "ChoferDoc": 78528582588,
     *               "est_reg": "A"
     *           }
     *       },
     *       "solicitud_cotizacion_cliente": {}
     *  }
     *          
     *      ],
     *      "size":0
     * }
     */
    public function get()
    {
        try {
            $guia = GuiaRemision::with(['guia_remision_det', 'cliente', 'envio'])->get();
        } catch (Exception $e) {
            return response()->json([
                'error' => 'Ocurrio un error en el servidor',
                'desc' => $e,
            ], 500);
        }
        return response()->json([
            'data' => $guia,
            'size' => count($guia),
        ], 200, [], JSON_NUMERIC_CHECK);
    }

    /**
     * Retornar una guia
     *
     * Retorna una guia de remision por medio de su Id
     *
     * @urlParam  id required El ID de la guia de remision .
     *
     * @response {
     *      "data" : [
     *          {
     *      "id_guia_remision": 1,
     *       "tipoDoc": 1,
     *       "serie": "T001",
     *      "correlativo": 1,
     *       "observacion": "observacion xd",
     *      "fechaEmision": "2020-12-11 00:40:01",
     *      "id_emp": 1,
     *      "id_cli": 1,
     *      "id_envio": 4,
     *      "observaciones": null,
     *      "solcli_id": null,
     *      "est_reg": "",
     *      "est_env": "A",
     *      "cliente": {
     *          "id_cli": 1,
     *           "razsoc_cli": "LA PRUEBA CLEITNE SAC",
     *          "numdoc_cli": 9842255555,
     *           "ema_cli": "prueba@cliente.com",
     *          "id_tipdoc": 1,
     *           "est_reg": "A",
     *          "tipo_documento": {},
     *           "contactos": {},
     *          "direcciones": {},
     *           "proyectos": {},
     *          "ordenes_compras": {}
     *      },
     *   "guia_remision_det": [
     *          {
     *               "id_guia_remision_det": 1,
     *              "id_guia_remision": 1,
     *               "codigo": "PROD1",
     *              "descripcion": "PRODUCTO 1",
     *               "unidad": "ZZ",
     *               "cantidad": 2,
     *               "codProdSunat": "P001",
     *               "id_prod": null,
     *               "est_reg": "A",
     *               "producto": null
     *          }
     *      ],
     *       "envio": {
     *          "id_envio": 4,
     *           "codTraslado": 1,
     *           "desTraslado": "VENTA",
     *           "indTransbordo": 0,
     *           "pesoTotal": 10,
     *          "undPesoTotal": "KGM",
     *           "numBultos": 2,
     *          "modTraslado": 1,
     *           "fecTraslado": "2019-09-14 23:21:12",
     *          "numContenedor": "XD-2232",
     *           "codPuerto": 123,
     *          "id_transportista": 1,
     *           "ubigueoLlegada": 4255565,
     *          "direccionLlegada": "Calle los alamos de la molina 312",
     *           "ubigueoSalida": 415855,
     *          "direccionSalida": "Via evitamiento KM 42",
     *           "est_reg": "A",
     *           "transportista": {
     *               "id_transportista": 1,
     *               "TipoDoc": 1,
     *               "NumDoc": 72585555865,
     *               "RznSocial": "Mega centro SAC",
     *               "Placa": "vi-412",
     *               "ChoferTipoDoc": 2,
     *               "ChoferDoc": 78528582588,
     *               "est_reg": "A"
     *           }
     *       },
     *       "solicitud_cotizacion_cliente": {}
     *  }
     *          
     *      ],
     *          }
     */
    public function getById($id)
    {
        try {
            $guia = GuiaRemision::with(['guia_remision_det', 'cliente', 'envio'])->find($id);
        } catch (Exception $e) {
            return response()->json([
                'error' => 'ocurrio un error en el servidor',
                'desc' => $e,
            ], 500);
        }

        if ($guia) {
            return response()->json($guia, 200, [], JSON_NUMERIC_CHECK);
        } else {
            return response()->json([
                'resp' => 'No se encontro ninguna guia que coincida',
            ], 500);
        }
    }

    /**
     * Crear Guia de remision
     *
     * Crea una guia de remision de transporte
     *      
     * @bodyParam tipoDoc string 1,
     * @bodyParam serie string T001,
     * @bodyParam observacion string Observacion,
     * @bodyParam id_cli id id del cliente,
     * @bodyParam envio array Ejemplo: [{"codTraslado": "01", "desTraslado": "VENTA", "indTransbordo": false, "pesoTotal": 10, "undPesoTotal": "KGM", "numBultos": 2, "modTraslado": "01", "fecTraslado": "2019-09-14T23:21:12+01:00", "numContenedor": "XD-2232", "codPuerto": "123", "id_transportista" : 1, "ubigueoLlegada": "4255565", "direccionLlegada": "Calle los alamos de la molina 312", "ubigueoSalida": "0415855", "direccionSalida" :  "Via evitamiento KM 42", "est_reg": "A" } ],
     * @bodyParam est_reg string estado de registro
     * @bodyParam est_env string estado de envio
     * @bodyParam solcli_id  num  Id de la solicitud de cotizacion cliente,
     * @bodyParam guia_remision_det array Ejemplo:[ {"id_guia_remision_det": 1,"id_guia_remision": 1,"codigo": "PROD1","descripcion": "PRODUCTO 1","unidad": "ZZ","cantidad": 2,"codProdSunat": "P001","id_prod": null,"est_reg": "A"}]
     * @response {
     *    "resp": "Guia de remision  creada"
     * }
     */
    
    public function create(Request $request)
    {
        DB::beginTransaction();
        $envio = null;

        try {
            $det_envio = $request->input('envio');
            if ($det_envio) {
                foreach ($det_envio as $detalle) {
                    $envio = Envio::create([
                        'codTraslado' => $detalle['codTraslado'],
                        'desTraslado' => $detalle['desTraslado'],
                        'indTransbordo' => $detalle['indTransbordo'],
                        'pesoTotal' => $detalle['pesoTotal'],
                        'undPesoTotal' => $detalle['undPesoTotal'],
                        'numBultos' => $detalle['numBultos'],
                        'modTraslado' => $detalle['modTraslado'],
                        'fecTraslado' => $detalle['fecTraslado'],
                        'numContenedor' => $detalle['numContenedor'],
                        'codPuerto' => $detalle['codPuerto'],
                        'id_transportista' => $detalle['id_transportista'],
                        'ubigueoLlegada' => $detalle['ubigueoLlegada'],
                        'direccionLlegada' => $detalle['direccionLlegada'],
                        'ubigueoSalida' => $detalle['ubigueoSalida'],
                        'direccionSalida' => $detalle['direccionSalida'],
                        'est_reg' => $detalle['est_reg'],
                    ]);
                }
            }

            $guiaRemision = GuiaRemision::create([
                'tipoDoc' => $request->input('tipoDoc'),
                'serie' => $request->input('serie'),
                'correlativo' => $this->next_cod(),
                'observacion' => $request->input('observacion'),
                'fechaEmision' => new DateTime(),
                'id_emp' => 1,
                'id_cli' => $request->input('id_cli'),
                'id_envio' => $envio->id_envio,
                'solcli_id' => $request->input('solcli_id'),
                'est_env' => $request->input('est_env'),
                'est_reg' => $request->input('est_reg'),
            ]);

            $detalles_guia = $request->input('detalle_guia');

            if ($detalles_guia) {
                foreach ($detalles_guia as $detalle) {
                    $guiaRemisiondet = GuiaRemisionDet::create([
                        
                        'id_guia_remision' => $guiaRemision->id_guia_remision,
                        'codigo' => $detalle['codigo'],
                        'descripcion' => $detalle['descripcion'],
                        'unidad' => $detalle['unidad'],
                        'cantidad' => $detalle['cantidad'],
                        'codProdSunat' => $detalle['codProdSunat'],
                        'id_prod' => $detalle['id_prod'],
                        'est_reg' => $detalle['est_reg'],
                        
                       
                    ]);

                      //Discount stock
        
                        $producto = Producto::find($detalle['id_prod']);
                        $producto->fill(array(
                            'stk_prod' =>  ($producto->stk_prod - $detalle['cantidad']),   
                        ))->save();
                            }
                        }

            DB::commit();
            //all good
        } catch (Exception $e) {
            DB::rollBack();
            return response()->json([
                'error' => 'ocurrio un error en el servidor',
                'desc' => $e,
            ], 500);
        }

        return response()->json([
            'resp' => 'Guia de remision creada',
        ], 200, [], JSON_NUMERIC_CHECK);




      

    }

    
    /**
     * Anular guia de remision
     *
     * Anula una guia de remision solo en nuestro sistema solo deve hacerse antes de ser enviada a la SUNAT sino GG
     *
     * @urlParam  id required El ID de la guia es requeridp
     *
     * @response {
     *    "resp": "Guia de remision Anulada"
     * }
     */

    public function annul($id)
    {
        try {
            $guia = GuiaRemision::find($id);
            $guia->fill(array('est_reg' => 'AN'))->save();
        } catch (Exception $e) {
            return response()->json([
                'error' => 'ocurrio un error en el servidor',
                'desc' => $e,
            ], 500);
        }
       
        return response()->json([
            'resp' => 'Guia de remision Anulada',
        ], 200, [], JSON_NUMERIC_CHECK);
    }

    public function next_cod()
    {
        $cod_correlativo_max = DB::table('guia_remision')->max('correlativo');
        if ($cod_correlativo_max == null) {
            $cod_correlativo_max = "1";
        } else {
            $max = intval($cod_correlativo_max) + 1;
            $cod_correlativo_max = $max;
        }
        if (strlen($cod_correlativo_max)==1) {
            $cod_correlativo_max="00".$cod_correlativo_max;
        }
        if (strlen($cod_correlativo_max)==2) {
            $cod_correlativo_max="0".$cod_correlativo_max;
        }
        
        return $cod_correlativo_max;
    }

  
        public function changeStateEnvio($id)
        {
            try {
                $guia = GuiaRemision::find($id);
                $guia->fill(array('est_env' => 'E'))->save();
            } catch (Exception $e) {
                return response()->json([
                    'error' => 'ocurrio un error en el servidor',
                    'desc' => $e,
                ], 500);
            }
           
            return response()->json([
                'resp' => 'Guia de remision Enviado',
            ], 200, [], JSON_NUMERIC_CHECK);
        }

        
}