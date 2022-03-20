import { Router } from 'express';
import { componentsRouter } from './components';
import { parsersRouter } from './parsers';

const routes = Router();
 // Терперь наши маршруты объеденены общим корневым роутером
routes.use('/components', componentsRouter);
routes.use('/parsers', parsersRouter);

export { routes };
