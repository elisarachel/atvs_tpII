import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ClientePage from './pages/ClientePage';
import GerenciamentoPage from './pages/GerenciamentoPage';
import RegistrarHospedagemPage from './pages/RegistrarHospedagemPage';
import CadastroClientePage from './pages/CadastroClientePage';
import EditarClientePage from './pages/EditarClientePage';

const App: React.FC = () => {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/cliente" element={<ClientePage />} />
				<Route path="/gerenciamento" element={<GerenciamentoPage />} />
				<Route path="/hospedagem" element={<RegistrarHospedagemPage />} />
				<Route path="/cadastro-cliente" element={<CadastroClientePage />} />
				<Route path="/editar-cliente/:id" element={<EditarClientePage />} />
			</Routes>
		</Router>
	);
};

export default App;
