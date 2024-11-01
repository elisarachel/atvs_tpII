import Menu from "../interfaces/menu";

export default class MenuTipoHospedagem implements Menu {
    mostrar(): void {
        console.clear();
        console.log(`****************************`);
        console.log(`| Menu de Hospedagem`);
        console.log(`----------------------`);
        console.log(`| 1 - Registrar nova hospedagem`);
        console.log(`| 2 - Listar hospedagens ativas`);
        console.log(`| 3 - Registrar check-out`);
        console.log(`| 0 - Voltar ao menu principal`);
        console.log(`****************************`);
    }
}
