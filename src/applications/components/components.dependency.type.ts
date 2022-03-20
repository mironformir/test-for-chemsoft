import { ComponentType } from './components.entity';

// Интерфесы необходимых объектов инфраструктуры
export interface IComponentsDBO {
  initialize: () => void;
  createComponent: (component: ComponentType) => Promise<ComponentType>;
  createManyComponents: (
    components: ComponentType[]
  ) => Promise<ComponentType[]>;
  getComponentByID: (id: number) => Promise<ComponentType>;
  getAllComponents: () => Promise<ComponentType[]>;
  updateComponent: (component: ComponentType) => Promise<ComponentType>;
  deleteComponentsByID: (id: number) => Promise<ComponentType>;
}

export interface ComponentRESTServerConfig {
  createComponentHandler: (component: ComponentType) => Promise<ComponentType>;
  getComponentByIDHandler: (id: number) => Promise<ComponentType>;
  getAllComponentsHandler: () => Promise<ComponentType[]>;
  updateComponentHandler: (component: ComponentType) => Promise<ComponentType>;
  deleteComponentByIDHandler: (id: number) => Promise<ComponentType>;
  parseXMLHandler: () => Promise<ComponentType[]>;
  parseHTMLHandler: () => Promise<ComponentType[]>;
}

export interface IComponentsRESTServer {
  initialize: (config: ComponentRESTServerConfig) => void;
}

export interface IComponentsParser {
  parse(HTMLText: string): Promise<ComponentType[]>;
}

export type ComponentsParsers = {
  XML: IComponentsParser;
  HTML: IComponentsParser;
};

export interface IComponentsFileReader {
  getXML: () => string;
  getHTML: () => string;
}
