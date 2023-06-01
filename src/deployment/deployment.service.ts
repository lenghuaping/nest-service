import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateDeploymentDto } from './dto/create-deployment.dto';
import { UpdateDeploymentDto } from './dto/update-deployment.dto';
import { Deployment } from './entities/deployment.entity';

@Injectable()
export class DeploymentService {
  constructor(
    @Inject('Deployment_Repository')
    private readonly deploymentRepository: Repository<Deployment>,
  ) {}

  create(createDeploymentDto: CreateDeploymentDto) {
    return this.deploymentRepository.findAndCount();
  }

  list() {
    return this.deploymentRepository.findAndCount();
  }

  findOne(id: number) {
    return `This action returns a #${id} deployment`;
  }

  update(id: number, updateDeploymentDto: UpdateDeploymentDto) {
    return `This action updates a #${id} deployment`;
  }

  remove(id: number) {
    return `This action removes a #${id} deployment`;
  }
}
