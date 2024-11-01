import Processo from "../abstracoes/processo";
import MenuTipoHospedagem from "../menus/menuTipoHospedagem";
import TipoAcomodacao from "./tipoAcomodacao";
import ListagemHospedagensAtivas from "./listagemHospedagensAtivas";
import RegistrarCheckOut from "./registrarCheckout";

export default class TipoHospedagem extends Processo {
    constructor() {
        super();
        this.menu = new MenuTipoHospedagem();
    }

    processar(): void {
        this.menu.mostrar();
        this.opcao = this.entrada.receberNumero("Qual opção desejada?");
        
        switch (this.opcao) {
            case 1:
                // Registrar uma nova hospedagem através da seleção de acomodação
                this.processo = new TipoAcomodacao();
                this.processo.processar();
                break;
            case 2:
                // Listar todas as hospedagens ativas
                this.processo = new ListagemHospedagensAtivas();
                this.processo.processar();
                break;
            case 3:
                // Registrar check-out de uma hospedagem
                const documento = this.entrada.receberTexto("Digite o número do documento para check-out: ");
                this.processo = new RegistrarCheckOut(documento);
                this.processo.processar();
                break;
            case 0:
                // Sair do menu de hospedagem
                console.log("Voltando ao menu principal...");
                break;
            default:
                console.log("Opção não entendida :(");
        }
    }
}
