<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;
use App\Models\Logs\RegistroCambio;

/**
 * @group Registro de Cambios
 * APIs para Registro de cambios
 */
class LogsController extends Controller
{   
    
    /**
     * Retornar Registros de Cambio
     * 
     * Retorna todos los registros de cambio
     * 
     * 
     * @response {
     *  "data" : [
     *     {
     *       "id_regcam": 0,
     *       "des_regcam": "string",
     *       "id_col": 0,
     *       "id_tipcam": 0,
     *       "created_at": "2020-06-14T06:07:02.419Z",
     *       "usuarios": {
     *          "id_col": 0,
     *          "nom_col": "string"
     *          "ape_col": "string"
     *          "email": "string"
     *       },
     *       "tipo_cambio": {
     *          "id_tipcam": 0,
     *          "des_tipcam": "string"
     *       }
     *     }
     *  ],
     *  "size":0
     * }
     */
    public function get()
    {
        try {
            $logs = RegistroCambio::with(['users','tipo_cambio'])->orderBy('id_regcam', 'desc')->get();
        } catch (Exception $e) {
            return response()->json([
                'error' => 'ocurrio un error en el servidor',
                'desc' => $e
            ], 500);
        }
        
        return response()->json([
            'data' => $logs,
            'size' => count($logs)
        ], 200, [], JSON_NUMERIC_CHECK);
    }

    public function create_log($descripcion, $tipo_cambio)
    {
        // $enabled_log = (boolean) getenv("APP_LOGS");
        // if($enabled_log === true) {
        //     Log::info('Registro de Cambio: '.$descripcion.", Usuario: ".$user->id_col." Tipo de Cambio: ".$tipo_cambio);
        // }
        //Log::info('Registro de Cambio: '.$descripcion.", Usuario: ".$user->id_col." Tipo de Cambio: ".$tipo_cambio);
        

        //habilitar o desabilitar
        $enabled_logs = true;

        if($enabled_logs) {
            $user = Auth::user();
            $user = RegistroCambio::create([
                'des_regcam' => $descripcion,
                'id_col' => $user->id_col,
                'id_tipcam' => $tipo_cambio
            ]);
        }

    }
}
