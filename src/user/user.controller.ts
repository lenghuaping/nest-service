import { CenterService } from '@/center/center.service';
import { BUSINESS_ERROR_CODE } from '@/common/exceptions/business.error.codes';
import { BusinessException } from '@/common/exceptions/business.exception';
import { FindUserDto } from '@/user/dto/find-user.dto';
import { SetWorkSpaceDto } from '@/user/dto/set-work-sapce.dto';
import {
  Body,
  Controller,
  Get,
  Headers,
  Post,
  Query,
  Version,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@ApiTags('用户管理')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly centerService: CenterService,
  ) {}

  @Post('create')
  @Version('1')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get('item')
  @Version('1')
  item(@Query() findUserDto: FindUserDto) {
    return this.userService.find(findUserDto);
  }

  @Get('self')
  @Version('1')
  self(@Query() findUserDto: FindUserDto) {
    return this.userService.find(findUserDto);
  }

  @Get('getWorkSpace')
  @Version('1')
  getWorkSpace(@Headers('Authorization') authorization: string) {
    const result = this.centerService.decodeToken(authorization);
    return this.userService.getWorkSpace(result.user_id);
  }

  @Post('setWorkSpace')
  @Version('1')
  async setWorkSpace(
    @Headers('Authorization') authorization: string,
    @Body() setWorkSpaceDto: SetWorkSpaceDto,
  ) {
    const decoded = this.centerService.decodeToken(authorization);
    const result = await this.userService.setWorkSpace({
      ...setWorkSpaceDto,
      user_id: decoded.user_id,
    });
    if (result.affected > 0) {
      return '设置成功';
    }
    throw new BusinessException({
      code: BUSINESS_ERROR_CODE.COMMON,
      message: '设置失败',
    });
  }
}
