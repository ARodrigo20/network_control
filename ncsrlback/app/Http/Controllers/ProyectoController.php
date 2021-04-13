<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\LogsController;
use Symfony\Component\HttpFoundation\Response;
use App\Models\Proyecto\Proyecto;
use Illuminate\Http\Request;

/**
 * @group Proyecto
 * APIs para proyecto
 */
class ProyectoController extends Controller
{
    /**
     * Retornar proyectos
     *
     * Retorna todos los proyectos
     *
     *
     * @response {
     *  "data" : [
     *     {
     *       "id_proy": 0,
     *       "nom_proy": "string",
     *       "ser_proy": "NTWC-P-",
     *       "num_proy": "000X",
     *       "created_at": "2020-06-14T06:07:02.419Z",
     *       "updated_at": "2020-06-14T06:07:02.419Z"
     *     }
     *  ],
     *  "size":0
     * }
     */

    public function get()
    {
        // Log::info('Pasooo:');
        try {
            $proyecto = Proyecto::with(['cliente'])->where('est_reg', '!=', 'E')->get();
        } catch (Exception $e) {
            return response()->json([
                'error' => 'ocurrio un error en el servidor',
                'desc' => $e
            ], 500);
        }
        // $proyecto =Proyecto::all();
        return response()->json([
            'data' => $proyecto,
            'size' => count($proyecto)
        ], 200, [],);
    }


    /**
     * Retornar proyectos solo terminados
     *
     * Retorna todos los proyectos
     *
     *
     * @response {
     *  "data" : [
     *     {
     *       "id_proy": 0,
     *       "nom_proy": "string",
     *       "ser_proy": "NTWC-P-",
     *       "num_proy": "000X",
     *       "created_at": "2020-06-14T06:07:02.419Z",
     *       "updated_at": "2020-06-14T06:07:02.419Z"
     *     }
     *  ],
     *  "size":0
     * }
     */

    public function getTerminados()
    {
        // Log::info('Pasooo:');
        try {
            $proyecto = Proyecto::with(['cliente'])->where('est_reg', "T")->get();
        } catch (Exception $e) {
            return response()->json([
                'error' => 'ocurrio un error en el servidor',
                'desc' => $e
            ], 500);
        }
        // $proyecto =Proyecto::all();
        return response()->json([
            'data' => $proyecto,
            'size' => count($proyecto)
        ], 200, [],);
    }

    /**
     * Retornar proyectos solo en proceso
     *
     * Retorna todos los proyectos
     *
     *
     * @response {
     *  "data" : [
     *     {
     *       "id_proy": 0,
     *       "nom_proy": "string",
     *       "ser_proy": "NTWC-P-",
     *       "num_proy": "000X",
     *       "created_at": "2020-06-14T06:07:02.419Z",
     *       "updated_at": "2020-06-14T06:07:02.419Z"
     *     }
     *  ],
     *  "size":0
     * }
     */

    public function getProceso()
    {
        // Log::info('Pasooo:');
        try {
            $proyecto = Proyecto::with(['cliente'])->where('est_reg', "A")->get();
        } catch (Exception $e) {
            return response()->json([
                'error' => 'ocurrio un error en el servidor',
                'desc' => $e
            ], 500);
        }
        // $proyecto =Proyecto::all();
        return response()->json([
            'data' => $proyecto,
            'size' => count($proyecto)
        ], 200, [],);
    }


    /**
     * Retornar proyecto 
     *
     * Retorna proyecto  por Id
     *
     * @urlParam  id required El ID del proyecto .
     *
     * @response {
     *       "id_proy": 0,
     *       "nom_proy": "string",
     *       "ser_proy": "NTWC-P-",
     *       "num_proy": "char",
     *       "created_at": "2020-06-14T06:07:02.419Z",
     *       "updated_at": "2020-06-14T06:07:02.419Z"
     * }
     */

