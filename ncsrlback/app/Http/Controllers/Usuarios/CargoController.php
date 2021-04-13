<?php

namespace App\Http\Controllers\Usuarios;

use App\Http\Controllers\Controller;
use App\Http\Controllers\LogsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;
use App\Models\Usuarios\Cargo;
use App\Http\Requests\Usuarios\Cargo\CargoRequest as CargoRequest;

/**
 * @group Cargos
 * APIs para cargos
 */
class CargoController extends Controller
{   
    /**
     * Retornar cargos
     * 
     * Retorna todos los cargos
     * 
     * 
     * @response {
     *  "data" : [
     *     {
     *       "id_car": 0,
     *       "des_car": "string",
     *       "est_reg": "string"
     *     }
     *  ],
     *  "size":0
     * }
     */
    public function get()
    {
        try {
            $cargos = DB::table('cargo')->where('est_reg', '!=', 'E')->get();
        } catch (Exception $e) {
            return response()->json([
                'error' => 'ocurrio un error en el servidor',
                'desc' => $e
            ], 500);
        }
        
        return response()->json([
            'data' => $cargos,
            'size' => count($cargos)
        ], 200, [], JSON_NUMERIC_CHECK);
    }
    
    /**
     * Retornar cargo
     * 
     * Retorna cargo por Id
     * 
     * @urlParam  id required El ID del cargo.
     * 
     * @response {
     *    "id_car": 0,
     *    "des_car": "string",
     *    "est_reg": "string"
     * }
     */
    public function getById($id)
    {
        try {
            $cargo = Cargo::where('id_car', $id)->first();
        } catch (Exception $e) {
            return response()->json([
                'error' => 'ocurrio un error en el servidor',
                'desc' => $e
            ], 500);
        }
        
        if($cargo) {
            return response()->json($cargo, 200, [], JSON_NUMERIC_CHECK);
        } else {
            return response()->json([
                'resp' => 'No se encontro el cargo'
            ], 500);
        }
    }

    /**
     * Crear cargo
     * 
     * Crea un cargo
     * 
     * @bodyParam  des_car string required Descripcion del cargo.
     * 
     * @response {
     *    "resp": "cargo creado"
     * }
     */
    public function create(CargoRequest $request)
    {
        try {
            $cargo = Cargo::create([
                'des_car' => $request->input('des_car'),
                'est_reg' => 'A'
            ]);
        } catch (Exception $e) {
            return response()->json([
                'error' => 'ocurrio un error en el servidor',
                'desc' => $e
            ], 500);
        }

        //Logs
        $descripcion = "Se creo el cargo con ID: ".$cargo->id_car;
        $logs = new LogsController();
        $logs->create_log($descripcion, 1);

        return response()->json([
            'resp' => 'Cargo Creado'
        ], 200, [], JSON_NUMERIC_CHECK);
    }

    /**
     * Modificar cargo
     * 
     * Modifica un cargo
     *
     * @urlParam  id required El ID del cargo.
     * 
     * @bodyParam  des_car string required Descripcion del cargo.
     * 
     * @response {
     *    "resp": "cargo actualizado"
     * }
     */
    public function update(CargoRequest $request, $id) 
    {
        try {
            $cargo = Cargo::find($id);
            $cargo->fill(array(
                'des_car' => $request->input('des_car')
            ))->save();
        } catch (Exception $e) {
            return response()->json([
                'error' => 'ocurrio un error en el servidor',
                'desc' => $e
            ], 500);
        }
        //Logs
        $descripcion = "Se modifico el cargo con ID: ".$cargo->id_car;
        $logs = new LogsController();
        $logs->create_log($descripcion, 2);
        ///////

        return response()->json([
            'resp' => 'Cargo Actualizado'
        ], 200, [], JSON_NUMERIC_CHECK);
    }

    /**
     * Eliminar cargo
     * 
     * Elimina un cargo
     *
     * @urlParam  id required El ID del cargo.
     * 
     * @response {
     *    "resp": "cargo eliminado"
     * }
     */
    public function delete($id) {
        try {
            $cargo = Cargo::find($id);
            $cargo->fill(array('est_reg' => 'E'))->save();
        } catch (Exception $e) {
            return response()->json([
                'error' => 'ocurrio un error en el servidor',
                'desc' => $e
            ], 500);
        }

        //Logs
        $descripcion = "Se elimino el cargo con ID: ".$cargo->id_car;
        $logs = new LogsController();
        $logs->create_log($descripcion, 3);
        ///////

        return response()->json([
            'resp' => 'Cargo Eliminado'
        ], 200, [], JSON_NUMERIC_CHECK);
    }
    

}
