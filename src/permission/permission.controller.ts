import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
  Version,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { PermissionService } from './permission.service';

@ApiTags('权限管理')
@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Post('create')
  @Version('1')
  create(@Body() createPermissionDto: CreatePermissionDto) {
    return this.permissionService.create(createPermissionDto);
  }

  @Get('list')
  @Version('1')
  findAll() {
    return this.permissionService.findAll();
  }

  @Get('item')
  @Version('1')
  findOne(@Query('id') id: string) {
    return this.permissionService.findOne(+id);
  }

  @Patch('update')
  @Version('1')
  update(@Body() updatePermissionDto: UpdatePermissionDto) {
    return this.permissionService.update(updatePermissionDto);
  }

  @Delete('delete')
  @Version('1')
  remove(@Query() query) {
    return this.permissionService.remove(query.id);
  }
}
