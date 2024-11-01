import Processo from "../abstracoes/processo";
import MenuTipoAcomodacao from "../menus/menuTipoAcomodacao";
import DiretorCasalSimples from "../diretores/diretorCasalSimples";
import DiretorFamiliaSimples from "../diretores/diretorFamiliaSimples";
import DiretorFamiliaMais from "../diretores/diretorFamiliaMais";
import DiretorFamiliaSuper from "../diretores/diretorFamiliaSuper";
import DiretorSolteiroSimples from "../diretores/diretorSolteiroSimples";
import DiretorSolteiroMais from "../diretores/diretorSolteiroMais";
import RegistrarHospedagem from "./registrarHospedagem";
import Acomodacao from "../modelos/acomodacao";

export default class TipoAcomodacao extends Processo {
    private acomodacao!: Acomodacao;

    constructor() {
        super();
        this.menu = new MenuTipoAcomodacao();
    }

    processar(): void {
        let execucao = true;

        while (execucao) {
            this.menu.mostrar();
            this.opcao = this.entrada.receberNumero("Digite o número da acomodação desejada: ");
            
            switch (this.opcao) {
                case 1:
                    this.acomodacao = new DiretorCasalSimples().construir();
                    break;
                case 2:
                    this.acomodacao = new DiretorFamiliaSimples().construir();
                    break;
                case 3:
                    this.acomodacao = new DiretorFamiliaMais().construir();
                    break;
                case 4:
                    this.acomodacao = new DiretorFamiliaSuper().construir();
                    break;
                case 5:
                    this.acomodacao = new DiretorSolteiroSimples().construir();
                    break;
                case 6:
                    this.acomodacao = new DiretorSolteiroMais().construir();
                    break;
                case 0:
                    console.log("Finalizando seleção de acomodação.");
                    execucao = false;
                    return;
                default:
                    console.log("Opção de acomodação inválida.");
                    continue;
            }
            const registrarHospedagem = new RegistrarHospedagem(this.acomodacao);
            registrarHospedagem.processar();
            execucao = false;
        }
    }
}
