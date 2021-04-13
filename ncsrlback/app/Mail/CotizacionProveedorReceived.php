<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class CotizacionProveedorReceived extends Mailable
{
    use Queueable, SerializesModels;
    public $data;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($data)
    {
        $this->data = $data;
        //
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        
        /*return $this->view('emails.cotizacion-proveedor')->attach(public_path($this->data),[
            'as' => $this->data->getClientOriginalName()
        ]);
         *
        $name=$this->data['name'];
        return $this->view('emails.cotizacion-proveedor',compact('name'))
                    ->attach($this->data['file']->getRealPath(), [
                        'as' => $this->data['file']->getClientOriginalName()
                    ]);

        $email=$this->view('emails.cotizacion-proveedor');
        $email->attach(public_path($this->data));
        return $email;
         *
         * */

        $info = $this->data['name'];
        return $this->from($this->data['usu'])->subject('Cotizacion del Proveedor')
                    ->view('email_template',compact('info'))
                    ->attach($this->data['pdf']->getRealPath(), ['as' => $this->data['pdf']->getClientOriginalName()
                    ]);


    }
}
