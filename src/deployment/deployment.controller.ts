import {
  Body,
  Controller,
  Get,
  ParseIntPipe,
  Post,
  Query,
  Version,
} from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { DeploymentService } from './deployment.service';
import { CreateDeploymentDto } from './dto/create-deployment.dto';

@ApiTags('私有化部署')
@Controller('deployment')
export class DeploymentController {
  constructor(private readonly deploymentService: DeploymentService) {}

  @Post('create')
  @Version('1')
  create(@Body() createDeploymentDto: CreateDeploymentDto) {
    return this.deploymentService.create(createDeploymentDto);
  }

  @Get('list')
  @Version('1')
  @ApiQuery({
    name: 'current',
    required: true,
    type: Number,
  })
  @ApiQuery({
    name: 'limit',
    required: true,
    type: Number,
  })
  list(
    @Query('current', ParseIntPipe) current: number,
    @Query('limit', ParseIntPipe) limit: number,
  ) {
    return this.deploymentService.list();
  }
}
