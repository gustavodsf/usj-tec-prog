import { Injectable } from '@nestjs/common';
import { DataDTO } from './dto/data.dto';

import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';

@Injectable()
export class TokenService {
  createToken(data: DataDTO) {
    const privateKey = fs.readFileSync('private.key');
    const token = jwt.sign(data, privateKey, { algorithm: 'RS256' });
    return token;
  }

  verifyToken(token: string){
    try {
      const privateKey = fs.readFileSync('private.key');
      const decoded = jwt.verify(token, privateKey, { algorithms: ['RS256'] });
      return decoded;
    } catch (err) {
      // err
      console.log(err);
      return 'Problem to decode token!';
    }
  }
}
