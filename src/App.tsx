import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ClientePage from './pages/ClientePage';
import GerentePage from './pages/GerenciamentoPage';
import RegistrarHospedagemPage from './pages/RegistrarHospedagemPage';
import CadastroClientePage from './pages/CadastroClientePage';
import CadastroDocumentoPage from './pages/CadastroDocumentoPage';

const App: React.FC = () => {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/cliente" element={<ClientePage />} />
				<Route path="/gerente" element={<GerentePage />} />
				<Route path="/hospedagem" element={<RegistrarHospedagemPage />} />
				<Route path="/cadastro-cliente" element={<CadastroClientePage />} />
				<Route path="/cadastro-documento/:tipo" element={<CadastroDocumentoPage />} />
			</Routes>
		</Router>
	);
};

export default App;
