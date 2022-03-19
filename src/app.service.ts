import joi from 'joi';
import _ from 'lodash';

import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    console.log(joi, _);
    return `test3`;
  }
}
