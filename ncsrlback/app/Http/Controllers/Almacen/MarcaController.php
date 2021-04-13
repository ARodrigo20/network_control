<?php

namespace App\Http\Controllers\Almacen;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;
use App\Models\Almacen\Marca;
use App\Http\Controllers\LogsController;
use App\Http\Requests\Almacen\Marca\MarcaRequest as MarcaRequest;

/**
 * @group Marcas
 * APIs para marcas
 */
class MarcaController extends Controller
{   

    /**
     * Retornar marcas
     * 
     * Retorna todas las marcas
     * 
     * 
     * @response {
     *  "data" : [
     *     {
     *       "id_mar": 0,
     *       "des_mar": "string",
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
            $marcas = DB::table('marca')->where('est_reg', '!=', 'E')->get();
        } catch (Exception $e) {
            return response()->json([
                'error' => 'ocurrio un error en el servidor',
                'desc' => $e
            ], 500);
        }
        
        return response()->json([
            'data' => $marcas,
            'size' => count($marcas)
        ], 200, [], JSON_NUMERIC_CHECK);
    }
    
    /**
     * Retornar marca
     * 
     * Retorna marca por Id
     * 
     * @urlParam  id required El ID de la marca.
     * 
     * @response {
     *    "id_mar": 0,
     *    "des_mar": "string",
     *    "est_reg": "string",
     *    "created_at": "2020-06-14T06:07:02.419Z",
     *    "updated_at": "2020-06-14T06:07:02.419Z"
     * }
     */
    public function getById($id)
    {
        try {
            $marca = DB::table('marca')->where('id_mar', $id)->first();
        } catch (Exception $e) {
            return response()->json([
                'error' => 'ocurrio un error en el servidor',
                'desc' => $e
            ], 500);
        }
        
        if($marca) {
            return response()->json($marca, 200, [], JSON_NUMERIC_CHECK);
        } else {
            return response()->json([
                'resp' => 'No se encontro la marca'
            ], 500);
        }
    }

    /**
     * Crear marca
     * 
     * Crea una marca
     * 
     * @bodyParam  des_mar string required Descripcion de la marca.
     * 
     * @response {
     *    "resp": "marca creada"
     * }
     */
    public function create(MarcaRequest $request)
    {
        try {
            $marca = Marca::create([
                'des_mar' => $request->input('des_mar'),
                'est_reg' => 'A'
            ]);
        } catch (Exception $e) {
            return response()->json([
                'error' => 'ocurrio un error en el servidor',
                'desc' => $e
            ], 500);
        }

        //Logs
        $descripcion = "Se creo la marca con ID: ".$marca->id_mar;
        $logs = new LogsController();
        $logs->create_log($descripcion, 1);
        ///////
        return response()->json([
            'resp' => 'Marca Creada'
        ], 200, [], JSON_NUMERIC_CHECK);
    }

    /**
     * Modificar marca
     * 
     * Modifica una marca
     *
     * @urlParam  id required El ID de la marca.
     * 
     * @bodyParam  des_mar string required Descripcion de la marca.
     * 
     * @response {
     *    "resp": "marca actualizada"
     * }
     */
    public function update(MarcaRequest $request, $id) 
    {
        try {
            $marca = Marca::find($id);
            $marca->fill(array(
                'des_mar' => $request->input('des_mar')
            ))->save();
        } catch (Exception $e) {
            return response()->json([
                'error' => 'ocurrio un error en el servidor',
                'desc' => $e
            ], 500);
        }

        //Logs
        $descripcion = "Se modifico la marca con ID: ".$marca->id_mar;
        $logs = new LogsController();
        $logs->create_log($descripcion, 2);
        ///////
        return response()->json([
            'resp' => 'Marca Actualizada'
        ], 200, [], JSON_NUMERIC_CHECK);
    }

    /**
     * Eliminar marca
     * 
     * Elimina una marca
     *
     * @urlParam  id required El ID de la marca.
     * 
     * @response {
     *    "resp": "marca eliminada"
     * }
     */
    public function delete($id) {
        try {
            $marca = Marca::find($id);
            $marca->fill(array('est_reg' => 'E'))->save();
        } catch (Exception $e) {
            return response()->json([
                'error' => 'ocurrio un error en el servidor',
                'desc' => $e
            ], 500);
        }

        //Logs
        $descripcion = "Se elimino la marca con ID: ".$marca->id_mar;
        $logs = new LogsController();
        $logs->create_log($descripcion,3);
        ///////
        return response()->json([
            'resp' => 'Marca Eliminada'
        ], 200, [], JSON_NUMERIC_CHECK);
    }
    

}
