import { CenterService } from '@/center/center.service';
import { FindSecretDto } from '@/secret/dto/find-secret.dto';
import { UpdateSecretDto } from '@/secret/dto/update-secret.dto';
import { UserService } from '@/user/user.service';
import { Body, Controller, Get, Headers, Post, Version } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateSecretDto } from './dto/create-secret.dto';
import { SecretService } from './secret.service';

@ApiTags('密钥')
@Controller('secret')
export class SecretController {
  constructor(
    private readonly secretService: SecretService,
    private readonly centerService: CenterService,
    private readonly userService: UserService,
  ) {}

  @Post('create')
  @Version('1')
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: 'boolean',
  })
  async create(
    @Headers('Authorization') authorization: string,
    @Body() dto: CreateSecretDto,
  ) {
    const result = this.centerService.decodeToken(authorization);
    const exist = await this.secretService.findUserSecret(result.user_id);
    if (exist) {
      return '用户Gitlab密钥已存在';
    }

    const createResult = await this.secretService.create({
      userId: result.user_id,
      ...dto,
    });

    if (createResult) {
      return '保存成功';
    }

    return '保存失败';
  }

  @Post('upate')
  @Version('1')
  async upate(
    @Headers('Authorization') authorization: string,
    @Body() dto: UpdateSecretDto,
  ) {
    // 解密 token
    const decoded = this.centerService.decodeToken(authorization);
    // 根据 用户id 查密钥
    const exist = await this.secretService.findUserSecret(decoded.user_id);
    const result = this.secretService.update({ id: exist.id, ...dto });
    if (result) {
      return '保存成功';
    }

    return '保存失败';
  }

  @Get('find')
  @Version('1')
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: FindSecretDto,
  })
  find(@Headers('Authorization') authorization: string) {
    const decodeed = this.centerService.decodeToken(authorization);
    return this.secretService.findUserSecret(decodeed.user_id);
  }
}
