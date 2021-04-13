<?php

namespace App\Http\Controllers\Proveedores;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\LogsController;
use Symfony\Component\HttpFoundation\Response;
use App\Models\Proveedores\ProveedorDireccion;
use App\Http\Requests\Proveedores\Proveedor\ProveedorDireccionRequest as ProveedorDireccionRequest;

/**
 * @group Proveeedor Direccion
 * APIs para direccion del Proveedor
 */

class ProveedorDireccionController extends Controller
{
    /**
     * Retornar direcciones proveedores
     *
     * Retorna todos las direcciones de proveedores
     *
     *
     * @response {
     *  "data" : [
     *     {
     *       "id_prov_dir": 0,
     *       "ciu_prov": "string",
     *       "dir_prov": "string",
     *       "tel_prov": "char",
     *       "id_prov": "@",
     *       "est_reg": "char",
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
            $proveedorDireccion = ProveedorDireccion::with(['id_proveedor'])->where('est_reg', '!=', 'E')->get();
        } catch (Exception $e) {
            return response()->json([
                'error' => 'ocurrio un error en el servidor',
                'desc' => $e
            ], 500);
        }

        return response()->json([
            'data' => $proveedorDireccion,
            'size' => count($proveedorDireccion)
        ], 200, [], JSON_NUMERIC_CHECK);
    }
    /**
     * Retornar direccion proveedor
     *
     * Retorna la direccion de proveedor por Id
     *
     * @urlParam  id required El ID de la direccion del proveedor.
     *
     * @response {
     *       "id_prov_dir": 0,
     *       "ciu_prov": "string",
     *       "dir_prov": "string",
     *       "tel_prov": "char",
     *       "id_prov": "@",
     *       "est_reg": "char",
     *       "created_at": "2020-06-14T06:07:02.419Z",
     *       "updated_at": "2020-06-14T06:07:02.419Z",
     *       "proveedor_identificador": {
     *          "id_prov": 0,
     *          "razsoc_prov": "string"
     *       }
     * }
     */

    public function getById($id)
    {
        try {
            $proveedorDireccion = ProveedorDireccion::with(['proveedor'])->find($id);
        } catch (Exception $e) {
            return response()->json([
                'error' => 'ocurrio un error en el servidor',
                'desc' => $e
            ], 500);
        }

        if($proveedorDireccion) {
            return response()->json($proveedorDireccion, 200, [], JSON_NUMERIC_CHECK);
        } else {
            return response()->json([
                'resp' => 'No se encontro el proveedor'
            ], 500);
        }
    }

    /**
     * Crear proveedor
     *
     * Crea una direccion de proveedor
     *
     * @bodyParam  ciu_prov string required ciudad del proveedor.
     * @bodyParam  dir_prov string required direccion proveedor.
     * @bodyParam  tel_prov char telefono required del proveedor.
     * @bodyParam  id_prov int required id del proveedor asociado.
     *
     * @response {
     *    "resp": "direccion del proveedor creado"
     * }
     */


    public function create(ProveedorDireccionRequest $request)
    {
        Log::info('Pasooo:');
        try {
            $proveedorDireccion = ProveedorDireccion::create([
                'ciu_prov' => $request->input('ciu_prov'),
                'dir_prov' => $request->input('dir_prov'),
                'tel_prov' => $request->input('tel_prov'),
                'id_prov' => $request->input('id_prov'),
                'est_reg' => 'A'
            ]);
        } catch (Exception $e) {
            return response()->json([
                'error' => 'ocurrio un error en el servidor',
                'desc' => $e
            ], 500);
        }

        //Logs
        $descripcion = "Se creo la direccion del proveedor con ID: ".$proveedorDireccion->id_prov_dir;
        $logs = new LogsController();
        $logs->create_log($descripcion, 1);
        ///////
        return response()->json([
            'resp' => 'Direccion de Proveedor Creado'
        ], 200, [], JSON_NUMERIC_CHECK);
    }
    /**
     * Modificar direccion proveedor
     *
     * Modifica una direccion de proveedor
     *
     * @urlParam  id required El ID de la direccion proveedor.
     *
     * @bodyParam  ciu_prov string required ciudad del proveedor.
     * @bodyParam  dir_prov string required direccion proveedor.
     * @bodyParam  tel_prov string telefono required del proveedor.
     * @bodyParam  id_prov int required id del proveedor asociado.
     *
     * @response {
     *    "resp": "direccion proveedor actualizado"
     * }
     */

    public function update(ProveedorDireccionRequest $request, $id)
    {
        try {
            $proveedorDireccion = ProveedorDireccion::find($id);
            $proveedorDireccion->fill(array(
                'ciu_prov' => $request->input('ciu_prov'),
                'dir_prov' => $request->input('dir_prov'),
                'tel_prov' => $request->input('tel_prov'),
                'id_prov' => $request->input('id_prov'),
            ))->save();
        } catch (Exception $e) {
            return response()->json([
                'error' => 'ocurrio un error en el servidor',
                'desc' => $e
            ], 500);
        }

        //Logs
        $descripcion = "Se modifico la direccion del proveedor con ID: ".$proveedorDireccion->id_prov_dir;
        $logs = new LogsController();
        $logs->create_log($descripcion,2);
        ///////
        return response()->json([
            'resp' => 'Direccion Proveedor Actualizado'
        ], 200, [], JSON_NUMERIC_CHECK);
    }

    /**
     * Eliminar direccion proveedor
     *
     * Elimina un direccion proveedor
     *
     * @urlParam  id required El ID de la direccion del proveedor.
     *
     * @response {
     *    "resp": "direccion proveedor eliminado"
     * }
     */
    public function delete($id) {
        try {
            $proveedorDireccion = ProveedorDireccion::find($id);
            $proveedorDireccion->fill(array('est_reg' => 'E'))->save();
        } catch (Exception $e) {
            return response()->json([
                'error' => 'ocurrio un error en el servidor',
                'desc' => $e
            ], 500);
        }

        //Logs
        $descripcion = "Se elimino la direccion Proveedor con ID: ".$proveedorDireccion->id_prov_dir;
        $logs = new LogsController();
        $logs->create_log($descripcion, 3);
        ///////
        return response()->json([
            'resp' => 'Direccion Proveedor Eliminado'
        ], 200, [], JSON_NUMERIC_CHECK);
    }

}
