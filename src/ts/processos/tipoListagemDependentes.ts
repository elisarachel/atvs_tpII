import Processo from "../abstracoes/processo";
import ListagemDependentes from "../processos/listagemDependentes";
import MenuTipoListagemDependentes from "../menus/menuTipoListagemDependentes";

export default class TipoListagemDependentes extends Processo {
    private listagem: ListagemDependentes;

    constructor() {
        super();
        this.listagem = new ListagemDependentes();
        this.menu = new MenuTipoListagemDependentes();
    }

    processar(): void {
        this.menu.mostrar();  // Exibe o menu com as opções
        const opcao = parseInt(this.entrada.receberTexto('Escolha uma opção: '));

        switch (opcao) {
            case 1:
                const cpfTitular = this.entrada.receberTexto('Digite o CPF do titular: ');
                this.listagem.listarDependentesDeTitular(cpfTitular);
                break;
            case 2:
                const cpfDependente = this.entrada.receberTexto('Digite o CPF do dependente: ');
                this.listagem.listarTitularDeDependente(cpfDependente);
                break;
            default:
                console.log('Opção inválida.');
                break;
        }
    }
}
