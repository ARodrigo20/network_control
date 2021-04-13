<?php

namespace App\Http\Controllers\Proveedores;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\LogsController;
use Symfony\Component\HttpFoundation\Response;
use App\Models\Proveedores\ProveedorBanco;
use App\Http\Requests\Proveedores\Proveedor\ProveedorBancoRequest as ProveedorBancoRequest;

/**
 * @group Proveeedor Banco
 * APIs para el Banco del proveedor
 */

class ProveedorBancoController extends Controller
{
    /**
     * Retornar banco proveedor
     *
     * Retorna todos los bancos del proveedor
     *
     *
     * @response {
     *  "data" : [
     *     {
     *       "id_prov_ban": 0,
     *       "tip_prov_ban": "string",
     *       "cue_prov_ban": "string",
     *       "ban_prov_ban": "string",
     *       "com_prov_ban": "string",
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
            $proveedorBanco = ProveedorBanco::with(['id_proveedor'])->where('est_reg', '!=', 'E')->get();
        } catch (Exception $e) {
            return response()->json([
                'error' => 'ocurrio un error en el servidor',
                'desc' => $e
            ], 500);
        }

        return response()->json([
            'data' => $proveedorBanco,
            'size' => count($proveedorBanco)
        ], 200, [], JSON_NUMERIC_CHECK);
    }

    /**
     * Retornar banco proveedor
     *
     * Retorna banco del proveedor por Id
     *
     * @urlParam  id required El ID de banco proveedor.
     *
     * @response {
     *       "id_prov_ban": 0,
     *       "tip_prov_ban": "string",
     *       "cue_prov_ban": "string",
     *       "ban_prov_ban": "string",
     *       "com_prov_ban": "string",
     *       "created_at": "2020-06-14T06:07:02.419Z",
     *       "updated_at": "2020-06-14T06:07:02.419Z"
     * }
     */

    public function getById($id)
    {
        try {
            $proveedorBanco = ProveedorBanco::with(['id_proveedor'])->find($id);
        } catch (Exception $e) {
            return response()->json([
                'error' => 'ocurrio un error en el servidor',
                'desc' => $e
            ], 500);
        }

        if($proveedorBanco) {
            return response()->json($proveedorBanco, 200, [], JSON_NUMERIC_CHECK);
        } else {
            return response()->json([
                'resp' => 'No se encontro el banco del proveedor'
            ], 500);
        }
    }

    /**
     * Crear banco proveedor
     *
     * Crea un banco proveedor
     *
     * @bodyParam  tip_prov_ban string required Tipo de cuenta que dispone el proveedor.
     * @bodyParam  cue_prov_ban string required Nro de cuenta del banco segun el tipo .
     * @bodyParam  ban_prov_ban string required Nombre del banco a quien pertenece la cuenta.
     * @bodyParam  id_prov int required id del proveedor asociado.
     * @bodyParam  com_prov_ban string required Comentarios que pueda tener esta cuenta.
     *
     * @response {
     *    "resp": "banco proveedor creado"
     * }
     */

    public function create(ProveedorBancoRequest $request)
    {
        Log::info('Pasooo:');
        try {
            $proveedorBanco = ProveedorBanco::create([
                'tip_prov_ban' => $request->input('tip_prov_ban'),
                'cue_prov_ban' => $request->input('cue_prov_ban'),
                'ban_prov_ban' => $request->input('ban_prov_ban'),
                'id_prov' => $request->input('id_prov'),
                'com_prov_ban' => $request->input('com_prov_ban'),
                'est_reg' => 'A'
            ]);
        } catch (Exception $e) {
            return response()->json([
                'error' => 'ocurrio un error en el servidor',
                'desc' => $e
            ], 500);
        }

        //Logs
        $descripcion = "Se creo el Banco del proveedor con ID: ".$proveedorBanco->id_prov_ban;
        $logs = new LogsController();
        $logs->create_log($descripcion, 1);
        ///////
        return response()->json([
            'resp' => 'Banco de Proveedor Creado'
        ], 200, [], JSON_NUMERIC_CHECK);
    }
    /**
     * Modificar banco proveedor
     *
     * Modifica un banco del proveedor
     *
     * @urlParam  id required El ID del banco proveedor.
     *
     * @bodyParam  tip_prov_ban string required Tipo de cuenta que dispone el proveedor.
     * @bodyParam  cue_prov_ban string required Nro de cuenta del banco segun el tipo .
     * @bodyParam  ban_prov_ban string required Nombre del banco a quien pertenece la cuenta.
     * @bodyParam  id_prov int required id del proveedor asociado.
     * @bodyParam  com_prov_ban string required Comentarios que pueda tener esta cuenta.
     *
     * @response {
     *    "resp": "banco proveedor actualizado"
     * }
     */

    public function update(ProveedorBancoRequest $request, $id)
    {
        try {
            $proveedorBanco = ProveedorBanco::find($id);
            $proveedorBanco->fill(array(
                'tip_prov_ban' => $request->input('tip_prov_ban'),
                'cue_prov_ban' => $request->input('cue_prov_ban'),
                'ban_prov_ban' => $request->input('ban_prov_ban'),
                'id_prov' => $request->input('id_prov'),
                'com_prov_ban' => $request->input('com_prov_ban'),
            ))->save();
        } catch (Exception $e) {
            return response()->json([
                'error' => 'ocurrio un error en el servidor',
                'desc' => $e
            ], 500);
        }

        //Logs
        $descripcion = "Se modifico el colaborador del proveedor con ID: ".$proveedorBanco->id_prov_ban;
        $logs = new LogsController();
        $logs->create_log($descripcion,2);
        ///////
        return response()->json([
            'resp' => 'Banco del Proveedor Actualizado'
        ], 200, [], JSON_NUMERIC_CHECK);
    }
    /**
     * Eliminar banco del proveedor
     *
     * Elimina un banco del proveedor
     *
     * @urlParam  id required El ID del banco de proveedor.
     *
     * @response {
     *    "resp": "banco proveedor eliminado"
     * }
     */
    public function delete($id) {
        try {
            $proveedorBanco = ProveedorBanco::find($id);
            $proveedorBanco->fill(array('est_reg' => 'E'))->save();
        } catch (Exception $e) {
            return response()->json([
                'error' => 'ocurrio un error en el servidor',
                'desc' => $e
            ], 500);
        }

        //Logs
        $descripcion = "Se elimino el Banco del Proveedor con ID: ".$proveedorBanco->id_prov_ban;
        $logs = new LogsController();
        $logs->create_log($descripcion, 3);
        ///////
        return response()->json([
            'resp' => 'Banco del Proveedor Eliminado'
        ], 200, [], JSON_NUMERIC_CHECK);
    }

}
