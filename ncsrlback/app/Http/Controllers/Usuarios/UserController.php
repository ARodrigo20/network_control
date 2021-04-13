<?php

namespace App\Http\Controllers\Usuarios;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\LogsController;
use Symfony\Component\HttpFoundation\Response;
use App\User;
use App\Http\Requests\Usuarios\User\UserRequest as UserRequest;
use App\Http\Requests\Usuarios\User\UpdatePasswordRequest as UpdatePasswordRequest;
use Illuminate\Support\Facades\Auth;

/**
 * @group Usuarios
 * APIs para usuarios
 */
class UserController extends Controller
{   
    /**
     * Retornar usuarios
     * 
     * Retorna todos los usuarios
     * 
     * 
     * @response {
     *  "data" : [
     *     {
     *       "id_col": 0,
     *       "nom_col": "string",
     *       "ape_col": "string",
     *       "email": "string",
     *       "num_doc_col": "string",
     *       "id_tipdoc": 0,
     *       "cod_col": "string",
     *       "cel_col": "string",
     *       "id_car": 0,
     *       "est_reg": "string",
     *       "tipo_documento": {
     *          "id_tipdoc": 0,
     *          "des_tipdoc": "string"
     *       },
     *       "cargo": {
     *          "id_car": 0,
     *          "des_car": "string"
     *       }
     *     }
     *  ],
     *  "size":0
     * }
     */
    public function get()
    {
        try {
            $users = User::with(['cargo','tipo_documento'])->where([
                ['est_reg', '!=', 'E'],
                ['est_reg', '!=', 'SU']
            ])->get();
            // $users = DB::table('users')
            //                     ->select('id_col', 'nom_col', 'ape_col', 'email', 'num_doc_col', 'id_tipdoc', 'id_car', 'est_reg', 'created_at', 'updated_at')
            //                     ->where('est_reg', '!=', 'E')->get();
        } catch (Exception $e) {
            return response()->json([
                'error' => 'ocurrio un error en el servidor',
                'desc' => $e
            ], 500);
        }
        
        return response()->json([
            'data' => $users,
            'size' => count($users)
        ], 200, [], JSON_NUMERIC_CHECK);
    }
    
    /**
     * Retornar usuario
     * 
     * Retorna usuario por Id
     * 
     * @urlParam  id required El ID del usuario.
     * 
     * @response {
     *       "id_col": 0,
     *       "nom_col": "string",
     *       "ape_col": "string",
     *       "email": "string",
     *       "num_doc_col": "string",
     *       "cod_col": "string",
     *       "cel_col": "string",
     *       "id_tipdoc": 0,
     *       "id_car": 0,
     *       "est_reg": "string",
     *       "tipo_documento": {
     *          "id_tipdoc": 0,
     *          "des_tipdoc": "string"
     *       },
     *       "cargo": {
     *          "id_car": 0,
     *          "des_car": "string"
     *       }
     * }
     */
    public function getById($id)
    {
        // $user = User::with(['cargo','tipo_documento'])->find($id);
        // return response()->json($user, 200, [], JSON_NUMERIC_CHECK);
        
        try {
            $user = User::with(['cargo','tipo_documento'])->find($id);
            // $user = DB::table('users')
            //                     ->select('id_col', 'nom_col', 'ape_col', 'email', 'num_doc_col','id_tipdoc', 'id_car', 'est_reg', 'created_at', 'updated_at')
            //                     ->where('id_col', $id)->first();
        } catch (Exception $e) {
            return response()->json([
                'error' => 'ocurrio un error en el servidor',
                'desc' => $e
            ], 500);
        }
        
        if($user) {
            return response()->json($user, 200, [], JSON_NUMERIC_CHECK);
        } else {
            return response()->json([
                'resp' => 'No se encontro el usuario'
            ], 500);
        }
    }

    /**
     * Crear usuario
     * 
     * Crea un usuario
     * 
     * @bodyParam  nom_col string required Nombre del usuario
     * @bodyParam  ape_col string required Apellido del usuario.
     * @bodyParam  email string required Email del usuario.
     * @bodyParam  password string Contraseña del usuario.
     * @bodyParam  num_doc_col string required Numero de documento del usuario.
     * @bodyParam  cod_col string required Codigo interno del usuario.
     * @bodyParam  cel_col string Celular del usuario.
     * @bodyParam  id_tipdoc int codigo de Tipo de documento.
     * @bodyParam  id_car int codigo de Cargo.
     * 
     * @response {
     *    "resp": "usuario creado"
     * }
     */
    public function create(UserRequest $request)
    {
        $defaultPassword = "12345678";
        
        try {
            $user = User::create([
                'nom_col' => $request->input('nom_col'),
                'ape_col' => $request->input('ape_col'),
                'email' => $request->input('email'),
                'password' => $request->input('password') ? Hash::make($request->input('password')) : Hash::make($defaultPassword),
                'num_doc_col' => $request->input('num_doc_col'),
                'cod_col' => $request->input('cod_col'),
                'cel_col' => $request->input('cel_col'),
                'id_tipdoc' => $request->input('id_tipdoc'),
                'id_car' => $request->input('id_car'),
                'est_reg' => 'A'
            ]);
        } catch (Exception $e) {
            return response()->json([
                'error' => 'ocurrio un error en el servidor',
                'desc' => $e
            ], 500);
        }

        //Logs
        $descripcion = "Se creo el usuario con ID: ".$user->id_col;
        $logs = new LogsController();
        $logs->create_log($descripcion, 1);
        ///////
        return response()->json([
            'resp' => 'Usuario Creado'
        ], 200, [], JSON_NUMERIC_CHECK);
    }

