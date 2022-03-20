import {
  IComponentsRESTServer,
  ComponentRESTServerConfig,
} from '../../../applications/components/components.dependency.type';
import { componentsServer, PORT } from './express';

export const ComponentHTTPServerExpress: IComponentsRESTServer & ComponentRESTServerConfig = class ComponentHTTPServer {
  public static createComponentHandler: ComponentRESTServerConfig['createComponentHandler'];
  public static deleteComponentByIDHandler: ComponentRESTServerConfig['deleteComponentByIDHandler'];
  public static getAllComponentsHandler: ComponentRESTServerConfig['getAllComponentsHandler'];
  public static getComponentByIDHandler: ComponentRESTServerConfig['getComponentByIDHandler'];
  public static parseHTMLHandler: ComponentRESTServerConfig['parseHTMLHandler'];
  public static parseXMLHandler: ComponentRESTServerConfig['parseXMLHandler'];
  public static updateComponentHandler: ComponentRESTServerConfig['updateComponentHandler'];

  // Инициализация, удобно вызвать во время старта приложения,
  // принимает в себя колбеки, которые вызовутся во время запросов к серверу
  // в какой-то степени метапрограммирование, но в большей степени - немного проблемный кусок кода,
  // который заставляет писать бойлерплейт, мне не нравится, но ничего сильно лучше я не придумал
  public static initialize({
    createComponentHandler,
    deleteComponentByIDHandler,
    getAllComponentsHandler,
    getComponentByIDHandler,
    parseHTMLHandler,
    parseXMLHandler,
    updateComponentHandler,
  }: ComponentRESTServerConfig) {
    ComponentHTTPServer.createComponentHandler = createComponentHandler;
    ComponentHTTPServer.deleteComponentByIDHandler = deleteComponentByIDHandler;
    ComponentHTTPServer.getAllComponentsHandler = getAllComponentsHandler;
    ComponentHTTPServer.getComponentByIDHandler = getComponentByIDHandler;
    ComponentHTTPServer.parseHTMLHandler = parseHTMLHandler;
    ComponentHTTPServer.parseXMLHandler = parseXMLHandler;
    ComponentHTTPServer.updateComponentHandler = updateComponentHandler;

    componentsServer.listen(PORT, () => {
      console.log(`HTTP server started on port ${PORT}`); // tslint:disable-line
    });
  }
}
