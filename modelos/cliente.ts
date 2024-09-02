import Prototipo from "../interfaces/prototipo";
import Documento from "./documento";
import Endereco from "./endereco";
import Telefone from "./telefone";

export default class Cliente implements Prototipo {
    public nome: string;
    public nomeSocial: string;
    public dataNascimento: Date;
    public dataCadastro: Date;
    public telefones: Telefone[] = [];
    public endereco: Endereco;
    public documentos: Documento[] = [];
    public dependentes: Cliente[] = [];
    public titular: Cliente;

    public clonar(): Prototipo {
        let clone = new Cliente();
        clone.nome = this.nome;
        clone.nomeSocial = this.nomeSocial;
        clone.dataNascimento = new Date(this.dataNascimento); // Clonando a data de nascimento
        clone.dataCadastro = new Date(this.dataCadastro); // Clonando a data de cadastro
        clone.telefones = this.telefones.map(telefone => Object.assign(new Telefone(), telefone)); // Clonando telefones
        clone.endereco = this.endereco.clonar() as Endereco; // Clonando o endereço
        clone.documentos = this.documentos.map(doc => Object.assign(new Documento(), doc)); // Clonando documentos
        clone.dependentes = this.dependentes.map(dep => dep.clonar() as Cliente); // Clonando dependentes
        clone.titular = this.titular ? this.titular.clonar() as Cliente : null; // Clonando o titular, se existir
        return clone;
    }
}
