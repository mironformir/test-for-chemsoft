// Роутинг для /api/parsers
import { Router } from 'express';
import { ComponentHTTPServerExpress } from '..';
const parsersRouter = Router();

parsersRouter.post('/parseHTML', async(req, res) => {
  const body = await ComponentHTTPServerExpress.parseHTMLHandler();
  return res.json(body);
});

parsersRouter.post('/parseXML', async (req, res) => {
  const body = await ComponentHTTPServerExpress.parseXMLHandler();
  return res.status(200).json(body);
});

export { parsersRouter };
