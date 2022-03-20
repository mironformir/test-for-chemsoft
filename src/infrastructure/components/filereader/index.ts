import fs from 'fs';
import path from 'path';
import { IComponentsFileReader } from '../../../applications/components/components.dependency.type';

// Простенький кеширующий файл ридер, названия методов говорящие
export class ComponentFileReader implements IComponentsFileReader {
  HTMLText: string;
  XMLText: string;

  getXML() {
    if (this.XMLText) {
      return this.XMLText;
    }

    return (this.XMLText = fs.readFileSync(path.resolve('./files/Report.xml'), {
      encoding: 'utf-8',
    }));
  }

  getHTML() {
    if (this.HTMLText) {
      return this.HTMLText;
    }

    return (this.HTMLText = fs.readFileSync(
      path.resolve('./files/Протокол анализа.html'),
      { encoding: 'utf16le' }
    ));
  }
}
