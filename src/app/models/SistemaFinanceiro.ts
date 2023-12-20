export class SistemaFinanceiro{

    id:number;
    Nome:string;
    nome?:string;
    Mes:Number;
    Ano:Number;
    DiaFechamento:Number;
    GerarCopiaDespesa:Boolean;
    MesCopia:Number;
    AnoCopia:number;

    NomePropriedade?:string="";
    mensagem?:string="";
    notificacoes?:[];
}