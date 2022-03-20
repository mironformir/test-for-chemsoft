import { ComponentsParsers } from '../../../applications/components/components.dependency.type';
import { ComponentsXMLParser } from './XML';
import { ComponentsHTMLParser } from './HTML';

export const ComponentsParsersObject: ComponentsParsers = {
  HTML: new ComponentsHTMLParser(),
  XML: new ComponentsXMLParser(),
};
