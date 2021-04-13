<?php

namespace App\Http\Controllers\Facturacion;

use App\Models\Facturacion\Transportista;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;


/**
 * @group Transportista
 * APIs para tranportista
 */
class TransportistaController extends Controller
{
    /**
     * Retornar Transportistas
     *
     * Retorna todos los transportistas activos
     *
     *
     * @response {
     *      "data" : [
     *          {
     *          "id_transportista: 1,
     *          "TipoDoc": 0,
     *          "NumDoc": "string",
     *          "RznSocial": "string",
     *          "Placa": 0,
     *          "ChoferTipoDoc": string,        
     *          "est_reg": "string",
     *          }
     *      ],
     *      "size":0
     * }
     */
    public function get()
    {
        try {
            $transportista = DB::table('transportista')->where('est_reg', '!=', 'E')->get();
        } catch (Exception $e) {
            return response()->json([
                'error' => 'ocurrio un error en el servidor',
                'desc' => $e,
            ], 500);
        }

        return response()->json([
            'data' => $transportista,
            'size' => count($transportista),
        ], 200, [], JSON_NUMERIC_CHECK);
    }

    /**
     * Retornar cotizacion
     *
     * Retorna transportista por Id
     *
     * @urlParam  id_tranportista required El ID de transportista.
     *
     * @response {
     *      "data": {
     *          "id_transportista: 1,
     *          "TipoDoc": 0,
     *          "NumDoc": "string",
     *          "RznSocial": "string",
     *          "Placa": 0,
     *          "ChoferTipoDoc": string,        
     *          "est_reg": "string",
     *      },
     * }
     */
    public function getById($id)
    {
        try {
            $transportista = DB::table('transportista')->where('id_transportista', $id)->first();
        } catch (Exception $e) {
            return response()->json([
                'error' => 'ocurrio un error en el servidor',
                'desc' => $e,
            ], 500);
        }

        return response()->json([
            'data' =>  $transportista
            
        ], 200, [], JSON_NUMERIC_CHECK);

    }

    /**
     * Crear Transportista
     *
     * Crea un transportista
     *
     * @bodyParam  TipoDoc num required Id de proyecto.
     * @bodyParam  NumDoc int numero del documento (RUC mas comun o dni)
     * @bodyParam  RznSocial string Razon social del tranportista
     * @bodyParam  Placa string Placa de vehiculo
     * @bodyParam  ChoferTipoDoc string Tipo de documento del chofer
     * @bodyParam  est_reg  char Estado de registro.
     *
     * @response {
     *    "resp": "transportista creada"
     * }
     */
    public function create(Request $request)
    {

        DB::beginTransaction();

        try {
            $transportista = Transportista::create([

                'TipoDoc' => $request->input('TipoDoc'),
                'NumDoc' => $request->input('NumDoc'),
                'RznSocial' => $request->input('RznSocial'),
                'Placa' => $request->input('Placa'),
                'ChoferTipoDoc' => $request->input('ChoferTipoDoc'),
                'ChoferDoc' => $request->input('ChoferDoc'),
                'est_reg' => 'A',
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
            'resp' => 'Transportista creado',
        ], 200, [], JSON_NUMERIC_CHECK);

    }

    /**
     * Eliminar transportista
     *
     * Anula un transportista se cambio el estado de registro a E
     *
     * @urlParam  id required El ID del transportista
     *
     * @response {
     *    "resp": "Transportista eliminado"
     * }
     */
    public function annul($id)
    {
        try {
            $cotizacion = Transportista::find($id);
            $cotizacion->fill(array('est_reg' => 'E'))->save();
        } catch (Exception $e) {
            return response()->json([
                'error' => 'ocurrio un error en el servidor',
                'desc' => $e,
            ], 500);
        }

        return response()->json([
            'resp' => 'Transportista eliminado',
        ], 200, [], JSON_NUMERIC_CHECK);
    }

    /**
     * Modifica transportista
     *
     *
     * @urlParam  id required El ID del tranpostista.
     * @bodyParam  TipoDoc num required Id de proyecto.
     * @bodyParam  NumDoc int numero del documento (RUC mas comun o dni)
     * @bodyParam  RznSocial string Razon social del tranportista
     * @bodyParam  Placa string Placa de vehiculo
     * @bodyParam  ChoferTipoDoc string Tipo de documento del chofer
     * @bodyParam  est_reg  char Estado de registro.
     * @response {
     *    "resp": "descripcion seccion actualizado"
     * }
     */
    public function update(Request $request, $id)
    {
        try {
            $transportista = Transportista::find($id);
            $transportista->fill(array(

                'TipoDoc' => $request->input('TipoDoc') ?? $transportista->TipoDoc,
                'NumDoc' => $request->input('NumDoc') ?? $transportista->NumDoc,
                'RznSocial' => $request->input('RznSocial') ?? $transportista->RznSocial,
                'Placa' => $request->input('Placa') ?? $transportista->Placa,
                'ChoferTipoDoc' => $request->input('ChoferTipoDoc') ?? $transportista->ChoferTipoDoc,
                'ChoferDoc' => $request->input('ChoferDoc') ?? $transportista->ChoferDoc,
                'est_reg' => $request->input('ChoferDoc') ?? $transportista->est_reg,
            ))->save();
        } catch (Exception $e) {
            return response()->json([
                'error' => 'ocurrio un error en el servidor',
                'desc' => $e,
            ], 500);
        }

        ///////
        return response()->json([
            'resp' => 'Transportista Actualizado',
        ], 200, [], JSON_NUMERIC_CHECK);
    }

}
