<?php

namespace App\Http\Controllers\Almacen;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;
use App\Models\Almacen\Fabricante;
use App\Http\Controllers\LogsController;
use App\Http\Requests\Almacen\Fabricante\FabricanteRequest as FabricanteRequest;

/**
 * @group Fabricantes
 * APIs para fabricantes
 */
class FabricanteController extends Controller
{   
    /**
     * Retornar fabricantes
     * 
     * Retorna todos los fabricantes
     * 
     * 
     * @response {
     *  "data" : [
     *     {
     *       "id_fab": 0,
     *       "des_fab": "string",
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
            $fabricantes = DB::table('fabricante')->where('est_reg', '!=', 'E')->get();
        } catch (Exception $e) {
            return response()->json([
                'error' => 'ocurrio un error en el servidor',
                'desc' => $e
            ], 500);
        }
        
        return response()->json([
            'data' => $fabricantes,
            'size' => count($fabricantes)
        ], 200, [], JSON_NUMERIC_CHECK);
    }
    
    /**
     * Retornar fabricante
     * 
     * Retorna fabricante por Id
     * 
     * @urlParam  id required El ID del fabricante.
     * 
     * @response {
     *    "id_fab": 0,
     *    "des_fab": "string",
     *    "est_reg": "string",
     *    "created_at": "2020-06-14T06:07:02.419Z",
     *    "updated_at": "2020-06-14T06:07:02.419Z"
     * }
     */
    public function getById($id)
    {
        try {
            $fabricante = DB::table('fabricante')->where('id_fab', $id)->first();
        } catch (Exception $e) {
            return response()->json([
                'error' => 'ocurrio un error en el servidor',
                'desc' => $e
            ], 500);
        }
        
        if($fabricante) {
            return response()->json($fabricante, 200, [], JSON_NUMERIC_CHECK);
        } else {
            return response()->json([
                'resp' => 'No se encontro el fabricante'
            ], 500);
        }
    }

    /**
     * Crear fabricante
     * 
     * Crea un fabricante
     * 
     * @bodyParam  des_fab string required Descripcion del fabricante.
     * 
     * @response {
     *    "resp": "fabricante creado"
     * }
     */
    public function create(FabricanteRequest $request)
    {
        try {
            $fabricante = Fabricante::create([
                'des_fab' => $request->input('des_fab'),
                'est_reg' => 'A'
            ]);
        } catch (Exception $e) {
            return response()->json([
                'error' => 'ocurrio un error en el servidor',
                'desc' => $e
            ], 500);
        }

        //Logs
        $descripcion = "Se creo el fabricante con ID: ".$fabricante->id_fab;
        $logs = new LogsController();
        $logs->create_log($descripcion, 1);
        ///////
        return response()->json([
            'resp' => 'Fabricante Creado'
        ], 200, [], JSON_NUMERIC_CHECK);
    }

    /**
     * Modificar fabricante
     * 
     * Modifica un fabricante
     *
     * @urlParam  id required El ID del fabricante.
     * 
     * @bodyParam  des_fab string required Descripcion del fabricante.
     * 
     * @response {
     *    "resp": "fabricante actualizado"
     * }
     */
    public function update(FabricanteRequest $request, $id) 
    {
        try {
            $fabricante = Fabricante::find($id);
            $fabricante->fill(array(
                'des_fab' => $request->input('des_fab')
            ))->save();
        } catch (Exception $e) {
            return response()->json([
                'error' => 'ocurrio un error en el servidor',
                'desc' => $e
            ], 500);
        }
        //Logs
        $descripcion = "Se modifico el fabricante con ID: ".$fabricante->id_fab;
        $logs = new LogsController();
        $logs->create_log($descripcion,2);
        ///////
        return response()->json([
            'resp' => 'Fabricante Actualizado'
        ], 200, [], JSON_NUMERIC_CHECK);
    }

    /**
     * Eliminar fabricante
     * 
     * Elimina un fabricante
     *
     * @urlParam  id required El ID del fabricante.
     * 
     * @response {
     *    "resp": "fabricante eliminado"
     * }
     */
    public function delete($id) {
        try {
            $fabricante = Fabricante::find($id);
            $fabricante->fill(array('est_reg' => 'E'))->save();
        } catch (Exception $e) {
            return response()->json([
                'error' => 'ocurrio un error en el servidor',
                'desc' => $e
            ], 500);
        }

        //Logs
        $descripcion = "Se elimino el fabricante con ID: ".$fabricante->id_fab;
        $logs = new LogsController();
        $logs->create_log($descripcion, 3);
        ///////
        return response()->json([
            'resp' => 'Fabricante Eliminado'
        ], 200, [], JSON_NUMERIC_CHECK);
    }
}
