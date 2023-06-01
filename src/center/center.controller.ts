import { Public } from '@/common/decorator/public';
import { BUSINESS_ERROR_CODE } from '@/common/exceptions/business.error.codes';
import { BusinessException } from '@/common/exceptions/business.exception';
import { MailService } from '@/helper/mail/mail.service';
import { UserService } from '@/user/user.service';
import {
  Body,
  CACHE_MANAGER,
  Controller,
  Inject,
  Post,
  Version,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import type { Cache } from 'cache-manager';
import { CenterService } from './center.service';
import { LoginRequestDto, LoginResponseDto } from './dto/login.dto';
import { SendEmailCodeDto } from './dto/send-mail.dto';

@ApiTags('鉴权中心')
@Controller('center')
export class CenterController {
  constructor(
    private readonly centerService: CenterService,
    private readonly userService: UserService,
    private readonly mailService: MailService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Post('sendEmailCode')
  @Version('1')
  @Public()
  async sendEmailCode(@Body() sendEmailDto: SendEmailCodeDto) {
    const value = await this.cacheManager.get(sendEmailDto.email);
    if (value) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.COMMON,
        message: '邮件已发送，有效期为3分钟，请稍候重试!',
      });
    }
    await this.mailService.sendMail(sendEmailDto.email);
  }

  @Post('login')
  @Version('1')
  @Public()
  @ApiOkResponse({
    status: 200,
    description: 'Success',
    type: LoginResponseDto,
  })
  async login(@Body() loginDto: LoginRequestDto) {
    const user = await this.userService.find({ email: loginDto.email });
    const emailCode = await this.cacheManager.get(loginDto.email);
    if (!emailCode) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.COMMON,
        message: '验证码过期',
      });
    }
    if (emailCode !== loginDto.code) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.COMMON,
        message: '验证码错误',
      });
    }
    if (user) {
      // 用户存在 返回密钥
      return this.centerService.login(user);
    } else {
      // 用户不存在 注册后返回密钥
      const registered = await this.userService.create({
        email: loginDto.email,
      });
      return this.centerService.login(registered);
    }
  }
}
