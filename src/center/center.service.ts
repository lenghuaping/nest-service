import { User } from '@/user/entities/user.entity';
import { JWT_OPTIONS } from '@/utils/global.constant';
import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Cache } from 'cache-manager';

@Injectable()
export class CenterService {
  constructor(
    private jwtService: JwtService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  login(user: User) {
    const payload = { user_id: user.id };
    return {
      ...user,
      access_token: this.jwtService.sign(payload),
    };
  }

  decodeToken(token: string) {
    try {
      const _token = token.replace('Bearer ', '');
      return this.jwtService.verify(_token, { secret: JWT_OPTIONS.secret });
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  // async validateUserToken(token: string) {
  //   const decoded = await this.decodeToken(token);
  // }
}
