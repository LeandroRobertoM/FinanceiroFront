export class Despesa
{
    idDespesa?: number;
    nome?: string;
    valor?: number;
    mes?: number;
    ano?: number;
    tipoDespesa?: number;
    dataCadastro?: Date;
    dataAlteracao?: Date;
    dataPagamento?: Date;
    dataVencimento?: Date;
    pago?: boolean;
    despesaAtrasada?: boolean;
    categoriaId?: number;

    NomePropriedade?:string="";
    mensagem?:string="";
    notificacoes?:[];
}