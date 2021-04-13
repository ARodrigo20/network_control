<?php

namespace App\Http\Controllers\Almacen;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;
use App\Models\Almacen\UnidadMedida;
use App\Http\Controllers\LogsController;
use App\Http\Requests\Almacen\UnidadMedida\UnidadMedidaRequest as UnidadMedidaRequest;

/**
 * @group Unidades de Medida
 * APIs para unidades de medida
 */
class UnidadMedidaController extends Controller
{   
    /**
     * Retornar unidades de medida
     * 
     * Retorna todas las unidades de medida
     * 
     * 
     * @response {
     *  "data" : [
     *     {
     *       "id_unimed": 0,
     *       "nom_unimed": "string",
     *       "des_unimed": "string",
     *       "est_reg": "string",
     *       "created_at": "2020-06-14T06:07:02.419Z",
     *       "updated_at": "2020-06-14T06:07:02.419Z"
     *     }
     *  ],
     *  "size":0
     * }
     */
    public function get()
    {
        try {
            $unidades_medida = DB::table('unidad_medida')->where('est_reg', '!=', 'E')->get();
        } catch (Exception $e) {
            return response()->json([
                'error' => 'ocurrio un error en el servidor',
                'desc' => $e
            ], 500);
        }

        return response()->json([
            'data' => $unidades_medida,
            'size' => count($unidades_medida)
        ], 200, [], JSON_NUMERIC_CHECK);
    }
    
    /**
     * Retornar unidad de medida
     * 
     * Retorna unidad de medida por Id
     * 
     * @urlParam  id required El ID de la unidad de medida.
     * 
     * @response {
     *    "id_unimed": 0,
     *    "nom_unimed": "string",
     *    "des_unimed": "string",
     *    "est_reg": "string",
     *    "created_at": "2020-06-14T06:07:02.419Z",
     *    "updated_at": "2020-06-14T06:07:02.419Z"
     * }
     */
    public function getById($id)
    {
        try {
            $unidad_medida = DB::table('unidad_medida')->where('id_unimed', $id)->first();
        } catch (Exception $e) {
            return response()->json([
                'error' => 'ocurrio un error en el servidor',
                'desc' => $e
            ], 500);
        }
        
        if($unidad_medida) {
            return response()->json($unidad_medida, 200, [], JSON_NUMERIC_CHECK);
        } else {
            return response()->json([
                'resp' => 'No se encontro la unidad de medida'
            ], 500);
        }
    }

    /**
     * Crear unidad de medida
     * 
     * Crea una unidad de medida
     * 
     * @bodyParam  nom_unimed string required Nombre de la unidad de medida.
     * @bodyParam  des_mar string Descripcion de la unidad de medida.
     * 
     * @response {
     *    "resp": "unidad de medida creada"
     * }
     */
    public function create(UnidadMedidaRequest $request)
    {
        try {
            $unidad_medida = UnidadMedida::create([
                'nom_unimed' => $request->input('nom_unimed'),
                'des_unimed' => $request->input('des_unimed'),
                'est_reg' => 'A'
            ]);
        } catch (Exception $e) {
            return response()->json([
                'error' => 'ocurrio un error en el servidor',
                'desc' => $e
            ], 500);
        }

        //Logs
        $descripcion = "Se creo la unidad de medida con ID: ".$unidad_medida->id_unimed;
        $logs = new LogsController();
        $logs->create_log($descripcion, 1);
        ///////
        return response()->json([
            'resp' => 'Unidad de Medida Creada'
        ], 200, [], JSON_NUMERIC_CHECK);
    }

    /**
     * Modificar unidad de medida
     * 
     * Modifica una unidad de medida
     *
     * @urlParam  id required El ID de la unidad de medida.
     * 
     * @bodyParam  nom_unimed string required Nombre de la unidad de medida.
     * @bodyParam  des_mar string Descripcion de la unidad de medida.
     * 
     * @response {
     *    "resp": "unidad de medida actualizada"
     * }
     */
    public function update(UnidadMedidaRequest $request, $id) 
    {
        try {
            $unidad_medida = UnidadMedida::find($id);
            $unidad_medida->fill(array(
                'nom_unimed' => $request->input('nom_unimed'),
                'des_unimed' => $request->input('des_unimed')
            ))->save();
        } catch (Exception $e) {
            return response()->json([
                'error' => 'ocurrio un error en el servidor',
                'desc' => $e
            ], 500);
        }

        //Logs
        $descripcion = "Se modifico la unidad de medida con ID: ".$unidad_medida->id_unimed;
        $logs = new LogsController();
        $logs->create_log($descripcion, 2);
        ///////
        return response()->json([
            'resp' => 'Unidad de Medida Actualizada'
        ], 200, [], JSON_NUMERIC_CHECK);
    }

    /**
     * Eliminar unidad de medida
     * 
     * Elimina una unidad de medida
     *
     * @urlParam  id required El ID de la unidad de medida.
     * 
     * @response {
     *    "resp": "unidad de medida eliminada"
     * }
     */
    public function delete($id) {
        try {
            $unidad_medida = UnidadMedida::find($id);
            $unidad_medida->fill(array('est_reg' => 'E'))->save();
        } catch (Exception $e) {
            return response()->json([
                'error' => 'ocurrio un error en el servidor',
                'desc' => $e
            ], 500);
        }

        //Logs
        $descripcion = "Se elimino la unidad de medida con ID: ".$unidad_medida->id_unimed;
        $logs = new LogsController();
        $logs->create_log($descripcion,3);
        ///////
        return response()->json([
            'resp' => 'Unidad de Medida Eliminada'
        ], 200, [], JSON_NUMERIC_CHECK);
    }
    

}
