<?php

namespace App\Http\Controllers\Proveedores;

use App\Http\Controllers\Controller;
use App\Models\Proveedores\ProveedorBanco;
use App\Models\Proveedores\ProveedorColaborador;
use App\Models\Proveedores\ProveedorDireccion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\LogsController;
use Symfony\Component\HttpFoundation\Response;
use App\Models\Proveedores\Proveedor;

use App\Http\Requests\Proveedores\Proveedor\ProveedorRequest as ProveedorRequest;

/**
 * @group Proveedores
 * APIs para proveedores
 */

class ProveedorController extends Controller
{
    /**
     * Retornar proveedores
     *
     * Retorna todos los proveedores
     *
     *
     * @response {
     *      "data" : [
     *          {
     *              "id_prov": 0,
     *              "razsoc_prov": "string",
     *              "ema_prov": "string",
     *              "num_doc_prov": "string",
     *              "id_tipodoc": 0,
     *              "est_reg": "string",
     *              "tipo_documento": {
     *                  "id_tipdoc": 0,
     *                  "des_tipdoc": "string"
     *              },
     *              "bancos": [
     *                  {
     *                      "id_prov_ban": 0,
     *                      "tip_prov_ban": "string",
     *                      "cue_prov_ban": "string",
     *                      "ban_prov_ban": "string",
     *                      "id_prov": 0,
     *                      "com_prov_ban": "string",
     *                      "est_reg": "string"
     *                  }
     *              ],
     *              "colaboradores": [
     *                  {
     *                      "id_prov_col": 0,
     *                      "nom_prov_col": "string",
     *                      "ema_prov_col": "string",
     *                      "tel_prov_col": "string",
     *                      "id_prov": 0,
     *                      "est_reg": "string"
     *                  }
     *              ],
     *              "direcciones": [
     *                  {
     *                      "id_prov_dir": 0,
     *                      "ciu_prov": "string",
     *                      "dir_prov": "string",
     *                      "tel_prov": "string",
     *                      "id_prov": 0,
     *                      "est_reg": "string"
     *                  }
     *              ]
     *          }
     *      ],
     *      "size":0
     * }
     */

    public function get()
    {
        Log::info('Pasooo:');
        try {
            $proveedores = Proveedor::with(['tipo_documento', 'bancos', 'colaboradores', 'direcciones'])->where('est_reg', '!=', 'E')->get();
        } catch (Exception $e) {
            return response()->json([
                'error' => 'ocurrio un error en el servidor',
                'desc' => $e
            ], 500);
        }

        return response()->json([
            'data' => $proveedores,
            'size' => count($proveedores)
        ], 200, [], JSON_NUMERIC_CHECK);
    }
    /**
     * Retornar proveedor
     *
     * Retorna proveedor por Id
     *
     * @urlParam  id required El ID del proveedor.
     *
     * @response {
     *      "data" : [
     *          {
     *              "id_prov": 0,
     *              "razsoc_prov": "string",
     *              "ema_prov": "string",
     *              "num_doc_prov": "string",
     *              "id_tipodoc": 0,
     *              "est_reg": "string",
     *              "tipo_documento": {
     *                  "id_tipdoc": 0,
     *                  "des_tipdoc": "string"
     *              },
     *              "bancos": [
     *                  {
     *                      "id_prov_ban": 0,
     *                      "tip_prov_ban": "string",
     *                      "cue_prov_ban": "string",
     *                      "ban_prov_ban": "string",
     *                      "id_prov": 0,
     *                      "com_prov_ban": "string",
     *                      "est_reg": "string"
     *                  }
     *              ],
     *              "colaboradores": [
     *                  {
     *                      "id_prov_col": 0,
     *                      "nom_prov_col": "string",
     *                      "ema_prov_col": "string",
     *                      "tel_prov_col": "string",
     *                      "id_prov": 0,
     *                      "est_reg": "string"
     *                  }
     *              ],
     *              "direcciones": [
     *                  {
     *                      "id_prov_dir": 0,
     *                      "ciu_prov": "string",
     *                      "dir_prov": "string",
     *                      "tel_prov": "string",
     *                      "id_prov": 0,
     *                      "est_reg": "string"
     *                  }
     *              ]
     *          }
     *      ],
     *      "size":0
     * }
     */


    public function getById($id)
    {
        try {
            $proveedor = Proveedor::with(['tipo_documento', 'bancos','colaboradores','direcciones'  ] )->find($id);
        } catch (Exception $e) {
            return response()->json([
                'error' => 'ocurrio un error en el servidor',
                'desc' => $e
            ], 500);
        }

        if($proveedor) {
            return response()->json($proveedor, 200, [], JSON_NUMERIC_CHECK);
        } else {
            return response()->json([
                'resp' => 'No se encontro el proveedor'
            ], 500);
        }
    }

