<?php

namespace App\Http\Controllers\Clientes;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\LogsController;
use Symfony\Component\HttpFoundation\Response;
use App\Models\Clientes\Cliente;
use App\Models\Clientes\ClienteContacto;
use App\Models\Clientes\ClienteDireccion;
use App\Http\Requests\Clientes\Cliente\ClienteRequest as ClienteRequest;
use App\Http\Requests\Clientes\Cliente\ClienteContactoDireccionRequest as ClienteContactoDireccionRequest;

/**
 * @group Clientes
 * APIs para clientes
 */
class ClienteController extends Controller
{   
    /**
     * Retornar clientes
     * 
     * Retorna todos los clientes
     * 
     * 
     * @response {
     *      "data" : [
     *          {
     *              "id_cli": 0,
     *              "razsoc_cli": "string",
     *              "numdoc_cli": "string",
     *              "ema_cli": "string",
     *              "id_tipodoc": 0,
     *              "est_reg": "string",
     *              "tipo_documento": {
     *                  "id_tipdoc": 0,
     *                  "des_tipdoc": "string"
     *              },
     *              "contactos": [
     *                  {
     *                      "id_cli_con": 0,
     *                      "nom_cli_con": "string",
     *                      "ema_cli_con": "string",
     *                      "tel_cli_con": 0,
     *                      "id_cli": 0,
     *                      "est_reg": "string"
     *                  }
     *              ],
     *              "direcciones": [
     *                  {
     *                      "id_cli_dir": 0,
     *                      "ciu_cli": "string",
     *                      "dir_cli": "string",
     *                      "tel_cli": 0,
     *                      "id_cli": 0,
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
        try {
            $clientes = Cliente::with(['tipo_documento', 'contactos','direcciones'])->where('est_reg', '!=', 'E')->get();
        } catch (Exception $e) {
            return response()->json([
                'error' => 'ocurrio un error en el servidor',
                'desc' => $e
            ], 500);
        }
        
        return response()->json([
            'data' => $clientes,
            'size' => count($clientes)
        ], 200, [], JSON_NUMERIC_CHECK);
    }
    
    /**
     * Retornar cliente
     * 
     * Retorna cliente por Id
     * 
     * @urlParam  id required El ID del cliente.
     * 
     * @response {
     *      "id_cli": 0,
     *      "razsoc_cli": "string",
     *      "numdoc_cli": "string",
     *      "ema_cli": "string",
     *      "id_tipodoc": 0,
     *      "est_reg": "string",
     *      "tipo_documento": {
     *          "id_tipdoc": 0,
     *          "des_tipdoc": "string"
     *      },
     *      "contactos": [
     *          {
     *              "id_cli_con": 0,
     *              "nom_cli_con": "string",
     *              "ema_cli_con": "string",
     *              "tel_cli_con": 0,
     *              "id_cli": 0,
     *              "est_reg": "string"
     *          }
     *      ],
     *      "direcciones": [
     *          {
     *              "id_cli_dir": 0,
     *              "ciu_cli": "string",
     *              "dir_cli": "string",
     *              "tel_cli": 0,
     *              "id_cli": 0,
     *              "est_reg": "string"
     *          }
     *      ]
     * }
     */
    public function getById($id)
    {        
        try {
            $cliente = Cliente::with(['tipo_documento','contactos','direcciones'] )->find($id);
        } catch (Exception $e) {
            return response()->json([
                'error' => 'ocurrio un error en el servidor',
                'desc' => $e
            ], 500);
        }
        
        if($cliente) {
            return response()->json($cliente, 200, [], JSON_NUMERIC_CHECK);
        } else {
            return response()->json([
                'resp' => 'No se encontro el cliente'
            ], 500);
        }
    }

