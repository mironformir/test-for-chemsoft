import { XMLParser } from 'fast-xml-parser';
import { IComponentsParser } from '../../../../applications/components/components.dependency.type';
import { ComponentType } from '../../../../applications/components/components.entity';

const parser = new XMLParser();

// Намного проще, чем HTML, ведь для парсинга нужно знать только названия некоторый полей,
// по своей сути XML и json это в первую очередь форматы для хранения данных,
// поэтому, с ними легче работать после парсинга
export class ComponentsXMLParser implements IComponentsParser {
  public parse(XMLText: string) {
    return new Promise<ComponentType[]>(async (resolve, reject) => {
      try {
        const parsedXML = parser.parse(XMLText);

        const parsedComponents: ComponentType[] = parsedXML[
          'NaturalGas2.Calc31369-31371'
        ].Компоненты.map(
          (el: {
            Название: string;
            Концентрация: string | number;
          }): ComponentType => ({
            name: el.Название,
            concentration: parseFloat(el.Концентрация.toString()),
          })
        );

        if (!parsedComponents.length) {
          throw new Error('Элементы в файле не найдены');
        }
        resolve(parsedComponents);
      } catch (error) {
        reject(error);
      }
    });
  }
}
