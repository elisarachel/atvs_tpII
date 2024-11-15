import { NomeAcomodacao } from "../enumeracoes/NomeAcomodacao";
import Construtor from "../interfaces/construtor";
import Acomodacao from "../models/acomodacao";
import { v4 as uuidv4 } from 'uuid';

export default class ConstrutorAcomodacao implements Construtor<Acomodacao>{
    private nomeAcomodacao: NomeAcomodacao = NomeAcomodacao.SolteiroSimples
    private camaSolteiro: number = 0
    private camaCasal: number = 0
    private suite: number = 0
    private climatizacao: boolean = false
    private garagem: number = 0

    public set NomeAcomodacao(nomeAcomodacao: NomeAcomodacao) { this.nomeAcomodacao = nomeAcomodacao }
    public set CamaSolteiro(camaSolteiro: number) { this.camaSolteiro = camaSolteiro }
    public set CamaCasal(camaCasal: number) { this.camaCasal = camaCasal }
    public set Suite(suite: number) { this.suite = suite }
    public set Climatizacao(climatizacao: boolean) { this.climatizacao = climatizacao }
    public set Garagem(garagem: number) { this.garagem = garagem }

    construir(): Acomodacao {
        return {
            id: uuidv4(),
            nomeAcomodacao: this.nomeAcomodacao,
            camaSolteiro: this.camaSolteiro,
            camaCasal: this.camaCasal,
            suite: this.suite,
            climatizacao: this.climatizacao,
            garagem: this.garagem,
        } as Acomodacao;
    }
}