import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";
import Hospedagem from "../modelos/hospedagem";

export default class RegistrarCheckOut extends Processo {
    private documento: string;

    constructor(documento: string) {
        super();
        this.documento = documento;
    }

    processar(): void {
        console.clear();
        console.log(`Iniciando o processo de check-out para o documento: ${this.documento}`);
        
        // Encontra o índice da hospedagem ativa com base no documento e que ainda não tenha CheckOut
        const indiceHospedagem = Armazem.InstanciaUnica.HospedagensAtivas.findIndex(
            h => h.Documento.Numero === this.documento && h.CheckOut === undefined
        );

        if (indiceHospedagem !== -1) {
            // Obtém a hospedagem encontrada
            const hospedagem = Armazem.InstanciaUnica.HospedagensAtivas[indiceHospedagem];
            
            // Registra a data de check-out na hospedagem
            hospedagem.registrarCheckOut(new Date());
            console.log(`Check-out registrado para ${hospedagem.Hospede} na acomodação ${hospedagem.Acomodacao.NomeAcomodacao}.`);

            // Remove a hospedagem da lista de hospedagens ativas
            Armazem.InstanciaUnica.HospedagensAtivas.splice(indiceHospedagem, 1);
        } else {
            console.log("Hospedagem ativa não encontrada para o documento fornecido.");
        }
    }
}
