import Acomodacao from "../modelos/acomodacao";
import Documento from "./documento";

export default class Hospedagem {
    private hospede: string; // Nome do hóspede
    private documento: Documento; // Documento de identificação do hóspede
    private acomodacao: Acomodacao; // Tipo de acomodação
    private checkIn: Date; // Data de check-in
    private checkOut?: Date; // Data de check-out (opcional para quem ainda está hospedado)

    constructor(hospede: string, documento: Documento, acomodacao: Acomodacao, checkIn: Date) {
        this.hospede = hospede;
        this.documento = documento;
        this.acomodacao = acomodacao;
        this.checkIn = checkIn;
    }

    public registrarCheckOut(data: Date): void {
        this.checkOut = data;
    }

    public get Hospede() { return this.hospede; }
    public get Documento() { return this.documento; }
    public get Acomodacao() { return this.acomodacao; }
    public get CheckIn() { return this.checkIn; }
    public get CheckOut() { return this.checkOut; }
}
