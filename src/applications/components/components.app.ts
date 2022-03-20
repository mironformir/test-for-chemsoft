import {IComponentsDBO, IComponentsRESTServer, ComponentsParsers, IComponentsFileReader} from './components.dependency.type'
import { ComponentType } from './components.entity';

type ComponentAppConstructorArgs = {RESTServer: IComponentsRESTServer, DBO: IComponentsDBO, parsers: ComponentsParsers, fileReader: IComponentsFileReader}

export class ComponentApp {
  RESTServer: IComponentsRESTServer;
  DBO: IComponentsDBO;
  parsers: ComponentsParsers;
  fileReader: IComponentsFileReader;

  // Инъекция зависимостей через конструктор
  constructor({RESTServer, DBO, parsers, fileReader}: ComponentAppConstructorArgs){
    this.RESTServer = RESTServer
    this.DBO = DBO
    this.parsers = parsers
    this.fileReader = fileReader
  }

  // Инициализтруем, пробрасываем обработчики для HTTP-сервера
  async initialize(){
    this.RESTServer.initialize({
      createComponentHandler: (...params) => this.createComponent(...params),
      deleteComponentByIDHandler: (...params) => this.deleteComponentByID(...params),
      getAllComponentsHandler: (...params) => this.getAllComponents(...params),
      getComponentByIDHandler: (...params) => this.getComponentByID(...params),
      parseHTMLHandler: (...params) => this.parseHTML(...params),
      parseXMLHandler: (...params) => this.parseXML(...params),
      updateComponentHandler: (...params) => this.updateComponent(...params)
    })
    await this.DBO.initialize()
  }

  // Управление потоком данных. Названия все говорящие. Была бы бизнес логика, были бы какие-то промежуточные обратотчики
  async createComponent(component: ComponentType){
    return await this.DBO.createComponent(component)
  };

  async getComponentByID(id: number){
    return await this.DBO.getComponentByID(id)
  };

  async getAllComponents(){
    return await this.DBO.getAllComponents()
  }

  async updateComponent(component: ComponentType){
    return await this.DBO.updateComponent(component)
  };

  async deleteComponentByID(id: number){
    return await this.DBO.deleteComponentsByID(id)
  }

  async parseXML(){
    const parsedResult = this.parsers.XML.parse(this.fileReader.getXML())
    return await this.DBO.createManyComponents(await parsedResult)
  }

  async parseHTML(){
    const parsedResult = this.parsers.HTML.parse(this.fileReader.getHTML())
    return await this.DBO.createManyComponents(await parsedResult)
  }
}