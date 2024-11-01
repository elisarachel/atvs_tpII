import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";
import ImpressorHospedagem from "../impressores/impressorHospedagem";
import Impressor from "../interfaces/impressor";
import Hospedagem from "../modelos/hospedagem";

export default class ListagemHospedagensAtivas extends Processo {
    private hospedagens: Hospedagem[];
    private impressor!: Impressor;

    constructor() {
        super();
        this.hospedagens = Armazem.InstanciaUnica.HospedagensAtivas;
    }

    processar(): void {
        console.clear();
        console.log('Iniciando a listagem das hospedagens ativas...');
        this.hospedagens.forEach(hospedagem => {
            if (this.hospedagemAtiva(hospedagem)) {
                this.impressor = new ImpressorHospedagem(hospedagem);
                console.log(this.impressor.imprimir());
            }
        });
    }

    private hospedagemAtiva(hospedagem: Hospedagem): boolean {
        // Verifica se a hospedagem está ativa, ou seja, se o check-out não foi registrado
        return hospedagem.CheckOut === undefined;
    }
}
