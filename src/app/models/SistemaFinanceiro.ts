import { Data } from "@angular/router";

export class SistemaFinanceiro{

    id:number;
    nome?:string;
    dataCadastro:Data;
    anoBase:string;
    ativo:boolean;
    metaAnual:number;
    NomePropriedade?:string="";
    mensagem?:string="";
    notificacoes?:[];
}