import { Colaborador } from '@app/usuarios/data/models/colaborador.model';
import { TipoCambio } from './tipo-cambio.model';

export class RegistroCambio {
    id_regcam: number;
    des_regcam: string;
    det_regcam: string;
    id_tipcam: number;
    id_col: number;
    created_at: Date;
    users: Colaborador;
    tipo_cambio: TipoCambio;
}