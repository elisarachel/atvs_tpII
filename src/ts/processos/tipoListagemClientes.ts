import Processo from "../abstracoes/processo";
import MenuTipoListagemClientes from "../menus/menuTipoListagemClientes";
import ListagemDependentes from "./listagemDependentes";
import ListagemTitulares from "./listagemTitulares";

export default class TipoListagemClientes extends Processo {
    private listagem: ListagemDependentes;

    constructor(){
        super()
        this.listagem = new ListagemDependentes();
        this.menu = new MenuTipoListagemClientes()
    }
    
    processar(): void {
        this.menu.mostrar()
        this.opcao = this.entrada.receberNumero('Qual a opção desejada?')
        switch (this.opcao) {
            case 1:
                this.processo = new ListagemTitulares()
                this.processo.processar()
                break;
            case 2:
                const cpfTitular = this.entrada.receberTexto('Digite o CPF do titular: ');
                this.listagem.listarDependentesDeTitular(cpfTitular);
                break;
            case 3:
                const cpfDependente = this.entrada.receberTexto('Digite o CPF do dependente: ');
                this.listagem.listarTitularDeDependente(cpfDependente);
                break;
            default:
                console.log('Opção não entendida... :(')
        }
    }
}