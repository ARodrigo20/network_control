<?php

namespace App\Http\Controllers\Facturacion;

use Illuminate\Http\Request;
use App\Models\Facturacion\Pagos;
use App\Http\Controllers\Controller;
use DateTime;
use Illuminate\Support\Facades\DB;

class PagoController extends Controller
{
     /**
     * Retornar Pagos
     *
     * Retorna todos los pagos activos
     *
     *
     * @response {
     *      "data" : [
     *          {
     *          "id_pagos":0
     *          "id_factura":0
     *          "medio_pago":"string",
     *          "fechaPago":"string",
     *          "monto": float,
     *          "referencia":   "string",
     *          "est_reg": "string",
     *          }
     *      ],
     *      "size":0
     * }
     */
    public function get()
    {
        try {
            $pago = DB::table('pagos')->where('est_reg', '!=', 'E')->get();
        } catch (Exception $e) {
            return response()->json([
                'error' => 'ocurrio un error en el servidor',
                'desc' => $e,
            ], 500);
        }

        return response()->json([
            'data' => $transportista,
            'size' => count($pago),
        ], 200, [], JSON_NUMERIC_CHECK);
    }

    /**
     * Retornar un pago
     *
     * Retorna un pago por Id
     *
     * @urlParam  id_pagos required El ID del pago
     *
     * @response {
     *      "data": {
     *          "id_pagos":0
     *          "id_factura":0
     *          "medio_pago":"string",
     *          "fechaPago":"string",
     *          "monto": float,
     *          "referencia":   "string",
     *          "est_reg": "string",
     *      },
     * }
     */
    public function getById($id)
    {
        try {
            $pago = DB::table('pagos')->where('id_pagos', $id)->first();
        } catch (Exception $e) {
            return response()->json([
                'error' => 'ocurrio un error en el servidor',
                'desc' => $e,
            ], 500);
        }

        return response()->json([
            'data' =>  $pago
            
        ], 200, [], JSON_NUMERIC_CHECK);

    }

    /**
     * Crear Pago
     *
     * Crea un oago para una factura
     *
     * @bodyParam  id_factura id required Id de la factura a pagar.
     * @bodyParam  medio_pago string Medio por el cual se realizo el pago
     * @bodyParam  fechaPago date Fecha del pago
     * @bodyParam  monto float Monto del pago
     * @bodyParam  referencia string Referencia del pago, texto ingresado por el usuario
     * @bodyParam  est_reg  char Estado de registro pagado deuda o anulado
     *
     * @response {
     *    "resp": "transportista creada"
     * }
     */
    public function create(Request $request)
    {

        DB::beginTransaction();

        try {
            $pago = Pagos::create([
                'id_factura'=> $request->input('id_factura'),
                'medio_pago'=> $request->input('medio_pago'),
                'fechaPago'=> $request->input('fechaPago'),
                'monto'=> $request->input('monto'),
                'referencia'=> $request->input('referencia'),
                'est_reg' => $request->input('est_reg'),
            ]);
            DB::commit();
            // all good
        } catch (Exception $e) {

            DB::rollback();
            // something went wrong
            return response()->json([
                'error' => 'ocurrio un error en el servidor',
                'desc' => $e,
            ], 500);
        }

        return response()->json([
            'resp' => 'Pago creado',
        ], 200, [], JSON_NUMERIC_CHECK);

    }

    /**
     * Eliminar pago
     *
     * Anula un pago se cambio el estado de registro a E
     *
     * @urlParam  id required El ID del pago
     *
     * @response {
     *    "resp": "Pago eliminado"
     * }
     */
    public function annul($id)
    {
        try {
            $pago = Pagos::find($id);
            $pago->fill(array('est_reg' => 'E'))->save();
        } catch (Exception $e) {
            return response()->json([
                'error' => 'ocurrio un error en el servidor',
                'desc' => $e,
            ], 500);
        }

        return response()->json([
            'resp' => 'Pago eliminado',
        ], 200, [], JSON_NUMERIC_CHECK);
    }

    
}