    public function getById($id)
    {
        try {
            $proyecto=Proyecto::with(['cliente'])->find($id);
        } catch (Exception $e) {
            return response()->json([
                'error' => 'ocurrio un error en el servidor',
                'desc' => $e
            ], 500);
        }

        if($proyecto) {
            return response()->json($proyecto, 200, [],);
        } else {
            return response()->json([
                'resp' => 'No se encontro el proyecto del '
            ], 500);
        }
    }

    /**
     * Crear proyecto
     *
     * Crea un proyecto
     *
     * @bodyParam  nom_proy string required nombre del proyecto.
     * @bodyParam  id_cli del cliente.
     *
     * @response {
     *    "resp": "proyecto creado"
     * }
     */

    public function create(Request $request)
    {
        try {
            $proyecto = Proyecto::create([
                'nom_proy' => $request->input('nom_proy'),
                'ser_proy' => 'NTWC-P-',
                'num_proy' => '',
                'id_cli' => $request->input('id_cli'),
                'est_reg' => 'A'
            ]);

            $xd = $proyecto->id_proy;
            $xd2 = "".sprintf("%'.04d\n", $xd);
            $proyecto2 = Proyecto::find($xd);
            $proyecto2->fill(array(   
                'num_proy' => $xd2,
                
                                      
            ))->save();
            // error_log(sprintf("%'.04d\n", $xd));
        } catch (Exception $e) {
            return response()->json([
                'error' => 'ocurrio un error en el servidor',
                'desc' => $e
            ], 500);
        }

        //Logs
        $descripcion = "Se creo el proyecto del  con ID: ".$proyecto->id_proy;
        
        $logs = new LogsController();
        $logs->create_log($descripcion, 1);
        ///////
        return response()->json([
            'resp' => 'proyecto creado'
        ], 200, [], JSON_NUMERIC_CHECK);
    }

    /**
     * Modificar proyecto 
     *
     * Modifica un proyecto 
     *
     * @urlParam  id required El ID del proyecto .
     * @bodyParam  nom_proy string required nombre del proyecto.
     * @bodyParam  est_reg char Estado de registro para cambiar .
     * @bodyParam  id_cli char Estado de registro para cambiar .
     * @response {
     *    "resp": "proyecto  actualizado"
     * }
     */

    public function update(Request $request, $id)
    {
        try {
            $proyecto = Proyecto::find($id);
            $proyecto->fill(array(
                'nom_proy' => $request->input('nom_proy'),
                'ser_proy' => $proyecto->ser_proy,
                'num_proy' => $proyecto->num_proy,
                'est_reg'   => $request->input('est_reg'),
                'id_cli' => $request->input('id_cli'),
                
            ))->save();
        } catch (Exception $e) {
            return response()->json([
                'error' => 'ocurrio un error en el servidor',
                'desc' => $e
            ], 500);
        }

        //Logs
        $descripcion = "Se modifico el proyecto del  con ID: ".$proyecto->id_proy;
        $logs = new LogsController();
        $logs->create_log($descripcion,2);
        ///////
        return response()->json([
            'resp' => 'proyecto del  Actualizado'
        ], 200, [], JSON_NUMERIC_CHECK);
    }

    /**
     * Eliminar proyecto 
     *
     * Elimina un proyecto 
     *
     * @urlParam  id required El ID del proyecto .
     *
     * @response {
     *    "resp": "proyecto  eliminado"
     * }
     */

    public function delete($id) {
        try {
            $proyecto = Proyecto::find($id);
            $proyecto->fill(array('est_reg' => 'E'))->save();
        } catch (Exception $e) {
            return response()->json([
                'error' => 'ocurrio un error en el servidor',
                'desc' => $e
            ], 500);
        }

        //Logs
        $descripcion = "Se elimino el proyecto del  con ID: ".$proyecto->id_proy;
        $logs = new LogsController();
        $logs->create_log($descripcion, 3);
        ///////
        return response()->json([
            'resp' => 'proyecto Eliminado'
        ], 200, [], JSON_NUMERIC_CHECK);
    }

}
