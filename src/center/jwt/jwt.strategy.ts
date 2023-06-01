import { JWT_OPTIONS } from '@/utils/global.constant';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { CenterService } from '../center.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private centerService: CenterService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWT_OPTIONS.secret,
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}
