import * as dotenv from 'dotenv'
import path from 'path';
const dotenvPath = path.resolve('.env')
dotenv.config({path: dotenvPath})

import { ComponentApp } from './applications/components/components.app';
import { ComponentHTTPServerExpress } from './infrastructure/components/RESTServer';
import { ComponentsParsersObject } from './infrastructure/components/parsers';
import { ComponentsDBOPostgresSequelize } from './infrastructure/components/dbo';
import { ComponentFileReader } from './infrastructure/components/filereader';

const app = new ComponentApp({
  DBO: new ComponentsDBOPostgresSequelize(),
  RESTServer: ComponentHTTPServerExpress,
  fileReader: new ComponentFileReader(),
  parsers: ComponentsParsersObject,
});

app.initialize();
