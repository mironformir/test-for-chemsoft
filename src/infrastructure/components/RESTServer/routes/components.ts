// Роутинг для /api/components
import { Router } from 'express';
import { ComponentType } from '../../../../applications/components/components.entity';
import { ComponentHTTPServerExpress } from '../index';
const componentsRouter = Router();

// получение всех записей
componentsRouter.get('/', async (req, res) => {
  const body = await ComponentHTTPServerExpress.getAllComponentsHandler();
  return res.status(200).json(body);
});

// получение одной записи по id
componentsRouter.get('/:id', async (req, res) => {
  const body = await ComponentHTTPServerExpress.getComponentByIDHandler(
    parseInt(req.params.id.toString(), 10)
  ); // явно приводим к целому числу
  return res.status(200).json(body);
});

// редактирование одной записи
componentsRouter.post('/', async (req, res) => {
  const body = await ComponentHTTPServerExpress.updateComponentHandler(
    req.body as ComponentType
  );
  return res.status(200).json(body);
});

// создание одной записи
componentsRouter.put('/', async (req, res) => {
  const body = await ComponentHTTPServerExpress.createComponentHandler(
    req.body as ComponentType
  );
  return res.status(201).json(body);
});

// удаление одной записи по id
componentsRouter.delete('/:id', async (req, res) => {
  const body = await ComponentHTTPServerExpress.deleteComponentByIDHandler(
    parseInt(req.params.id.toString(), 10)
  ); // явно приводим к целому числу
  res.status(200).json(body);
});

export { componentsRouter };
