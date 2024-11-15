import express from 'express';
import cors from 'cors';
import clienteRoutes from './rotas/clienteRoutes';
import hospedagemRoutes from './rotas/hospedagemRoutes';
import documentoRoutes from './rotas/documentoRoutes';
import acomodacaoRoutes from './rotas/acomodacaoRoutes';
import syncDatabase from './config/sync';
import initAcomodacoes from './models/initAcomodacoes'; // Importe o script de inicialização
import './models/index'; // Ensure all models are initialized

const app = express();

app.use(cors());
app.use(express.json());

// Synchronize the database before setting up the routes
(async () => {
  await syncDatabase();
  await initAcomodacoes(); // Execute o script de inicialização

  // Set up routes after database sync is complete
  app.use('/clientes', clienteRoutes);
  app.use('/hospedagens', hospedagemRoutes);
  app.use('/documentos', documentoRoutes);
  app.use('/acomodacoes', acomodacaoRoutes);

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
})();