    /**
     * Modificar usuario
     * 
     * Modifica un usuario
     *
     * @urlParam  id required El ID del usuario.
     * 
     * @bodyParam  nom_col string required Nombre del usuario
     * @bodyParam  ape_col string required Apellido del usuario.
     * @bodyParam  email string required Email del usuario.
     * @bodyParam  num_doc_col string required Numero de documento del usuario.
     * @bodyParam  cod_col string required Codigo interno del usuario.
     * @bodyParam  cel_col string Celular del usuario.
     * @bodyParam  id_tipdoc int codigo de Tipo de documento.
     * @bodyParam  id_car int codigo de Cargo.
     * 
     * @response {
     *    "resp": "usuario actualizado"
     * }
     */
    public function update(UserRequest $request, $id) 
    {
        try {
            $user = User::find($id);
            $user->fill(array(
                'nom_col' => $request->input('nom_col'),
                'ape_col' => $request->input('ape_col'),
                'email' => $request->input('email'),
                'num_doc_col' => $request->input('num_doc_col'),
                'cod_col' => $request->input('cod_col'),
                'cel_col' => $request->input('cel_col'),
                'id_tipdoc' => $request->input('id_tipdoc'),
                'id_car' => $request->input('id_car')
            ))->save();
        } catch (Exception $e) {
            return response()->json([
                'error' => 'ocurrio un error en el servidor',
                'desc' => $e
            ], 500);
        }

        //Logs
        $descripcion = "Se modifico el usuario con ID: ".$user->id_col;
        $logs = new LogsController();
        $logs->create_log($descripcion,2);
        ///////
        return response()->json([
            'resp' => 'Usuario Actualizado'
        ], 200, [], JSON_NUMERIC_CHECK);
    }

    /**
     * Eliminar usuario
     * 
     * Elimina un usuario
     *
     * @urlParam  id required El ID del usuario.
     * 
     * @response {
     *    "resp": "usuario eliminado"
     * }
     */
    public function delete($id) {
        try {
            $user = User::find($id);
            $user->fill(array('est_reg' => 'E'))->save();
        } catch (Exception $e) {
            return response()->json([
                'error' => 'ocurrio un error en el servidor',
                'desc' => $e
            ], 500);
        }

        //Logs
        $descripcion = "Se elimino el usuario con ID: ".$user->id_col;
        $logs = new LogsController();
        $logs->create_log($descripcion, 3);
        ///////
        return response()->json([
            'resp' => 'Usuario Eliminado'
        ], 200, [], JSON_NUMERIC_CHECK);
    }
    
    /**
     * Modificar Contraseña
     * 
     * Modifica la contraseña persona
     *
     * @urlParam  id required El ID del usuario.
     * 
     * @bodyParam  email string required Enail del usuario
     * @bodyParam  old_password string required Contraseña antigua.
     * @bodyParam  new_password string required Contraseña nueva.
     * 
     * @response {
     *    "resp": "Contraseña actualizada o credenciales no validas",
     *    "code": "200 o 101"
     * }
     */
    public function updatePassword(UpdatePasswordRequest $request, $id) 
    {
        $user = DB::table('users')->where('id_col', $id)->first();

        if (password_verify($request->input('old_password'), $user->password)) {
            $user = User::find($id);
            $user->fill(array(
                'password' => Hash::make($request->input('new_password')),
            ))->save();
        } else {
            return response()->json([
                'resp' => 'Credenciales no validas',
                'code' => 101
            ], 200, [], JSON_NUMERIC_CHECK);
        }

        return response()->json([
            'resp' => 'Contraseña actualizada',
            'code' => 200
        ], 200, [], JSON_NUMERIC_CHECK);
    }


    public function getFirma($id)
    {
        try {
            $user = User::find($id);
        } catch (Exception $e) {
            return response()->json([
                'error' => 'ocurrio un error en el servidor',
                'desc' => $e
            ], 500);
        }
        
        if($user) {
            $b64_file = null;
            if ($user->firma) {
                $b64_file = base64_encode($user->firma);
            }
            
            return response()->json([
                'firma' => $b64_file
            ], 200, []);
        } else {
            return response()->json([
                'resp' => 'No se encontro el usuario'
            ], 500);
        }
    }

    public function updateFirma(Request $request)
    {
        $user_id = $request->input('user_id');
        $firma = $request->file('firma');

        DB::beginTransaction();

        try {
            $user = User::find(intval($user_id));
            if($user && $firma) {
                $user->fill(array(
                    'firma' => $firma->openFile()->fread($firma->getSize())
                ))->save();
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

        $b64_file = null;
        if($user) {
            if ($user->firma) {
                $b64_file = base64_encode($user->firma);
            }
        }

        return response()->json([
            'resp' => 'Firma Actualizada',
            'firma' => $b64_file
        ], 200, [], JSON_NUMERIC_CHECK);
       
    }

}