export class SistemaFinanceiro{

    id:number;
    Nome:string;
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