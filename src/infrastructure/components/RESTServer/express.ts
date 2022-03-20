import Express from 'express';
import cors from 'cors';
import { routes } from './routes';

const PORT = parseInt(process.env.API_PORT, 10) || 8080;

const componentsServer = Express();

componentsServer.use(cors()).use(Express.json())
// Все маршруты будут доступны на /api
.use('/api', routes);

export { componentsServer, PORT };