    /**
     * Crear cliente
     * 
     * Crea un cliente
     * 
     * @bodyParam  razsoc_cli string required Razon social del cliente.
     * @bodyParam  numdoc_cli string required Numero de documento del cliente.
     * @bodyParam  ema_cli string Email del cliente.
     * @bodyParam  id_tipodoc int Tipo de documento del cliente.
     * 
     * @response {
     *    "resp": "cliente creado"
     * }
     */
    public function create(ClienteRequest $request)
    {   

        DB::beginTransaction();

        try {
            $cliente = Cliente::create([
                'razsoc_cli' => $request->input('razsoc_cli'),
                'numdoc_cli' => $request->input('numdoc_cli'),
                'ema_cli' => $request->input('ema_cli'),
                'id_tipdoc' => $request->input('id_tipdoc'),
                'est_reg' => 'A'
            ]);
            // $contactos = $request->input('contactos');
                
            // if($contactos) {
            //     foreach($contactos as $contacto) {
            //         $clienteContacto = ClienteContacto::create([
            //             'nom_cli_con' => $contacto['nom_cli_con'],
            //             'ema_cli_con' => $contacto['ema_cli_con'],
            //             'tel_cli_con' => $contacto['tel_cli_con'],
            //             'id_cli' => $cliente->id_cli,
            //             'est_reg' => 'A'
            //         ]);
            //     }
            // }

            // $direcciones = $request->input('direcciones');
                
            // if($direcciones) {
            //     foreach($direcciones as $direccion) {
            //         $clienteDireccion = ClienteDireccion::create([
            //             'ciu_cli' => $direccion['ciu_cli'],
            //             'dir_cli' => $direccion['dir_cli'],
            //             'tel_cli' => $direccion['tel_cli'],
            //             'id_cli' => $cliente->id_cli,
            //             'est_reg' => 'A'
            //         ]);
            //     }
            // }
                
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
        $descripcion = "Se creo el cliente con ID: ".$cliente->id_cli;
        $logs = new LogsController();
        $logs->create_log($descripcion, 1);
        ///////
        return response()->json([
            'resp' => 'Cliente Creado'
        ], 200, [], JSON_NUMERIC_CHECK);

    }

    /**
     * Modificar cliente
     * 
     * Modifica un cliente
     *
     * @urlParam  id required El ID del cliente.
     * 
     * @bodyParam  razsoc_cli string required Razon social del cliente.
     * @bodyParam  numdoc_cli string required Numero de documento del cliente.
     * @bodyParam  ema_cli string Email del cliente.
     * @bodyParam  id_tipodoc int Tipo de documento del cliente.
     * 
     * @response {
     *    "resp": "cliente actualizado"
     * }
     */
    public function update(ClienteRequest $request, $id) 
    {
        DB::beginTransaction();

        try {
            $cliente = Cliente::find($id);
            $cliente->fill(array(
                'razsoc_cli' => $request->input('razsoc_cli'),
                'numdoc_cli' => $request->input('numdoc_cli'),
                'ema_cli' => $request->input('ema_cli'),
                'id_tipdoc' => $request->input('id_tipdoc'),
            ))->save();

            // $contactos = $request->input('contactos');

            // if($contactos) {
            //     foreach($contactos as $contacto) {
            //         //nuevos => id < 0 //existentes > 0
            //         if($contacto['id_cli_con'] < 0){
            //             $clienteContacto = ClienteContacto::create([
            //                 'nom_cli_con' => $contacto['nom_cli_con'],
            //                 'ema_cli_con' => $contacto['ema_cli_con'],
            //                 'tel_cli_con' => $contacto['tel_cli_con'],
            //                 'id_cli' => $cliente->id_cli,
            //                 'est_reg' => 'A'
            //             ]);
            //         } else {
            //             $clienteContacto = ClienteContacto::find($contacto['id_cli_con']);
            //             $clienteContacto->fill(array(
            //                 'nom_cli_con' => $contacto['nom_cli_con'],
            //                 'ema_cli_con' => $contacto['ema_cli_con'],
            //                 'tel_cli_con' => $contacto['tel_cli_con'],
            //                 'est_reg' => $contacto['est_reg'],
            //             ))->save();
            //         }
            //     }
            // }

            // $direcciones = $request->input('direcciones');

            // if($direcciones) {
            //     foreach($direcciones as $direccion) {
            //         //nuevos => id < 0 //existentes > 0
            //         if($direccion['id_cli_dir'] < 0){
            //             $clienteDireccion = ClienteDireccion::create([
            //                 'ciu_cli' => $direccion['ciu_cli'],
            //                 'dir_cli' => $direccion['dir_cli'],
            //                 'tel_cli' => $direccion['tel_cli'],
            //                 'id_cli' => $cliente->id_cli,
            //                 'est_reg' => 'A'
            //             ]);
            //         } else {
            //             $clienteDireccion = ClienteDireccion::find($direccion['id_cli_dir']);
            //             $clienteDireccion->fill(array(
            //                 'ciu_cli' => $direccion['ciu_cli'],
            //                 'dir_cli' => $direccion['dir_cli'],
            //                 'tel_cli' => $direccion['tel_cli'],
            //                 'est_reg' => $direccion['est_reg'],
            //             ))->save();
            //         }
            //     }
            // } Mantenimiento de software
                
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
        $descripcion = "Se modifico el cliente con ID: ".$cliente->id_cli;
        $logs = new LogsController();
        $logs->create_log($descripcion,2);
        ///////
        return response()->json([
            'resp' => 'Cliente Actualizado'
        ], 200, [], JSON_NUMERIC_CHECK);
    }

    /**
     * Eliminar cliente
     * 
     * Elimina un cliente
     *
     * @urlParam  id required El ID del cliente.
     * 
     * @response {
     *    "resp": "cliente eliminado"
     * }
     */
    public function delete($id) {

        DB::beginTransaction();

        try {
            $cliente = Cliente::find($id);
            $cliente->fill(array('est_reg' => 'E'))->save();

            DB::table('cliente_contacto')
                ->where([
                    ['id_cli', '=', $cliente->id_cli],
                    ['est_reg', '!=', 'E']
                ])->update(['est_reg' => 'E']);

            DB::table('cliente_direccion')
                ->where([
                    ['id_cli', '=', $cliente->id_cli],
                    ['est_reg', '!=', 'E']
                ])->update(['est_reg' => 'E']);

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
        $descripcion = "Se elimino el cliente con ID: ".$cliente->id_cli;
        $logs = new LogsController();
        $logs->create_log($descripcion, 3);
        ///////
        return response()->json([
            'resp' => 'Cliente Eliminado'
        ], 200, [], JSON_NUMERIC_CHECK);
    }

    /**
     * Administrar contactos y direcciones
     * 
     * Crea, Actualiza y elimina, contactos y direcciones de un cliente
     *
     * @urlParam  id required El ID del cliente.
     * 
     * @bodyParam  contactos array required Ejemplo: [{"id_cli_con": 0,"nom_cli_con":"string","ema_cli_con":"string","cel_cli_con":"string","ane_cli_con":"string","car_cli_con":"string","est_reg": "string"}]
     * @bodyParam  direcciones array required Ejemplo: [{"id_cli_dir": 0,"ciu_cli":"string","dir_cli":"string","tel_cli":"string","est_reg": "string"}]
     *
     * 
     * @response {
     *    "resp": "contactos y direcciones actualizados"
     * }
     */
    public function admContactosYdirecciones(ClienteContactoDireccionRequest $request, $id) 
    {
        DB::beginTransaction();

        try {
            $contactos = $request->input('contactos');

            if($contactos) {
                foreach($contactos as $contacto) {
                    //nuevos => id < 0 //existentes > 0
                    if($contacto['id_cli_con'] < 0){
                        ClienteContacto::create([
                            'nom_cli_con' => $contacto['nom_cli_con'],
                            'ema_cli_con' => $contacto['ema_cli_con'],
                            'cel_cli_con' => $contacto['cel_cli_con'],
                            'ane_cli_con' => $contacto['ane_cli_con'],
                            'car_cli_con' => $contacto['car_cli_con'],
                            'id_cli' => $id,
                            'est_reg' => 'A'
                        ]);
                    } else {
                        $clienteContacto = ClienteContacto::find($contacto['id_cli_con']);
                        $clienteContacto->fill(array(
                            'nom_cli_con' => $contacto['nom_cli_con'],
                            'ema_cli_con' => $contacto['ema_cli_con'],
                            'cel_cli_con' => $contacto['cel_cli_con'],
                            'ane_cli_con' => $contacto['ane_cli_con'],
                            'car_cli_con' => $contacto['car_cli_con'],
                            'est_reg' => $contacto['est_reg'],
                        ))->save();
                    }
                }
            }

            $direcciones = $request->input('direcciones');

            if($direcciones) {
                foreach($direcciones as $direccion) {
                    //nuevos => id < 0 //existentes > 0
                    if($direccion['id_cli_dir'] < 0){
                        ClienteDireccion::create([
                            'ciu_cli' => $direccion['ciu_cli'],
                            'dir_cli' => $direccion['dir_cli'],
                            'tel_cli' => $direccion['tel_cli'],
                            'id_cli' => $id,
                            'est_reg' => 'A'
                        ]);
                    } else {
                        $clienteDireccion = ClienteDireccion::find($direccion['id_cli_dir']);
                        $clienteDireccion->fill(array(
                            'ciu_cli' => $direccion['ciu_cli'],
                            'dir_cli' => $direccion['dir_cli'],
                            'tel_cli' => $direccion['tel_cli'],
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
        $descripcion = "Se modifico el cliente con ID: ".$id;
        $logs = new LogsController();
        $logs->create_log($descripcion,2);
        ///////
        return response()->json([
            'resp' => 'Cliente Actualizado'
        ], 200, [], JSON_NUMERIC_CHECK);
    }

    public function createContacto(Request $request) 
    {
        DB::beginTransaction();

        try {
            $contacto = ClienteContacto::create([
                'nom_cli_con' => $request->input('nom_cli_con'),
                'ema_cli_con' => $request->input('ema_cli_con'),
                'cel_cli_con' => $request->input('cel_cli_con'),
                'ane_cli_con' => $request->input('ane_cli_con'),
                'car_cli_con' => $request->input('car_cli_con'),
                'id_cli' => $request->input('id_cli'),
                'est_reg' => 'A'
            ]);
                
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
        $descripcion = "Se creo el contacto con ID: ".$contacto->id_cli_con;
        $logs = new LogsController();
        $logs->create_log($descripcion,1);
        ///////
        return response()->json([
            'resp' => 'Contacto Creado'
        ], 200, [], JSON_NUMERIC_CHECK);
    }

    public function createDireccion(Request $request) 
    {
        DB::beginTransaction();

        try {
            $direccion = ClienteDireccion::create([
                'ciu_cli' => $request->input('ciu_cli'),
                'dir_cli' => $request->input('dir_cli'),
                'tel_cli' => $request->input('tel_cli'),
                'id_cli' => $request->input('id_cli'),
                'est_reg' => 'A'
            ]);
                
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
        $descripcion = "Se creo la direccion con ID: ".$direccion->id_cli_dir;
        $logs = new LogsController();
        $logs->create_log($descripcion,1);
        ///////
        return response()->json([
            'resp' => 'Direccion Creada'
        ], 200, [], JSON_NUMERIC_CHECK);
    }

}