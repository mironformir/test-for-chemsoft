import { ComponentType } from '../../../applications/components/components.entity';
import { IComponentsDBO } from '../../../applications/components/components.dependency.type';
import { databaseConnection } from './db';
import { Component } from './models';

export class ComponentsDBOPostgresSequelize implements IComponentsDBO {

  // Инициализация,нужно вызвать отдельно, т.к. конструктор не может быть асинхронным
  async initialize() {
    await databaseConnection.authenticate();
    await databaseConnection.sync();
  }

  // Операции надбазойданных, все имена говорящие
  async createComponent(component: ComponentType) {
    const result = (await Component.create(
      component
    )) as unknown as ComponentType;
    return result;
  }

  async createManyComponents(components: ComponentType[]) {
    const result = (await Component.bulkCreate(
      components
    )) as unknown as ComponentType[];
    return result;
  }

  async deleteComponentsByID(id: number) {
    const result = (await Component.destroy({
      where: { id },
    })) as unknown as ComponentType;
    return result;
  }

  async getAllComponents() {
    const result = (await Component.findAll()) as unknown as ComponentType[];
    return result;
  }

  async getComponentByID(id: number) {
    const result = (await Component.findOne({
      where: { id },
    })) as unknown as ComponentType;
    return result;
  }

  async updateComponent({ id, name, concentration }: ComponentType) {
    const result = (await Component.update(
      { name, concentration },
      { where: { id } }
    )) as unknown as ComponentType;
    return result;
  }
}
