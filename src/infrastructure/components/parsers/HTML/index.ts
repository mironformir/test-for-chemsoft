import { parse } from 'node-html-parser';
import { IComponentsParser } from '../../../../applications/components/components.dependency.type';
import { ComponentType } from '../../../../applications/components/components.entity';

// Парсер HTML. получает текст и распаршивает его.
// Очень сильно завязан на внешнем виде документа,
// который парсится, но проблема в том,
// что в нем нет id для таблиц,
// что очень сильно связывает руки
export class ComponentsHTMLParser implements IComponentsParser {
  public parse(HTMLText: string) {
    return new Promise<ComponentType[]>(async (resolve, reject) => {
      const parsedHTML = parse(HTMLText);
      try {
        const parsedComponents: ComponentType[] = await parsedHTML
          .querySelectorAll('table')[5]
          .childNodes[1].childNodes.map((tr) =>
            tr.childNodes.map((td) => td.rawText)
          )
          .filter((el) => parseFloat(el[5]?.replace(',', '.')))
          .map(
            (el): ComponentType => ({
              name: el[3],
              concentration: parseFloat(el[5]?.replace(',', '.')),
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