    /**
     * Crear proveedor
     *
     * Crea un proveedor
     *
     * @bodyParam  razsoc_prov string required Razon social del proveedor.
     * @bodyParam  ema_prov string email del proveeedor.
     * @bodyParam  num_doc_prov char required Numero de documento del proveedor.
     * @bodyParam  id_tipodoc int Tipo de documento del proveedor.
     *
     * @response {
     *    "resp": "proveedor creado"
     * }
     */

    public function create(ProveedorRequest $request)
    {
        DB::beginTransaction();

        try {
            $proveedor = Proveedor::create([
                'razsoc_prov' => $request->input('razsoc_prov'),
                'ema_prov' => $request->input('ema_prov'),
                'num_doc_prov' => $request->input('num_doc_prov'),
                'id_tipdoc' => $request->input('id_tipdoc'),
                'est_reg' => 'A'
            ]);

            DB::commit();

        } catch (Exception $e) {

            DB::rollback();
            return response()->json([
                'error' => 'ocurrio un error en el servidor',
                'desc' => $e
            ], 500);
        }

        //Logs
        $descripcion = "Se creo el proveedor con ID: ".$proveedor->id_prov;
        $logs = new LogsController();
        $logs->create_log($descripcion, 1);
        ///////
        return response()->json([
            'resp' => 'Proveedor Creado'
        ], 200, [], JSON_NUMERIC_CHECK);
    }

    /**
     * Modificar proveedor
     *
     * Modifica un proveedor
     *
     * @urlParam  id required El ID del proveedor.
     *
     * @bodyParam  razsoc_prov string required Razon social del proveedor.
     * @bodyParam  ema_prov string email del proveeedor.
     * @bodyParam  num_doc_prov char required Numero de documento del proveedor.
     * @bodyParam  id_tipodoc int Tipo de documento del proveedor.     *
     *
     * @response {
     *    "resp": "proveedor actualizado"
     * }
     */

    public function update(ProveedorRequest $request, $id)
    {
        DB::beginTransaction();

        try {
            $proveedor = Proveedor::find($id);
            $proveedor->fill(array(
                'razsoc_prov' => $request->input('razsoc_prov'),
                'ema_prov' => $request->input('ema_prov'),
                'num_doc_prov' => $request->input('num_doc_prov'),
                'id_tipdoc' => $request->input('id_tipdoc'),
            ))->save();

            DB::commit();

        } catch (Exception $e) {

            DB::rollback();

            return response()->json([
                'error' => 'ocurrio un error en el servidor',
                'desc' => $e
            ], 500);
        }

        //Logs
        $descripcion = "Se modifico el proveedor con ID: ".$proveedor->id_prov;
        $logs = new LogsController();
        $logs->create_log($descripcion,2);
        ///////
        return response()->json([
            'resp' => 'Proveedor Actualizado'
        ], 200, [], JSON_NUMERIC_CHECK);
    }

    /**
     * Eliminar proveedor
     *
     * Elimina un proveedor
     *
     * @urlParam  id required El ID del proveedor.
     *
     * @response {
     *    "resp": "proveedor eliminado"
     * }
     */

