import ConstrutorAcomodacao from "../construtores/construtorAcomodacao";
import { NomeAcomodacao } from "../enumeracoes/NomeAcomodacao";
import Acomodacao from "../models/acomodacao";
import Diretor from "../abstracoes/diretor";

export default class DiretorSolteiroMais extends Diretor<Acomodacao> {

    constructor() {
        super();
        this.construtor = new ConstrutorAcomodacao();
    }

    public construir(): Acomodacao {
        let objetoConstrutor = this.construtor as ConstrutorAcomodacao;
        objetoConstrutor.NomeAcomodacao = NomeAcomodacao.SolteiroMais;
        objetoConstrutor.CamaCasal = 1;
        objetoConstrutor.CamaSolteiro = 0;
        objetoConstrutor.Climatizacao = true;
        objetoConstrutor.Garagem = 1;
        objetoConstrutor.Suite = 1;
        return objetoConstrutor.construir();
    }
}
