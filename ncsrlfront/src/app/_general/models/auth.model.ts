import { Empresa } from '@app/empresa/data/models/empresa.model';
import { User } from '../models/user.model';

export class AuthModel {
    token: string;
    user: User;
    logo: string;
    logo_ext: string;
    empresa: Empresa;
}