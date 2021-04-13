<?php

namespace App\Http\Controllers\Almacen;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;
use App\Models\Almacen\Modelo;
use App\Http\Controllers\LogsController;
use App\Http\Requests\Almacen\Modelo\ModeloRequest as ModeloRequest;

/**
 * @group Modelos
 * APIs para modelos
 */
class ModeloController extends Controller
{   

    /**
     * Retornar modelos
     * 
     * Retorna todos los modelos
     * 
     * 
     * @response {
     *  "data" : [
     *     {
     *       "id_mod": 0,
     *       "des_mod": "string",
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
            $modelos = DB::table('modelo')->where('est_reg', '!=', 'E')->get();
        } catch (Exception $e) {
            return response()->json([
                'error' => 'ocurrio un error en el servidor',
                'desc' => $e
            ], 500);
        }
        
        return response()->json([
            'data' => $modelos,
            'size' => count($modelos)
        ], 200, [], JSON_NUMERIC_CHECK);
    }
    
    /**
     * Retornar modelo
     * 
     * Retorna modelo por Id
     * 
     * @urlParam  id required El ID del modelo.
     * 
     * @response {
     *    "id_mod": 0,
     *    "des_mod": "string",
     *    "est_reg": "string",
     *    "created_at": "2020-06-14T06:07:02.419Z",
     *    "updated_at": "2020-06-14T06:07:02.419Z"
     * }
     */
    public function getById($id)
    {
        try {
            $modelo = DB::table('modelo')->where('id_mod', $id)->first();
        } catch (Exception $e) {
            return response()->json([
                'error' => 'ocurrio un error en el servidor',
                'desc' => $e
            ], 500);
        }
        
        if($modelo) {
            return response()->json($modelo, 200, [], JSON_NUMERIC_CHECK);
        } else {
            return response()->json([
                'resp' => 'No se encontro el modelo'
            ], 500);
        }
    }

    /**
     * Crear modelo
     * 
     * Crea un modelo
     * 
     * @bodyParam  des_mod string required Descripcion del modelo.
     * 
     * @response {
     *    "resp": "modelo creado"
     * }
     */
    public function create(ModeloRequest $request)
    {
        try {
            $modelo = Modelo::create([
                'des_mod' => $request->input('des_mod'),
                'est_reg' => 'A'
            ]);
        } catch (Exception $e) {
            return response()->json([
                'error' => 'ocurrio un error en el servidor',
                'desc' => $e
            ], 500);
        }

        //Logs
        $descripcion = "Se creo el modelo con ID: ".$modelo->id_mod;
        $logs = new LogsController();
        $logs->create_log($descripcion, 1);
        ///////
        return response()->json([
            'resp' => 'Modelo Creado'
        ], 200, [], JSON_NUMERIC_CHECK);
    }

    /**
     * Modificar modelo
     * 
     * Modifica un modelo
     *
     * @urlParam  id required El ID del modelo.
     * 
     * @bodyParam  des_mod string required Descripcion del modelo.
     * 
     * @response {
     *    "resp": "modelo actualizado"
     * }
     */
    public function update(ModeloRequest $request, $id) 
    {
        try {
            $modelo = Modelo::find($id);
            $modelo->fill(array(
                'des_mod' => $request->input('des_mod')
            ))->save();
        } catch (Exception $e) {
            return response()->json([
                'error' => 'ocurrio un error en el servidor',
                'desc' => $e
            ], 500);
        }

        //Logs
        $descripcion = "Se modifico el modelo con ID: ".$modelo->id_mod;
        $logs = new LogsController();
        $logs->create_log($descripcion, 2);
        ///////
        return response()->json([
            'resp' => 'Modelo Actualizado'
        ], 200, [], JSON_NUMERIC_CHECK);
    }

    /**
     * Eliminar modelo
     * 
     * Elimina un modelo
     *
     * @urlParam  id required El ID del modelo.
     * 
     * @response {
     *    "resp": "modelo eliminado"
     * }
     */
    public function delete($id) {
        try {
            $modelo = Modelo::find($id);
            $modelo->fill(array('est_reg' => 'E'))->save();
        } catch (Exception $e) {
            return response()->json([
                'error' => 'ocurrio un error en el servidor',
                'desc' => $e
            ], 500);
        }

        //Logs
        $descripcion = "Se elimino el modelo con ID: ".$modelo->id_mod;
        $logs = new LogsController();
        $logs->create_log($descripcion,3);
        ///////
        return response()->json([
            'resp' => 'Modelo Eliminado'
        ], 200, [], JSON_NUMERIC_CHECK);
    }
}
