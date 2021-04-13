<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\LogsController;
use Symfony\Component\HttpFoundation\Response;
use App\Models\Empresa\Empresa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;

/**
 * @group Empresa
 * APIs para empresa
 */
class EmpresaController extends Controller
{
    /**
     * Retornar empresa
     * 
     * Retorna empresa
     * 
     *
     * @response {
     *      "empresa" : {
     *          "id_emp": 0,
     *          "nom_emp": "string",
     *          "numdoc_emp": "string",
     *          "dir_emp": "string",
     *          "dis_emp": "string",
     *          "ciu_emp": "string",
     *          "tel_emp": "string",
     *          "cel_emp": "string",
     *          "codciu_emp": "string",
     *          "img_emp": "string",
     *          "imgext_emp": "string",
     *          "id_tipdoc": 0,
     *          "tipo_documento": {
     *              "id_tipdoc": 0,
     *              "des_tipdoc": "string"
     *          }
     *      },
     *      "logo" : "Archivo codificado en base 64"
     * }
     */
    public function get()
    {        
        try {
            $empresa = Empresa::with(['tipo_documento'] )->find(1);
            if(!$empresa) {
                $empresa = Empresa::create([
                    'id_emp' => 1
                ]);
            }
        } catch (Exception $e) {
            return response()->json([
                'error' => 'ocurrio un error en el servidor',
                'desc' => $e
            ], 500);
        }
        
        if($empresa) {

            $b64_file = null;
            if ($empresa->img_emp) {
                $b64_file = base64_encode(Storage::disk('local')->get($empresa->img_emp));
            }
            
            return response()->json([
                'empresa' => $empresa,
                'logo' => $b64_file
            ], 200, []);
            //return response()->json($cliente, 200, [], JSON_NUMERIC_CHECK);
        } else {
            return response()->json([
                'resp' => 'No se encontro la empresa'
            ], 500);
        }
    }

    /**
     * Modificar Empresa
     * 
     * Modifica datos de la empresa (Usar Body-> form-data en Postman)
     *
     * @bodyParam  logo blob  Logotipo de la empresa usar form-data para subir.
     * @bodyParam  nom_emp string  Nombre de la Empresa.
     * @bodyParam  numdoc_emp string Numero de Documento de la empresa.
     * @bodyParam  dir_emp string Direccion de la empresa.
     * @bodyParam  dis_emp string Distrito de la empresa.
     * @bodyParam  ciu_emp string Ciudad de la empresa.
     * @bodyParam  tel_emp string Telefono de la empresa.
     * @bodyParam  cel_emp string Celular de la empresa.
     * @bodyParam  codciu_emp string Codigo de ciudad de la empresa.
     * @bodyParam  id_tipodoc int Tipo de documento de la empresa.
     * 
     * @response {
     *    "resp": "Datos actualizados"
     * }
     */
    public function update(Request $request)
    {
        $nom_emp = $request->input('nom_emp');
        $numdoc_emp = $request->input('numdoc_emp');
        $dir_emp = $request->input('dir_emp');
        $dis_emp = $request->input('dis_emp');
        $ciu_emp = $request->input('ciu_emp');
        $tel_emp = $request->input('tel_emp');
        $cel_emp = $request->input('cel_emp');
        $codciu_emp = $request->input('codciu_emp');
        $id_tipdoc = $request->input('id_tipdoc');

        $image = $request->file('logo');

        $img_emp = "";

        if($image) {
            $img_emp = $image->getClientOriginalName();
            $imgext_emp = $image->extension();
            //$img_emp->move('uploads', $image->getClientOriginalName());
        }

        DB::beginTransaction();

        try {
            $empresa = Empresa::find(1);
            if(!$empresa) {
                $empresa = Empresa::create([
                    'id_emp' => 1
                ]);
            }
            // $existImage = $empresa->img_emp;

            if($image) {
                $empresa->fill(array(
                    'nom_emp' => $nom_emp,
                    'numdoc_emp' => $numdoc_emp,
                    'dir_emp' => $dir_emp,
                    'dis_emp' => $dis_emp,
                    'ciu_emp' => $ciu_emp,
                    'tel_emp' => $tel_emp,
                    'cel_emp' => $cel_emp,
                    'codciu_emp' => $codciu_emp,
                    'id_tipdoc' => $id_tipdoc,
                    'img_emp' => $img_emp,
                    'imgext_emp' => $imgext_emp,
                ))->save();

                //$image->move('uploads', $image->getClientOriginalName());
                
                // if($existImage) {
                //     Storage::disk('local')->delete($existImage);
                // }
                
                Storage::disk('local')->put($img_emp, file_get_contents($image));
                //Storage::disk('local')->put( $image->getClientOriginalName(),'uploads', $image);
                // $path = Storage::putFile('uploads', $image);
                // error_log('Some message here: '.$path);
            }else {
                $empresa->fill(array(
                    'nom_emp' => $nom_emp,
                    'numdoc_emp' => $numdoc_emp,
                    'dir_emp' => $dir_emp,
                    'dis_emp' => $dis_emp,
                    'ciu_emp' => $ciu_emp,
                    'tel_emp' => $tel_emp,
                    'cel_emp' => $cel_emp,
                    'codciu_emp' => $codciu_emp,
                    'id_tipdoc' => $id_tipdoc,
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

        // //Logs
        // $descripcion = "Se modifico datos de la empresa: ".$empresa->id_emp;
        // $logs = new LogsController();
        // $logs->create_log($descripcion,2);
        // ///////

        $b64_file = null;
        if ($empresa->img_emp) {
            $b64_file = base64_encode(Storage::disk('local')->get($empresa->img_emp));
        }

        return response()->json([
            'resp' => 'Empresa Actualizada',
            'logo' => $b64_file,
            'ext' => $empresa->imgext_emp
        ], 200, [], JSON_NUMERIC_CHECK);
       


        //$image->move('uploads', $image->getClientOriginalName());


        // $image = $request->file('prueba');
        // $image->move('uploads', $image->getClientOriginalName());

        // $filename = $request->file('prueba')->getClientOriginalName();
        // $ruc = $request->input('ruc');
        // error_log('Some message here: '.$ruc);
    }


    public function getLogo()
    {        
        $empresa = Empresa::find(1);

        if($empresa && $empresa->img_emp) {
            $file = Storage::disk('local')->get($empresa->img_emp);
            return response($file, 200)->header('Content-Type', $empresa->imgext_emp);
        } else {
            return response()->json([
                'resp' => 'No se encontro el logotipo'
            ], 500);
        }
    }

}
