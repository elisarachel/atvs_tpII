import Hospedagem from "../modelos/hospedagem";
import Impressor from "../interfaces/impressor";

export default class ImpressorHospedagem implements Impressor {
    private hospedagem: Hospedagem;

    constructor(hospedagem: Hospedagem) {
        this.hospedagem = hospedagem;
    }

    public imprimir(): string {
        return `Hóspede: ${this.hospedagem.Hospede}\n` +
               `Documento: ${this.hospedagem.Documento.Numero} (${this.hospedagem.Documento.Tipo})\n` +
               `Acomodação: ${this.hospedagem.Acomodacao.NomeAcomodacao}\n` +
               `Check-in: ${this.hospedagem.CheckIn}\n` +
               `Check-out: ${this.hospedagem.CheckOut || "Ainda hospedado"}\n`;
    }
}
