<?php

namespace App\Http\Controllers\Proveedores;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\LogsController;
use Symfony\Component\HttpFoundation\Response;
use App\Models\Proveedores\ProveedorColaborador;
use App\Http\Requests\Proveedores\Proveedor\ProveedorColaboradorRequest as ProveedorColaboradorRequest;

/**
 * @group Proveeedor Colaborador
 * APIs para el colaborador del proveedor
 */
class ProveedorColaboradorController extends Controller
{
    /**
     * Retornar colaboradores proveedores
     *
     * Retorna todos los colaboradores proveedores
     *
     *
     * @response {
     *  "data" : [
     *     {
     *       "id_prov_col": 0,
     *       "nom_prov_col": "string",
     *       "ema_prov_col": "string",
     *       "tel_prov_col": "char",
     *       "ane_prov_col": "char",
     *       "car_prov_col": "string",
     *       "created_at": "2020-06-14T06:07:02.419Z",
     *       "updated_at": "2020-06-14T06:07:02.419Z"
     *     }
     *  ],
     *  "size":0
     * }
     */

    public function get()
    {
        Log::info('Pasooo:');
        try {
            $proveedorColaborador = ProveedorColaborador::with(['id_proveedor'])->where('est_reg', '!=', 'E')->get();
        } catch (Exception $e) {
            return response()->json([
                'error' => 'ocurrio un error en el servidor',
                'desc' => $e
            ], 500);
        }
        return response()->json([
            'data' => $proveedorColaborador,
            'size' => count($proveedorColaborador)
        ], 200, [], JSON_NUMERIC_CHECK);
    }


    /**
     * Retornar colaborador proveedor
     *
     * Retorna colaborador proveedor por Id
     *
     * @urlParam  id required El ID del colaborador proveedor.
     *
     * @response {
     *       "id_prov_Col": 0,
     *       "nom_prov_col": "string",
     *       "ema_prov_col": "string",
     *       "tel_prov_col": "char",
     *       "ane_prov_col": "char",
     *       "car_prov_col": "string",
     *       "created_at": "2020-06-14T06:07:02.419Z",
     *       "updated_at": "2020-06-14T06:07:02.419Z"
     * }
     */

    public function getById($id)
    {
        try {
            $proveedorColaborador = ProveedorColaborador::with(['id_proveedor'])->find($id);
        } catch (Exception $e) {
            return response()->json([
                'error' => 'ocurrio un error en el servidor',
                'desc' => $e
            ], 500);
        }

        if($proveedorColaborador) {
            return response()->json($proveedorColaborador, 200, [], JSON_NUMERIC_CHECK);
        } else {
            return response()->json([
                'resp' => 'No se encontro el colaborador del proveedor'
            ], 500);
        }
    }

    /**
     * Crear colaborador proveedor
     *
     * Crea un colaborador proveedor
     *
     * @bodyParam  nom_prov string required nombre del colaborador del proveedor.
     * @bodyParam  ema_prov string required email del colaborador proveedor.
     * @bodyParam  tel_prov string telefono opcional del colaborador proveedor.
     * @bodyParam  ane_prov_col char anexo del colaborador del proveedor.
     * @bodyParam  car_prov_col string cargo del colaborador del proveedor.
     *
     * @bodyParam  id_prov int required id del proveedor asociado.
     *
     * @response {
     *    "resp": "colaborador proveedor creado"
     * }
     */

    public function create(ProveedorColaboradorRequest $request)
    {
        Log::info('Pasooo:');
        try {
            $proveedorColaborador = ProveedorColaborador::create([
                'nom_prov_col' => $request->input('nom_prov_col'),
                'ema_prov_col' => $request->input('ema_prov_col'),
                'tel_prov_col' => $request->input('tel_prov_col'),
                'id_prov' => $request->input('id_prov'),
                'ane_prov_col' => $request->input('ane_prov_col'),
                'car_prov_col' => $request->input('car_prov_col'),
                'est_reg' => 'A'
            ]);
        } catch (Exception $e) {
            return response()->json([
                'error' => 'ocurrio un error en el servidor',
                'desc' => $e
            ], 500);
        }

        //Logs
        $descripcion = "Se creo el colaborador del proveedor con ID: ".$proveedorColaborador->id_prov_col;
        $logs = new LogsController();
        $logs->create_log($descripcion, 1);
        ///////
        return response()->json([
            'resp' => 'Colaborador de Proveedor Creado'
        ], 200, [], JSON_NUMERIC_CHECK);
    }

    /**
     * Modificar colaborador proveedor
     *
     * Modifica un colaborador proveedor
     *
     * @urlParam  id required El ID del colaborador proveedor.
     *
     * @bodyParam  nom_prov string required nombre del colaborador del proveedor.
     * @bodyParam  ema_prov string required email del colaborador proveedor.
     * @bodyParam  tel_prov string telefono opcional del colaborador proveedor.
     * @bodyParam  ane_prov_col char anexo del colaborador del proveedor.
     * @bodyParam  car_prov_col string cargo del colaborador del proveedor.
     * @bodyParam  id_prov int required id del proveedor asociado.
     *
     *
     * @response {
     *    "resp": "colaborador proveedor actualizado"
     * }
     */

    public function update(ProveedorColaboradorRequest $request, $id)
    {
        try {
            $proveedorColaborador = ProveedorColaborador::find($id);
            $proveedorColaborador->fill(array(
                'nom_prov_col' => $request->input('nom_prov_col'),
                'ema_prov_col' => $request->input('ema_prov_col'),
                'tel_prov_col' => $request->input('tel_prov_col'),
                'id_prov' => $request->input('id_prov'),
                'ane_prov_col' => $request->input('ane_prov_col'),
                'car_prov_col' => $request->input('car_prov_col'),
            ))->save();
        } catch (Exception $e) {
            return response()->json([
                'error' => 'ocurrio un error en el servidor',
                'desc' => $e
            ], 500);
        }

        //Logs
        $descripcion = "Se modifico el colaborador del proveedor con ID: ".$proveedorColaborador->id_prov_col;
        $logs = new LogsController();
        $logs->create_log($descripcion,2);
        ///////
        return response()->json([
            'resp' => 'Colaborador del Proveedor Actualizado'
        ], 200, [], JSON_NUMERIC_CHECK);
    }

    /**
     * Eliminar colaborador proveedor
     *
     * Elimina un colaborador proveedor
     *
     * @urlParam  id required El ID del colaborador proveedor.
     *
     * @response {
     *    "resp": "colaborador proveedor eliminado"
     * }
     */

    public function delete($id) {
        try {
            $proveedorColaborador = ProveedorColaborador::find($id);
            $proveedorColaborador->fill(array('est_reg' => 'E'))->save();
        } catch (Exception $e) {
            return response()->json([
                'error' => 'ocurrio un error en el servidor',
                'desc' => $e
            ], 500);
        }

        //Logs
        $descripcion = "Se elimino el Colaborador del Proveedor con ID: ".$proveedorColaborador->id_prov_col;
        $logs = new LogsController();
        $logs->create_log($descripcion, 3);
        ///////
        return response()->json([
            'resp' => 'Colaborador del Proveedor Eliminado'
        ], 200, [], JSON_NUMERIC_CHECK);
    }
}
