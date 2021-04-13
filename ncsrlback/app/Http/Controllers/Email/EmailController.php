<?php

namespace App\Http\Controllers\Email;

use DateTime;
use Mail;
use Swift_Mailer;
use Swift_MailTransport;
use Swift_SmtpTransport;
use Swift_Message;
use App\Models\ProformaCliente\ProformaCliente;
use App\Models\OrdenCompra\OrdenCompra;
use App\Models\CotizacionProveedor\CotizacionProveedor;
use Illuminate\Support\Facades\Crypt;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\LogsController;
use Symfony\Component\HttpFoundation\Response;
use App\Models\CotizacionCliente\CotizacionCliente;
use App\Models\CotizacionCliente\CotizacionClienteDetalle;
use App\Models\Empresa\Empresa;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\Clientes\Cliente\ClienteRequest as ClienteRequest;
use App\Http\Requests\Clientes\Cliente\ClienteContactoDireccionRequest as ClienteContactoDireccionRequest;

/**
 * @group Emails
 * APIs para enviar correos
 */
class EmailController extends Controller
{

    /**
     * Enviar Email
     * 
     * Envia un correo (Usar Body-> form-data en Postman, FormData en Angular)
     *
     * @bodyParam  archivo blob Archivo adjunto.
     * @bodyParam  asunto string Asunto del correo.
     * @bodyParam  cc string Correo Adjunto (correo del usuario logueado).
     * @bodyParam  mensaje string Mensaje del correo.
     * @bodyParam  destinatario string required Correo destino.
     * @bodyParam  tabla string Tabla de Referencia para actualizacion de estado de envio (Cotizacion de proveedor: 'cot-prov', Proforma: 'proforma').
     * @bodyParam  doc_referencia string ID del documento de referencia de la Tabla para actualizacion de estado de envio.
     * 
     * @response {
     *    "resp": "Correo Enviado"
     * }
     */
    public function sendEmail(Request $request){
        $asunto = $request->input('asunto') && $request->input('asunto') != "" ? $request->input('asunto') : null;
        $cc = $request->input('cc') && $request->input('cc') != "" ? $request->input('cc') : null;
        $mensaje = $request->input('mensaje') ? $request->input('mensaje') : " ";
        $destinatario =$request->input('destinatario');
        $archivo = $request->file('archivo');

        $tabla = $request->input('tabla');
        $doc_referencia = $request->input('doc_referencia');

        Mail::raw($mensaje, function ($message) use($asunto,$cc,$destinatario,$archivo) {
            $message->from(getenv("MAIL_USERNAME"),"NETWORK CONTROL");
            if($asunto) {
                $message->subject($asunto);
            }
            $message->to($destinatario);
            if($cc) {
                $message->cc($cc);
            }
            if($archivo) {
                $message->attachData(file_get_contents($archivo), $archivo->getClientOriginalName(), [
                    'mime' => $archivo->extension(),
                ]);
            }
        });

        if($tabla != null && $doc_referencia != null) {
            switch ($tabla) {
                case "cot-prov":
                    $cotizacionProveedor = CotizacionProveedor::find(intval($doc_referencia));
                    $cotizacionProveedor->fill(array('est_env' => '1'))->save();
                    break;
                case "proforma":
                    $proforma = ProformaCliente::find(intval($doc_referencia));
                    $proforma->fill(array('est_env' => '1'))->save();
                    break;
                case "orden":
                    $orden = OrdenCompra::find(intval($doc_referencia));
                    $orden->fill(array('est_env' => '1'))->save();
                    break;
            }
        }

        return response()->json([
            'resp' => 'Correo Enviado'
        ], 200, [], JSON_NUMERIC_CHECK);

    }

}
