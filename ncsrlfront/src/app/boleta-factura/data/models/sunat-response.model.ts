export class SunatResponse {
    xml: string;
    hash: string;
    sunatResponse: SunatResp;
}

export class SunatResp {
    success: boolean;
    error: SunatError;
    cdrZip: string;
    cdrResponse: CdrResponse;
}

export class CdrResponse {
    id: string;
    code: string;
    description: string;
    notes: any;
}

export class SunatError {
    code: string;
    message: string;
}