    public function delete($id) {

        DB::beginTransaction();

        try {
            $proveedor = Proveedor::find($id);
            $proveedor->fill(array('est_reg' => 'E'))->save();

            DB::table('proveedor_banco')
                ->where([
                    ['id_prov', '=', $proveedor->id_prov],
                    ['est_reg', '!=', 'E']
                ])->update(['est_reg' => 'E']);

            DB::table('proveedor_colaborador')
                ->where([
                    ['id_prov', '=', $proveedor->id_prov],
                    ['est_reg', '!=', 'E']
                ])->update(['est_reg' => 'E']);

            DB::table('proveedor_direccion')
                ->where([
                    ['id_prov', '=', $proveedor->id_prov],
                    ['est_reg', '!=', 'E']
                ])->update(['est_reg' => 'E']);

            DB::commit();

        } catch (Exception $e) {

            DB::rollback();
            return response()->json([
                'error' => 'ocurrio un error en el servidor',
                'desc' => $e
            ], 500);
        }

        //Logs
        $descripcion = "Se elimino el Proveedor con ID: ".$proveedor->id_prov;
        $logs = new LogsController();
        $logs->create_log($descripcion, 3);
        ///////
        return response()->json([
            'resp' => 'Proveedor Eliminado'
        ], 200, [], JSON_NUMERIC_CHECK);
    }
    /**
     * Administrar banco, colaborador y direcciones
     *
     * Crea, Actualiza y elimina, banco, colaborador y direcciones de un proveedor
     *
     * @urlParam  id required El ID del proveedor.
     *
     * @bodyParam  banco array required Ejemplo: [{"id_prov_ban": 0,"tip_prov_ban":"string","cue_prov_ban":"string","ban_prov_ban":"string","com_prov_ban":"string","est_reg": "string"}]
     * @bodyParam  colaborador array required Ejemplo: [{"id_prov_col": 0,"nom_prov_col":"string","ema_prov_col":"string","tel_prov_col":"string","ane_prov_col":"string","car_prov_col":"string","est_reg": "string"}]
     * @bodyParam  direcciones array required Ejemplo: [{"id_prov_dir": 0,"ciu_prov":"string","dir_prov":"string","tel_prov":"string","est_reg": "string"}]
     *
     *
     * @response {
     *    "resp": "banco, colaborador y direcciones actualizados"
     * }
     */
    public function admBancosColaboradoresYdirecciones(Request $request, $id) {

        DB::beginTransaction();

        try {
            $bancos = $request->input('bancos');

            if($bancos) {
                foreach($bancos as $banco) {
                    //nuevos => id < 0 //existentes > 0
                    if($banco['id_prov_ban'] < 0){
                        ProveedorBanco::create([
                            'tip_prov_ban' => $banco['tip_prov_ban'],
                            'cue_prov_ban' => $banco['cue_prov_ban'],
                            'ban_prov_ban' => $banco['ban_prov_ban'],
                            'id_prov' => $id,
                            'com_prov_ban' => $banco['com_prov_ban'],
                            'est_reg' => 'A'
                        ]);
                    } else {
                        $proveedorBanco = ProveedorBanco::find($banco['id_prov_ban']);
                        $proveedorBanco->fill(array(
                            'tip_prov_ban' => $banco['tip_prov_ban'],
                            'cue_prov_ban' => $banco['cue_prov_ban'],
                            'ban_prov_ban' => $banco['ban_prov_ban'],
                            'com_prov_ban' => $banco['com_prov_ban'],
                            'est_reg' => $banco['est_reg'],
                        ))->save();
                    }
                }
            }

            $colaboradores = $request->input('colaboradores');

            if($colaboradores) {
                foreach($colaboradores as $colaborador) {
                    //nuevos => id < 0 //existentes > 0
                    if($colaborador['id_prov_col'] < 0){
                        ProveedorColaborador::create([
                            'nom_prov_col' => $colaborador['nom_prov_col'],
                            'ema_prov_col' => $colaborador['ema_prov_col'],
                            'tel_prov_col' => $colaborador['tel_prov_col'],
                            'id_prov' => $id,
                            'ane_prov_col' => $colaborador['ane_prov_col'],
                            'car_prov_col' => $colaborador['car_prov_col'],

                            'est_reg' => 'A'
                        ]);
                    } else {
                        $proveedorColaborador = ProveedorColaborador::find($colaborador['id_prov_col']);
                        $proveedorColaborador->fill(array(
                            'nom_prov_col' => $colaborador['nom_prov_col'],
                            'ema_prov_col' => $colaborador['ema_prov_col'],
                            'tel_prov_col' => $colaborador['tel_prov_col'],
                            'ane_prov_col' => $colaborador['ane_prov_col'],
                            'car_prov_col' => $colaborador['car_prov_col'],
                            'est_reg' => $colaborador['est_reg'],
                        ))->save();
                    }
                }
            }

            $direcciones = $request->input('direcciones');

            if($direcciones) {
                foreach($direcciones as $direccion) {
                    //nuevos => id < 0 //existentes > 0
                    if($direccion['id_prov_dir'] < 0){
                        ProveedorDireccion::create([
                            'ciu_prov' => $direccion['ciu_prov'],
                            'dir_prov' => $direccion['dir_prov'],
                            'tel_prov' => $direccion['tel_prov'],
                            'id_prov' => $id,
                            'est_reg' => 'A'
                        ]);
                    } else {
                        $proveedorDireccion = ProveedorDireccion::find($direccion['id_prov_dir']);
                        $proveedorDireccion->fill(array(
                            'ciu_prov' => $direccion['ciu_prov'],
                            'dir_prov' => $direccion['dir_prov'],
                            'tel_prov' => $direccion['tel_prov'],
                            'est_reg' => $direccion['est_reg'],
                        ))->save();
                    }
                }
            }

            DB::commit();
            // all good
        } catch (Exception $e) {

            DB::rollback();
            // something went wrong
            return response()->json([
                'error' => 'ocurrio un error en el servidor',
                'desc' => $e
            ], 500);
        }

        //Logs
        $descripcion = "Se modifico el proveedor con ID: ".$id;
        $logs = new LogsController();
        $logs->create_log($descripcion,2);
        ///////
        return response()->json([
            'resp' => 'Proveedor Actualizado'
        ], 200, [], JSON_NUMERIC_CHECK);
    }








}
